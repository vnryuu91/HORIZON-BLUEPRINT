import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, Bell, Check, X } from 'lucide-react';
import {
  BLUEPRINTS,
  CATEGORIES,
  UI_COPY,
  type BlueprintItem,
  type CategoryId,
  type Language,
} from '../data/blueprints';
import { ArticleReader } from './ArticleReader';
import { ResilientImage } from './ResilientImage';
import { SpeculativeBadge } from './SpeculativeBadge';

const NOTIFY_STORAGE_KEY = 'horizon_blueprint_notify_v1';

interface CategoryViewProps {
  categoryId: CategoryId;
  lang: Language;
  onChangeLang: (lang: Language) => void;
  focusMode: boolean;
  onToggleFocusMode: () => void;
  onNavigateHome: () => void;
  selectedBlueprintId?: string;
}

export function CategoryView({
  categoryId,
  lang,
  onChangeLang,
  focusMode,
  onToggleFocusMode,
  onNavigateHome,
  selectedBlueprintId,
}: CategoryViewProps) {
  const t = UI_COPY[lang];
  const category =
    CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];

  const categoryItems = BLUEPRINTS.filter((b) => b.category === categoryId);
  const publishedItems = categoryItems.filter((b) => b.status === 'published');
  const inProgressItems = categoryItems.filter(
    (b) => b.status === 'in-progress'
  );

  const [activeArticleId, setActiveArticleId] = useState<string>(
    selectedBlueprintId || publishedItems[0]?.id || ''
  );

  useEffect(() => {
    if (
      selectedBlueprintId &&
      publishedItems.some((b) => b.id === selectedBlueprintId)
    ) {
      setActiveArticleId(selectedBlueprintId);
    } else {
      setActiveArticleId(publishedItems[0]?.id || '');
    }
  }, [categoryId, selectedBlueprintId]);

  const activeArticle =
    publishedItems.find((b) => b.id === activeArticleId) || publishedItems[0];

  // Notification subscriptions persisted in localStorage
  const [subscribedIds, setSubscribedIds] = useState<Record<string, string>>(
    () => {
      try {
        const raw = localStorage.getItem(NOTIFY_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch {
        return {};
      }
    }
  );

  const [notifyTarget, setNotifyTarget] = useState<BlueprintItem | null>(null);
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notifyError, setNotifyError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(NOTIFY_STORAGE_KEY, JSON.stringify(subscribedIds));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [subscribedIds]);

  const handleOpenNotify = (item: BlueprintItem) => {
    setNotifyTarget(item);
    setNotifyEmail(subscribedIds[item.id] || '');
    setNotifyError('');
  };

  const handleConfirmNotify = (e: FormEvent) => {
    e.preventDefault();
    if (!notifyTarget) return;
    const trimmed = notifyEmail.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setNotifyError(t.category.notifyError);
      return;
    }
    setSubscribedIds((prev) => ({ ...prev, [notifyTarget.id]: trimmed }));
    setNotifyTarget(null);
    setNotifyEmail('');
    setNotifyError('');
  };

  return (
    <div className="bg-[#0B0F19]">
      {/* Dedicated Category Banner (Hidden when in Focus Mode) */}
      {!focusMode && (
        <section
          aria-labelledby="category-banner-title"
          className="border-b border-slate-800/80 bg-[#0D121E]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-[#00F0FF] transition-colors mb-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.category.backHome}</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 tabular-nums">
                  <span className="text-[#00F0FF]">
                    {t.home.pillarsKicker} · {category.index}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {publishedItems.length} {t.home.publishedUnit} ·{' '}
                    {inProgressItems.length} {t.home.inProgressUnit}
                  </span>
                </div>

                <h1
                  id="category-banner-title"
                  className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-50 tracking-tight headline-balance"
                >
                  {category.name[lang]}
                </h1>

                <p className="text-base text-slate-300 leading-relaxed max-w-2xl">
                  {category.bannerScope[lang]}
                </p>
              </div>
            </div>

            {/* Optional Published Blueprint Switcher when category grows >1 article */}
            {publishedItems.length > 1 && (
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
                {publishedItems.map((item) => {
                  const isActive = item.id === activeArticle?.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveArticleId(item.id)}
                      className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#00F0FF] text-[#070A12] border-[#00F0FF] font-semibold'
                          : 'bg-[#111827] text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      #{item.issueNumber} · {item.title[lang]}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Ready-to-Read Published Blueprint (e.g. Article #01 inside Space & Quantum) */}
      {activeArticle && (
        <ArticleReader
          blueprint={activeArticle}
          lang={lang}
          onChangeLang={onChangeLang}
          focusMode={focusMode}
          onToggleFocusMode={onToggleFocusMode}
        />
      )}

      {/* In-Progress Blueprints in this Category */}
      {!focusMode && inProgressItems.length > 0 && (
        <section
          aria-labelledby="in-progress-heading"
          className="border-b border-slate-800/80 bg-[#0B0F19]"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
            <div className="mb-8">
              <p className="font-mono text-xs text-[#00F0FF] mb-2">
                {t.category.inProgressBadge}
              </p>
              <h2
                id="in-progress-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight"
              >
                {t.category.inProgressSectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inProgressItems.map((item) => {
                const isSubscribed = Boolean(subscribedIds[item.id]);
                return (
                  <article
                    key={item.id}
                    data-content-type={
                      item.contentOrigin || 'speculative-fiction-ai-assisted'
                    }
                    data-ai-coauthored="true"
                    className="flex flex-col bg-[#111827] border border-slate-800/90 rounded-xl overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0D1320] border-b border-slate-800/80">
                      <ResilientImage
                        src={item.heroImage}
                        alt={item.heroImageAlt[lang]}
                        title={item.title[lang]}
                        className="w-full h-full object-cover"
                        containerClassName="w-full h-full"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-[#111827]/75 via-transparent to-transparent pointer-events-none"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                          <span className="font-mono text-[#00F0FF] tabular-nums">
                            #{item.issueNumber}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-300">
                            {t.category.inProgressBadge}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono">
                            {item.publishedDate[lang]}
                          </span>
                          <SpeculativeBadge lang={lang} />
                        </div>

                        <h3 className="font-display text-xl font-bold text-slate-50 leading-snug mb-3 headline-balance">
                          {item.title[lang]}
                        </h3>

                        <p className="text-sm text-slate-300 leading-relaxed mb-5">
                          {item.summary[lang]}
                        </p>

                        {item.keyPillars && (
                          <div className="bg-[#0B0F19] border border-slate-800/80 rounded-lg p-4">
                            <div className="font-mono text-xs text-slate-400 mb-2.5">
                              {t.category.pillarsLabel}
                            </div>
                            <ul className="space-y-2">
                              {item.keyPillars[lang].map((pillar, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                                >
                                  <span className="font-mono text-xs text-[#00F0FF] mt-0.5 tabular-nums">
                                    0{idx + 1}.
                                  </span>
                                  <span>{pillar}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                        <span className="font-mono text-xs text-slate-400">
                          {item.readTime[lang]}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleOpenNotify(item)}
                          className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                            isSubscribed
                              ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/50'
                              : 'bg-[#0B0F19] text-slate-100 border-slate-700 hover:border-[#00F0FF] hover:text-[#00F0FF]'
                          }`}
                        >
                          {isSubscribed ? (
                            <>
                              <Check className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{t.category.notifiedBtn}</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>{t.category.notifyBtn}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Publication Notification Subscription Modal */}
      {notifyTarget && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notify-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050810]/85 backdrop-blur-sm"
          onClick={() => setNotifyTarget(null)}
        >
          <div
            className="w-full max-w-md bg-[#111827] border border-slate-700/80 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
              <span className="font-mono text-xs text-[#00F0FF]">
                {t.article.issuePrefix} #{notifyTarget.issueNumber}
              </span>
              <button
                type="button"
                onClick={() => setNotifyTarget(null)}
                aria-label={t.category.notifyCancelBtn}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleConfirmNotify} className="p-6 space-y-4">
              <h3
                id="notify-modal-title"
                className="font-display text-lg font-bold text-slate-50 leading-snug"
              >
                {t.category.notifyModalTitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.category.notifyModalDesc}
              </p>

              <div className="text-xs font-medium text-[#00F0FF] bg-[#0B0F19] border border-slate-800 rounded-lg p-3">
                {notifyTarget.title[lang]}
              </div>

              <div>
                <label
                  htmlFor="notify-email-input"
                  className="block text-xs font-medium text-slate-300 mb-1.5"
                >
                  {t.category.notifyEmailLabel}
                </label>
                <input
                  id="notify-email-input"
                  type="email"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder={t.category.notifyEmailPlaceholder}
                  className="w-full px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 bg-[#0B0F19] border border-slate-800 focus:border-[#00F0FF] focus:outline-none rounded-lg transition-colors"
                />
              </div>

              {notifyError && (
                <p role="alert" className="text-xs text-amber-400">
                  {notifyError}
                </p>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setNotifyTarget(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#0B0F19] border border-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  {t.category.notifyCancelBtn}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer"
                >
                  {t.category.notifyConfirmBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
