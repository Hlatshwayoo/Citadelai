import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Check } from 'lucide-react';

interface ModelInfo {
  name: string;
  creator: string;
  category: 'Language' | 'Vision' | 'Audio' | 'Embeddings';
  params: string;
  context: string;
  license: string;
  highlight: string;
}

const MODELS: ModelInfo[] = [
  {
    name: 'Llama 3.3 70B',
    creator: 'Meta',
    category: 'Language',
    params: '70B',
    context: '128K',
    license: 'Llama 3.3 Community',
    highlight: 'State-of-the-art open-weights reasoning & general synthesis benchmark leader.',
  },
  {
    name: 'DeepSeek R1',
    creator: 'DeepSeek',
    category: 'Language',
    params: '671B MoE (37B active)',
    context: '64K',
    license: 'MIT',
    highlight: 'Breakthrough reinforcement-learning chain-of-thought mathematical reasoning model.',
  },
  {
    name: 'Qwen 2.5 72B',
    creator: 'Alibaba Cloud',
    category: 'Language',
    params: '72B',
    context: '128K',
    license: 'Apache 2.0',
    highlight: 'Comprehensive multilingual coding, math, and structured tool orchestration.',
  },
  {
    name: 'Mistral Large 2',
    creator: 'Mistral AI',
    category: 'Language',
    params: '123B',
    context: '128K',
    license: 'Mistral Research / Comm',
    highlight: 'High-precision instruction adherence with native JSON schema extraction.',
  },
  {
    name: 'Whisper Large v3',
    creator: 'OpenAI',
    category: 'Audio',
    params: '1.5B',
    context: 'Multi-lingual audio',
    license: 'MIT',
    highlight: 'Robust multi-language speech transcription, translation, and diarization.',
  },
  {
    name: 'FLUX.1-schnell',
    creator: 'Black Forest Labs',
    category: 'Vision',
    params: '12B Rectified Flow',
    context: 'High-res 4-step',
    license: 'Apache 2.0',
    highlight: 'Next-gen text-to-image synthesis with typography and anatomical accuracy.',
  },
  {
    name: 'BGE Large EN v1.5',
    creator: 'BAAI',
    category: 'Embeddings',
    params: '335M',
    context: '1024 dims',
    license: 'MIT',
    highlight: 'Top semantic search, dense retrieval, and RAG re-ranking performance.',
  },
  {
    name: 'Stable Diffusion 3.5',
    creator: 'Stability AI',
    category: 'Vision',
    params: '8B MMDiT',
    context: 'Photorealistic',
    license: 'Stability Community',
    highlight: 'Multimodal diffusion transformer for graphic generation and photorealism.',
  },
  {
    name: 'Gemma 2 27B',
    creator: 'Google',
    category: 'Language',
    params: '27B',
    context: '8K',
    license: 'Gemma Terms',
    highlight: 'Exceptional inference throughput and high parameter-efficiency ranking.',
  },
  {
    name: 'Phi-4',
    creator: 'Microsoft',
    category: 'Language',
    params: '14B',
    context: '16K',
    license: 'MIT',
    highlight: 'Synthetic data trained compact model with top-tier STEM reasoning.',
  },
];

const CATEGORIES = ['All', 'Language', 'Vision', 'Audio', 'Embeddings'] as const;

interface ModelsOrbitProps {
  onExploreAllModels?: () => void;
}

