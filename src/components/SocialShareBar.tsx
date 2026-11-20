import { useEffect, useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';
import { UI_COPY, type Language } from '../data/blueprints';

interface SocialShareBarProps {
  lang: Language;
  title: string;
  summary?: string;
  slug?: string;
  variant?: 'inline' | 'banner';
}

function buildCanonicalShareUrl(slug: string | undefined, lang: Language): string {
  if (typeof window === 'undefined') return '';
  if (!slug) return window.location.href;
  const url = new URL(window.location.origin + '/');
  url.searchParams.set('post', slug);
  if (lang === 'en') {
    url.searchParams.set('lang', 'en');
  }
  return url.toString();
}

export function SocialShareBar({
  lang,
  title,
  summary = '',
  slug,
  variant = 'inline',
}: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  const t = UI_COPY[lang].share;

  useEffect(() => {
    setShareUrl(buildCanonicalShareUrl(slug, lang));
    setCanNativeShare(
      typeof navigator !== 'undefined' && typeof navigator.share === 'function'
    );
  }, [lang, title, slug]);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      id: 'x',
      label: t.shareOnX,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&hashtags=HorizonBlueprint,FutureTech`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: 'facebook',
      label: t.shareOnFacebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
          aria-hidden="true"
        >
          <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.7V14h2.7v8h3.1z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      label: t.shareOnLinkedIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
          aria-hidden="true"
        >
          <path d="M6.94 8.5H3.56V19.5H6.94V8.5ZM5.25 3.5C4.14 3.5 3.25 4.39 3.25 5.5C3.25 6.6 4.14 7.5 5.25 7.5C6.35 7.5 7.25 6.6 7.25 5.5C7.25 4.39 6.35 3.5 5.25 3.5ZM20.44 13.02C20.44 9.88 18.76 8.22 16.16 8.22C14.37 8.22 13.48 9.2 13.02 9.93V8.5H9.65C9.7 9.48 9.65 19.5 9.65 19.5H13.02V13.36C13.02 13.02 13.05 12.69 13.15 12.45C13.42 11.78 14.03 11.09 15.07 11.09C16.41 11.09 17.06 12.11 17.06 13.6V19.5H20.44V13.02Z" />
        </svg>
      ),
    },
    {
      id: 'telegram',
      label: t.shareOnTelegram,
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 fill-current"
          aria-hidden="true"
        >
          <path d="M19.89 4.35a1.25 1.25 0 0 0-1.3-.18L3.7 10.67a1.1 1.1 0 0 0 .08 2.06l3.7 1.22 1.4 4.49a1.05 1.05 0 0 0 1.74.43l2.14-2.1 3.74 2.75a1.2 1.2 0 0 0 1.88-.7l2.58-13.2a1.25 1.25 0 0 0-.07-1.27ZM9.74 14.23l-.3 2.76-.88-2.83 8.18-5.57-7 5.64Z" />
        </svg>
      ),
    },
  ];

  const handleCopyLink = async () => {
    const urlToCopy = buildCanonicalShareUrl(slug, lang);
    try {
      await navigator.clipboard.writeText(urlToCopy);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = urlToCopy;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({
        title,
        text: summary || title,
        url: buildCanonicalShareUrl(slug, lang),
      });
    } catch {
      // User dismissed native share sheet
    }
  };

  const iconButtonClass =
    'inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#111827]/70 backdrop-blur-md border border-slate-700/80 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_12px_rgba(0,240,255,0.28)] transition-all duration-150 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]';

  const buttonsContent = (
    <div className="flex flex-wrap items-center gap-2">
      {shareLinks.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
          className={iconButtonClass}
        >
          {item.icon}
        </a>
      ))}

      {/* Copy Link Button with 2s Toast Tooltip */}
      <div className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleCopyLink}
          aria-label={t.copyLink}
          title={t.copyLink}
          className={`inline-flex items-center justify-center w-9 h-9 rounded-lg backdrop-blur-md border transition-all duration-150 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
            copied
              ? 'bg-emerald-500/15 border-emerald-400/70 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.25)]'
              : 'bg-[#111827]/70 border-slate-700/80 text-slate-300 hover:text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_12px_rgba(0,240,255,0.28)]'
          }`}
        >
          {copied ? (
            <Check className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Link2 className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {copied && (
          <div
            role="status"
            aria-live="polite"
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#090D18] border border-emerald-400/60 text-emerald-300 font-mono text-[11px] whitespace-nowrap shadow-lg pointer-events-none z-50"
          >
            {t.copiedToast}
          </div>
        )}
      </div>

      {/* Native Mobile Web Share API */}
      {canNativeShare && (
        <button
          type="button"
          onClick={handleNativeShare}
          aria-label={t.moreShare}
          title={t.moreShare}
          className="inline-flex items-center gap-1.5 px-3 h-9 rounded-lg bg-[#111827]/70 backdrop-blur-md border border-slate-700/80 text-xs font-medium text-slate-200 hover:text-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_12px_rgba(0,240,255,0.28)] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
        >
          <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{t.moreShare}</span>
        </button>
      )}
    </div>
  );

  if (variant === 'banner') {
    return (
      <div
        aria-label={t.heading}
        className="mt-12 bg-[#0D1322]/80 backdrop-blur-md border border-slate-800/90 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2.5">
          <Share2 className="w-4 h-4 text-[#00F0FF] shrink-0" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-semibold text-slate-200">
            {t.heading}
          </span>
        </div>
        {buttonsContent}
      </div>
    );
  }

  return (
    <div
      aria-label={t.heading}
      className="inline-flex flex-wrap items-center gap-3 px-3.5 py-2 rounded-xl bg-[#0D1322]/75 backdrop-blur-md border border-slate-800/90"
    >
      <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
        {t.heading}
      </span>
      {buttonsContent}
    </div>
  );
}
