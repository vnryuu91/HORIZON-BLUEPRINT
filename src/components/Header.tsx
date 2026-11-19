import { useState } from 'react';
import { Menu, X, Maximize2 } from 'lucide-react';
import type { CategoryKey } from '../data/blueprints';

export type NavDestination = 'home' | 'space-quantum' | 'ai-robotics' | 'about';

interface HeaderProps {
  activeNav: NavDestination;
  onNavigate: (dest: NavDestination, categoryFilter?: CategoryKey) => void;
  onToggleFocusMode: () => void;
}

const NAV_ITEMS: { key: NavDestination; label: string; filter?: CategoryKey }[] = [
  { key: 'home', label: 'Trang chủ', filter: 'all' },
  { key: 'space-quantum', label: 'Vũ trụ & Lượng tử', filter: 'space-quantum' },
  { key: 'ai-robotics', label: 'AI & Robot', filter: 'ai-robotics' },
  { key: 'about', label: 'Giới thiệu' },
];

export function Header({ activeNav, onNavigate, onToggleFocusMode }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (item: (typeof NAV_ITEMS)[number]) => {
    onNavigate(item.key, item.filter);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/92 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home', 'all');
          }}
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-slate-100 hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded"
        >
          HORIZON BLUEPRINT
        </a>

        {/* Zone 2: 4 Single-line Nav Links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`relative py-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded ${
                  isActive
                    ? 'text-[#00F0FF]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#00F0FF]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleFocusMode}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Chế độ tập trung</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-800 text-slate-200 hover:text-[#00F0FF] hover:border-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/80 bg-[#0B0F19] px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#111827] text-[#00F0FF] border border-slate-800'
                    : 'text-slate-300 hover:bg-[#111827]/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleFocusMode();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#070A12] bg-[#00F0FF] hover:bg-[#33F3FF] rounded-lg transition-colors cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" aria-hidden="true" />
              <span>Chế độ đọc tập trung</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