export const ModelsOrbit: React.FC<ModelsOrbitProps> = ({ onExploreAllModels }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedModel, setSelectedModel] = useState<ModelInfo | null>(MODELS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isOrbiting, setIsOrbiting] = useState(true);

  // Subtle continuous orbit rotation
  useEffect(() => {
    if (!isOrbiting) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isOrbiting]);

  const filteredModels = MODELS.filter((m) => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section
      id="models"
      className="relative w-full py-24 md:py-36 bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] border-t border-slate-200 dark:border-white/5 overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
          <span className="font-mono-geist text-xs tracking-wider uppercase text-slate-500 dark:text-[#8c9095]">
            05 — Open models
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 dark:text-[#f3f3f1] tracking-tight leading-[1.12]">
            Open models. Ready to integrate.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#8c9095] leading-relaxed max-w-xl">
            Explore speech, vision, embeddings and language models through Hugging Face. GPU training and specialist inference require a connected execution service.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto pt-4">
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-200/80 dark:bg-[#0B0B0C] border border-slate-300 dark:border-white/10 overflow-x-auto max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-[#f3f3f1] text-[#0b0b0c] shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-[#8c9095] hover:text-slate-900 dark:hover:text-[#f3f3f1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-[#8c9095] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model or lab..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#0B0B0C] border border-slate-300 dark:border-white/10 rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-900 dark:text-[#f3f3f1] placeholder-slate-400 dark:placeholder-[#8c9095] focus:outline-none focus:border-[#FF2D16] shadow-sm"
            />
          </div>
        </div>

        {/* Orbit Visualization & Interactive Inspector */}
        <div className="relative rounded-2xl md:rounded-3xl bg-white dark:bg-[#0B0B0C] border border-slate-200 dark:border-white/10 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-lg dark:shadow-2xl transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Revolving Orbit Ring Canvas */}
            <div
              className="lg:col-span-7 relative aspect-square max-h-[500px] sm:max-h-[560px] mx-auto w-full flex items-center justify-center select-none"
              onMouseEnter={() => setIsOrbiting(false)}
              onMouseLeave={() => setIsOrbiting(true)}
            >
              {/* Concentric Decorative Rings */}
              <div className="absolute w-[85%] h-[85%] rounded-full border border-slate-300 dark:border-white/10 animate-[spin_120s_linear_infinite]" />
              <div className="absolute w-[62%] h-[62%] rounded-full border border-slate-300/80 dark:border-white/[0.07] border-dashed" />
              <div className="absolute w-[38%] h-[38%] rounded-full border border-[#FF2D16]/30 dark:border-[#FF2D16]/20" />

              {/* Central Citadel Core */}
              <div className="relative z-20 flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-slate-100 dark:bg-[#060606] border border-slate-300 dark:border-white/20 shadow-md dark:shadow-[0_0_30px_rgba(255,45,22,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#FF2D16] shadow-[0_0_10px_#FF2D16] mb-1.5 animate-pulse" />
                <span className="font-geist font-bold text-xs tracking-tight text-slate-900 dark:text-white">
                  Citadel Hub
                </span>
                <span className="font-mono-geist text-[10px] text-slate-500 dark:text-[#8c9095]">
                  HF Registry
                </span>
              </div>

              {/* Orbiting Model Capsules */}
              {filteredModels.slice(0, 8).map((model, idx) => {
                const total = Math.min(8, filteredModels.length);
                const baseAngle = (idx / total) * 360;
                const currentAngle = (baseAngle + rotationAngle) * (Math.PI / 180);
                const radiusPercent = 42; // orbit radius percentage
                const x = 50 + radiusPercent * Math.cos(currentAngle);
                const y = 50 + radiusPercent * Math.sin(currentAngle);

                const isSelected = selectedModel?.name === model.name;

                return (
                  <button
                    key={model.name}
                    onClick={() => setSelectedModel(model)}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-20 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono-geist transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FF2D16] text-white border border-[#FF2D16] shadow-[0_0_16px_rgba(255,45,22,0.5)] scale-110 z-30'
                        : 'bg-white/95 dark:bg-[#060606]/90 text-slate-800 dark:text-[#f3f3f1] border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/40 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D16]" />
                    <span className="font-medium whitespace-nowrap">{model.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Model Detail Card */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-[#060606] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6">
              {selectedModel ? (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-geist text-xs px-2.5 py-1 rounded-full bg-[#FF2D16]/10 text-[#FF2D16] border border-[#FF2D16]/20 font-medium">
                        {selectedModel.category} Model
                      </span>
                      <span className="font-mono-geist text-xs text-slate-500 dark:text-[#8c9095]">
                        Lab: {selectedModel.creator}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {selectedModel.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-[#8c9095] mt-1 font-mono-geist">
                        License: {selectedModel.license}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-[#8c9095] leading-relaxed pt-2 border-t border-slate-200 dark:border-white/5">
                      {selectedModel.highlight}
                    </p>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <div className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                        <span className="text-[10px] uppercase font-mono-geist text-slate-500 dark:text-[#8c9095] block">
                          Parameters
                        </span>
                        <span className="text-sm font-semibold font-mono-geist text-slate-900 dark:text-white">
                          {selectedModel.params}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/5">
                        <span className="text-[10px] uppercase font-mono-geist text-slate-500 dark:text-[#8c9095] block">
                          Context Window
                        </span>
                        <span className="text-sm font-semibold font-mono-geist text-slate-900 dark:text-white">
                          {selectedModel.context}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Wire Into Application CTA */}
                  <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-[#8c9095]">
                      <Check className="w-3.5 h-3.5 text-[#FF2D16]" />
                      <span>One-click API endpoint</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {onExploreAllModels && (
                        <button
                          onClick={onExploreAllModels}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-[#FF2D16] hover:bg-[#e02510] transition-colors cursor-pointer"
                        >
                          <span>Model Hub (30+)</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                      <a
                        href="https://huggingface.co/models"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-[#8c9095] hover:text-[#FF2D16] transition-colors"
                      >
                        <span>Hugging Face</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-slate-400 dark:text-[#8c9095] text-sm">
                  Select a model from the orbit to inspect parameters
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
