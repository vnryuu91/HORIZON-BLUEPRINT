import { UI_COPY, type Language, type ViewRoute } from '../data/blueprints';

interface FooterProps {
  lang: Language;
  onNavigate: (view: ViewRoute) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = UI_COPY[lang];

  return (
    <footer className="bg-[#0B0F19] py-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-400">
        <div className="space-y-1">
          <div className="font-display text-sm font-semibold text-slate-200">
            {t.brand}
          </div>
          <p>
            {t.slogan} · {t.footer.copyright}
          </p>
        </div>

        <nav
          aria-label={lang === 'vi' ? 'Liên kết chân trang' : 'Footer Navigation'}
          className="flex flex-wrap items-center gap-6"
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.home}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('space-quantum')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.spaceQuantum}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('ai-robotics')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.aiRobotics}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('materials-energy')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.materialsEnergy}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="hover:text-[#00F0FF] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.nav.about}
          </button>
        </nav>
      </div>
    </footer>
  );
}
