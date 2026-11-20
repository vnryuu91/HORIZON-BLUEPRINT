import { createElement as h } from 'react';
import {
  CATEGORY_SEO_META,
  SITE_SEO_META,
  findBlueprintSeoBySlugOrId,
  type Language,
} from '../src/data/blueprintMeta';

export const config = {
  runtime: 'edge',
};

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function wrapLines(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
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
  if (lines.length === maxLines && words.join(' ').length > lines.join(' ').length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S{0,3}$/, '…');
  }
  return lines;
}

function renderDynamicSciFiSvg(params: {
  title: string;
  categoryLabel: string;
  issueLabel: string;
  summary: string;
  badgeLabel: string;
}): string {
  const titleLines = wrapLines(params.title, 34, 4);
  const summaryLines = wrapLines(params.summary, 68, 2);
  const titleFontSize = titleLines.length >= 4 ? 38 : titleLines.length === 3 ? 44 : 50;
  const lineHeight = Math.round(titleFontSize * 1.24);
  const titleStartY = 210;
  const summaryStartY = titleStartY + titleLines.length * lineHeight + 28;

  const titleSvg = titleLines
    .map(
      (line, idx) =>
        `<text x="76" y="${titleStartY + idx * lineHeight}" fill="#F8FAFC" font-family="'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif" font-size="${titleFontSize}" font-weight="700">${escapeXml(line)}</text>`
    )
    .join('\n  ');

  const summarySvg = summaryLines
    .map(
      (line, idx) =>
        `<text x="76" y="${summaryStartY + idx * 30}" fill="#94A3B8" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="400">${escapeXml(line)}</text>`
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

  <g transform="translate(1030, 140)" opacity="0.55">
    <circle cx="0" cy="0" r="88" fill="none" stroke="#00F0FF" stroke-opacity="0.25" stroke-dasharray="4 6" />
    <circle cx="0" cy="0" r="56" fill="none" stroke="#7000FF" stroke-opacity="0.5" stroke-width="1.5" />
    <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" fill="none" stroke="#00F0FF" stroke-width="1.8" />
    <circle cx="0" cy="0" r="5" fill="#00F0FF" />
  </g>

  <rect x="76" y="76" width="12" height="12" rx="2" fill="#00F0FF" />
  <text x="102" y="88" fill="#00F0FF" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="18" font-weight="700" letter-spacing="2.5">
    ${escapeXml(SITE_SEO_META.siteName)}
  </text>
  <text x="76" y="132" fill="#94A3B8" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="16" font-weight="600" letter-spacing="1.4">
    ${escapeXml(params.issueLabel)}  ·  ${escapeXml(params.categoryLabel.toUpperCase())}
  </text>
  <line x1="76" y1="154" x2="880" y2="154" stroke="#1E293B" stroke-width="1.5" />

  ${titleSvg}
  ${summarySvg}

  <line x1="76" y1="524" x2="1124" y2="524" stroke="#1E293B" stroke-width="1.5" />
  <text x="76" y="562" fill="#00F0FF" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="15" font-weight="600" letter-spacing="1.2">
    ${escapeXml(params.badgeLabel.toUpperCase())}
  </text>
  <text x="1124" y="562" text-anchor="end" fill="#64748B" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="15">
    1200×630 // ARCHIVE DOSSIER
  </text>
</svg>`;
}

async function loadGoogleFontSubset(
  familyQuery: string,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${familyQuery}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(cssUrl, {
      headers: {
        // Legacy Safari UA instructs Google Fonts to return TrueType (.ttf), required by Satori
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    });
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src:\s*url\(([^)]+)\)/i);
    if (!match?.[1]) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const postParam = url.searchParams.get('post') || url.searchParams.get('slug');
  const langParam = url.searchParams.get('lang');
  const formatParam = url.searchParams.get('format');
  const lang: Language = langParam === 'en' ? 'en' : 'vi';

  const blueprint = findBlueprintSeoBySlugOrId(postParam);
  const category = blueprint
    ? CATEGORY_SEO_META.find((c) => c.id === blueprint.category)
    : undefined;

  const title = blueprint
    ? blueprint.title[lang]
    : SITE_SEO_META[lang].tagline;
  const categoryLabel = category
    ? category.name[lang]
    : lang === 'vi'
      ? 'Vũ trụ · Lượng tử · AI · Năng lượng'
      : 'Space · Quantum · AI · Energy';
  const issueLabel = blueprint
    ? `${lang === 'vi' ? 'BẢN THIẾT KẾ' : 'BLUEPRINT'} #${blueprint.issueNumber}`
    : 'ARCHIVE DOSSIER · 2026';
  const summary = blueprint
    ? blueprint.summary[lang]
    : SITE_SEO_META[lang].description;
  const badgeLabel = SITE_SEO_META[lang].speculativeBadge;

  if (formatParam === 'svg') {
    const svg = renderDynamicSciFiSvg({
      title,
      categoryLabel,
      issueLabel,
      summary,
      badgeLabel,
    });
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  }

  const allText = `${SITE_SEO_META.siteName} ${issueLabel} ${categoryLabel.toUpperCase()} ${title} ${summary} ${badgeLabel.toUpperCase()} 1200x630`;

  const [boldFont, regularFont] = await Promise.all([
    loadGoogleFontSubset('Plus+Jakarta+Sans:wght@700', allText),
    loadGoogleFontSubset('Plus+Jakarta+Sans:wght@400', allText),
  ]);

  // If Vietnamese glyphs are needed and custom font failed to load, return dynamic Sci-Fi SVG so text never garbles
  const hasNonAscii = /[^\x20-\x7E]/.test(allText);
  if (hasNonAscii && !boldFont) {
    const svg = renderDynamicSciFiSvg({
      title,
      categoryLabel,
      issueLabel,
      summary,
      badgeLabel,
    });
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
      },
    });
  }

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: 'normal';
  }> = [];

  if (boldFont) {
    fonts.push({
      name: 'PlusJakarta',
      data: boldFont,
      weight: 700,
      style: 'normal',
    });
  }
  if (regularFont) {
    fonts.push({
      name: 'PlusJakarta',
      data: regularFont,
      weight: 400,
      style: 'normal',
    });
  }

  const titleFontSize =
    title.length > 95 ? 36 : title.length > 70 ? 42 : 48;

  try {
    const { ImageResponse } = await import('@vercel/og');
    const element = h(
      'div',
      {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 68px',
          backgroundColor: '#0B0F19',
          backgroundImage:
            'radial-gradient(circle at 88% 16%, rgba(0, 240, 255, 0.16) 0%, transparent 45%), radial-gradient(circle at 12% 88%, rgba(112, 0, 255, 0.22) 0%, transparent 48%), linear-gradient(to right, rgba(0, 240, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.06) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
          color: '#F8FAFC',
          fontFamily: boldFont ? 'PlusJakarta, sans-serif' : 'sans-serif',
          border: '1px solid #1E293B',
        },
      },
      // Top Header Row
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(30, 41, 59, 0.9)',
            paddingBottom: '22px',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            },
          },
          h('div', {
            style: {
              width: '14px',
              height: '14px',
              borderRadius: '3px',
              backgroundColor: '#00F0FF',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.7)',
            },
          }),
          h(
            'span',
            {
              style: {
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: '#00F0FF',
              },
            },
            SITE_SEO_META.siteName
          )
        ),
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: 'rgba(17, 24, 39, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.35)',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#E2E8F0',
            },
          },
          `${issueLabel}  ·  ${categoryLabel.toUpperCase()}`
        )
      ),
      // Main Content Block
      h(
        'div',
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            marginTop: '12px',
            marginBottom: '12px',
          },
        },
        h(
          'div',
          {
            style: {
              fontSize: `${titleFontSize}px`,
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#F8FAFC',
              letterSpacing: '-0.02em',
            },
          },
          title
        ),
        h(
          'div',
          {
            style: {
              fontSize: '21px',
              fontWeight: 400,
              lineHeight: 1.5,
              color: '#94A3B8',
              maxHeight: '96px',
              overflow: 'hidden',
            },
          },
          summary.length > 175 ? `${summary.slice(0, 172).trim()}…` : summary
        )
      ),
      // Bottom Metadata Footer
      h(
        'div',
        {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(30, 41, 59, 0.9)',
            paddingTop: '20px',
          },
        },
        h(
          'span',
          {
            style: {
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#00F0FF',
            },
          },
          badgeLabel.toUpperCase()
        ),
        h(
          'span',
          {
            style: {
              fontSize: '15px',
              fontWeight: 400,
              letterSpacing: '0.1em',
              color: '#64748B',
            },
          },
          'SYSTEMS ARCHITECTURE // 1200×630'
        )
      )
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
      fonts: fonts.length > 0 ? fonts : undefined,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch {
    const svg = renderDynamicSciFiSvg({
      title,
      categoryLabel,
      issueLabel,
      summary,
      badgeLabel,
    });
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
      },
    });
  }
}
