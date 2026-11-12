import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ArrowUp,
  Code2,
  Search,
  BookOpen,
  Github,
  UploadCloud,
  Sparkles,
  Check,
  X,
  FileCode,
  Layers,
  ArrowRight,
  Terminal,
  Mic,
  MicOff,
  Plus,
  Shuffle,
  Paperclip,
  Image as ImageIcon,
} from 'lucide-react';

interface BuildPageProps {
  onBackToHome?: () => void;
  onOpenAuth?: (action: 'signin' | 'signup') => void;
  onOpenBuilderModal?: (promptText?: string) => void;
  onNavigate?: (page: 'home' | 'build' | 'models') => void;
  userName?: string;
}

interface TemplateItem {
  id: string;
  icon: 'code' | 'search' | 'studio';
  title: string;
  description: string;
  prompt: string;
  tags: string[];
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'clinical-notes',
    icon: 'code',
    title: 'Clinical notes',
    description: 'A clinical note organizer with an editable form and search.',
    prompt: 'Build a clinical note organizer application with patient medical history, structured SOAP forms, fast full-text ICD-10 search, and export to PDF.',
    tags: ['Healthcare', 'Forms', 'Search'],
  },
  {
    id: 'knowledge-search',
    icon: 'search',
    title: 'Knowledge search',
    description: 'A document library with tags, search and a reading view.',
    prompt: 'Create a knowledge base document library with multi-tag filtering, hybrid semantic vector search, clean markdown reading view, and collaborative editing.',
    tags: ['Docs', 'Vector Search', 'Markdown'],
  },
  {
    id: 'story-studio',
    icon: 'studio',
    title: 'Story studio',
    description: 'A story writing app with chapters, characters and a library.',
    prompt: 'Design a story writing workspace with chapter navigation, character profiles with relation graphs, plot timeline board, and AI co-writer assist.',
    tags: ['Creative', 'Rich Text', 'State Machine'],
  },
];

// 4 smart, unique application examples using specific Hugging Face and Citadel AI models
const TYPING_IDEAS: string[] = [
  'Create a real-time speech to text medical scribe application using nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B from Hugging Face..',
  'Create a concept sketch to 3D asset generation application using speridlabs/idol from Hugging Face..',
  'Create a cinematic image to video animation application using Lightricks/LTX-2.5 on Hugging Face..',
  'Create an automated code generation and bug-patching application using Qwen/Qwen3.8-27B on Citadel AI..',
];

// Suggestion pools with iridescent gradient icons featuring smart, unique model applications
const SUGGESTION_POOLS = [
  [
    {
      title: 'Speech-to-text medical scribe',
      prompt: 'Create a real-time speech to text medical scribe application using nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B from Hugging Face with Citadel AI GPU acceleration.',
      gradient: 'from-[#4facfe] via-[#00f2fe] to-[#a18cd1]',
    },
    {
      title: 'Sketch-to-3D spatial studio',
      prompt: 'Create a concept sketch to 3D asset generation application using speridlabs/idol from Hugging Face with GLTF and Three.js viewport export.',
      gradient: 'from-[#ff9a9e] via-[#fecfef] to-[#96e6a1]',
    },
    {
      title: 'Image-to-video motion studio',
      prompt: 'Create a cinematic image to video animation application using Lightricks/LTX-2.5 on Hugging Face with keyframe timeline control.',
      gradient: 'from-[#ffecd2] via-[#fcb69f] to-[#ff9a9e]',
    },
  ],
  [
    {
      title: 'Autonomous code-to-app builder',
      prompt: 'Create an automated code generation and bug-patching application using Qwen/Qwen3.8-27B on Citadel AI with live browser sandbox execution.',
      gradient: 'from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4]',
    },
    {
      title: 'Text-to-speech voice clone platform',
      prompt: 'Create an expressive audiobook narration application using ConwayResearch/Underdog-Woof on Hugging Face with dynamic pitch modulation.',
      gradient: 'from-[#ff758c] via-[#ff7eb3] to-[#7028e4]',
    },
    {
      title: 'High-res visual storyboarder',
      prompt: 'Create a photorealistic storyboard generation application using black-forest-labs/flux-3-image-klein-comfy from Hugging Face.',
      gradient: 'from-[#43e97b] via-[#38f9d7] to-[#13547a]',
    },
  ],
  [
    {
      title: 'Document intelligence OCR parser',
      prompt: 'Create an automated receipt and legal contract analysis application using Comfy-Org/MiniMax-H3-Image on Hugging Face with schema validation.',
      gradient: 'from-[#fa709a] via-[#fee140] to-[#96e6a1]',
    },
    {
      title: 'Multimodal reasoning copilot',
      prompt: 'Create an autonomous scientific research copilot application using moonshotai/Kimi-K3.1-Pro with Citadel AI tool calling.',
      gradient: 'from-[#ff0844] via-[#ffb199] to-[#ffecd2]',
    },
    {
      title: 'Multi-lingual audio translator',
      prompt: 'Create a zero-latency speech translation application using Scantist/GLM-5.3-SLIM-GGUF from Hugging Face with WebSocket audio streaming.',
      gradient: 'from-[#00c6fb] via-[#005bea] to-[#9b51e0]',
    },
  ],
];

