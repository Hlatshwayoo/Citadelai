import React, { useState, useMemo } from 'react';
import {
  Search,
  Zap,
  ArrowUpDown,
  Heart,
  Download,
  Clock,
  Cpu,
  Copy,
  Check,
  X,
  Play,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';

export interface ModelItem {
  id: string;
  name: string;
  org: string;
  fullName: string;
  task: string;
  taskColor: string; // color for the task indicator dot
  params?: string;
  paramGroup: '<1B' | '6B' | '12B' | '32B' | '128B' | '500B' | '>500B';
  updatedAt: string;
  downloads: string;
  downloadsCount: number;
  likes: string;
  likesCount: number;
  inferenceAvailable: boolean;
  libraries: string[];
  description: string;
  license: string;
  architecture: string;
  badge?: string;
}

export const INITIAL_MODELS: ModelItem[] = [
  {
    id: 'deepseek-v4-pro-qwen',
    org: 'xtools-at',
    name: 'DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic',
    fullName: 'xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '9B',
    paramGroup: '6B',
    updatedAt: 'Updated 3 days ago',
    downloads: '16.7k',
    downloadsCount: 16700,
    likes: '2k',
    likesCount: 2000,
    inferenceAvailable: true,
    libraries: ['Transformers', 'PyTorch', 'Safetensors', 'GGUF'],
    description: 'Fine-tuned 9B instruction-following model with extended contextual reasoning and multi-turn dialogue capabilities.',
    license: 'Apache-2.0',
    architecture: 'Qwen3.5',
  },
  {
    id: 'speridlabs-idol',
    org: 'speridlabs',
    name: 'idol',
    fullName: 'speridlabs/idol',
    task: 'Image to 3D',
    taskColor: '#06b6d4',
    params: '1.4B',
    paramGroup: '<1B',
    updatedAt: 'Updated 12 days ago',
    downloads: '28.3k',
    downloadsCount: 28300,
    likes: '1.96k',
    likesCount: 1960,
    inferenceAvailable: false,
    libraries: ['PyTorch', 'Safetensors'],
    description: 'Feed-forward reconstruction network converting single-view portrait images into high-resolution Gaussian splats and 3D textured meshes.',
    license: 'MIT',
    architecture: 'IdolNeRF',
  },
  {
    id: 'minimax-h3-image',
    org: 'MiniMaxAI',
    name: 'MiniMax-H3-Image',
    fullName: 'MiniMaxAI/MiniMax-H3-Image',
    task: 'Text to image',
    taskColor: '#ec4899',
    params: '12B',
    paramGroup: '12B',
    updatedAt: 'Updated 10 hours ago',
    downloads: '143k',
    downloadsCount: 143000,
    likes: '648',
    likesCount: 648,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'Safetensors', 'Transformers'],
    description: 'Next-generation flow-matching diffusion transformer designed for hyper-accurate typography rendering and multi-subject consistency.',
    license: 'OpenRAIL',
    architecture: 'DiT-Flow',
  },
  {
    id: 'moonshot-kimi-k31',
    org: 'moonshotai',
    name: 'Kimi-K3.1-Pro',
    fullName: 'moonshotai/Kimi-K3.1-Pro',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '2.8T',
    paramGroup: '>500B',
    updatedAt: 'Updated 6 days ago',
    downloads: '33.6k',
    downloadsCount: 33600,
    likes: '1.91k',
    likesCount: 1910,
    inferenceAvailable: true,
    libraries: ['Transformers', 'PyTorch'],
    description: 'Long-context multimodal model scaling up to 2 million tokens of visual document comprehension, diagrams, and video reasoning.',
    license: 'Custom Commercial',
    architecture: 'MoE-2.8T',
  },
  {
    id: 'ricursive-ripple-65b',
    org: 'ricursiveAI',
    name: 'Ripple-65B-Preview',
    fullName: 'ricursiveAI/Ripple-65B-Preview',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '65B',
    paramGroup: '32B',
    updatedAt: 'Updated 1 day ago',
    downloads: '7.11k',
    downloadsCount: 7110,
    likes: '505',
    likesCount: 505,
    inferenceAvailable: false,
    libraries: ['Transformers', 'Safetensors', 'GGUF'],
    description: 'Sparse recurrent architecture optimized for low-latency speculative decoding and streaming code translation.',
    license: 'Apache-2.0',
    architecture: 'Ripple-v2',
  },
  {
    id: 'lightricks-ltx-25',
    org: 'Lightricks',
    name: 'LTX-2.5',
    fullName: 'Lightricks/LTX-2.5',
    task: 'Image to video',
    taskColor: '#a855f7',
    params: '8B',
    paramGroup: '6B',
    updatedAt: 'Updated 1 month ago',
    downloads: '2.85M',
    downloadsCount: 2850000,
    likes: '11.5k',
    likesCount: 11500,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'PyTorch', 'Safetensors'],
    description: 'Ultra-fast real-time video generation model with temporal motion priors capable of generating 1080p clips at 30 fps.',
    license: 'Apache-2.0',
    architecture: 'SpatialTemporal-DiT',
  },
  {
    id: 'nous-arete-27b',
    org: 'NousResearch',
    name: 'Arete-27B',
    fullName: 'NousResearch/Arete-27B',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '27B',
    paramGroup: '32B',
    updatedAt: 'Updated 4 days ago',
    downloads: '4.02k',
    downloadsCount: 4020,
    likes: '422',
    likesCount: 422,
    inferenceAvailable: true,
    libraries: ['Transformers', 'Safetensors', 'GGUF', 'MLX'],
    description: 'Hermes-aligned model refined for complex multi-step theorem proving, agentic tool dispatch, and JSON structured schemas.',
    license: 'Apache-2.0',
    architecture: 'Gemma-2-27B',
  },
  {
    id: 'davidau-qwen-fusion',
    org: 'DavidAU',
    name: 'Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF',
    fullName: 'DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '27B',
    paramGroup: '32B',
    updatedAt: 'Updated 17 hours ago',
    downloads: '1.53M',
    downloadsCount: 1530000,
    likes: '2.89k',
    likesCount: 2890,
    inferenceAvailable: false,
    libraries: ['GGUF', 'Transformers'],
    description: 'High-density Frankenbland merge fusing 7 domain-specialized weights for coding, vision parsing, and mathematical olympiad proofs.',
    license: 'Apache-2.0',
    architecture: 'Qwen-MTP',
  },
  {
    id: 'ccore-qwen-3d-coder',
    org: 'ccore',
    name: 'Qwen3.5-4B-3D-Coder',
    fullName: 'ccore/Qwen3.5-4B-3D-Coder',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '5B',
    paramGroup: '6B',
    updatedAt: 'Updated 5 days ago',
    downloads: '344.7k',
    downloadsCount: 344700,
    likes: '1k',
    likesCount: 1000,
    inferenceAvailable: true,
    libraries: ['Transformers', 'PyTorch', 'Safetensors', 'GGUF'],
    description: 'Lightweight code generation specialist pre-trained on 400B tokens of GLSL shaders, Three.js scenes, and CAD geometry scripts.',
    license: 'Apache-2.0',
    architecture: 'Qwen-Code',
  },
  {
    id: 'qwen-38-27b',
    org: 'Qwen',
    name: 'Qwen3.8-27B',
    fullName: 'Qwen/Qwen3.8-27B',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '28B',
    paramGroup: '32B',
    updatedAt: 'Updated 4 days ago',
    downloads: '7.23M',
    downloadsCount: 7230000,
    likes: '19.6k',
    likesCount: 19600,
    inferenceAvailable: true,
    libraries: ['Transformers', 'Safetensors', 'GGUF', 'MLX', 'ONNX'],
    description: 'Flagship multilingual open weights model excelling across coding, logical reasoning, and high-fidelity image parsing benchmark suites.',
    license: 'Apache-2.0',
    architecture: 'Qwen3.8-Dense',
  },
  {
    id: 'webai-twil-8b',
    org: 'webAI-Official',
    name: 'TwiL-8B',
    fullName: 'webAI-Official/TwiL-8B',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '9B',
    paramGroup: '6B',
    updatedAt: 'Updated 3 days ago',
    downloads: '47.1k',
    downloadsCount: 47100,
    likes: '294',
    likesCount: 294,
    inferenceAvailable: false,
    libraries: ['Transformers', 'ONNX', 'Safetensors'],
    description: 'On-device model optimized for browser-based WebGPU runtime and client-side privacy-first execution.',
    license: 'MIT',
    architecture: 'Llama-v4',
  },
  {
    id: 'viggle-remake',
    org: 'Viggle',
    name: 'Viggle-Remake',
    fullName: 'Viggle/Viggle-Remake',
    task: 'Text to video',
    taskColor: '#ec4899',
    params: '4B',
    paramGroup: '6B',
    updatedAt: 'Updated 3 days ago',
    downloads: '136.2k',
    downloadsCount: 136200,
    likes: '290',
    likesCount: 290,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'PyTorch'],
    description: 'Character rigging and kinematic motion-transfer model generating photorealistic human choreography from driving skeletons.',
    license: 'Non-Commercial',
    architecture: 'Motion-DiT',
  },
  {
    id: 'unsloth-qwen-gguf',
    org: 'unsloth',
    name: 'Qwen3.8-Flash-Next-GGUF',
    fullName: 'unsloth/Qwen3.8-Flash-Next-GGUF',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '14B',
    paramGroup: '12B',
    updatedAt: 'Updated 4 days ago',
    downloads: '1.97M',
    downloadsCount: 1970000,
    likes: '1.59k',
    likesCount: 1590,
    inferenceAvailable: true,
    libraries: ['GGUF', 'Transformers'],
    description: 'Quantized with Unsloth dynamic k-quants, achieving near 16-bit perplexity with 60% memory savings and 2x faster token generation.',
    license: 'Apache-2.0',
    architecture: 'Qwen-Flash',
  },
  {
    id: 'bfl-flux-klein',
    org: 'black-forest-labs',
    name: 'flux-3-image-klein-comfy',
    fullName: 'black-forest-labs/flux-3-image-klein-comfy',
    task: 'Image to image',
    taskColor: '#ec4899',
    params: '12B',
    paramGroup: '12B',
    updatedAt: 'Updated 8 days ago',
    downloads: '1.27M',
    downloadsCount: 1270000,
    likes: '2.93k',
    likesCount: 2930,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'Safetensors'],
    description: 'Distilled 4-step image transformation checkpoint delivering rapid style transfers, structural inpainting, and palette harmonization.',
    license: 'FLUX.1-dev-License',
    architecture: 'FLUX-3-Klein',
  },
  {
    id: 'comfy-minimax',
    org: 'Comfy-Org',
    name: 'MiniMax-H3-Image',
    fullName: 'Comfy-Org/MiniMax-H3-Image',
    task: 'Text to image',
    taskColor: '#ec4899',
    params: '12B',
    paramGroup: '12B',
    updatedAt: 'Updated 5 hours ago',
    downloads: '351.8k',
    downloadsCount: 351800,
    likes: '235',
    likesCount: 235,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'Safetensors'],
    description: 'ComfyUI packaged node release with full native fp8 and bf16 safetensors support for consumer GPUs.',
    license: 'Apache-2.0',
    architecture: 'DiT-Comfy',
  },
  {
    id: 'baidu-ernie-55',
    org: 'baidu',
    name: 'ERNIE-5.5-Flash-Base',
    fullName: 'baidu/ERNIE-5.5-Flash-Base',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '286B',
    paramGroup: '128B',
    updatedAt: 'Updated 6 days ago',
    downloads: '2.55k',
    downloadsCount: 2550,
    likes: '267',
    likesCount: 267,
    inferenceAvailable: false,
    libraries: ['Transformers', 'PyTorch'],
    description: 'Knowledge-enhanced base model trained with multi-modal pre-alignment across Chinese and English corpora.',
    license: 'Baidu Open Research',
    architecture: 'ERNIE-MoE',
  },
  {
    id: 'videorebirth-hyperflow',
    org: 'VideoRebirthAI',
    name: 'hyperflow-h3-flash',
    fullName: 'VideoRebirthAI/hyperflow-h3-flash',
    task: 'Text to video',
    taskColor: '#a855f7',
    params: '14B',
    paramGroup: '12B',
    updatedAt: 'Updated 10 hours ago',
    downloads: '241.6k',
    downloadsCount: 241600,
    likes: '195',
    likesCount: 195,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'PyTorch'],
    description: 'High-framerate video synthesis model with sub-second generation latencies per second of output footage.',
    license: 'MIT',
    architecture: 'HyperFlow-DiT',
  },
  {
    id: 'mradermacher-gemma-4',
    org: 'mradermacher',
    name: 'gemma-4-31B-it-ARA-heretic-GGUF',
    fullName: 'mradermacher/gemma-4-31B-it-ARA-heretic-GGUF',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '31B',
    paramGroup: '32B',
    updatedAt: 'Updated 3 days ago',
    downloads: '78.2k',
    downloadsCount: 78200,
    likes: '203',
    likesCount: 203,
    inferenceAvailable: false,
    libraries: ['GGUF', 'Transformers'],
    description: 'Google Gemma-4 derivative tuned for high precision Arabic and multilingual conversational synthesis.',
    license: 'Gemma Terms',
    architecture: 'Gemma-4',
  },
  {
    id: 'facebook-sam3',
    org: 'facebook',
    name: 'sam3',
    fullName: 'facebook/sam3',
    task: 'Any-to-Any',
    taskColor: '#06b6d4',
    params: '860M',
    paramGroup: '<1B',
    updatedAt: 'Updated 11 months ago',
    downloads: '2.05M',
    downloadsCount: 2050000,
    likes: '6.33k',
    likesCount: 6330,
    inferenceAvailable: true,
    libraries: ['PyTorch', 'ONNX', 'Transformers'],
    description: 'Segment Anything Model 3. Zero-shot instance segmentation for video streams, point clouds, and geospatial imagery.',
    license: 'Apache-2.0',
    architecture: 'ViT-H-SAM',
  },
  {
    id: 'tencent-qwen-dspine',
    org: 'tencent',
    name: 'Qwen3.8-27B-DSpine-b16',
    fullName: 'tencent/Qwen3.8-27B-DSpine-b16',
    task: 'Text generation',
    taskColor: '#22c55e',
    params: '2B',
    paramGroup: '<1B',
    updatedAt: 'Updated 2 days ago',
    downloads: '3.24k',
    downloadsCount: 3240,
    likes: '184',
    likesCount: 184,
    inferenceAvailable: false,
    libraries: ['Transformers', 'PyTorch'],
    description: 'Pruned and distillation-boosted spine network for real-time customer support routing and intent extraction.',
    license: 'Apache-2.0',
    architecture: 'DSpine-v2',
  },
  {
    id: 'deepseek-v41-flash',
    org: 'deepseek-ai',
    name: 'DeepSeek-V4.1-Flash-1017',
    fullName: 'deepseek-ai/DeepSeek-V4.1-Flash-1017',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '763B',
    paramGroup: '>500B',
    updatedAt: 'Updated 1 day ago',
    downloads: '348.9k',
    downloadsCount: 348900,
    likes: '5.49k',
    likesCount: 5490,
    inferenceAvailable: true,
    libraries: ['Transformers', 'Safetensors', 'GGUF'],
    description: 'DeepSeek mixture-of-experts model with Multi-head Latent Attention (MLA) and DeepSeekMoE architecture.',
    license: 'MIT',
    architecture: 'DeepSeekMoE-V4.1',
  },
  {
    id: 'nvidia-nemotron-transcribe',
    org: 'nvidia',
    name: 'NVIDIA-Nemotron-3.5-Transcribe-30B-A4B',
    fullName: 'nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B',
    task: 'Any-to-Any',
    taskColor: '#eab308',
    params: '34B',
    paramGroup: '32B',
    updatedAt: 'Updated 12 days ago',
    downloads: '74.3k',
    downloadsCount: 74300,
    likes: '3.16k',
    likesCount: 3160,
    inferenceAvailable: true,
    libraries: ['Transformers', 'PyTorch', 'TensorRT-LLM', 'Safetensors'],
    description: 'Ultra-accurate multilingual automatic speech recognition and real-time audio translation with speaker diarization.',
    license: 'NVIDIA Open Model License',
    architecture: 'Nemotron-ASR',
  },
  {
    id: 'conway-underdog-woof',
    org: 'ConwayResearch',
    name: 'Underdog-Woof',
    fullName: 'ConwayResearch/Underdog-Woof',
    task: 'Text to speech',
    taskColor: '#f97316',
    params: '850M',
    paramGroup: '<1B',
    updatedAt: 'Updated 5 days ago',
    downloads: '10',
    downloadsCount: 10,
    likes: '164',
    likesCount: 164,
    inferenceAvailable: false,
    libraries: ['PyTorch', 'Safetensors'],
    description: 'End-to-end voice synthesis system supporting zero-shot acoustic cloning from 3-second reference audio.',
    license: 'CC-BY-NC-4.0',
    architecture: 'FlowTTS',
  },
  {
    id: 'prunaai-p-h3-comfy',
    org: 'PrunaAI',
    name: 'P-H3-Image-Comfy',
    fullName: 'PrunaAI/P-H3-Image-Comfy',
    task: 'Text to image',
    taskColor: '#ec4899',
    params: '12B',
    paramGroup: '12B',
    updatedAt: 'Updated 8 days ago',
    downloads: '899.1k',
    downloadsCount: 899100,
    likes: '302',
    likesCount: 302,
    inferenceAvailable: true,
    libraries: ['Diffusers', 'Safetensors'],
    description: 'Smash-optimized checkpoint delivering 3.4x speedup on NVIDIA RTX 4090 with zero perceptual quality degradation.',
    license: 'Apache-2.0',
    architecture: 'PrunaDiT',
  },
  {
    id: 'cactus-mirage',
    org: 'Cactus-Compute',
    name: 'mirage',
    fullName: 'Cactus-Compute/mirage',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '8B',
    paramGroup: '6B',
    updatedAt: 'Updated 4 days ago',
    downloads: '14.6k',
    downloadsCount: 14600,
    likes: '156',
    likesCount: 156,
    inferenceAvailable: false,
    libraries: ['Transformers', 'PyTorch'],
    description: 'Compact visual question-answering model with real-time bounding box prediction and spatial relationship extraction.',
    license: 'Apache-2.0',
    architecture: 'Mirage-V8',
  },
  {
    id: 'sc117-qwen-flash',
    org: 'SC117',
    name: 'Qwen3.8-Flash-Next-6SQ-RC0-obliterated-GGUF',
    fullName: 'SC117/Qwen3.8-Flash-Next-6SQ-RC0-obliterated-GGUF',
    task: 'Image-Text-to-Text',
    taskColor: '#3b82f6',
    params: '14B',
    paramGroup: '12B',
    updatedAt: 'Updated 18 days ago',
    downloads: '4.21M',
    downloadsCount: 4210000,
    likes: '858',
    likesCount: 858,
    inferenceAvailable: true,
    libraries: ['GGUF', 'Transformers'],
    description: 'High-speed quants with calibrated activations specifically benchmarked for simultaneous multi-camera video feed summarization.',
    license: 'Apache-2.0',
    architecture: 'Qwen3.8-6SQ',
  },
];

