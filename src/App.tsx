import { useEffect, useState } from 'react';
import {
  BLUEPRINTS,
  CATEGORIES,
  findBlueprintBySlugOrId,
  type BlueprintItem,
  type CategoryId,
  type Language,
  type ViewRoute,
} from './data/blueprints';
import { SITE_SEO_META } from './data/blueprintMeta';
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

interface ResolvedRoute {
  view: ViewRoute;
  blueprintId?: string;
  langOverride?: Language;
}

function resolveRouteFromLocation(): ResolvedRoute {
  if (typeof window === 'undefined') {
    return { view: 'home' };
  }

  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang');
  const langOverride: Language | undefined =
    langParam === 'en' ? 'en' : langParam === 'vi' ? 'vi' : undefined;

  // 1. Check ?post=<slug> or /post/<slug>
  const queryPost = params.get('post') || params.get('slug');
  const pathMatch = window.location.pathname.match(/^\/post\/([^/]+)\/?$/i);
  const postParam = queryPost || (pathMatch ? decodeURIComponent(pathMatch[1]) : null);

  if (postParam) {
    const matched = findBlueprintBySlugOrId(postParam);
    if (matched) {
      return {
        view: matched.category,
        blueprintId: matched.id,
        langOverride,
      };
    }
  }

  // 2. Check ?category=<id>
  const categoryParam = params.get('category') as ViewRoute | null;
  if (categoryParam && VALID_VIEWS.includes(categoryParam)) {
    const defaultPublished = BLUEPRINTS.find(
      (b) => b.category === categoryParam && b.status === 'published'
    );
    return {
      view: categoryParam,
      blueprintId: defaultPublished?.id,
      langOverride,
    };
  }

  // 3. Fallback to hash route (#/space-quantum, #/about, etc.)
  const hash = window.location.hash.replace(/^#\/?/, '') as ViewRoute;
  if (VALID_VIEWS.includes(hash)) {
    const defaultPublished = BLUEPRINTS.find(
      (b) => b.category === hash && b.status === 'published'
    );
    return {
      view: hash,
      blueprintId: defaultPublished?.id,
      langOverride,
    };
  }

  return { view: 'home', langOverride };
}

function buildRouteUrl(
  view: ViewRoute,
  blueprint: BlueprintItem | undefined,
  lang: Language
): string {
  if (blueprint) {
    const params = new URLSearchParams();
    params.set('post', blueprint.slug);
    if (lang === 'en') {
      params.set('lang', 'en');
    }
    return `/?${params.toString()}`;
  }

  if (view === 'home') {
    return lang === 'en' ? '/?lang=en' : '/';
  }

  return lang === 'en' ? `/?lang=en#/${view}` : `/#/${view}`;
}

function upsertMetaTag(
  selector: string,
  attrName: 'name' | 'property',
  attrValue: string,
  content: string
) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function App() {
  const initialRoute = resolveRouteFromLocation();

  const [lang, setLang] = useState<Language>(() => {
    if (initialRoute.langOverride) return initialRoute.langOverride;
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      return saved === 'en' ? 'en' : 'vi';
    } catch {
      return 'vi';
    }
  });

  const [activeView, setActiveView] = useState<ViewRoute>(initialRoute.view);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<
    string | undefined
  >(initialRoute.blueprintId);
  const [focusMode, setFocusMode] = useState(false);

  const activeBlueprint =
    (selectedBlueprintId
      ? BLUEPRINTS.find((b) => b.id === selectedBlueprintId)
      : undefined) ||
    BLUEPRINTS.find(
      (b) => b.category === activeView && b.status === 'published'
    );

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors cleanly
    }
    document.documentElement.lang = lang;

    // Keep URL ?lang parameter synced when on a post URL
    if (activeBlueprint) {
      const targetUrl = buildRouteUrl(activeView, activeBlueprint, lang);
      const currentUrl =
        window.location.pathname + window.location.search + window.location.hash;
      if (currentUrl !== targetUrl) {
        window.history.replaceState(null, '', targetUrl);
      }
    }
  }, [lang, activeView, activeBlueprint]);

  // Update document title & Open Graph meta tags dynamically on client navigation
  useEffect(() => {
    const origin = window.location.origin;
    if (activeBlueprint) {
      const title = `${activeBlueprint.title[lang]} — ${SITE_SEO_META.siteName}`;
      const desc = activeBlueprint.summary[lang];
      const canonical = `${origin}/?post=${encodeURIComponent(activeBlueprint.slug)}${
        lang === 'en' ? '&lang=en' : ''
      }`;
      const ogImage = `${origin}/api/og-image?post=${encodeURIComponent(
        activeBlueprint.slug
      )}&lang=${lang}`;

      document.title = title;
      upsertMetaTag('meta[name="description"]', 'name', 'description', desc);
      upsertMetaTag('meta[property="og:type"]', 'property', 'og:type', 'article');
      upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
      upsertMetaTag('meta[property="og:description"]', 'property', 'og:description', desc);
      upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
      upsertMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
      upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
      upsertMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
      upsertMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
    } else {
      const catMeta = CATEGORIES.find((c) => c.id === activeView);
      const title = catMeta
        ? `${catMeta.name[lang]} — ${SITE_SEO_META.siteName}`
        : activeView === 'about'
          ? `${lang === 'vi' ? 'Giới thiệu' : 'About'} — ${SITE_SEO_META.siteName}`
          : SITE_SEO_META[lang].title;
      const desc = catMeta
        ? catMeta.shortDescription[lang]
        : SITE_SEO_META[lang].description;
      const canonical =
        activeView === 'home' ? `${origin}/` : `${origin}/#/${activeView}`;
      const defaultImage = `${origin}${SITE_SEO_META.defaultOgImagePath}`;

      document.title = title;
      upsertMetaTag('meta[name="description"]', 'name', 'description', desc);
      upsertMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
      upsertMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
      upsertMetaTag('meta[property="og:description"]', 'property', 'og:description', desc);
      upsertMetaTag('meta[property="og:url"]', 'property', 'og:url', canonical);
      upsertMetaTag('meta[property="og:image"]', 'property', 'og:image', defaultImage);
      upsertMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
      upsertMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
      upsertMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', defaultImage);
    }
  }, [activeView, activeBlueprint, lang]);

  // Listen to browser Back/Forward (popstate) and hashchange
  useEffect(() => {
    const syncFromLocation = () => {
      const next = resolveRouteFromLocation();
      setActiveView(next.view);
      setSelectedBlueprintId(next.blueprintId);
      if (next.langOverride) {
        setLang(next.langOverride);
      }
      setFocusMode(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', syncFromLocation);
    window.addEventListener('hashchange', syncFromLocation);
    return () => {
      window.removeEventListener('popstate', syncFromLocation);
      window.removeEventListener('hashchange', syncFromLocation);
    };
  }, []);

  const navigateTo = (view: ViewRoute, blueprintId?: string) => {
    setFocusMode(false);
    setActiveView(view);

    const targetBlueprint = blueprintId
      ? BLUEPRINTS.find((b) => b.id === blueprintId)
      : BLUEPRINTS.find((b) => b.category === view && b.status === 'published');

    setSelectedBlueprintId(targetBlueprint?.id);

    const targetUrl = buildRouteUrl(view, targetBlueprint, lang);
    const currentUrl =
      window.location.pathname + window.location.search + window.location.hash;
    if (currentUrl !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
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
            onSelectBlueprint={(id) => navigateTo(activeView, id)}
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
