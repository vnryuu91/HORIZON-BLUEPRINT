import { useEffect, useState } from 'react';
import { Maximize2, Minimize2, Minus, Plus } from 'lucide-react';
import { FEATURED_BLUEPRINT } from '../data/blueprints';
import { ArchitectureInspector } from './ArchitectureInspector';

interface FeaturedArticleProps {
  focusMode: boolean;
  onToggleFocusMode: () => void;
}

export function FeaturedArticle({
  focusMode,
  onToggleFocusMode,
}: FeaturedArticleProps) {
  const [fontScale, setFontScale] = useState<'base' | 'lg' | 'xl'>('base');
  const [activeSectionId, setActiveSectionId] = useState<string>(
    FEATURED_BLUEPRINT.sections[0].id
  );
  const [readProgress, setReadProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const articleEl = document.getElementById('featured-article');
      if (!articleEl) return;

      const rect = articleEl.getBoundingClientRect();
      const totalHeight = articleEl.offsetHeight - window.innerHeight * 0.6;
      const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.25);
      const progress =
        totalHeight > 0 ? Math.min(100, Math.max(0, (scrolled / totalHeight) * 100)) : 0;
      setReadProgress(Math.round(progress));

      for (const sec of FEATURED_BLUEPRINT.sections) {
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
  }, [focusMode]);

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
    <article
      id="featured-article"
      aria-labelledby="article-main-heading"
      className={
        focusMode
          ? 'min-h-screen bg-[#080B13] transition-colors duration-200'
          : 'border-b border-slate-800/80 bg-[#0B0F19]'
      }
    >
      {/* Focus Mode Compact Floating Top Bar */}
      {focusMode && (
        <div className="sticky top-0 z-50 bg-[#080B13]/95 backdrop-blur-md border-b border-slate-800/90">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-xs font-semibold text-[#00F0FF] shrink-0">
                Tập #01
              </span>
              <span className="text-xs sm:text-sm text-slate-300 truncate">
                {FEATURED_BLUEPRINT.title}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:flex items-center border border-slate-800 rounded-lg bg-[#111827] p-0.5">
                <button
                  type="button"
                  onClick={cycleFontDown}
                  disabled={fontScale === 'base'}
                  aria-label="Giảm cỡ chữ"
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="px-2 font-mono text-xs text-slate-400">Aa</span>
                <button
                  type="button"
                  onClick={cycleFontUp}
                  disabled={fontScale === 'xl'}
                  aria-label="Tăng cỡ chữ"
                  className="p-1.5 text-slate-300 hover:text-white disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <button
                type="button"
                onClick={onToggleFocusMode}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-100 bg-[#111827] hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Minimize2 className="w-3.5 h-3.5 text-[#00F0FF]" aria-hidden="true" />
                <span>Thoát tập trung</span>
              </button>
            </div>
          </div>

          {/* Reading Progress Hairline */}
          <div className="h-[2px] w-full bg-slate-900">
            <div
              className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] transition-transform duration-150 origin-left"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        </div>
      )}

      <div
        className={
          focusMode
            ? 'max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16'
            : 'max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20'
        }
      >
        <div
          className={
            focusMode
              ? 'space-y-12'
              : 'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12'
          }
        >
          {/* Left Sticky Outline & Reading Controls (Hidden in Focus Mode) */}
          {!focusMode && (
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-[#111827]/80 border border-slate-800/90 rounded-xl p-5">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs text-[#00F0FF] font-medium">
                      Mục lục Bản thiết kế
                    </span>
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      {readProgress}%
                    </span>
                  </div>

                  {/* Thin Progress Bar */}
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] transition-all duration-150"
                      style={{ width: `${readProgress}%` }}
                    />
                  </div>

                  <nav aria-label="Mục lục bài viết" className="space-y-1">
                    {FEATURED_BLUEPRINT.sections.map((sec) => {
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
                          <span className="leading-snug">{sec.title}</span>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Reading Tools */}
                  <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Cỡ chữ đọc</span>
                      <div className="flex items-center border border-slate-800 rounded-lg bg-[#0B0F19] p-0.5">
                        <button
                          type="button"
                          onClick={cycleFontDown}
                          disabled={fontScale === 'base'}
                          aria-label="Giảm cỡ chữ"
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
                          aria-label="Tăng cỡ chữ"
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
                      <span>Chế độ đọc tập trung</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Reading Column */}
          <div className={focusMode ? '' : 'lg:col-span-8 xl:col-span-9'}>
            <div className={focusMode ? '' : 'max-w-[68ch]'}>
              {/* Focus Mode Article Header */}
              {focusMode && (
                <header className="mb-12 pb-8 border-b border-slate-800">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 mb-4">
                    <span className="font-mono text-[#00F0FF]">
                      Bản thiết kế #{FEATURED_BLUEPRINT.issueNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{FEATURED_BLUEPRINT.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{FEATURED_BLUEPRINT.readTime}</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-50 leading-tight headline-balance mb-4">
                    {FEATURED_BLUEPRINT.title}
                  </h1>
                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                    {FEATURED_BLUEPRINT.summary}
                  </p>
                </header>
              )}

              {!focusMode && (
                <header className="mb-10 pb-8 border-b border-slate-800/80">
                  <h2
                    id="article-main-heading"
                    className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight mb-3 headline-balance"
                  >
                    Tài liệu Kiến trúc Hệ thống Chi tiết
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-400">
                    <span>{FEATURED_BLUEPRINT.author}</span>
                    <span aria-hidden="true">·</span>
                    <span>{FEATURED_BLUEPRINT.publishedDate}</span>
                  </div>
                </header>
              )}

              {/* Article Sections */}
              <div className="space-y-14">
                {FEATURED_BLUEPRINT.sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-24"
                  >
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="font-mono text-sm font-semibold text-[#00F0FF] tabular-nums">
                        {section.index}.
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-50 tracking-tight headline-balance">
                        {section.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base font-medium text-slate-300/90 mb-6 leading-relaxed">
                      {section.lead}
                    </p>

                    <div className={`space-y-5 text-slate-200/95 ${proseSizeClass}`}>
                      {section.paragraphs.map((paragraph, pIndex) => (
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

                    {/* Pull Quote using hairline top/bottom dividers */}
                    {section.pullQuote && (
                      <blockquote className="my-10 py-6 border-y border-slate-800/90">
                        <p className="font-display text-lg sm:text-xl font-medium text-slate-100 leading-relaxed italic">
                          “{section.pullQuote}”
                        </p>
                      </blockquote>
                    )}

                    {/* Interactive 3-Tier Diagram in Section 02 */}
                    {section.showArchitectureDiagram && (
                      <ArchitectureInspector />
                    )}

                    {/* Structured Tier Highlights */}
                    {section.highlights && (
                      <div className="mt-8 grid grid-cols-1 gap-4">
                        {section.highlights.map((item) => (
                          <div
                            key={item.title}
                            className="bg-[#111827]/70 border border-slate-800/90 rounded-xl p-5"
                          >
                            <h4 className="font-display text-base font-semibold text-[#00F0FF] mb-1.5">
                              {item.title}
                            </h4>
                            <p className="text-sm text-slate-300 leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
