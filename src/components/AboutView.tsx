import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UI_COPY, type Language } from '../data/blueprints';

interface AboutViewProps {
  lang: Language;
  onNavigateHome: () => void;
  onOpenFeaturedBlueprint: () => void;
}

export function AboutView({
  lang,
  onNavigateHome,
  onOpenFeaturedBlueprint,
}: AboutViewProps) {
  const t = UI_COPY[lang];

  return (
    <div className="bg-[#0B0F19]">
      {/* Philosophy Banner */}
      <section
        aria-labelledby="about-page-heading"
        className="border-b border-slate-800/80 bg-[#0D121E]"
      >
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#00F0FF] transition-colors mb-8 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.category.backHome}</span>
          </button>

          <p className="font-mono text-xs text-[#00F0FF] mb-3">
            {t.about.kicker}
          </p>

          <h1
            id="about-page-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-50 leading-[1.15] tracking-tight headline-balance mb-6"
          >
            {t.about.heading}
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-3xl">
            {t.about.lead}
          </p>
        </div>
      </section>

      {/* Manifesto Narrative & 3 Core Principles */}
      <section className="border-b border-slate-800/80">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 space-y-14">
          <div className="max-w-[68ch] space-y-5 text-base sm:text-[1.0625rem] text-slate-300 leading-[1.8]">
            {t.about.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800/80">
            <h2 className="font-display text-2xl font-bold text-slate-50 mb-8">
              {t.about.principlesTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.about.principles.map((principle) => (
                <div
                  key={principle.index}
                  className="bg-[#111827] border border-slate-800/90 rounded-xl p-6 space-y-3"
                >
                  <div className="font-mono text-xs font-semibold text-[#00F0FF] tabular-nums">
                    {principle.index}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-100">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {principle.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={onOpenFeaturedBlueprint}
              className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <span>{t.about.ctaExplore}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
