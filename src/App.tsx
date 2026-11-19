import { useState } from 'react';
import type { CategoryKey } from './data/blueprints';
import { Header, type NavDestination } from './components/Header';
import { HeroBlueprint } from './components/HeroBlueprint';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ComingSoonGrid } from './components/ComingSoonGrid';
import { DiscussionSection } from './components/DiscussionSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavDestination>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');
  const [focusMode, setFocusMode] = useState(false);

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigate = (
    dest: NavDestination,
    categoryFilter?: CategoryKey
  ) => {
    setActiveNav(dest);
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }

    if (dest === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (dest === 'space-quantum' || dest === 'ai-robotics') {
      scrollToElement('upcoming-blueprints');
    } else if (dest === 'about') {
      scrollToElement('about');
    }
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
          activeNav={activeNav}
          onNavigate={handleNavigate}
          onToggleFocusMode={handleToggleFocusMode}
        />
      )}

      <main className="flex-1">
        {!focusMode && (
          <HeroBlueprint
            onReadFullBlueprint={() => scrollToElement('featured-article')}
            onOpenFocusMode={handleToggleFocusMode}
          />
        )}

        <FeaturedArticle
          focusMode={focusMode}
          onToggleFocusMode={handleToggleFocusMode}
        />

        {!focusMode && (
          <ComingSoonGrid
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (cat === 'space-quantum') setActiveNav('space-quantum');
              else if (cat === 'ai-robotics') setActiveNav('ai-robotics');
              else setActiveNav('home');
            }}
          />
        )}

        <DiscussionSection />

        {!focusMode && <AboutSection />}
      </main>

      {!focusMode && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}
