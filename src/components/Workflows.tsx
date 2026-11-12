import React, { useState, useEffect } from 'react';
import { Terminal, Play } from 'lucide-react';

const PRESET_PROMPTS = [
  'Build a knowledge library with search and tags.',
  'reconcile Q3 invoices · flag 4 exceptions · route to finance for sign-off',
  'Generate an interactive pricing calculator with currency conversion and Stripe checkout.',
];

// Key coordinates mapped to the keyboard image layout
const KEY_HOTSPOTS = [
  { left: 35.4, top: 39.3, w: 3.4, h: 4.6, char: 'j' },
  { left: 39.4, top: 39.3, w: 3.4, h: 4.6, char: 't' },
  { left: 43.4, top: 39.3, w: 3.4, h: 4.6, char: 'y' },
  { left: 47.3, top: 39.3, w: 3.4, h: 4.6, char: 'u' },
  { left: 51.2, top: 39.3, w: 3.4, h: 4.6, char: 'i' },
  { left: 55.1, top: 39.3, w: 3.4, h: 4.6, char: 'o' },
  { left: 59.0, top: 39.3, w: 3.4, h: 4.6, char: 'p' },
  { left: 36.0, top: 45.2, w: 3.4, h: 4.6, char: 'f' },
  { left: 39.9, top: 45.2, w: 3.4, h: 4.6, char: 'h' },
  { left: 43.8, top: 45.2, w: 3.4, h: 4.6, char: 'j' },
  { left: 47.7, top: 45.2, w: 3.4, h: 4.6, char: 'k' },
  { left: 51.6, top: 45.2, w: 3.4, h: 4.6, char: 'l' },
  { left: 38.4, top: 51.2, w: 3.4, h: 4.6, char: 'b' },
  { left: 42.3, top: 51.2, w: 3.4, h: 4.6, char: 'd' },
  { left: 46.2, top: 51.2, w: 3.4, h: 4.6, char: 'n' },
  { left: 50.1, top: 51.2, w: 3.4, h: 4.6, char: 'm' },
  { left: 38.9, top: 57.2, w: 14.6, h: 4.6, char: ' ' },
  { left: 76.0, top: 39.3, w: 2.8, h: 4.6, char: '3' },
  { left: 76.0, top: 45.2, w: 2.8, h: 4.6, char: '4' },
  { left: 76.0, top: 51.2, w: 2.8, h: 4.6, char: '1' },
];

export const Workflows: React.FC = () => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [typedChars, setTypedChars] = useState('');
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isTypingCustom, setIsTypingCustom] = useState(false);

  const activePrompt = isTypingCustom ? customInput : PRESET_PROMPTS[currentPromptIndex];

  // Auto typewriter effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let charIndex = 0;
    setTypedChars('');

    const typeNext = () => {
      if (charIndex <= activePrompt.length) {
        setTypedChars(activePrompt.slice(0, charIndex));

        // Randomly illuminate a key near the typed letter
        const randomKey = Math.floor(Math.random() * KEY_HOTSPOTS.length);
        setActiveKey(randomKey);
        setTimeout(() => setActiveKey(null), 120);

        charIndex++;
        timeoutId = setTimeout(typeNext, 45 + Math.random() * 25);
      } else {
        // Hold for 3.5 seconds then advance preset if not custom
        timeoutId = setTimeout(() => {
          if (!isTypingCustom) {
            setCurrentPromptIndex((prev) => (prev + 1) % PRESET_PROMPTS.length);
          }
        }, 3500);
      }
    };

    timeoutId = setTimeout(typeNext, 300);
    return () => clearTimeout(timeoutId);
  }, [currentPromptIndex, isTypingCustom, customInput]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      setIsTypingCustom(true);
      setTypedChars('');
    }
  };

  return (
    <section
      id="workflows"
      className="relative w-full py-24 md:py-36 bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] border-t border-slate-200 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-12 md:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
              03 — Flexible workflows
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight leading-[1.12]">
              Build with words.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-slate-600 dark:text-[#8c9095] leading-relaxed">
            Specify requirements in plain language. Let Citadel plan, implement and iterate, or edit your source directly in Builder.
          </p>
        </div>

        {/* The Key Typer Interactive Stage */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#E2E4E6] dark:bg-[#E9EAEA] border border-slate-300 dark:border-white/10 shadow-xl dark:shadow-2xl">
          {/* Top Terminal Typewriter Bar */}
          <div className="absolute top-4 sm:top-8 inset-x-4 sm:inset-x-8 z-30 flex justify-center pointer-events-none">
            <div className="max-w-3xl w-full px-5 py-3.5 rounded-full bg-[#0B0B0C]/90 backdrop-blur-md border border-white/15 shadow-2xl flex items-center gap-3">
              <span className="font-mono-geist text-xs sm:text-sm font-semibold text-[#FF2D16] shrink-0">
                Citadel /
              </span>
              <div className="font-mono-geist text-xs sm:text-sm text-white tracking-wide truncate flex items-center">
                <span>{typedChars}</span>
                <span className="inline-block w-2 h-4 ml-1 bg-[#FF2D16] animate-caret" />
              </div>
            </div>
          </div>

          {/* Interactive Keyboard Canvas Area */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[2383/1525] max-h-[640px] overflow-hidden">
            <img
              src="/images/0vk4MhFHdsaz6skNVYxuLFKIo.webp"
              alt="Robotic hands typing on a black keyboard"
              className="w-full h-full object-cover select-none"
              draggable={false}
            />

            {/* Glowing Red Backlit Key Hotspots */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {KEY_HOTSPOTS.map((key, i) => (
                <div
                  key={i}
                  style={{
                    left: `${key.left}%`,
                    top: `${key.top}%`,
                    width: `${key.w}%`,
                    height: `${key.h}%`,
                    borderRadius: '12%',
                    backgroundColor: '#FF2D16',
                    mixBlendMode: 'screen',
                    boxShadow: '0 0 16px #FF2D16',
                    opacity: activeKey === i ? 0.95 : 0,
                    transition: 'opacity 0.12s ease-out',
                  }}
                  className="absolute"
                />
              ))}
            </div>

            {/* Bottom Controls Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 z-30 flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Presets Selector */}
              <div className="flex items-center gap-2 bg-[#0B0B0C]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-md">
                <span className="text-[11px] font-mono-geist text-[#8c9095] uppercase px-1">
                  Preset
                </span>
                {PRESET_PROMPTS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsTypingCustom(false);
                      setCurrentPromptIndex(i);
                    }}
                    className={`w-6 h-6 rounded-full text-xs font-mono-geist flex items-center justify-center transition-colors cursor-pointer ${
                      !isTypingCustom && currentPromptIndex === i
                        ? 'bg-[#FF2D16] text-white font-bold'
                        : 'text-[#8c9095] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>

              {/* Custom Prompt Interactive Input */}
              <form
                onSubmit={handleCustomSubmit}
                className="flex items-center gap-2 bg-[#0B0B0C]/90 backdrop-blur-md p-1.5 pl-4 rounded-full border border-white/15 max-w-md w-full shadow-xl"
              >
                <Terminal className="w-3.5 h-3.5 text-[#FF2D16] shrink-0" />
                <input
                  type="text"
                  placeholder="Type a custom prompt to test robotic execution..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="bg-transparent text-xs text-white placeholder-[#8c9095] focus:outline-none w-full"
                />
                <button
                  type="submit"
                  className="p-1.5 px-3 rounded-full bg-[#FF2D16] hover:bg-[#ff4430] text-white text-xs font-medium flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Run</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
