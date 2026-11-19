export type ModerationResult =
  | { ok: true }
  | { ok: false; reason: 'too_short' | 'too_long' | 'sensitive_or_unsafe' };

export const MIN_CONTRIBUTION_LENGTH = 10;
export const MAX_CONTRIBUTION_LENGTH = 1000;

/**
 * Normalize Vietnamese and English text by lowercasing,
 * removing diacritics (handling đ -> d), and collapsing separators
 * into single spaces for accurate phrase boundary matching.
 */
function normalizeForMatching(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

// Multi-word and whole-token sensitive terms (normalized without diacritics)
// Covers politics, political parties, religion, regional/racial discrimination,
// hate speech, profanity, and personal/organizational harassment.
const SENSITIVE_PHRASES: string[] = [
  // Vietnamese politics & ideology
  'chinh tri',
  'dang phai',
  'dang cong san',
  'cong san',
  'tu ban',
  'phan dong',
  'lat do',
  'bieu tinh',
  'chinh quyen',
  'che do',
  'bau cu',
  'quoc hoi',
  'chinh phu',
  'chu nghia xa hoi',
  'doc tai',
  'dan chu gia hieu',
  'ba que',
  'viet tan',
  'du cang',
  'bo do',

  // English politics & ideology
  'politics',
  'political',
  'political party',
  'communism',
  'communist',
  'socialism',
  'capitalism',
  'fascism',
  'fascist',
  'nazi',
  'propaganda',
  'election',
  'regime',
  'overthrow',
  'protest',
  'democrat',
  'republican',
  'leftist',
  'rightist',
  'marxist',

  // Vietnamese religion & sectarian
  'ton giao',
  'thien chua',
  'phat giao',
  'hoi giao',
  'tin lanh',
  'cong giao',
  'cao dai',
  'hoa hao',
  'chua troi',
  'kinh thanh',
  'thanh chien',
  'di giao',
  'ta dao',
  'me tin',

  // English religion & sectarian
  'religion',
  'religious',
  'christian',
  'christianity',
  'islam',
  'islamic',
  'muslim',
  'buddhism',
  'buddhist',
  'catholic',
  'protestant',
  'jihad',
  'heresy',
  'blasphemy',
  'bible',
  'quran',

  // Regional / racial discrimination & hate speech
  'phan biet chung toc',
  'phan biet vung mien',
  'ky thi',
  'bac ky',
  'nam ky',
  'trung ky',
  'moi den',
  'da den',
  'da vang',
  'do nha que',
  'racism',
  'racist',
  'xenophobia',
  'xenophobic',
  'white supremacy',
  'supremacist',
  'hate speech',
  'nigger',
  'nigga',
  'chink',
  'kike',
  'faggot',
  'retard',
  'retarded',

  // Profanity, insults & harassment (VI & EN)
  'dit me',
  'du ma',
  'du me',
  'me may',
  'con me',
  'bo may',
  'ong noi may',
  'oc cho',
  'do ngu',
  'ngu xuan',
  'ngu si',
  'dan don',
  'rac ruoi',
  'lua dao',
  'vo hoc',
  'mat day',
  'khon nan',
  'cho chet',
  'thang dien',
  'con dien',
  'fuck',
  'fucking',
  'motherfucker',
  'shit',
  'bullshit',
  'bitch',
  'asshole',
  'bastard',
  'dickhead',
  'cunt',
  'idiot',
  'moron',
  'dumbass',
  'stupid',
  'scam',
  'fraud',
  'loser',
  'trash',
  'kill yourself',
  'kys',
];

const SHORT_EXACT_PROFANITY = new Set([
  'dm',
  'dcm',
  'dkm',
  'vkl',
  'vcl',
  'vl',
  'clgt',
  'cc',
  'cl',
  'lon',
  'cac',
  'buoi',
  'dit',
  'wtf',
  'stfu',
]);

function containsSensitiveLanguage(raw: string): boolean {
  const normalized = normalizeForMatching(raw);
  if (!normalized) return false;

  const padded = ` ${normalized} `;
  for (const phrase of SENSITIVE_PHRASES) {
    if (padded.includes(` ${phrase} `)) {
      return true;
    }
  }

  const tokens = normalized.split(' ');
  for (const token of tokens) {
    if (SHORT_EXACT_PROFANITY.has(token)) {
      return true;
    }
  }

  return false;
}

function containsSpamUrlOrXss(raw: string): boolean {
  // Detect HTML/XML tags or script injection attempts
  if (/<\s*\/?\s*[a-z!][^>]*>/i.test(raw)) {
    return true;
  }
  if (/javascript\s*:|data\s*:\s*text\/html|on(load|error|click|mouse\w+)\s*=/i.test(raw)) {
    return true;
  }

  // Detect URLs and spam domains
  if (/(https?:\/\/|ftp:\/\/|www\.)\S+/i.test(raw)) {
    return true;
  }
  if (
    /\b[a-z0-9-]{2,}\.(com|net|org|io|vn|xyz|info|biz|co|ru|cn|me|tv|tk|top|vip|bet|club)\b/i.test(
      raw
    )
  ) {
    return true;
  }

  return false;
}

export function moderateContribution(
  authorRaw: string,
  contentRaw: string
): ModerationResult {
  const trimmedAuthor = authorRaw.trim();
  const trimmedContent = contentRaw.trim();

  if (trimmedContent.length < MIN_CONTRIBUTION_LENGTH) {
    return { ok: false, reason: 'too_short' };
  }

  if (trimmedContent.length > MAX_CONTRIBUTION_LENGTH) {
    return { ok: false, reason: 'too_long' };
  }

  if (
    containsSpamUrlOrXss(trimmedAuthor) ||
    containsSpamUrlOrXss(trimmedContent)
  ) {
    return { ok: false, reason: 'sensitive_or_unsafe' };
  }

  if (
    containsSensitiveLanguage(trimmedAuthor) ||
    containsSensitiveLanguage(trimmedContent)
  ) {
    return { ok: false, reason: 'sensitive_or_unsafe' };
  }

  return { ok: true };
}
