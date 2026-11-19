import { ArrowDownRight, Maximize2 } from 'lucide-react';
import { FEATURED_BLUEPRINT } from '../data/blueprints';
import { ResilientImage } from './ResilientImage';

interface HeroBlueprintProps {
  onReadFullBlueprint: () => void;
  onOpenFocusMode: () => void;
}

export function HeroBlueprint({
  onReadFullBlueprint,
  onOpenFocusMode,
}: HeroBlueprintProps) {
  return (
    <section
      id="top"
      aria-labelledby="hero-blueprint-title"
      className="border-b border-slate-800/80"
    >
      {/* Editorial Publication Masthead Strip */}
      <div className="border-b border-slate-800/70 bg-[#0D121E]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-2.5 text-slate-300">
            <span className="font-mono font-semibold text-[#00F0FF] tracking-wide">
              HORIZON BLUEPRINT
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-300">
              Lưu trữ những bản thiết kế cho ngày mai
            </span>
          </div>
          <div className="font-mono text-xs text-slate-400 tabular-nums">
            Hồ sơ #01 · Ấn bản Khởi đầu 2026
          </div>
        </div>
      </div>

      {/* Main 2-Column Hero Split */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10 sm:pt-14 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Editorial Headline & Core Abstract */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm text-slate-400 mb-5">
                <span className="font-mono font-medium text-[#00F0FF]">
                  Bài viết #{FEATURED_BLUEPRINT.issueNumber}
                </span>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span className="text-slate-300">
                  {FEATURED_BLUEPRINT.categoryLabel}
                </span>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span className="tabular-nums">
                  {FEATURED_BLUEPRINT.readTime}
                </span>
              </div>

              <h1
                id="hero-blueprint-title"
                className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-slate-50 leading-[1.15] headline-balance mb-6"
              >
                {FEATURED_BLUEPRINT.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                {FEATURED_BLUEPRINT.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={onReadFullBlueprint}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                <span>Đọc toàn bộ bản thiết kế</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenFocusMode}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 bg-[#111827] hover:bg-slate-800 border border-slate-700/80 hover:border-[#7000FF]/70 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              >
                <Maximize2 className="w-4 h-4 text-[#00F0FF]" aria-hidden="true" />
                <span>Chế độ đọc tập trung</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame */}
          <div className="lg:col-span-5 flex flex-col">
            <figure className="flex-1 flex flex-col bg-[#111827] border border-slate-800/90 rounded-xl overflow-hidden">
              <div className="relative flex-1 min-h-[260px] lg:min-h-[340px] overflow-hidden">
                <ResilientImage
                  src={FEATURED_BLUEPRINT.heroImage}
                  alt={FEATURED_BLUEPRINT.heroImageAlt}
                  title={FEATURED_BLUEPRINT.title}
                  className="w-full h-full object-cover lg:absolute lg:inset-0"
                  containerClassName="w-full h-full min-h-[260px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent pointer-events-none"
                />
              </div>
              <figcaption className="px-4 py-3 text-xs text-slate-400 border-t border-slate-800/80 leading-relaxed">
                {FEATURED_BLUEPRINT.heroCaption}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative Architecture Strip */}
        <div className="mt-10 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_BLUEPRINT.metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-[#111827]/70 border border-slate-800/90 rounded-xl p-5"
            >
              <div className="text-xs font-medium text-slate-400 mb-2">
                {metric.label}
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
                {metric.context}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