export const BuildPage: React.FC<BuildPageProps> = ({
  onBackToHome,
  onOpenAuth,
  onOpenBuilderModal,
  onNavigate,
  userName = 'Mandlaenkosi',
}) => {
  const [prompt, setPrompt] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [githubModalOpen, setGithubModalOpen] = useState(false);
  const [githubRepoUrl, setGithubRepoUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Typewriter effect state
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  // Extra controls: mic input, plus menu, shuffle suggestions
  const [isListening, setIsListening] = useState(false);
  const [plusMenuOpen, setPlusMenuOpen] = useState(false);
  const [suggestionPoolIndex, setSuggestionPoolIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter animation loop (types out 4 unique Citadel AI / Hugging Face ideas, erases, and cycles)
  useEffect(() => {
    // If user has entered their own prompt, pause typewriter animation
    if (prompt.trim().length > 0) return;

    const currentPhrase = TYPING_IDEAS[phraseIndex % TYPING_IDEAS.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (typedText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        }, 42 + Math.random() * 18);
      } else {
        // Pause at completion so user can read the prompt
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length - 1));
        }, 20);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPING_IDEAS.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex, prompt]);

  const handleStartBuilding = () => {
    const textToSubmit = prompt.trim() || typedText || 'Build a customer support dashboard with ticket search and AI summaries...';
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
      if (onOpenBuilderModal) {
        onOpenBuilderModal(textToSubmit);
      } else if (onOpenAuth) {
        onOpenAuth('signup');
      }
    }, 450);
  };

  const handleSelectTemplate = (template: TemplateItem) => {
    setSelectedTemplate(template.id);
    setPrompt(template.prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSelectSuggestion = (suggestionPrompt: string) => {
    setPrompt(suggestionPrompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleShuffleSuggestions = () => {
    setIsShuffling(true);
    setTimeout(() => {
      setSuggestionPoolIndex((prev) => (prev + 1) % SUGGESTION_POOLS.length);
      setIsShuffling(false);
    }, 200);
  };

  const handleToggleSpeech = () => {
    const SpeechRec =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRec) {
      if (!isListening) {
        setIsListening(true);
        setTimeout(() => {
          setPrompt('Build a mobile-first appointment booking platform with live chat and notifications');
          setIsListening(false);
        }, 1600);
      } else {
        setIsListening(false);
      }
      return;
    }

    try {
      if (isListening) {
        setIsListening(false);
        return;
      }
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setPrompt((prev) => (prev ? prev + ' ' + transcript : transcript));
      };
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleGithubImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubRepoUrl.trim()) return;
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportSuccess(true);
      setTimeout(() => {
        setGithubModalOpen(false);
        setImportSuccess(false);
        setPrompt(`Imported repository from ${githubRepoUrl}. Analyze dependencies, architecture, and configure deployment pipeline.`);
      }, 900);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImporting(true);
      setTimeout(() => {
        setImporting(false);
        setImportSuccess(true);
        setTimeout(() => {
          setImportModalOpen(false);
          setImportSuccess(false);
          setPrompt(`Imported bundle ${files[0].name} (${Math.round(files[0].size / 1024)} KB). Ready to generate workspace container.`);
        }, 800);
      }, 1000);
    }
  };

  const currentSuggestions = SUGGESTION_POOLS[suggestionPoolIndex];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] pt-28 sm:pt-36 pb-20 px-4 sm:px-8 lg:px-12 transition-colors duration-200">
      <div className="max-w-[1040px] mx-auto">
        {/* Header Section matching Screenshot with Personalized Name */}
        <div className="mb-8 sm:mb-10 text-center sm:text-left">
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-[#FF2D16] block mb-3">
            BUILD / CITADEL AI
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-950 dark:text-white leading-[1.12]">
            What do you want to build first,{' '}
            <span className="text-[#FF2D16]">{userName}?</span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-[#8C9095] max-w-2xl leading-relaxed">
            Describe your idea and Citadel will bring it to life. Choose a format or start typing below.
          </p>
        </div>

        {/* Outer Card with Connected Tabs (Lovable-style design matching screenshot) */}
        <div className="relative">
          {/* Top Tab: Web app */}
          <div className="flex items-end gap-1 sm:gap-2 px-1 sm:px-3 relative z-10">
            <div className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-t-2xl text-xs sm:text-sm font-semibold inline-flex items-center gap-2 select-none border-t border-x bg-white dark:bg-[#0c0d10] text-slate-950 dark:text-white border-slate-200/90 dark:border-white/10 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
              <Layers className="w-4 h-4 text-[#FF2D16]" />
              <span>Web app</span>
            </div>
          </div>

          {/* Main Prompt Card */}
          <div className="relative rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0c0d10] shadow-xl overflow-visible focus-within:border-slate-400 dark:focus-within:border-white/25 transition-all">
            {/* Textarea & Typewriter Box */}
            <div className="p-5 sm:p-7 pb-3 relative min-h-[140px] sm:min-h-[160px]">
              {/* Typewriter animated placeholder overlay (Visible when prompt is empty) */}
              {!prompt && (
                <div
                  onClick={() => textareaRef.current?.focus()}
                  className="absolute inset-x-5 sm:inset-x-7 top-5 sm:top-7 bottom-4 pointer-events-none select-none text-sm sm:text-base text-slate-400 dark:text-[#8C9095] leading-relaxed font-sans flex items-start"
                  aria-hidden="true"
                >
                  <span className="inline">
                    {typedText || (
                      <span className="text-slate-300 dark:text-white/20">
                        Describe your idea we will bring it to life..
                      </span>
                    )}
                    {/* Blinking Red Caret Cursor */}
                    <span className="inline-block w-[2px] h-[1.15em] bg-[#FF2D16] ml-0.5 align-middle animate-pulse" />
                  </span>
                </div>
              )}

              <textarea
                ref={textareaRef}
                id="build-prompt-textarea"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                    e.preventDefault();
                    handleStartBuilding();
                  } else if (e.key === 'Tab' && !prompt && typedText) {
                    e.preventDefault();
                    setPrompt(typedText);
                  }
                }}
                className="w-full bg-transparent resize-none text-sm sm:text-base text-slate-900 dark:text-white placeholder-transparent focus:outline-none leading-relaxed font-sans relative z-10"
              />
            </div>

            {/* Bottom Bar: Action buttons matching Screenshot */}
            <div className="pt-3 pb-4 px-5 sm:px-7 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60 dark:bg-white/[0.01] rounded-b-2xl sm:rounded-b-3xl">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-2 sm:gap-2.5 relative">
                {/* Plus button with quick upload dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setPlusMenuOpen(!plusMenuOpen)}
                    className="w-8 h-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-white/25 bg-white dark:bg-white/[0.03] transition-colors cursor-pointer"
                    title="Add attachment or codebase"
                    aria-label="Add attachment"
                  >
                    <Plus className={`w-4 h-4 transition-transform ${plusMenuOpen ? 'rotate-45 text-[#FF2D16]' : ''}`} />
                  </button>

                  {/* Plus dropdown menu */}
                  {plusMenuOpen && (
                    <div className="absolute left-0 bottom-10 z-30 w-56 rounded-2xl bg-white dark:bg-[#14151a] border border-slate-200 dark:border-white/10 shadow-2xl p-2 py-2 animate-in fade-in duration-150">
                      <button
                        onClick={() => {
                          setPlusMenuOpen(false);
                          setImportModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer text-left"
                      >
                        <UploadCloud className="w-4 h-4 text-[#FF6A00]" />
                        <span>Upload codebase (.zip)</span>
                      </button>

                      <button
                        onClick={() => {
                          setPlusMenuOpen(false);
                          setGithubModalOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer text-left"
                      >
                        <Github className="w-4 h-4 text-[#1E3A8A]" />
                        <span>Import from GitHub</span>
                      </button>

                      <label className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 cursor-pointer text-left">
                        <ImageIcon className="w-4 h-4 text-[#FF2D16]" />
                        <span>Attach screenshot / mock</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setPlusMenuOpen(false);
                            if (e.target.files && e.target.files[0]) {
                              setPrompt((prev) => `${prev ? prev + '\n' : ''}[Attached mockup: ${e.target.files![0].name}]`);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                {/* Import App Button (Vibrant Orange per user request) */}
                <button
                  onClick={() => setImportModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#FF6A00] hover:bg-[#ea5f00] active:scale-[0.98] shadow-sm transition-all cursor-pointer"
                >
                  <UploadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  <span>Import app</span>
                </button>

                {/* From GitHub Button with Dark Blue Logo */}
                <button
                  onClick={() => setGithubModalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:border-slate-400 dark:hover:border-white/25 bg-white dark:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E3A8A]" />
                  <span>From GitHub</span>
                </button>
              </div>

              {/* Right Action Buttons: Speech Mic + Build Button */}
              <div className="flex items-center gap-2">
                {/* Microphone / Speech button */}
                <button
                  onClick={handleToggleSpeech}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                    isListening
                      ? 'bg-[#FF2D16]/15 text-[#FF2D16] ring-2 ring-[#FF2D16] animate-pulse'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                  title={isListening ? 'Listening... click to stop' : 'Voice input (Speech to text)'}
                  aria-label="Voice input"
                >
                  {isListening ? <MicOff className="w-4 h-4 text-[#FF2D16]" /> : <Mic className="w-4 h-4" />}
                </button>

                {/* Build Action Button (Red with white text) */}
                <button
                  onClick={handleStartBuilding}
                  disabled={isBuilding}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2 rounded-full sm:rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#FF2D16] hover:bg-[#e02510] active:scale-[0.98] transition-all shadow-md cursor-pointer"
                >
                  {isBuilding ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Planning...</span>
                    </>
                  ) : (
                    <>
                      <span>Build</span>
                      <ArrowUp className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Pills Section matching Screenshot */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-[#8C9095] mb-3">
            <span>Not sure where to start? Try these</span>
            <button
              onClick={handleShuffleSuggestions}
              className="p-1 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Shuffle new suggestions"
              aria-label="Shuffle suggestions"
            >
              <Shuffle className={`w-3.5 h-3.5 text-[#FF2D16] ${isShuffling ? 'rotate-180 transition-transform duration-300' : ''}`} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {currentSuggestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSuggestion(item.prompt)}
                className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] hover:border-slate-400/80 dark:hover:border-white/25 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.06] shadow-sm hover:shadow transition-all cursor-pointer"
              >
                {/* Iridescent bubble icon matching screenshot */}
                <span
                  className={`w-3.5 h-3.5 rounded-full bg-gradient-to-br ${item.gradient} shadow-inner shrink-0 group-hover:scale-110 transition-transform`}
                />
                <span className="truncate max-w-[260px] sm:max-w-none">{item.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Start from a template section */}
        <div className="mt-14 sm:mt-16">
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8C9095] block mb-4">
            START FROM A TEMPLATE
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`group rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#FF2D16] dark:border-[#FF2D16] bg-slate-100/80 dark:bg-white/[0.04] shadow-md ring-1 ring-[#FF2D16]/50'
                      : 'border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0c0d10] hover:border-slate-400/80 dark:hover:border-white/25 hover:shadow-lg'
                  }`}
                >
                  <div>
                    {/* Top row with icon and arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FF2D16]/10 text-[#FF2D16]">
                        {tmpl.icon === 'code' && <Code2 className="w-4 h-4" />}
                        {tmpl.icon === 'search' && <Search className="w-4 h-4" />}
                        {tmpl.icon === 'studio' && <Layers className="w-4 h-4" />}
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-[#FF2D16] transition-colors mb-1.5">
                      {tmpl.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8C9095] leading-relaxed">
                      {tmpl.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-1.5 flex-wrap">
                    {tmpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Footer Section matching screenshot */}
        <div className="mt-20 pt-10 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onBackToHome) onBackToHome();
              }}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <img
                src="/images/F3JGQVuvf0ncladOrYlacmg9juI.png"
                alt="Citadel AI"
                className="h-8 w-auto object-contain dark:filter dark:invert group-hover:scale-[1.02] transition-transform"
              />
            </a>

            <div className="flex items-center gap-6 text-xs sm:text-sm font-medium text-[#FF2D16] dark:text-[#FF2D16]">
              <button
                onClick={() => {
                  if (onNavigate) onNavigate('home');
                  setTimeout(() => {
                    const el = document.getElementById('capabilities');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 80);
                }}
                className="hover:underline cursor-pointer"
              >
                Pricing
              </button>
              <a href="#privacy" className="hover:underline">
                Privacy
              </a>
              <a href="#terms" className="hover:underline">
                Terms
              </a>
              <a href="#refunds" className="hover:underline">
                Refunds
              </a>
            </div>
          </div>

          <div className="text-left text-xs text-slate-500 dark:text-[#6B6F73]">
            © 2026 Citadel AI · Independent platform, not affiliated with NVIDIA.
          </div>
        </div>
      </div>

      {/* Import App Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setImportModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF2D16]/10 text-[#FF2D16] flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Import application
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#8c9095]">
                  Upload a ZIP or folder archive of your codebase
                </p>
              </div>
            </div>

            <div className="mt-4 border-2 border-dashed border-slate-300 dark:border-white/15 rounded-xl p-8 text-center hover:border-[#FF2D16] transition-colors cursor-pointer relative">
              <input
                type="file"
                accept=".zip,.tar,.gz,.json"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <FileCode className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                Click or drag file to upload
              </p>
              <span className="text-[11px] text-slate-400 block mt-1">
                Supports .zip, package.json, or repository bundles
              </span>
            </div>

            {importing && (
              <div className="mt-4 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <span className="w-3.5 h-3.5 border-2 border-[#FF2D16] border-t-transparent rounded-full animate-spin" />
                <span>Extracting files and dependencies...</span>
              </div>
            )}

            {importSuccess && (
              <div className="mt-4 flex items-center gap-2 text-xs text-[#22c55e] font-medium">
                <Check className="w-4 h-4" />
                <span>Application bundle imported successfully!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GitHub Import Modal */}
      {githubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setGithubModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-[#0c192e] text-[#1E3A8A] flex items-center justify-center">
                <Github className="w-5 h-5 text-[#1E3A8A]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Clone from GitHub
                </h3>
                <p className="text-xs text-slate-500 dark:text-[#8c9095]">
                  Import a public or authenticated Git repository
                </p>
              </div>
            </div>

            <form onSubmit={handleGithubImport} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Repository URL
                </label>
                <input
                  type="text"
                  required
                  placeholder="https://github.com/organization/repo"
                  value={githubRepoUrl}
                  onChange={(e) => setGithubRepoUrl(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#18191d] border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#FF2D16]"
                />
              </div>

              {importing && (
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="w-3.5 h-3.5 border-2 border-[#FF2D16] border-t-transparent rounded-full animate-spin" />
                  <span>Cloning branch and parsing workspace...</span>
                </div>
              )}

              {importSuccess && (
                <div className="flex items-center gap-2 text-xs text-[#22c55e] font-medium">
                  <Check className="w-4 h-4" />
                  <span>Repository connected!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGithubModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={importing || !githubRepoUrl.trim()}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-[#FF2D16] hover:bg-[#e02510] disabled:opacity-50 cursor-pointer shadow-sm transition-all"
                >
                  Import Repository
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
