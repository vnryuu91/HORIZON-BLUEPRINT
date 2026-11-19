import { useEffect, useState, type FormEvent } from 'react';
import {
  AlertTriangle,
  MessageSquarePlus,
  Orbit,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import {
  UI_COPY,
  type ArchitecturalComment,
  type Language,
} from '../data/blueprints';
import {
  MAX_CONTRIBUTION_LENGTH,
  MIN_CONTRIBUTION_LENGTH,
  moderateContribution,
} from '../utils/moderation';

const STORAGE_KEY = 'horizon_blueprint_contributions_v1';

function formatTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${day}/${month}/${year} · ${hours}:${minutes}`;
}

interface DiscussionSectionProps {
  lang: Language;
}

export function DiscussionSection({ lang }: DiscussionSectionProps) {
  const t = UI_COPY[lang].discussion;

  // Load strictly real user contributions from localStorage (zero hardcoded mock data)
  const [comments, setComments] = useState<ArchitecturalComment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Fallback cleanly to empty list if localStorage is unavailable
    }
    return [];
  });

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [errorReason, setErrorReason] = useState<
    null | 'too_short' | 'too_long' | 'sensitive_or_unsafe'
  >(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch {
      // Ignore quota errors cleanly
    }
  }, [comments]);

  const trimmedLength = content.trim().length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    const moderation = moderateContribution(trimmedAuthor, trimmedContent);
    if (!moderation.ok) {
      setErrorReason(moderation.reason);
      return;
    }

    setErrorReason(null);
    const isAnonymous = trimmedAuthor.length === 0;

    const newContribution: ArchitecturalComment = {
      id: `contrib-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      author: isAnonymous ? '' : trimmedAuthor,
      isAnonymous,
      content: trimmedContent,
      createdAt: formatTimestamp(new Date()),
    };

    setComments((prev) => [newContribution, ...prev]);
    setAuthor('');
    setContent('');
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  const errorMessage =
    errorReason === 'sensitive_or_unsafe'
      ? t.moderationError
      : errorReason === 'too_short' || errorReason === 'too_long'
        ? t.lengthError
        : null;

  return (
    <section
      id="discussion"
      aria-labelledby="discussion-heading"
      className="border-b border-slate-800/80 bg-[#0B0F19]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs text-[#00F0FF] mb-2">{t.kicker}</p>
            <h2
              id="discussion-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight"
            >
              {t.heading}
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            {comments.length} {t.countSuffix}
          </span>
        </div>

        {/* Submission Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 mb-10 space-y-4"
        >
          <div>
            <label
              htmlFor="comment-author"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              {t.authorLabel}
            </label>
            <input
              id="comment-author"
              type="text"
              maxLength={80}
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                if (errorReason) setErrorReason(null);
              }}
              placeholder={t.authorPlaceholder}
              className="w-full px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 bg-[#0B0F19] border border-slate-800 focus:border-[#00F0FF] focus:outline-none rounded-lg transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label
                htmlFor="comment-content"
                className="block text-xs font-medium text-slate-300"
              >
                {t.contentLabel}
              </label>
              <span
                className={`font-mono text-xs tabular-nums ${
                  trimmedLength > MAX_CONTRIBUTION_LENGTH
                    ? 'text-amber-400'
                    : trimmedLength >= MIN_CONTRIBUTION_LENGTH
                      ? 'text-[#00F0FF]'
                      : 'text-slate-500'
                }`}
              >
                {trimmedLength} / {MAX_CONTRIBUTION_LENGTH}
              </span>
            </div>
            <textarea
              id="comment-content"
              rows={4}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errorReason) setErrorReason(null);
              }}
              placeholder={t.contentPlaceholder}
              className="w-full px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 bg-[#0B0F19] border border-slate-800 focus:border-[#00F0FF] focus:outline-none rounded-lg transition-colors resize-y"
            />
          </div>

          {/* Bilingual Moderation / Length Warning */}
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2.5 p-3.5 rounded-lg bg-amber-950/35 border border-amber-500/40 text-amber-200 text-xs sm:text-sm leading-relaxed"
            >
              <AlertTriangle
                className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="inline-flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck
                className="w-4 h-4 text-[#00F0FF] shrink-0"
                aria-hidden="true"
              />
              <span>{t.storageNote}</span>
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
              <span>{t.submitBtn}</span>
            </button>
          </div>
        </form>

        {/* Empty State vs. Real User Contributions */}
        {comments.length === 0 ? (
          <div className="relative bg-[#0D1322] border border-slate-800/90 rounded-xl p-8 sm:p-10 text-center overflow-hidden">
            <div
              aria-hidden="true"
              className="w-10 h-10 mx-auto mb-4 rounded-lg bg-[#111827] border border-slate-800 flex items-center justify-center"
            >
              <Orbit className="w-5 h-5 text-[#00F0FF]/80" />
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-md mx-auto">
              {t.emptyState}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const displayName =
                comment.isAnonymous || !comment.author
                  ? t.anonymousName
                  : comment.author;

              return (
                <article
                  key={comment.id}
                  className="bg-[#111827]/80 border border-slate-800/90 rounded-xl p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800/70">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-sm font-semibold text-slate-100">
                        {displayName}
                      </h3>
                      <span aria-hidden="true" className="text-slate-600">
                        ·
                      </span>
                      <time className="font-mono text-xs text-slate-400 tabular-nums">
                        {comment.createdAt}
                      </time>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(comment.id)}
                      aria-label={t.deleteAria}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-rose-300 bg-[#0B0F19] border border-slate-800 hover:border-rose-500/40 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.deleteLabel}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-[0.9375rem] text-slate-200 leading-relaxed whitespace-pre-line break-words">
                    {comment.content}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
