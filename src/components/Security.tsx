import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, HardDrive, History, FileCode2, CheckCircle2 } from 'lucide-react';

interface SecurityBadge {
  standard: string;
  name: string;
  state: string;
  description: string;
  icon: React.ReactNode;
}

const BADGES: SecurityBadge[] = [
  {
    standard: 'SOC 2 Type II',
    name: 'Your account',
    state: 'Account-owned projects',
    description: 'All prompts, models, and weights remain isolated strictly to your team credential scope.',
    icon: <Lock className="w-4 h-4 text-[#FF2D16]" />,
  },
  {
    standard: 'ISO 27001',
    name: 'Separate preview',
    state: 'Isolated from your workspace',
    description: 'Sandboxed client runtimes run detached from primary production storage layers.',
    icon: <HardDrive className="w-4 h-4 text-[#FF2D16]" />,
  },
  {
    standard: 'GDPR Verified',
    name: 'Version history',
    state: 'Revisions retained together',
    description: 'Complete source trees, checkpoint deltas, and conversation traces recorded for audit.',
    icon: <History className="w-4 h-4 text-[#FF2D16]" />,
  },
  {
    standard: 'HIPAA Ready',
    name: 'Full ownership',
    state: 'Standalone HTML export',
    description: 'Single-file or modular exports without locked runtime dependencies or subscription DRM.',
    icon: <FileCode2 className="w-4 h-4 text-[#FF2D16]" />,
  },
];

export const Security: React.FC = () => {
  const [activeBadge, setActiveBadge] = useState(0);
  const [dialProgress, setDialProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDialProgress(99.99);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="security"
      className="relative w-full py-24 md:py-36 bg-white dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] border-t border-slate-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
              04 — Security
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight leading-[1.12]">
              Security and ownership by default.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-[#8c9095] leading-relaxed">
            Your projects, conversations and model library stay tied to your account. Generated apps run separately from your workspace.
          </p>
        </div>

        {/* Split Grid: Server Corridor Visual & Badges List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Corridor Artwork with laser scan */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-slate-900 dark:bg-[#0B0B0C] border border-slate-300 dark:border-white/10 min-h-[420px] lg:min-h-full flex flex-col justify-between p-6 sm:p-8 shadow-xl">
            <img
              src="/images/niE7tyqxcF9EET9kIx01w8jxk.webp"
              alt="High security data center server corridor"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />

            {/* Laser scan line over corridor */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF2D16] shadow-[0_0_12px_#FF2D16] animate-scan-line pointer-events-none" />

            {/* Top Security Status Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-xs font-mono-geist text-white">
                <span className="w-2 h-2 rounded-full bg-[#FF2D16] shadow-[0_0_6px_#FF2D16]" />
                <span>Vault Isolated</span>
              </div>
            </div>

            {/* Bottom Uptime Dial Gauge Widget */}
            <div className="relative z-10 bg-black/85 backdrop-blur-md rounded-xl p-5 border border-white/15 flex items-center justify-between text-white">
              <div>
                <p className="text-[11px] font-mono-geist uppercase tracking-wider text-slate-400">
                  High Availability Guarantee
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono-geist text-2xl font-bold text-white tabular-nums">
                    {dialProgress.toFixed(2)}
                  </span>
                  <span className="text-sm font-semibold text-[#FF2D16]">%</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Uptime SLA recorded across global regions</p>
              </div>

              {/* Mini Circular Gauge Visual */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-white/15"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#FF2D16] transition-all duration-1000 ease-out"
                    strokeDasharray="99.99, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <ShieldCheck className="w-5 h-5 text-[#FF2D16] absolute" />
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Security Badges */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
            {BADGES.map((badge, idx) => {
              const isActive = activeBadge === idx;
              return (
                <div
                  key={badge.name}
                  onClick={() => setActiveBadge(idx)}
                  className={`p-6 sm:p-7 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 dark:bg-[#0B0B0C] border-slate-300 dark:border-white/20 shadow-md dark:shadow-xl'
                      : 'bg-slate-50/70 dark:bg-[#0B0B0C]/40 border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-slate-100/70 dark:hover:bg-[#0B0B0C]/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        {badge.icon}
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight">
                          {badge.name}
                        </h3>
                        <span className="font-mono-geist text-[11px] px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-[#8c9095] border border-slate-300 dark:border-white/10">
                          {badge.standard}
                        </span>
                      </div>

                      <p className="text-sm font-medium text-[#FF2D16]">
                        {badge.state}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8c9095] leading-relaxed pt-1">
                        {badge.description}
                      </p>
                    </div>

                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 transition-opacity duration-200 ${
                        isActive ? 'text-[#FF2D16] opacity-100' : 'text-slate-400 dark:text-[#8c9095] opacity-40'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
