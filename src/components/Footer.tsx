import type { CategoryKey } from '../data/blueprints';
import type { NavDestination } from './Header';

interface FooterProps {
  onNavigate: (dest: NavDestination, categoryFilter?: CategoryKey) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0B0F19] py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-400">
        <div className="space-y-1">
          <div className="font-display text-sm font-semibold text-slate-200">
            HORIZON BLUEPRINT
          </div>
          <p>Lưu trữ những bản thiết kế cho ngày mai · © 2026</p>
        </div>

        <nav aria-label="Liên kết chân trang" className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => onNavigate('home', 'all')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            Trang chủ
          </button>
          <button
            type="button"
            onClick={() => onNavigate('space-quantum', 'space-quantum')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            Vũ trụ & Lượng tử
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ai-robotics', 'ai-robotics')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            AI & Robot
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            Giới thiệu
          </button>
        </nav>
      </div>
    </footer>
  );
}
