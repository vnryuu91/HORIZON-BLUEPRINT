import { useEffect, useState, type FormEvent } from 'react';
import { MessageSquarePlus, ThumbsUp, Trash2 } from 'lucide-react';
import {
  INITIAL_COMMENTS,
  type ArchitecturalComment,
} from '../data/blueprints';

const STORAGE_KEY = 'horizon_blueprint_comments_v1';

function formatVietnameseTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${day}/${month}/${year} · ${hours}:${minutes}`;
}

export function DiscussionSection() {
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
      // Fallback to initial seeded comments if storage is unavailable
    }
    return INITIAL_COMMENTS;
  });

  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    } catch {
      // Ignore quota errors cleanly
    }
  }, [comments]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedAuthor = author.trim();
    const trimmedContent = content.trim();

    if (!trimmedAuthor || !trimmedContent) {
      setErrorMsg('Vui lòng nhập tên của bạn và nội dung góp ý kiến trúc.');
      return;
    }

    setErrorMsg('');
    const newComment: ArchitecturalComment = {
      id: `comment-${Date.now()}`,
      author: trimmedAuthor,
      role: role.trim() || 'Độc giả & Người đóng góp',
      content: trimmedContent,
      createdAt: formatVietnameseTimestamp(new Date()),
      likes: 0,
      isUserCreated: true,
    };

    setComments((prev) => [newComment, ...prev]);
    setAuthor('');
    setRole('');
    setContent('');
  };

  const handleToggleLike = (id: string) => {
    const alreadyLiked = Boolean(likedIds[id]);
    setLikedIds((prev) => ({ ...prev, [id]: !alreadyLiked }));
    setComments((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: Math.max(0, item.likes + (alreadyLiked ? -1 : 1)) }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setComments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section
      id="discussion"
      aria-labelledby="discussion-heading"
      className="border-b border-slate-800/80 bg-[#0B0F19]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-xs text-[#00F0FF] mb-2">
              Phản biện Kỹ thuật · Lưu trữ Trình duyệt
            </p>
            <h2
              id="discussion-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight"
            >
              Thảo luận & Góp ý Kiến trúc
            </h2>
          </div>
          <span className="font-mono text-xs text-slate-400 tabular-nums">
            {comments.length} ý kiến đóng góp
          </span>
        </div>

        {/* Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-slate-800 rounded-xl p-5 sm:p-6 mb-10 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="comment-author"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Tên hoặc bí danh của bạn *
              </label>
              <input
                id="comment-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Ví dụ: Trần Gia Huy"
                className="w-full px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 bg-[#0B0F19] border border-slate-800 focus:border-[#00F0FF] focus:outline-none rounded-lg transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="comment-role"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Chuyên môn (không bắt buộc)
              </label>
              <input
                id="comment-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Ví dụ: Kỹ sư Nhúng / Vật lý"
                className="w-full px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 bg-[#0B0F19] border border-slate-800 focus:border-[#00F0FF] focus:outline-none rounded-lg transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="comment-content"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Đề xuất, phản biện hoặc câu hỏi về kiến trúc hệ thống *
            </label>
            <textarea
              id="comment-content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Chia sẻ góc nhìn của bạn về tàu mẹ máy chủ lượng tử, truyền tin laser QKD hoặc bầy robot bề mặt..."
              className="w-full px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 bg-[#0B0F19] border border-slate-800 focus:border-[#00F0FF] focus:outline-none rounded-lg transition-colors resize-y"
            />
          </div>

          {errorMsg && (
            <p role="alert" className="text-xs text-amber-400">
              {errorMsg}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <span className="text-xs text-slate-400">
              Bình luận được lưu tự động trong localStorage của trình duyệt.
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
              <span>Gửi góp ý kiến trúc</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        {comments.length === 0 ? (
          <div className="bg-[#111827]/60 border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-sm text-slate-400">
              Chưa có ý kiến thảo luận nào. Hãy là người đầu tiên đóng góp phản biện cho bản thiết kế này.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const isLiked = Boolean(likedIds[comment.id]);
              return (
                <article
                  key={comment.id}
                  className="bg-[#111827]/75 border border-slate-800/90 rounded-xl p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-100">
                        {comment.author}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-0.5">
                        <span>{comment.role}</span>
                        <span aria-hidden="true">·</span>
                        <time className="font-mono tabular-nums">
                          {comment.createdAt}
                        </time>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleLike(comment.id)}
                        aria-pressed={isLiked}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors cursor-pointer tabular-nums ${
                          isLiked
                            ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/50'
                            : 'bg-[#0B0F19] text-slate-400 border-slate-800 hover:text-slate-200'
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{comment.likes}</span>
                      </button>

                      {comment.isUserCreated && (
                        <button
                          type="button"
                          onClick={() => handleDelete(comment.id)}
                          aria-label="Xóa bình luận của bạn"
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg border border-transparent hover:border-slate-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-sm sm:text-[0.9375rem] text-slate-200 leading-relaxed whitespace-pre-line">
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
