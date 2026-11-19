import { ArrowDown, ArrowRight } from 'lucide-react';
import {
  BLUEPRINTS,
  CATEGORIES,
  UI_COPY,
  type CategoryId,
  type Language,
} from '../data/blueprints';
import { ResilientImage } from './ResilientImage';
import { SpeculativeBadge } from './SpeculativeBadge';

interface HomeViewProps {
  lang: Language;
  onSelectCategory: (categoryId: CategoryId) => void;
  onOpenBlueprint: (categoryId: CategoryId, blueprintId: string) => void;
}

export function HomeView({
  lang,
  onSelectCategory,
  onOpenBlueprint,
}: HomeViewProps) {
  const t = UI_COPY[lang];
  const latestBlueprint =
    BLUEPRINTS.find((b) => b.status === 'published') || BLUEPRINTS[0];
  const latestCategory = CATEGORIES.find(
    (c) => c.id === latestBlueprint.category
  );

  const scrollToPillars = () => {
    const el = document.getElementById('research-pillars');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      {/* Home Hero Overview */}
      <section
        aria-labelledby="home-hero-title"
        className="border-b border-slate-800/80 bg-[#0B0F19]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-[#00F0FF] mb-4">
                  {t.home.eyebrow}
                </p>

                <h1
                  id="home-hero-title"
                  className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-50 leading-[1.12] headline-balance mb-6"
                >
                  {t.home.heroTitle}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-9">
                  {t.home.heroDesc}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToPillars}
                  className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                >
                  <span>{t.home.exploreCta}</span>
                  <ArrowDown className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onOpenBlueprint(latestBlueprint.category, latestBlueprint.id)
                  }
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-200 bg-[#111827] hover:bg-slate-800 border border-slate-700/80 hover:border-[#00F0FF]/50 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  <span>{t.home.latestCta}</span>
                  <ArrowRight className="w-4 h-4 text-[#00F0FF]" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div className="relative flex-1 min-h-[260px] lg:min-h-[340px] bg-[#111827] border border-slate-800/90 rounded-xl overflow-hidden">
                <ResilientImage
                  src={latestBlueprint.heroImage}
                  alt={latestBlueprint.heroImageAlt[lang]}
                  title={t.brand}
                  className="w-full h-full object-cover lg:absolute lg:inset-0"
                  containerClassName="w-full h-full min-h-[260px]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Research Pillars Section */}
      <section
        id="research-pillars"
        aria-labelledby="pillars-heading"
        className="border-b border-slate-800/80 bg-[#0D121E]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl mb-10">
            <p className="font-mono text-xs text-[#00F0FF] mb-2">
              {t.home.pillarsKicker}
            </p>
            <h2
              id="pillars-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight headline-balance mb-3"
            >
              {t.home.pillarsHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.home.pillarsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => {
              const itemsInCat = BLUEPRINTS.filter(
                (b) => b.category === category.id
              );
              const publishedCount = itemsInCat.filter(
                (b) => b.status === 'published'
              ).length;
              const inProgressCount = itemsInCat.filter(
                (b) => b.status === 'in-progress'
              ).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => onSelectCategory(category.id)}
                  className="group text-left flex flex-col bg-[#111827] border border-slate-800/90 hover:border-[#00F0FF]/60 rounded-xl overflow-hidden transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-800/80 bg-[#0B0F19]">
                    <ResilientImage
                      src={category.coverImage}
                      alt={category.coverAlt[lang]}
                      title={category.name[lang]}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      containerClassName="w-full h-full"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-transparent to-transparent pointer-events-none"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono tabular-nums">
                        <span className="text-[#00F0FF]">{category.index}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {publishedCount > 0
                            ? `${publishedCount} ${t.home.publishedUnit} · ${inProgressCount} ${t.home.inProgressUnit}`
                            : `${inProgressCount} ${t.home.inProgressUnit}`}
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-slate-50 group-hover:text-[#00F0FF] transition-colors mb-2.5">
                        {category.name[lang]}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        {category.shortDescription[lang]}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#00F0FF]">
                      <span>{t.home.openCategory}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Blueprint Compact Teaser */}
      <section
        aria-labelledby="teaser-heading"
        className="border-b border-slate-800/80 bg-[#0B0F19]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="mb-8">
            <p className="font-mono text-xs text-[#00F0FF] mb-2">
              {t.home.teaserKicker}
            </p>
            <h2
              id="teaser-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight"
            >
              {t.home.teaserHeading}
            </h2>
          </div>

          <article
            data-content-type={
              latestBlueprint.contentOrigin || 'speculative-fiction-ai-assisted'
            }
            data-ai-coauthored="true"
            className="bg-[#111827] border border-slate-800/90 rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
                <span className="font-mono font-semibold text-[#00F0FF]">
                  #{latestBlueprint.issueNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-300">
                  {latestCategory?.name[lang]}
                </span>
                <span aria-hidden="true">·</span>
                <time className="tabular-nums">
                  {latestBlueprint.publishedDate[lang]}
                </time>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {latestBlueprint.readTime[lang]}
                </span>
                <SpeculativeBadge lang={lang} />
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-50 leading-snug headline-balance">
                {latestBlueprint.title[lang]}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-2 max-w-3xl">
                {latestBlueprint.summary[lang]}
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                type="button"
                onClick={() =>
                  onOpenBlueprint(latestBlueprint.category, latestBlueprint.id)
                }
                className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              >
                <span>{t.home.teaserCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
