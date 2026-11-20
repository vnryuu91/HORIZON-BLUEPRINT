import {
  CATEGORY_SEO_META,
  SITE_SEO_META,
  findBlueprintSeoBySlugOrId,
} from './_catalog.js';

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapLines(text, maxCharsPerLine, maxLines) {
  const words = String(text || '').trim().split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
      if (lines.length === maxLines) break;
    }
  }
  if (current && lines.length < maxLines) {
    lines.push(current);
  }
  if (
    lines.length === maxLines &&
    words.join(' ').length > lines.join(' ').length
  ) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S{0,3}$/, '…');
  }
  return lines;
}

function renderDynamicSciFiSvg({
  title,
  categoryLabel,
  issueLabel,
  summary,
  badgeLabel,
}) {
  const titleLines = wrapLines(title, 34, 4);
  const summaryLines = wrapLines(summary, 70, 2);
  const titleFontSize =
    titleLines.length >= 4 ? 38 : titleLines.length === 3 ? 44 : 50;
  const lineHeight = Math.round(titleFontSize * 1.24);
  const titleStartY = 212;
  const summaryStartY = titleStartY + titleLines.length * lineHeight + 28;

  const titleSvg = titleLines
    .map(
      (line, idx) =>
        `<text x="76" y="${titleStartY + idx * lineHeight}" fill="#F8FAFC" font-family="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="${titleFontSize}" font-weight="700">${escapeXml(line)}</text>`
    )
    .join('\n  ');

  const summarySvg = summaryLines
    .map(
      (line, idx) =>
        `<text x="76" y="${summaryStartY + idx * 30}" fill="#94A3B8" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="400">${escapeXml(line)}</text>`
    )
    .join('\n  ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070A12" />
      <stop offset="55%" stop-color="#0B0F19" />
      <stop offset="100%" stop-color="#0E1428" />
    </linearGradient>
    <radialGradient id="glowC" cx="85%" cy="22%" r="48%">
      <stop offset="0%" stop-color="#00F0FF" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#00F0FF" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glowV" cx="15%" cy="88%" r="48%">
      <stop offset="0%" stop-color="#7000FF" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#7000FF" stop-opacity="0" />
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00F0FF" stroke-opacity="0.09" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="url(#glowC)" />
  <rect width="1200" height="630" fill="url(#glowV)" />

  <rect x="28" y="28" width="1144" height="574" rx="14" fill="none" stroke="#1E293B" stroke-width="1.5" />
  <path d="M28 64 V28 H64 M1136 28 H1172 V64 M28 566 V602 H64 M1136 602 H1172 V566" fill="none" stroke="#00F0FF" stroke-width="2.5" stroke-linecap="round" />

  <g transform="translate(1030, 140)" opacity="0.58">
    <circle cx="0" cy="0" r="88" fill="none" stroke="#00F0FF" stroke-opacity="0.25" stroke-dasharray="4 6" />
    <circle cx="0" cy="0" r="56" fill="none" stroke="#7000FF" stroke-opacity="0.5" stroke-width="1.5" />
    <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" stroke="#00F0FF" stroke-width="1.8" />
    <circle cx="0" cy="0" r="5" fill="#00F0FF" />
  </g>

  <rect x="76" y="76" width="12" height="12" rx="2" fill="#00F0FF" />
  <text x="102" y="88" fill="#00F0FF" font-family="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="18" font-weight="700" letter-spacing="2.5">
    ${escapeXml(SITE_SEO_META.siteName)}
  </text>
  <text x="76" y="132" fill="#94A3B8" font-family="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="16" font-weight="600" letter-spacing="1.4">
    ${escapeXml(issueLabel)}  ·  ${escapeXml(categoryLabel.toUpperCase())}
  </text>
  <line x1="76" y1="154" x2="880" y2="154" stroke="#1E293B" stroke-width="1.5" />

  ${titleSvg}
  ${summarySvg}

  <line x1="76" y1="524" x2="1124" y2="524" stroke="#1E293B" stroke-width="1.5" />
  <text x="76" y="562" fill="#00F0FF" font-family="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="15" font-weight="600" letter-spacing="1.2">
    ${escapeXml(badgeLabel.toUpperCase())}
  </text>
  <text x="1124" y="562" text-anchor="end" fill="#64748B" font-family="'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace" font-size="15">
    1200×630 // ARCHIVE DOSSIER
  </text>
</svg>`;
}

export default function handler(req, res) {
  const url = new URL(req.url || '/', 'https://horizon-blueprint.vercel.app');
  const postParam = url.searchParams.get('post') || url.searchParams.get('slug');
  const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'vi';

  const blueprint = findBlueprintSeoBySlugOrId(postParam);
  const categoryName = blueprint
    ? CATEGORY_SEO_META[blueprint.category]?.[lang] || blueprint.category
    : lang === 'vi'
      ? 'Vũ trụ · Lượng tử · AI · Năng lượng'
      : 'Space · Quantum · AI · Energy';

  const title = blueprint
    ? blueprint.title[lang]
    : SITE_SEO_META[lang].tagline;
  const issueLabel = blueprint
    ? `${lang === 'vi' ? 'BẢN THIẾT KẾ' : 'BLUEPRINT'} #${blueprint.issueNumber}`
    : 'ARCHIVE DOSSIER · 2026';
  const summary = blueprint
    ? blueprint.summary[lang]
    : SITE_SEO_META[lang].description;
  const badgeLabel = SITE_SEO_META[lang].speculativeBadge;

  const svg = renderDynamicSciFiSvg({
    title,
    categoryLabel: categoryName,
    issueLabel,
    summary,
    badgeLabel,
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.end(svg);
}
