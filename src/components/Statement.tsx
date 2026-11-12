import React from 'react';
import { ArrowRight, Code2 } from 'lucide-react';

interface StatementProps {
  onOpenBuilder?: () => void;
}

export const Statement: React.FC<StatementProps> = ({ onOpenBuilder }) => {
  return (
    <section
      id="platform"
      className="relative w-full py-20 md:py-32 bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] overflow-hidden border-t border-slate-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        {/* Scan zone container */}
        <div className="relative rounded-2xl p-8 sm:p-12 md:p-16 bg-white dark:bg-[#0B0B0C]/60 border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
          {/* Subtle animated red scan line indicator */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF2D16] to-transparent opacity-80 animate-scan-line pointer-events-none" />

          {/* Section index kicker */}
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
              01 — The platform
            </span>
          </div>

          {/* Main Statement Heading */}
          <div className="max-w-4xl mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[62px] font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight leading-[1.12] text-balance">
              One workspace to design, build, deploy and operate.
            </h2>
          </div>

          {/* Statement Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-200 dark:border-white/10">
            <p className="max-w-xl text-sm sm:text-base text-slate-600 dark:text-[#8c9095] leading-relaxed">
              Ship AI-powered applications with cloud builds, GitHub integration and open models built in.
            </p>

            <button
              onClick={() => (onOpenBuilder ? onOpenBuilder() : document.getElementById('capabilities')?.scrollIntoView({ behavior: 'smooth' }))}
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 dark:text-[#f3f3f1] hover:text-black dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-transparent dark:hover:bg-white/5 border border-slate-300 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 rounded-full transition-all duration-200 self-start sm:self-auto cursor-pointer focus:outline-none"
            >
              <Code2 className="w-3.5 h-3.5 text-[#ff2d16]" />
              <span>Open Builder</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
