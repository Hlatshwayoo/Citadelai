import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenAuth?: (action: 'signin' | 'signup') => void;
  onOpenBuilder?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth, onOpenBuilder }) => {
  return (
    <footer className="relative w-full bg-slate-100 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] pt-20 pb-12 overflow-hidden border-t border-slate-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-16">
        {/* Top Grid: Brand & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-12">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/F3JGQVuvf0ncladOrYlacmg9juI.png"
                alt="Citadel AI"
                className="h-8 w-auto object-contain filter brightness-0 dark:invert opacity-95"
              />
              <span className="font-geist font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                Citadel
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-[#8c9095] max-w-sm leading-relaxed">
              The AI application platform for teams. Build, deploy and operate in one workspace.
            </p>

            <div>
              <a
                href="https://citadelai.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono-geist text-slate-900 dark:text-[#f3f3f1] hover:text-[#FF2D16] transition-colors"
              >
                <span>Citadelai.dev</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            {/* Col Platform */}
            <div className="space-y-4">
              <p className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
                Platform
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-[#f3f3f1]">
                <li>
                  <button
                    onClick={() => onOpenBuilder?.()}
                    className="hover:text-[#FF2D16] transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Build
                  </button>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-[#FF2D16] transition-colors">
                    Capabilities
                  </a>
                </li>
                <li>
                  <a href="#models" className="hover:text-[#FF2D16] transition-colors">
                    Model hub
                  </a>
                </li>
              </ul>
            </div>

            {/* Col Company */}
            <div className="space-y-4">
              <p className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
                Company
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-[#f3f3f1]">
                <li>
                  <a href="#platform" className="hover:text-[#FF2D16] transition-colors">
                    Workspace
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-[#FF2D16] transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#FF2D16] transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Col Start */}
            <div className="space-y-4">
              <p className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
                Start
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-[#f3f3f1]">
                <li>
                  <button
                    onClick={() => onOpenAuth?.('signup')}
                    className="hover:text-[#FF2D16] transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Start building
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenAuth?.('signin')}
                    className="hover:text-[#FF2D16] transition-colors cursor-pointer text-left focus:outline-none"
                  >
                    Sign in
                  </button>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#FF2D16] transition-colors">
                    Refunds
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dramatic Art Band with Giant Citadel Masthead & Portrait */}
        <div className="relative w-full rounded-2xl bg-white dark:bg-[#0B0B0C] border border-slate-200 dark:border-white/10 p-8 sm:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[280px] sm:min-h-[360px] shadow-sm dark:shadow-none transition-colors duration-300">
          {/* Subtle red laser glow behind typography */}
          <div className="absolute w-[80%] h-32 bg-[#FF2D16]/10 blur-[90px] rounded-full pointer-events-none" />

          {/* Giant Masthead */}
          <div className="w-full text-center overflow-hidden z-10 pointer-events-none">
            <span
              className="font-saira font-[200] sm:font-[300] tracking-[-0.01em] uppercase text-slate-900 dark:text-[#f3f3f1] leading-[0.74] block select-none"
              style={{
                fontSize: 'clamp(5rem, 24vw, 24rem)',
                opacity: 0.95,
              }}
            >
              Citadel
            </span>
          </div>

          {/* Portrait Image badge in center/foreground */}
          <div className="relative z-20 -mt-10 sm:-mt-16 w-24 h-32 sm:w-32 sm:h-44 rounded-xl overflow-hidden border-2 border-[#FF2D16] shadow-[0_0_30px_rgba(255,45,22,0.3)] bg-black">
            <img
              src="/images/oczhKYuMmuXqd5DYkmWInoy0.webp"
              alt="Citadel avatar portrait"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-[#8c9095]">
          <p>© 2026 Citadel AI. Independent platform, not affiliated with NVIDIA.</p>
          <div className="flex items-center gap-6">
            <a href="#security" className="hover:text-black dark:hover:text-white transition-colors">
              Privacy and terms
            </a>
            <a href="#faq" className="hover:text-black dark:hover:text-white transition-colors">
              Refunds policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
