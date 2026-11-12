import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'q1',
    question: 'What can I build with Citadel AI?',
    answer: 'Design, import, build and publish AI-powered applications in a unified workspace with cloud builds and GitHub integration.',
  },
  {
    id: 'q2',
    question: 'Which models can I explore?',
    answer: 'Discover speech, vision, embeddings and language models through Hugging Face, with license and provenance visibility.',
  },
  {
    id: 'q3',
    question: 'Who owns my projects?',
    answer: 'Your projects, conversations and model library stay tied to your account. Export your application as a standalone HTML file.',
  },
  {
    id: 'q4',
    question: 'Can I edit the source directly?',
    answer: 'Yes. Open Builder to edit your source, inspect revisions and test your interface at different sizes.',
  },
  {
    id: 'q5',
    question: 'Is GPU execution included?',
    answer: 'Hub discovery and saved model references are available. GPU training and specialist inference require a connected execution service.',
  },
];

interface FAQProps {
  onStartBuilding?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onStartBuilding }) => {
  const [openIds, setOpenIds] = useState<string[]>(['q1']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="faq"
      className="relative w-full py-24 md:py-36 bg-white dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] border-t border-slate-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title and CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
            <div className="space-y-4">
              <span className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
                06 — Questions
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight leading-[1.12]">
                FAQ.
              </h2>
              <p className="text-base text-slate-600 dark:text-[#8c9095] leading-relaxed">
                What to know before you start building.
              </p>
            </div>

            <div>
              <button
                onClick={() =>
                  onStartBuilding ? onStartBuilding() : window.scrollTo({ top: 0, behavior: 'smooth' })
                }
                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-medium text-white dark:text-[#0b0b0c] bg-[#0b0b0c] dark:bg-[#f3f3f1] hover:bg-[#1C1D20] dark:hover:bg-white rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none cursor-pointer"
              >
                <span>Start building</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-200 dark:divide-white/10 border-t border-b border-slate-200 dark:border-white/10">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openIds.includes(item.id);
              return (
                <div key={item.id} className="py-6 sm:py-8">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between text-left gap-6 group focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-[#f3f3f1] group-hover:text-[#FF2D16] transition-colors">
                      {item.question}
                    </h3>

                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:border-slate-300 dark:group-hover:border-white/25 transition-colors">
                      {isOpen ? (
                        <Minus className="w-4 h-4 text-[#FF2D16]" />
                      ) : (
                        <Plus className="w-4 h-4 text-slate-500 dark:text-[#8c9095] group-hover:text-black dark:group-hover:text-white" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-4 pr-12 text-sm sm:text-base text-slate-600 dark:text-[#8c9095] leading-relaxed animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
