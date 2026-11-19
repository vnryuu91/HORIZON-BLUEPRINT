import { useEffect, useState } from 'react';
import type { CategoryId, Language, ViewRoute } from './data/blueprints';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { AboutView } from './components/AboutView';
import { Footer } from './components/Footer';

const LANG_STORAGE_KEY = 'horizon_blueprint_lang_v1';

const VALID_VIEWS: ViewRoute[] = [
  'home',
  'space-quantum',
  'ai-robotics',
  'materials-energy',
  'about',
];

function parseHashRoute(): ViewRoute {
  const hash = window.location.hash.replace(/^#\/?/, '') as ViewRoute;
  return VALID_VIEWS.includes(hash) ? hash : 'home';
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return saved === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const [activeView, setActiveView] = useState<ViewRoute>(() => parseHashRoute());
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<
    string | undefined
  >(undefined);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors cleanly
    }
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHashRoute();
      setActiveView(next);
      setFocusMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: ViewRoute, blueprintId?: string) => {
    setFocusMode(false);
    setActiveView(view);
    setSelectedBlueprintId(blueprintId);
    const targetHash = `#/${view}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBlueprint = (categoryId: CategoryId, blueprintId: string) => {
    navigateTo(categoryId, blueprintId);
  };

  const handleToggleFocusMode = () => {
    setFocusMode((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
        });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] flex flex-col">
      {!focusMode && (
        <Header
          lang={lang}
          onChangeLang={setLang}
          activeView={activeView}
          onNavigate={(view) => navigateTo(view)}
        />
      )}

      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            lang={lang}
            onSelectCategory={(cat) => navigateTo(cat)}
            onOpenBlueprint={handleOpenBlueprint}
          />
        )}

        {(activeView === 'space-quantum' ||
          activeView === 'ai-robotics' ||
          activeView === 'materials-energy') && (
          <CategoryView
            categoryId={activeView}
            lang={lang}
            onChangeLang={setLang}
            focusMode={focusMode}
            onToggleFocusMode={handleToggleFocusMode}
            onNavigateHome={() => navigateTo('home')}
            selectedBlueprintId={selectedBlueprintId}
          />
        )}

        {activeView === 'about' && (
          <AboutView
            lang={lang}
            onNavigateHome={() => navigateTo('home')}
            onOpenFeaturedBlueprint={() =>
              navigateTo('space-quantum', 'blueprint-01')
            }
          />
        )}
      </main>

      {!focusMode && (
        <Footer lang={lang} onNavigate={(view) => navigateTo(view)} />
      )}
    </div>
  );
}
