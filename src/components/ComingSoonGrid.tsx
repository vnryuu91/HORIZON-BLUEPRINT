import { useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import {
  UPCOMING_BLUEPRINTS,
  type CategoryKey,
  type UpcomingBlueprint,
} from '../data/blueprints';
import { ResilientImage } from './ResilientImage';

interface ComingSoonGridProps {
  selectedCategory: CategoryKey;
  onSelectCategory: (cat: CategoryKey) => void;
}

const FILTER_TABS: { key: CategoryKey; label: string }[] = [
  { key: 'all', label: 'Tất cả bản thiết kế' },
  { key: 'space-quantum', label: 'Vũ trụ & Lượng tử' },
  { key: 'ai-robotics', label: 'AI & Robot' },
];

export function ComingSoonGrid({
  selectedCategory,
  onSelectCategory,
}: ComingSoonGridProps) {
  const [previewItem, setPreviewItem] = useState<UpcomingBlueprint | null>(null);

  const visibleItems =
    selectedCategory === 'all'
      ? UPCOMING_BLUEPRINTS
      : UPCOMING_BLUEPRINTS.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="upcoming-blueprints"
      aria-labelledby="upcoming-heading"
      className="border-b border-slate-800/80 bg-[#0B0F19]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Section Header + Category Filter Segmented Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs text-[#00F0FF] mb-2">
              Hồ sơ Sắp Ra Mắt
            </p>
            <h2
              id="upcoming-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight headline-balance"
            >
              Các Bản Thiết Kế Tiếp Theo Trong Hàng Đợi
            </h2>
          </div>

          <div
            role="group"
            aria-label="Lọc theo chuyên mục"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#111827] border border-slate-800 rounded-lg self-start md:self-auto"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onSelectCategory(tab.key)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                    isActive
                      ? 'bg-[#00F0FF] text-[#070A12] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col bg-[#111827] border border-slate-800/90 hover:border-slate-700 rounded-xl overflow-hidden transition-colors"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#0D1320] border-b border-slate-800/80">
                <ResilientImage
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  title={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  containerClassName="w-full h-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent pointer-events-none"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="font-mono text-[#00F0FF] tabular-nums">
                      #{item.issueNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-300">Sắp ra mắt</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-100 leading-snug mb-3 headline-balance">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300/90 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-slate-400">
                    {item.estimatedRelease}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewItem(item)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00F0FF] hover:text-[#66F6FF] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded"
                  >
                    <span>Xem đề cương</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Preview Modal for Coming Soon Blueprints */}
      {previewItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050810]/85 backdrop-blur-sm"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="w-full max-w-xl bg-[#111827] border border-slate-700/80 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="font-mono text-[#00F0FF]">
                  Bản thiết kế #{previewItem.issueNumber}
                </span>
                <span aria-hidden="true">·</span>
                <span>{previewItem.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{previewItem.estimatedRelease}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                aria-label="Đóng hộp thoại"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <h3
                id="preview-modal-title"
                className="font-display text-xl font-bold text-slate-50 leading-snug headline-balance"
              >
                {previewItem.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {previewItem.summary}
              </p>

              <div className="bg-[#0B0F19] border border-slate-800 rounded-lg p-4">
                <h4 className="font-mono text-xs text-[#00F0FF] mb-3">
                  Các trụ cột kỹ thuật dự kiến triển khai
                </h4>
                <ul className="space-y-2.5">
                  {previewItem.keyPillars.map((pillar, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-slate-300"
                    >
                      <span className="font-mono text-xs text-slate-500 mt-0.5 tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                <span>Thời lượng đọc dự kiến: {previewItem.readTimeEstimate}</span>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer"
                >
                  Đóng đề cương
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
