import { useEffect, useState } from 'react';
import { Maximize2, Minimize2, Minus, Plus } from 'lucide-react';
import {
  CATEGORIES,
  UI_COPY,
  type BlueprintItem,
  type Language,
} from '../data/blueprints';
import { ArchitectureInspector } from './ArchitectureInspector';
import { LayeredMeshDiagram } from './LayeredMeshDiagram';
import { DiscussionSection } from './DiscussionSection';
import { ResilientImage } from './ResilientImage';
import {
  SpeculativeBadge,
  SpeculativeDisclaimerBox,
} from './SpeculativeBadge';
import { SocialShareBar } from './SocialShareBar';

interface ArticleReaderProps {
  blueprint: BlueprintItem;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  focusMode: boolean;
  onToggleFocusMode: () => void;
}

export function ArticleReader({
  blueprint,
  lang,
  onChangeLang,
  focusMode,
  onToggleFocusMode,
}: ArticleReaderProps) {
  const sections = blueprint.sections || [];
  const [fontScale, setFontScale] = useState<'base' | 'lg' | 'xl'>('base');
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[0]?.id || ''
  );
  const [readProgress, setReadProgress] = useState<number>(0);

  const t = UI_COPY[lang];
  const categoryMeta = CATEGORIES.find((c) => c.id === blueprint.category);

  useEffect(() => {
    const handleScroll = () => {
      const articleEl = document.getElementById('active-blueprint-article');
      if (!articleEl) return;

      const rect = articleEl.getBoundingClientRect();
      const totalHeight = articleEl.offsetHeight - window.innerHeight * 0.6;
      const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.25);
      const progress =
        totalHeight > 0
          ? Math.min(100, Math.max(0, (scrolled / totalHeight) * 100))
          : 0;
      setReadProgress(Math.round(progress));

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const secRect = el.getBoundingClientRect();
          if (secRect.top <= 180) {
            setActiveSectionId(sec.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [focusMode, sections]);

  useEffect(() => {
    if (!focusMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onToggleFocusMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusMode, onToggleFocusMode]);

  const cycleFontDown = () => {
    setFontScale((prev) => (prev === 'xl' ? 'lg' : 'base'));
  };

  const cycleFontUp = () => {
    setFontScale((prev) => (prev === 'base' ? 'lg' : 'xl'));
  };

  const proseSizeClass =
    fontScale === 'xl'
      ? 'text-[1.1875rem] leading-[1.85]'
      : fontScale === 'lg'
        ? 'text-[1.09375rem] leading-[1.8]'
        : 'text-base sm:text-[1.03125rem] leading-[1.78]';

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      id="active-blueprint-article"
      data-content-type={
        blueprint.contentOrigin || 'speculative-fiction-ai-assisted'
      }
      data-ai-coauthored="true"
      className={
        focusMode
          ? 'min-h-screen bg-[#080B13] transition-colors duration-200'
          : 'bg-[#0B0F19]'
      }
    >
      {/* Focus Mode Compact Floating Top Bar */}
      {focusMode && (
        <div className="sticky top-0 z-50 bg-[#080B13]/95 backdrop-blur-md border-b border-slate-800/90">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs font-semibold text-[#00F0FF] shrink-0">
                {t.article.focusTag} #{blueprint.issueNumber}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 truncate">
                {blueprint.title[lang]}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="inline-flex items-center p-0.5 bg-[#111827] border border-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => onChangeLang('vi')}
                  className={`px-2 py-1 font-mono text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                    lang === 'vi'
                      ? 'bg-[#00F0FF] text-[#070A12]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  VI
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLang('en')}
                  className={`px-2 py-1 font-mono text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-[#00F0FF] text-[#070A12]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <div className="hidden sm:flex items-center border border-slate-800 rounded-lg bg-[#111827] p-0.5">
                <button
                  type="button"
                  onClick={cycleFontDown}
                  disabled={fontScale === 'base'}
                  aria-label={t.article.decreaseFont}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="px-2 font-mono text-xs text-slate-400">Aa</span>
                <button
                  type="button"
                  onClick={cycleFontUp}
                  disabled={fontScale === 'xl'}
                  aria-label={t.article.increaseFont}
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={onToggleFocusMode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-100 bg-[#111827] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Minimize2 className="w-3.5 h-3.5 text-[#00F0FF]" aria-hidden="true" />
                <span>{t.article.focusExit}</span>
              </button>
            </div>
          </div>

          <div className="h-[2px] w-full bg-slate-900">
            <div
              className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] transition-all duration-150"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Article Overview Header & Metrics (Shown inside Category View above full prose) */}
      {!focusMode && (
        <div className="border-b border-slate-800/80">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-400 mb-4">
                    <span className="font-mono font-semibold text-[#00F0FF]">
                      {t.article.issuePrefix} #{blueprint.issueNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">
                      {categoryMeta?.name[lang]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {blueprint.publishedDate[lang]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {blueprint.readTime[lang]}
                    </span>
                    <SpeculativeBadge lang={lang} />
                  </div>

                  <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 leading-[1.16] headline-balance mb-5">
                    {blueprint.title[lang]}
                  </h2>

                  <SpeculativeDisclaimerBox lang={lang} className="mb-5" />

                  <p className="text-base text-slate-300 leading-relaxed max-w-2xl mb-6">
                    {blueprint.summary[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={onToggleFocusMode}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <Maximize2 className="w-4 h-4" aria-hidden="true" />
                    <span>{t.article.focusEnter}</span>
                  </button>

                  <SocialShareBar
                    lang={lang}
                    title={blueprint.title[lang]}
                    summary={blueprint.summary[lang]}
                    variant="inline"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col">
                <figure className="flex-1 flex flex-col bg-[#111827] border border-slate-800/90 rounded-xl overflow-hidden">
                  <div className="relative flex-1 min-h-[240px] lg:min-h-[300px] overflow-hidden">
                    <ResilientImage
                      src={blueprint.heroImage}
                      alt={blueprint.heroImageAlt[lang]}
                      title={blueprint.title[lang]}
                      className="w-full h-full object-cover lg:absolute lg:inset-0"
                      containerClassName="w-full h-full min-h-[240px]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/75 via-transparent to-transparent pointer-events-none"
                    />
                  </div>
                  {blueprint.heroCaption && (
                    <figcaption className="px-4 py-3 text-xs text-slate-400 border-t border-slate-800/80 leading-relaxed">
                      {blueprint.heroCaption[lang]}
                    </figcaption>
                  )}
                </figure>
              </div>
            </div>

            {blueprint.metrics && blueprint.metrics.length > 0 && (
              <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {blueprint.metrics.map((metric) => (
                  <div
                    key={metric.label.en}
                    className="bg-[#111827]/70 border border-slate-800/90 rounded-xl p-5"
                  >
                    <div className="text-xs font-medium text-slate-400 mb-2">
                      {metric.label[lang]}
                    </div>
                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="font-mono text-2xl sm:text-3xl font-semibold text-slate-50 tabular-nums">
                        {metric.value}
                      </span>
                      <span className="font-mono text-xs text-[#00F0FF] uppercase">
                        {metric.unit}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">
                      {metric.context[lang]}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Long-Form Reading Canvas */}
      <article
        aria-labelledby="article-main-heading"
        data-content-type={
          blueprint.contentOrigin || 'speculative-fiction-ai-assisted'
        }
        data-ai-coauthored="true"
        className={
          focusMode
            ? 'max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16'
            : 'max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-slate-800/80'
        }
      >
        <div
          className={
            focusMode
              ? 'space-y-12'
              : 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12'
          }
        >
          {/* Sticky TOC & Reading Controls */}
          {!focusMode && (
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-[#111827]/80 border border-slate-800/90 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs text-[#00F0FF] font-medium">
                      {t.article.tocTitle}
                    </span>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {readProgress}%
                    </span>
                  </div>

                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] transition-all duration-150"
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>

                  <nav aria-label={t.article.tocTitle} className="space-y-1">
                    {sections.map((sec) => {
                      const isActive = activeSectionId === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors flex items-start gap-2.5 cursor-pointer ${
                            isActive
                              ? 'bg-[#0B1221] text-[#00F0FF] border border-slate-800'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          <span className="font-mono text-xs mt-0.5 shrink-0 tabular-nums">
                            {sec.index}.
                          </span>
                          <span className="leading-snug">{sec.title[lang]}</span>
                        </button>
                      );
                    })}
                  </nav>

                  <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        {t.article.fontSizeLabel}
                      </span>
                      <div className="flex items-center border border-slate-800 rounded-lg bg-[#0B0F19] p-0.5">
                        <button
                          type="button"
                          onClick={cycleFontDown}
                          disabled={fontScale === 'base'}
                          aria-label={t.article.decreaseFont}
                          className="p-1.5 text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="px-2 font-mono text-xs text-slate-400">
                          Aa
                        </span>
                        <button
                          type="button"
                          onClick={cycleFontUp}
                          disabled={fontScale === 'xl'}
                          aria-label={t.article.increaseFont}
                          className="p-1.5 text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onToggleFocusMode}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-100 bg-[#0B0F19] hover:bg-slate-800 border border-slate-700/80 hover:border-[#00F0FF]/60 rounded-lg transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#00F0FF]" aria-hidden="true" />
                      <span>{t.article.focusEnter}</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Reading Column */}
          <div className={focusMode ? '' : 'lg:col-span-8 xl:col-span-9'}>
            <div className={focusMode ? '' : 'max-w-[68ch]'}>
              {focusMode ? (
                <header className="mb-12 pb-8 border-b border-slate-800">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 mb-4">
                    <span className="font-mono text-[#00F0FF]">
                      {t.article.issuePrefix} #{blueprint.issueNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{categoryMeta?.name[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">
                      {blueprint.readTime[lang]}
                    </span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-50 leading-tight headline-balance mb-4">
                    {blueprint.title[lang]}
                  </h1>
                  <SpeculativeDisclaimerBox lang={lang} className="mb-5" />
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {blueprint.summary[lang]}
                  </p>
                </header>
              ) : (
                <header className="mb-10 pb-8 border-b border-slate-800/80">
                  <h3
                    id="article-main-heading"
                    className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight mb-3 headline-balance"
                  >
                    {t.article.documentHeading}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <span>{blueprint.author[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{blueprint.publishedDate[lang]}</span>
                  </div>
                </header>
              )}

              <div className="space-y-14">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-mono text-sm font-semibold text-[#00F0FF] tabular-nums">
                        {section.index}.
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-bold text-slate-50 tracking-tight headline-balance">
                        {section.title[lang]}
                      </h4>
                    </div>

                    <p className="text-sm sm:text-base font-medium text-slate-300/90 mb-6 leading-relaxed">
                      {section.lead[lang]}
                    </p>

                    <div className={`space-y-5 text-slate-200/95 ${proseSizeClass}`}>
                      {section.paragraphs[lang].map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className={
                            section.index === '01' && pIndex === 0
                              ? 'first-letter:font-display first-letter:text-4xl first-letter:font-bold first-letter:text-[#00F0FF] first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                              : ''
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.pullQuote && (
                      <blockquote className="my-10 py-6 border-y border-slate-800/90">
                        <p className="font-display text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic">
                          “{section.pullQuote[lang]}”
                        </p>
                      </blockquote>
                    )}

                    {section.showArchitectureDiagram && (
                      <LayeredMeshDiagram lang={lang} />
                    )}

                    {section.showArchitectureDiagram && blueprint.tiers && (
                      <ArchitectureInspector lang={lang} tiers={blueprint.tiers} />
                    )}

                    {section.highlights && (
                      <div className="mt-8 grid grid-cols-1 gap-4">
                        {section.highlights.map((item) => (
                          <div
                            key={item.title.en}
                            className="bg-[#111827]/70 border border-slate-800/90 rounded-xl p-5"
                          >
                            <h5 className="font-display text-base font-semibold text-[#00F0FF] mb-1.5">
                              {item.title[lang]}
                            </h5>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {item.detail[lang]}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              <SocialShareBar
                lang={lang}
                title={blueprint.title[lang]}
                summary={blueprint.summary[lang]}
                variant="banner"
              />
            </div>
          </div>
        </div>
      </article>

      {/* Architectural Discussion at bottom of article */}
      <DiscussionSection lang={lang} />
    </div>
  );
}
