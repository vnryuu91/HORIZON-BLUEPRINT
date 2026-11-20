import {
  CATEGORY_SEO_META,
  SITE_SEO_META,
  findBlueprintSeoBySlugOrId,
  type Language,
} from '../src/data/blueprintMeta';

export const config = {
  runtime: 'edge',
};

const SOCIAL_BOT_REGEX =
  /facebookexternalhit|facebot|zalo|twitterbot|telegrambot|linkedinbot|discordbot|slackbot|whatsapp|pinterest|googlebot|bingbot|applebot/i;

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function resolveOrigin(req: Request): string {
  const url = new URL(req.url);
  const forwardedProto = req.headers.get('x-forwarded-proto');
  const forwardedHost = req.headers.get('x-forwarded-host');
  const host = forwardedHost || req.headers.get('host') || url.host;
  const proto = forwardedProto || url.protocol.replace(':', '') || 'https';
  return `${proto}://${host}`;
}

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const origin = resolveOrigin(req);
  const userAgent = req.headers.get('user-agent') || '';
  const isBot = SOCIAL_BOT_REGEX.test(userAgent);

  const postSlug = url.searchParams.get('post') || url.searchParams.get('slug');
  const langParam = url.searchParams.get('lang');
  const lang: Language = langParam === 'en' ? 'en' : 'vi';

  const blueprint = findBlueprintSeoBySlugOrId(postSlug);
  const category = blueprint
    ? CATEGORY_SEO_META.find((c) => c.id === blueprint.category)
    : undefined;

  const pageTitle = blueprint
    ? `${blueprint.title[lang]} — ${SITE_SEO_META.siteName}`
    : SITE_SEO_META[lang].title;
  const pageDescription = blueprint
    ? blueprint.summary[lang]
    : SITE_SEO_META[lang].description;

  const targetUrl = blueprint
    ? `${origin}/?post=${encodeURIComponent(blueprint.slug)}${
        lang === 'en' ? '&lang=en' : ''
      }`
    : `${origin}/${lang === 'en' ? '?lang=en' : ''}`;

  const ogImageUrl = blueprint
    ? `${origin}/api/og-image?post=${encodeURIComponent(blueprint.slug)}&lang=${lang}`
    : `${origin}/api/og-image?lang=${lang}`;

  const ogImageAlt = blueprint
    ? blueprint.heroImageAlt[lang]
    : SITE_SEO_META[lang].title;

  const ogType = blueprint ? 'article' : 'website';

  const structuredData = blueprint
    ? {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: blueprint.title[lang],
        description: blueprint.summary[lang],
        image: ogImageUrl,
        datePublished: blueprint.publishedIso,
        author: {
          '@type': 'Organization',
          name: blueprint.author[lang],
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_SEO_META.siteName,
        },
        articleSection: category?.name[lang] || blueprint.category,
        url: targetUrl,
        inLanguage: lang,
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_SEO_META.siteName,
        url: targetUrl,
        description: pageDescription,
        inLanguage: ['vi', 'en'],
      };

  // Only emit auto-redirect tags for real human browsers; bots read the meta tags directly
  const humanRedirectBlock = isBot
    ? ''
    : `
    <meta http-equiv="refresh" content="0;url=${escapeHtml(targetUrl)}" />
    <script>window.location.replace(${JSON.stringify(targetUrl)});</script>`;

  const html = `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(pageDescription)}" />

    <!-- Open Graph -->
    <meta property="og:site_name" content="${escapeHtml(SITE_SEO_META.siteName)}" />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:locale" content="${lang === 'vi' ? 'vi_VN' : 'en_US'}" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(pageDescription)}" />
    <meta property="og:url" content="${escapeHtml(targetUrl)}" />
    <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />

    <!-- Twitter / X Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(pageDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />

    <link rel="canonical" href="${escapeHtml(targetUrl)}" />
    <meta name="ai-content-declaration" content="speculative-concept-co-created-with-ai" />
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>${humanRedirectBlock}
  </head>
  <body style="margin:0;background:#0B0F19;color:#E2E8F0;font-family:system-ui,-apple-system,sans-serif;display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px;">
    <main style="max-width:640px;border:1px solid #1E293B;border-radius:12px;padding:28px;background:#111827;">
      <p style="margin:0 0 8px;font-family:monospace;font-size:12px;letter-spacing:0.15em;color:#00F0FF;">HORIZON BLUEPRINT</p>
      <h1 style="margin:0 0 12px;font-size:22px;line-height:1.35;color:#F8FAFC;">${escapeHtml(pageTitle)}</h1>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#94A3B8;">${escapeHtml(pageDescription)}</p>
      <a href="${escapeHtml(targetUrl)}" style="display:inline-block;padding:10px 18px;background:#00F0FF;color:#070A12;font-weight:600;font-size:14px;text-decoration:none;border-radius:8px;">
        ${lang === 'vi' ? 'Mở bản thiết kế chi tiết →' : 'Open Blueprint →'}
      </a>
    </main>
  </body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=120, s-maxage=3600, stale-while-revalidate=86400',
      Vary: 'User-Agent',
    },
  });
}