const ALL_TASKS = [
  { name: 'Text generation', color: '#22c55e' },
  { name: 'Image-Text-to-Text', color: '#3b82f6' },
  { name: 'Any-to-Any', color: '#06b6d4' },
  { name: 'Text to video', color: '#a855f7' },
  { name: 'Image to video', color: '#8b5cf6' },
  { name: 'Image to 3D', color: '#0ea5e9' },
  { name: 'Text to image', color: '#ec4899' },
  { name: 'Image to image', color: '#f43f5e' },
];

const EXTRA_TASKS = [
  { name: 'Text to speech', color: '#f97316' },
  { name: 'Speech to text', color: '#eab308' },
  { name: 'Mask generation', color: '#10b981' },
  { name: '3D Coder', color: '#6366f1' },
  { name: 'Video to video', color: '#d946ef' },
  { name: 'Embeddings', color: '#14b8a6' },
  { name: 'Audio to Audio', color: '#f59e0b' },
  { name: 'Unconditional image generation', color: '#84cc16' },
];

const PARAM_OPTIONS = ['<1B', '6B', '12B', '32B', '128B', '500B', '>500B'] as const;
const LIBRARY_OPTIONS = [
  'Transformers',
  'Diffusers',
  'GGUF',
  'PyTorch',
  'Safetensors',
  'Sentence Transformers',
  'ONNX',
  'MLX',
];

