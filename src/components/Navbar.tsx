import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAuth?: (action: 'signin' | 'signup') => void;
  onOpenBuilder?: () => void;
  currentPage?: 'home' | 'build' | 'models';
  onNavigate?: (page: 'home' | 'build' | 'models') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenAuth,
  onOpenBuilder,
  currentPage = 'home',
  onNavigate,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (currentPage !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';
  const isSolidNav = scrolled || currentPage === 'models' || currentPage === 'build';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolidNav
            ? isDark
              ? 'bg-[#060606]/92 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl text-[#f3f3f1]'
              : 'bg-white/92 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-lg text-slate-900'
            : 'bg-transparent py-4 sm:py-5 text-[#0B0B0C]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-6 sm:gap-8">
          {/* Brand Logo (Enlarged prominent size as requested) */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none cursor-pointer"
            aria-label="Citadel AI Home"
          >
            <img
              src="/images/F3JGQVuvf0ncladOrYlacmg9juI.png"
              alt="Citadel AI"
              className={`h-9 sm:h-11 md:h-12 w-auto object-contain transition-all duration-300 ${
                isSolidNav && isDark ? 'filter invert brightness-100' : 'filter brightness-0'
              } group-hover:scale-[1.02]`}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className={`hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-medium tracking-normal transition-colors duration-300 ${
              isSolidNav
                ? isDark
                  ? 'text-[#8c9095]'
                  : 'text-slate-600'
                : 'text-[#2D3033]'
            }`}
          >
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('build');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (onOpenBuilder) {
                  onOpenBuilder();
                } else {
                  scrollTo('platform');
                }
              }}
              className={`transition-colors whitespace-nowrap focus:outline-none cursor-pointer relative ${
                currentPage === 'build'
                  ? isDark
                    ? 'text-white font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF2D16] after:rounded-full'
                    : 'text-black font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF2D16] after:rounded-full'
                  : isSolidNav
                  ? isDark
                    ? 'hover:text-white'
                    : 'hover:text-black'
                  : 'hover:text-black'
              }`}
            >
              Build
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className={`transition-colors whitespace-nowrap focus:outline-none cursor-pointer ${
                isSolidNav
                  ? isDark
                    ? 'hover:text-white'
                    : 'hover:text-black'
                  : 'hover:text-black'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo('platform')}
              className={`transition-colors whitespace-nowrap focus:outline-none cursor-pointer ${
                isSolidNav
                  ? isDark
                    ? 'hover:text-white'
                    : 'hover:text-black'
                  : 'hover:text-black'
              }`}
            >
              Workspace
            </button>
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('models');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  scrollTo('models');
                }
              }}
              className={`transition-colors whitespace-nowrap focus:outline-none cursor-pointer relative ${
                currentPage === 'models'
                  ? isDark
                    ? 'text-white font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF2D16] after:rounded-full'
                    : 'text-black font-semibold after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF2D16] after:rounded-full'
                  : isSolidNav
                  ? isDark
                    ? 'hover:text-white'
                    : 'hover:text-black'
                  : 'hover:text-black'
              }`}
            >
              Model hub
            </button>
            <button
              onClick={() => onOpenAuth?.('signin')}
              className={`transition-colors whitespace-nowrap focus:outline-none cursor-pointer ${
                isSolidNav
                  ? isDark
                    ? 'hover:text-white'
                    : 'hover:text-black'
                  : 'hover:text-black'
              }`}
            >
              Sign in
            </button>
          </nav>

          {/* Right Action Buttons: Theme Toggle + Start Building */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2 sm:p-2.5 rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                scrolled
                  ? isDark
                    ? 'bg-white/10 hover:bg-white/20 text-[#f3f3f1]'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  : 'bg-black/5 hover:bg-black/10 text-[#0B0B0C]'
              }`}
              title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-800" />
              )}
            </button>

            {/* Action Button: Start building → (Red with white writing per user styling request) */}
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate('build');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (onOpenAuth) {
                  onOpenAuth('signup');
                } else {
                  scrollTo('workflows');
                }
              }}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-semibold text-white bg-[#FF2D16] hover:bg-[#e02510] active:scale-[0.98] rounded-full transition-all duration-200 cursor-pointer shadow-[0_2px_14px_rgba(255,45,22,0.4)] hover:shadow-[0_4px_20px_rgba(255,45,22,0.6)] focus:outline-none group"
            >
              <span>Start building</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border focus:outline-none cursor-pointer ${
                scrolled
                  ? isDark
                    ? 'text-[#f3f3f1] bg-[#1a1a1a] border-white/10'
                    : 'text-slate-800 bg-slate-100 border-slate-200'
                  : 'text-[#0B0B0C] bg-black/5 border-black/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 pt-24 px-6 md:hidden flex flex-col justify-between pb-10 animate-in fade-in duration-200 ${
            isDark
              ? 'bg-[#060606]/98 backdrop-blur-xl text-[#f3f3f1]'
              : 'bg-white/98 backdrop-blur-xl text-slate-900 shadow-2xl'
          }`}
        >
          <div className="flex flex-col gap-5 text-lg font-medium">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) {
                  onNavigate('build');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (onOpenBuilder) {
                  onOpenBuilder();
                } else {
                  scrollTo('platform');
                }
              }}
              className={`text-left py-2 transition-colors ${
                currentPage === 'build'
                  ? 'text-[#FF2D16] font-semibold'
                  : isDark
                  ? 'text-[#8c9095] hover:text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Build
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className={`text-left py-2 transition-colors ${
                isDark ? 'text-[#8c9095] hover:text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              Pricing
            </button>
            <button
              onClick={() => scrollTo('platform')}
              className={`text-left py-2 transition-colors ${
                isDark ? 'text-[#8c9095] hover:text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              Workspace
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) {
                  onNavigate('models');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  scrollTo('models');
                }
              }}
              className={`text-left py-2 transition-colors ${
                currentPage === 'models'
                  ? 'text-[#FF2D16] font-semibold'
                  : isDark
                  ? 'text-[#8c9095] hover:text-white'
                  : 'text-slate-600 hover:text-black'
              }`}
            >
              Model hub
            </button>
            <button
              onClick={() => scrollTo('faq')}
              className={`text-left py-2 transition-colors ${
                isDark ? 'text-[#8c9095] hover:text-white' : 'text-slate-600 hover:text-black'
              }`}
            >
              FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.('signin');
              }}
              className="text-left py-2 text-[#ff2d16] font-semibold"
            >
              Sign in
            </button>
          </div>

          <div
            className={`pt-6 border-t flex flex-col gap-3.5 ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}
          >
            {/* Theme switcher toggle row on mobile */}
            <div className="flex items-center justify-between py-2">
              <span className={`text-sm ${isDark ? 'text-[#8c9095]' : 'text-slate-600'}`}>
                Theme Mode
              </span>
              <button
                onClick={onToggleTheme}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer ${
                  isDark
                    ? 'bg-white/10 text-white'
                    : 'bg-slate-200 text-slate-800'
                }`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Dark</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-800" />
                    <span>Light</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth?.('signup');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 text-sm font-semibold rounded-full shadow-md text-white bg-[#FF2D16] hover:bg-[#e02510] active:scale-[0.98] transition-all"
            >
              <span>Start building</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
