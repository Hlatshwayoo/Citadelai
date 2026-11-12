import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Layers, Cpu, GitBranch, ArrowUpRight } from 'lucide-react';

import softwareCodeDeliveryImg from '../assets/images/software_code_delivery_1794523523300.jpg';
import softwareModelWiringImg from '../assets/images/software_model_wiring_1794523538196.jpg';
import softwareCloudBuildImg from '../assets/images/software_cloud_build_1794523552543.jpg';
import softwareGitGovernanceImg from '../assets/images/software_git_governance_1794523568262.jpg';

interface CapabilityItem {
  id: string;
  index: string;
  name: string;
  kicker: string;
  title: string;
  line: string;
  image: string;
  icon: React.ReactNode;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'ai-assisted',
    index: '01',
    name: 'AI-assisted development',
    kicker: 'AI-assisted development',
    title: 'Accelerated delivery',
    line: 'Go from specification to a production-ready interface with every iteration validated in a live preview.',
    image: softwareCodeDeliveryImg,
    icon: <Sparkles className="w-4 h-4 text-[#FF2D16]" />,
  },
  {
    id: 'open-models',
    index: '02',
    name: 'Open models',
    kicker: 'Open models',
    title: 'Open model integration',
    line: 'Discover, evaluate and wire Hugging Face models into your applications with license and provenance visibility.',
    image: softwareModelWiringImg,
    icon: <Cpu className="w-4 h-4 text-[#FF2D16]" />,
  },
  {
    id: 'cloud-builds',
    index: '03',
    name: 'Cloud builds',
    kicker: 'Cloud builds',
    title: 'Build and publish',
    line: 'Design, import, build and publish AI-powered applications with cloud builds and GitHub integration.',
    image: softwareCloudBuildImg,
    icon: <Layers className="w-4 h-4 text-[#FF2D16]" />,
  },
  {
    id: 'code-ownership',
    index: '04',
    name: 'Code ownership',
    kicker: 'Code ownership',
    title: 'Full version governance',
    line: 'Source, conversations and revisions are retained together. Roll back, audit or export at any time.',
    image: softwareGitGovernanceImg,
    icon: <GitBranch className="w-4 h-4 text-[#FF2D16]" />,
  },
];

export const Capabilities: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        if (scrollPos >= top && scrollPos <= bottom) {
          setActiveIndex(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    const target = cardRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="capabilities"
      className="relative w-full py-24 md:py-36 bg-white dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Sticky Index and Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-4">
              <span className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
                02 — Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight leading-[1.12]">
                The delivery stack.
              </h2>
            </div>

            {/* Interactive Index List */}
            <div className="hidden lg:flex flex-col border-t border-slate-200 dark:border-white/10 pt-6 space-y-2">
              {CAPABILITIES.map((cap, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={cap.id}
                    onClick={() => scrollToCard(idx)}
                    className={`group relative flex items-center justify-between py-3.5 px-4 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-[#8c9095] hover:text-slate-900 dark:hover:text-[#f3f3f1] hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Active Red indicator bar */}
                      <span
                        className={`w-1 h-5 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-[#FF2D16] shadow-[0_0_8px_#FF2D16]' : 'bg-transparent'
                        }`}
                      />
                      <span className="font-mono-geist text-xs text-slate-400 dark:text-[#8c9095] tabular-nums">
                        {cap.index}
                      </span>
                      <span className="text-sm font-medium tracking-tight">
                        {cap.name}
                      </span>
                    </div>

                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isActive
                          ? 'opacity-100 translate-x-0 text-[#FF2D16]'
                          : 'opacity-0 -translate-x-1 group-hover:opacity-60'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Stacked Showcase Cards */}
          <div className="lg:col-span-7 flex flex-col gap-16 md:gap-24">
            {CAPABILITIES.map((cap, idx) => (
              <div
                key={cap.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="group relative flex flex-col rounded-2xl bg-slate-50 dark:bg-[#0B0B0C] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg dark:shadow-2xl transition-all duration-300 hover:border-slate-300 dark:hover:border-white/20"
              >
                {/* Artwork Media Frame */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-[#111113]">
                  <img
                    src={cap.image}
                    alt={cap.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#0B0B0C] via-transparent to-transparent opacity-60" />
                </div>

                {/* Card Text Content */}
                <div className="p-7 sm:p-9 md:p-10 space-y-4">
                  <div className="flex items-center gap-2.5">
                    {cap.icon}
                    <span className="text-xs font-mono-geist uppercase tracking-wider text-slate-500 dark:text-[#8c9095]">
                      {cap.kicker}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight">
                    {cap.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-[#8c9095] leading-relaxed">
                    {cap.line}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