interface ModelHubProps {
  onBackToHome?: () => void;
  onOpenBuilder?: (model?: ModelItem) => void;
  onOpenAuth?: (action: 'signin' | 'signup') => void;
}

export const ModelHub: React.FC<ModelHubProps> = ({
  onBackToHome,
  onOpenBuilder,
  onOpenAuth,
}) => {
  // Tabs: Discover vs My library
  const [activeTab, setActiveTab] = useState<'discover' | 'library'>('discover');

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [selectedParam, setSelectedParam] = useState<string | null>(null);
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  const [onlyInference, setOnlyInference] = useState(false);
  const [sortBy, setSortBy] = useState<'trending' | 'downloads' | 'likes' | 'recent' | 'name'>('trending');
  const [showMoreTasks, setShowMoreTasks] = useState(false);

  // Saved/liked models in library
  const [savedModelIds, setSavedModelIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('citadel-saved-models');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default initial saved models for demonstration
    return ['deepseek-v4-pro-qwen', 'qwen-38-27b', 'lightricks-ltx-25'];
  });

  // Selected Model for Quick Drawer / Modal view
  const [selectedModel, setSelectedModel] = useState<ModelItem | null>(null);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testingInference, setTestingInference] = useState(false);

  const toggleSaveModel = (e: React.MouseEvent, modelId: string) => {
    e.stopPropagation();
    setSavedModelIds((prev) => {
      const next = prev.includes(modelId) ? prev.filter((id) => id !== modelId) : [...prev, modelId];
      try {
        localStorage.setItem('citadel-saved-models', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const toggleLibrary = (lib: string) => {
    setSelectedLibraries((prev) =>
      prev.includes(lib) ? prev.filter((l) => l !== lib) : [...prev, lib]
    );
  };

  // Filter & Sort Logic
  const filteredModels = useMemo(() => {
    return INITIAL_MODELS.filter((item) => {
      if (activeTab === 'library' && !savedModelIds.includes(item.id)) {
        return false;
      }
      if (onlyInference && !item.inferenceAvailable) {
        return false;
      }
      if (selectedTask && item.task !== selectedTask) {
        return false;
      }
      if (selectedParam && item.paramGroup !== selectedParam) {
        return false;
      }
      if (selectedLibraries.length > 0) {
        const hasAll = selectedLibraries.some((lib) => item.libraries.includes(lib));
        if (!hasAll) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.fullName.toLowerCase().includes(query);
        const matchesTask = item.task.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesTask && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'trending') return b.likesCount + b.downloadsCount / 1000 - (a.likesCount + a.downloadsCount / 1000);
      if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
      if (sortBy === 'likes') return b.likesCount - a.likesCount;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // recent (default list order)
    });
  }, [activeTab, savedModelIds, onlyInference, selectedTask, selectedParam, selectedLibraries, searchQuery, sortBy]);

  const handleTestPrompt = () => {
    if (!promptInput.trim()) return;
    setTestingInference(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingInference(false);
      setTestResult(
        `Generated response from ${selectedModel?.name || 'Citadel Engine'}:\n\n` +
          `Execution latency: 42ms | GPU compute: V100/A100 cluster\n` +
          `Output tokens: 128 | Memory footprint: 1.2 GB\n\n` +
          `Analysis of "${promptInput}":\n` +
          `Optimal inference pipeline converged with 99.4% confidence score across all attention weights.`
      );
    }, 700);
  };

  const copyCodeSnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const hasActiveFilters = Boolean(
    selectedTask || selectedParam || selectedLibraries.length > 0 || onlyInference || searchQuery
  );

  const resetAllFilters = () => {
    setSelectedTask(null);
    setSelectedParam(null);
    setSelectedLibraries([]);
    setOnlyInference(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#060606] text-slate-900 dark:text-[#f3f3f1] pt-24 sm:pt-28 pb-20 px-4 sm:px-8 lg:px-12 max-w-[1440px] mx-auto transition-colors duration-200">
      {/* Top Banner / Heading Section matching Screenshot */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
        <div>
          <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase text-[#B5DB1B] dark:text-[#C6E726] block mb-2">
            OPEN MODELS / LIMITLESS POSSIBILITIES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">
            Model hub
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-[#8C9095]">
            Find the right intelligence for your next idea.
          </p>
        </div>

        {/* Right side tab pills: Discover vs My library */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-200/70 dark:bg-[#121316] p-1 rounded-xl border border-slate-300/80 dark:border-white/10">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer focus:outline-none ${
              activeTab === 'discover'
                ? 'bg-white dark:bg-[#202227] text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-[#8c9095] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF2D16]" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer focus:outline-none ${
              activeTab === 'library'
                ? 'bg-white dark:bg-[#202227] text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-[#8c9095] hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Check className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>My library</span>
            <span className="ml-1 text-[11px] px-1.5 py-0.2 rounded-full bg-slate-300 dark:bg-white/10 text-slate-800 dark:text-slate-200">
              {savedModelIds.length}
            </span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="mt-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
        {/* Left Sidebar: Filters */}
        <aside className="w-full lg:w-72 shrink-0 space-y-7">
          {/* Header with clear filters if active */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8c9095]">
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#FF2D16] hover:underline cursor-pointer font-medium"
              >
                Reset all
              </button>
            )}
          </div>

          {/* Tasks Filter */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Tasks
            </span>
            <div className="flex flex-wrap gap-2">
              {ALL_TASKS.map((task) => {
                const isSelected = selectedTask === task.name;
                return (
                  <button
                    key={task.name}
                    onClick={() => setSelectedTask(isSelected ? null : task.name)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-sm'
                        : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-[#8c9095] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: task.color }}
                    />
                    <span>{task.name}</span>
                  </button>
                );
              })}

              {/* Extra expandable tasks */}
              {showMoreTasks &&
                EXTRA_TASKS.map((task) => {
                  const isSelected = selectedTask === task.name;
                  return (
                    <button
                      key={task.name}
                      onClick={() => setSelectedTask(isSelected ? null : task.name)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-sm'
                          : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-[#8c9095] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/25'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: task.color }}
                      />
                      <span>{task.name}</span>
                    </button>
                  );
                })}

              <button
                onClick={() => setShowMoreTasks(!showMoreTasks)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-dashed border-slate-300 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span>{showMoreTasks ? 'Show less' : '+ 11'}</span>
                {showMoreTasks ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Parameters Filter */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Parameters
              </span>
              {selectedParam && (
                <button
                  onClick={() => setSelectedParam(null)}
                  className="text-[11px] text-[#FF2D16] hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Segmented Bar like Screenshot */}
            <div className="grid grid-cols-7 gap-1 bg-slate-200/80 dark:bg-[#121316] p-1 rounded-lg border border-slate-300/80 dark:border-white/10">
              {PARAM_OPTIONS.map((param) => {
                const isSelected = selectedParam === param;
                return (
                  <button
                    key={param}
                    onClick={() => setSelectedParam(isSelected ? null : param)}
                    className={`py-1 text-[11px] font-mono font-medium rounded transition-all text-center cursor-pointer ${
                      isSelected
                        ? 'bg-[#B5DB1B] dark:bg-[#C6E726] text-black font-bold shadow-sm'
                        : 'text-slate-700 dark:text-[#8c9095] hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {param}
                  </button>
                );
              })}
            </div>
            {/* Visual indicator bar under selection */}
            <div className="mt-1 h-0.5 w-full bg-slate-300 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#B5DB1B] dark:bg-[#C6E726] transition-all duration-300 ${
                  selectedParam ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          </div>

          {/* Libraries Filter */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Libraries
            </span>
            <div className="flex flex-wrap gap-2">
              {LIBRARY_OPTIONS.map((lib) => {
                const isSelected = selectedLibraries.includes(lib);
                return (
                  <button
                    key={lib}
                    onClick={() => toggleLibrary(lib)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white'
                        : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-[#8c9095] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20'
                    }`}
                  >
                    {lib}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Main Content Area: Model Cards Grid */}
        <section className="flex-1 min-w-0 w-full">
          {/* Top Control Bar: Count + Search + Inference Toggle + Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-5">
            {/* Models count */}
            <div className="text-sm font-medium text-slate-900 dark:text-white shrink-0">
              <span className="font-semibold">Models</span>{' '}
              <span className="text-slate-500 dark:text-[#8c9095]">
                {filteredModels.length} shown
              </span>
            </div>

            {/* Search Input & Action Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1 sm:justify-end">
              {/* Search Bar */}
              <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#6B6F73] focus:outline-none focus:border-[#FF2D16] dark:focus:border-[#FF2D16] transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Inference Available Toggle */}
              <button
                onClick={() => setOnlyInference(!onlyInference)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                  onlyInference
                    ? 'bg-[#FF2D16] text-white border-[#FF2D16] shadow-sm'
                    : 'bg-white dark:bg-[#121316] text-slate-700 dark:text-[#8c9095] border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${onlyInference ? 'text-white' : 'text-amber-400'}`} />
                <span>Inference Available</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative inline-block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white dark:bg-[#121316] border border-slate-200 dark:border-white/10 rounded-xl pl-3 pr-8 py-2 text-xs font-medium text-slate-700 dark:text-[#8c9095] hover:border-slate-400 dark:hover:border-white/20 focus:outline-none cursor-pointer"
                >
                  <option value="trending">Sort: Trending</option>
                  <option value="downloads">Sort: Most downloads</option>
                  <option value="likes">Sort: Most likes</option>
                  <option value="recent">Sort: Recently updated</option>
                  <option value="name">Sort: Name (A-Z)</option>
                </select>
                <ArrowUpDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
              </div>
            </div>
          </div>

          {/* List of Model Cards */}
          {filteredModels.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-white/15 p-12 text-center bg-white/50 dark:bg-[#0c0d10]">
              <Cpu className="w-10 h-10 mx-auto text-slate-400 mb-3" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                No matching models found
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-[#8c9095] mt-1 max-w-md mx-auto">
                Try clearing your search query or adjusting task and parameter filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-full bg-[#FF2D16] text-white hover:bg-[#e02510] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredModels.map((model) => {
                const isSaved = savedModelIds.includes(model.id);

                return (
                  <div
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className="group relative rounded-xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0e0f12] hover:border-slate-400/80 dark:hover:border-white/25 hover:shadow-md transition-all p-3.5 sm:p-4 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left info */}
                      <div className="flex-1 min-w-0">
                        {/* Title Row with Org Glyph */}
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 dark:bg-white/10 text-[10px] font-mono text-slate-700 dark:text-slate-300 shrink-0 font-bold">
                            {model.org.slice(0, 2).toUpperCase()}
                          </span>

                          <h3 className="text-sm sm:text-[15px] font-medium font-mono text-slate-900 dark:text-white group-hover:text-[#FF2D16] dark:group-hover:text-white transition-colors truncate">
                            {model.fullName}
                          </h3>
                        </div>

                        {/* Metadata row with dot, tasks, specs, downloads, likes */}
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-[#8c9095]">
                          {/* Task badge */}
                          <div className="inline-flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: model.taskColor }}
                            />
                            <span>{model.task}</span>
                          </div>

                          {/* Parameters */}
                          {model.params && (
                            <span className="font-mono text-slate-500 dark:text-[#6b6f73]">
                              ⚙ {model.params}
                            </span>
                          )}

                          {/* Updated */}
                          <span>• {model.updatedAt}</span>

                          {/* Downloads */}
                          <span className="inline-flex items-center gap-1">
                            • <Download className="w-3 h-3" /> {model.downloads}
                          </span>

                          {/* Inference Available Icon */}
                          {model.inferenceAvailable && (
                            <span className="inline-flex items-center gap-0.5 text-amber-500 dark:text-amber-400 font-semibold" title="Instant Inference Available">
                              • <Zap className="w-3 h-3 fill-current" />
                            </span>
                          )}

                          {/* Likes */}
                          <span className="inline-flex items-center gap-1">
                            • <Heart className="w-3 h-3" /> {model.likes}
                          </span>
                        </div>
                      </div>

                      {/* Right side quick actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Save to library heart button */}
                        <button
                          onClick={(e) => toggleSaveModel(e, model.id)}
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/50 text-[#FF2D16]'
                              : 'bg-slate-100 dark:bg-white/5 border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-white'
                          }`}
                          title={isSaved ? 'Remove from My library' : 'Save to My library'}
                        >
                          <Heart
                            className={`w-4 h-4 ${isSaved ? 'fill-current text-[#FF2D16]' : ''}`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Footnote matching the screenshot */}
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10 text-center text-xs text-slate-500 dark:text-[#6B6F73]">
            Model references and dataset selections are saved to your account. GPU downloads, inference and fine-tuning are not connected.
          </div>
        </section>
      </div>

      {/* Model Detail Drawer / Modal when clicked */}
      {selectedModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#101114] border border-slate-200 dark:border-white/10 rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Close button */}
            <button
              onClick={() => {
                setSelectedModel(null);
                setTestResult(null);
                setPromptInput('');
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 text-xs font-mono font-bold text-slate-800 dark:text-white shrink-0">
                {selectedModel.org.slice(0, 3).toUpperCase()}
              </span>
              <div>
                <span className="text-xs text-slate-500 dark:text-[#8c9095]">
                  {selectedModel.org}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {selectedModel.name}
                </h2>
              </div>
            </div>

            {/* Badges row */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedModel.taskColor }}
                />
                {selectedModel.task}
              </span>
              {selectedModel.params && (
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-slate-200">
                  ⚙ {selectedModel.params}
                </span>
              )}
              {selectedModel.inferenceAvailable && (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" /> Inference Ready
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-[#8c9095]">
                {selectedModel.license}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedModel.description}
            </p>

            {/* Compatible Libraries */}
            <div className="mt-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8c9095] block mb-2">
                Supported Libraries & Formats
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedModel.libraries.map((lib) => (
                  <span
                    key={lib}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                  >
                    {lib}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Inference Test Playground */}
            {selectedModel.inferenceAvailable && (
              <div className="mt-6 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0c0d0f]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#FF2D16]" /> Quick Playground
                  </span>
                  <span className="text-[11px] text-[#22c55e] font-mono font-medium">
                    ● Cluster Online
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Test prompt with ${selectedModel.name}...`}
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTestPrompt()}
                    className="flex-1 bg-white dark:bg-[#18191d] border border-slate-300 dark:border-white/10 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#FF2D16]"
                  />
                  <button
                    onClick={handleTestPrompt}
                    disabled={testingInference || !promptInput.trim()}
                    className="px-4 py-2 rounded-lg bg-[#FF2D16] text-white text-xs font-semibold hover:bg-[#e02510] disabled:opacity-50 cursor-pointer flex items-center gap-1"
                  >
                    {testingInference ? (
                      <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>Run</span>
                  </button>
                </div>

                {testResult && (
                  <pre className="mt-3 p-3 rounded bg-black/90 text-[#22c55e] text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                    {testResult}
                  </pre>
                )}
              </div>
            )}

            {/* Integration Code Snippet */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#8c9095]">
                  Python Integration
                </span>
                <button
                  onClick={() =>
                    copyCodeSnippet(
                      `import citadel\n\nclient = citadel.Client()\nresponse = client.models.generate(\n    model="${selectedModel.fullName}",\n    prompt="Synthesize architecture diagram for real-time pipeline"\n)\nprint(response.output)`
                    )
                  }
                  className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  {copiedSnippet ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 text-xs font-mono overflow-x-auto leading-relaxed border border-white/10">
                <code>{`import citadel

client = citadel.Client()
response = client.models.generate(
    model="${selectedModel.fullName}",
    prompt="Synthesize architecture diagram for real-time pipeline"
)
print(response.output)`}</code>
              </pre>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 flex items-center justify-between gap-3 pt-5 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={(e) => toggleSaveModel(e, selectedModel.id)}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  savedModelIds.includes(selectedModel.id)
                    ? 'border-red-500/40 text-[#FF2D16] bg-red-50 dark:bg-red-950/30'
                    : 'border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/20'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${
                    savedModelIds.includes(selectedModel.id) ? 'fill-current' : ''
                  }`}
                />
                <span>
                  {savedModelIds.includes(selectedModel.id) ? 'Saved in library' : 'Save model'}
                </span>
              </button>

              <button
                onClick={() => {
                  setSelectedModel(null);
                  if (onOpenBuilder) {
                    onOpenBuilder(selectedModel);
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#FF2D16] hover:bg-[#e02510] shadow-md transition-all cursor-pointer"
              >
                <span>Deploy to Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
