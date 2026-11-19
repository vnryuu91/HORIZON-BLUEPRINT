import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UI_COPY, type Language, type ViewRoute } from '../data/blueprints';

interface HeaderProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  activeView: ViewRoute;
  onNavigate: (view: ViewRoute) => void;
}

export function Header({
  lang,
  onChangeLang,
  activeView,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_COPY[lang];

  const navItems: { key: ViewRoute; label: string }[] = [
    { key: 'home', label: t.nav.home },
    { key: 'space-quantum', label: t.nav.spaceQuantum },
    { key: 'ai-robotics', label: t.nav.aiRobotics },
    { key: 'materials-energy', label: t.nav.materialsEnergy },
    { key: 'about', label: t.nav.about },
  ];

  const handleNavClick = (view: ViewRoute) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/92 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-100 hover:text-[#00F0FF] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded"
        >
          {t.brand}
        </a>

        {/* Zone 2: 5 Multi-View Nav Links */}
        <nav
          aria-label={lang === 'vi' ? 'Điều hướng chính' : 'Primary Navigation'}
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300"
        >
          {navItems.map((item) => {
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item.key)}
                aria-current={isActive ? 'page' : undefined}
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

        {/* Zone 3: Prominent VI | EN Switcher + Mobile/Tablet Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label={lang === 'vi' ? 'Chọn ngôn ngữ' : 'Language switcher'}
            className="inline-flex items-center p-0.5 bg-[#111827] border border-slate-700/80 rounded-lg"
          >
            <button
              type="button"
              onClick={() => onChangeLang('vi')}
              aria-pressed={lang === 'vi'}
              className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                lang === 'vi'
                  ? 'bg-[#00F0FF] text-[#070A12]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              VI
            </button>
            <button
              type="button"
              onClick={() => onChangeLang('en')}
              aria-pressed={lang === 'en'}
              className={`px-3 py-1.5 font-mono text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] ${
                lang === 'en'
                  ? 'bg-[#00F0FF] text-[#070A12]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen
                ? lang === 'vi'
                  ? 'Đóng menu'
                  : 'Close menu'
                : lang === 'vi'
                  ? 'Mở menu'
                  : 'Open menu'
            }
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-800 text-slate-200 hover:text-[#00F0FF] hover:border-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-[#0B0F19] px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleNavClick(item.key)}
                aria-current={isActive ? 'page' : undefined}
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
        </div>
      )}
    </header>
  );
}
