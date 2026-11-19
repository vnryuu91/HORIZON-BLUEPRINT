import { useEffect, useRef, useState } from 'react';
import { Cpu, Sparkles } from 'lucide-react';
import { UI_COPY, type Language } from '../data/blueprints';

interface SpeculativeBadgeProps {
  lang: Language;
  className?: string;
}

export function SpeculativeBadge({
  lang,
  className = '',
}: SpeculativeBadgeProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = UI_COPY[lang].transparency;

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        aria-label={t.badgeTooltip}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#0E1525] border border-amber-400/35 hover:border-[#00F0FF]/60 text-amber-200/95 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
      >
        <Sparkles
          className="w-3 h-3 text-[#00F0FF] shrink-0"
          aria-hidden="true"
        />
        <span>{t.badgeLabel}</span>
      </button>

      {open && (
        <div
          role="tooltip"
          className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 z-50 w-64 sm:w-72 p-3 rounded-lg bg-[#090D18] border border-[#00F0FF]/40 shadow-[0_8px_28px_rgba(0,0,0,0.65)] text-xs text-slate-200 leading-relaxed pointer-events-none"
        >
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#00F0FF] mb-1">
            <Cpu className="w-3 h-3" aria-hidden="true" />
            <span>AI-Assisted Speculative Concept</span>
          </div>
          <p>{t.badgeTooltip}</p>
        </div>
      )}
    </div>
  );
}

interface SpeculativeDisclaimerBoxProps {
  lang: Language;
  className?: string;
}

export function SpeculativeDisclaimerBox({
  lang,
  className = '',
}: SpeculativeDisclaimerBoxProps) {
  const t = UI_COPY[lang].transparency;

  return (
    <aside
      aria-label={t.disclaimerTitle}
      className={`flex items-start gap-3 p-4 rounded-xl bg-[#0D1322] border border-amber-400/30 ${className}`}
    >
      <div className="w-7 h-7 rounded-lg bg-[#111827] border border-[#00F0FF]/30 flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" aria-hidden="true" />
      </div>
      <div className="text-xs sm:text-[0.8125rem] text-slate-300 leading-relaxed">
        <strong className="text-amber-200 font-semibold">
          {t.disclaimerPrefix}
        </strong>{' '}
        <span>{t.disclaimerBody}</span>
      </div>
    </aside>
  );
}
