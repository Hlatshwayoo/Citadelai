import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Capabilities } from './components/Capabilities';
import { Workflows } from './components/Workflows';
import { Security } from './components/Security';
import { ModelsOrbit } from './components/ModelsOrbit';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { BuilderModal } from './components/BuilderModal';
import { ModelHub, ModelItem } from './components/ModelHub';
import { BuildPage } from './components/BuildPage';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('citadel-theme');
      if (saved === 'light' || saved === 'dark') return saved;
      // Default to dark mode for cinematic aesthetics
      return 'dark';
    }
    return 'dark';
  });

  const [currentPage, setCurrentPage] = useState<'home' | 'build' | 'models'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#/build' || window.location.pathname === '/build') {
        return 'build';
      }
      if (window.location.hash === '#/models' || window.location.pathname === '/models') {
        return 'models';
      }
    }
    return 'home';
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [builderModalOpen, setBuilderModalOpen] = useState(false);
  const [initialBuilderPrompt, setInitialBuilderPrompt] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('citadel-theme', theme);
  }, [theme]);

  // Sync route with browser hash for back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/build') {
        setCurrentPage('build');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#/models') {
        setCurrentPage('models');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigate = (page: 'home' | 'build' | 'models') => {
    setCurrentPage(page);
    if (page === 'build') {
      window.location.hash = '#/build';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'models') {
      window.location.hash = '#/models';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash === '#/build' || window.location.hash === '#/models') {
        history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenBuilder = (modelOrPrompt?: ModelItem | string) => {
    if (typeof modelOrPrompt === 'string') {
      setInitialBuilderPrompt(modelOrPrompt);
    }
    setBuilderModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] selection:bg-[#FF2D16] selection:text-white transition-colors duration-300">
      {/* Fixed Navigation with Theme Toggle & Route Highlight */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={handleOpenAuth}
        onOpenBuilder={() => handleNavigate('build')}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === 'build' ? (
        <main className="relative z-10 animate-in fade-in duration-300">
          <BuildPage
            onBackToHome={() => handleNavigate('home')}
            onOpenAuth={handleOpenAuth}
            onOpenBuilderModal={(p) => handleOpenBuilder(p)}
            onNavigate={handleNavigate}
          />
        </main>
      ) : currentPage === 'models' ? (
        <main className="relative z-10 animate-in fade-in duration-300">
          <ModelHub
            onBackToHome={() => handleNavigate('home')}
            onOpenBuilder={(m) => handleOpenBuilder(m)}
            onOpenAuth={handleOpenAuth}
          />
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenBuilder={() => handleNavigate('build')}
          />
        </main>
      ) : (
        <main className="relative z-10">
          {/* Hero Section with Expanded CITADEL Masthead & Robot Clarity */}
          <Hero
            onGetStarted={() => handleOpenAuth('signup')}
            onExploreModels={() => handleNavigate('models')}
          />

          {/* 01 — The platform */}
          <Statement onOpenBuilder={() => handleNavigate('build')} />

          {/* 02 — Capabilities (The delivery stack) */}
          <Capabilities />

          {/* 03 — Flexible workflows (Build with words & Key Typer) */}
          <Workflows />

          {/* 04 — Security & Ownership */}
          <Security />

          {/* 05 — Open models & Orbit */}
          <ModelsOrbit onExploreAllModels={() => handleNavigate('models')} />

          {/* 06 — FAQ Questions */}
          <FAQ onStartBuilding={() => handleOpenAuth('signup')} />

          {/* Footer with giant masthead and portrait */}
          <Footer
            onOpenAuth={handleOpenAuth}
            onOpenBuilder={() => handleNavigate('build')}
          />
        </main>
      )}

      {/* Interactive Modals */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
      />

      <BuilderModal
        isOpen={builderModalOpen}
        onClose={() => setBuilderModalOpen(false)}
        initialPrompt={initialBuilderPrompt}
      />
    </div>
  );
}

