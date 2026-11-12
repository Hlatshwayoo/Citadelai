import React, { useState } from 'react';
import { X, Code, Eye, Sparkles, Terminal, Check, Laptop, Smartphone, Tablet } from 'lucide-react';

interface BuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const BuilderModal: React.FC<BuilderModalProps> = ({ isOpen, onClose, initialPrompt }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [viewSize, setViewSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [prompt, setPrompt] = useState(
    () => initialPrompt || 'Build an enterprise knowledge agent that queries contracts with citations.'
  );
  const [isCompiling, setIsCompiling] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    'citadel-build: v2.4 initialized',
    'fetching open weights: Qwen 2.5 72B (Apache 2.0)',
    'compiling schema & React UI components...',
    'bundling live preview iframe on port 3000',
    'status: ready for review',
  ]);

  if (!isOpen) return null;

  const handleRun = () => {
    setIsCompiling(true);
    setLogs((prev) => [...prev, `agent > prompt: "${prompt}"`, 'synthesizing revisions...']);
    setTimeout(() => {
      setIsCompiling(false);
      setLogs((prev) => [...prev, '✓ build successful: checkpoint #04 saved']);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[85vh] rounded-2xl bg-white dark:bg-[#0B0B0C] border border-slate-200 dark:border-white/15 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-[#f3f3f1] transition-colors duration-300">
        {/* Builder Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-[#060606]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D16] shadow-[0_0_8px_#FF2D16]" />
            <span className="font-geist font-semibold text-sm text-slate-900 dark:text-white">
              Citadel Builder Studio
            </span>
            <span className="font-mono-geist text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-[#8c9095]">
              sandbox-live
            </span>
          </div>

          {/* Device toggle */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-200 dark:bg-white/5 p-1 rounded-lg border border-slate-300 dark:border-white/10">
            <button
              onClick={() => setViewSize('desktop')}
              className={`p-1.5 rounded transition-colors ${
                viewSize === 'desktop'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-[#8c9095] hover:text-black dark:hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewSize('tablet')}
              className={`p-1.5 rounded transition-colors ${
                viewSize === 'tablet'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-[#8c9095] hover:text-black dark:hover:text-white'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewSize('mobile')}
              className={`p-1.5 rounded transition-colors ${
                viewSize === 'mobile'
                  ? 'bg-white dark:bg-white/15 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-[#8c9095] hover:text-black dark:hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-200 dark:bg-white/5 p-1 rounded-lg border border-slate-300 dark:border-white/10 text-xs font-mono-geist">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'preview' ? 'bg-[#FF2D16] text-white' : 'text-slate-600 dark:text-[#8c9095] hover:text-black dark:hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors cursor-pointer ${
                  activeTab === 'code' ? 'bg-[#FF2D16] text-white' : 'text-slate-600 dark:text-[#8c9095] hover:text-black dark:hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Source</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-black dark:text-[#8c9095] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Builder Work Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Prompt / Iteration Left Sidebar */}
          <div className="md:col-span-4 border-r border-slate-200 dark:border-white/10 p-5 flex flex-col justify-between bg-slate-50 dark:bg-[#080809] space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono-geist text-xs text-slate-500 dark:text-[#8c9095] uppercase tracking-wider">
                  Iteration Prompt
                </span>
                <span className="text-[11px] font-mono-geist text-[#FF2D16]">Live Connected</span>
              </div>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="w-full bg-white dark:bg-[#060606] border border-slate-300 dark:border-white/15 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#FF2D16] resize-none shadow-sm"
                placeholder="Instruct Citadel to make changes, add features, or update components..."
              />

              <button
                onClick={handleRun}
                disabled={isCompiling}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FF2D16] hover:bg-[#ff4430] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isCompiling ? 'Generating Revision...' : 'Run Specification'}</span>
              </button>

              {/* Console Logs */}
              <div className="pt-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono-geist text-slate-500 dark:text-[#8c9095] mb-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Build Logs</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 dark:bg-black/60 border border-slate-800 dark:border-white/5 font-mono-geist text-[10px] text-slate-300 dark:text-[#8c9095] h-36 overflow-y-auto space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className="truncate">
                      <span className="text-white/40">{'>'}</span> {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-200/50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-[11px] text-slate-600 dark:text-[#8c9095] flex items-center gap-2">
              <Check className="w-4 h-4 text-[#FF2D16] shrink-0" />
              <span>Full GitHub sync & standalone single-file HTML export ready.</span>
            </div>
          </div>

          {/* Right Main Stage: Preview / Code */}
          <div className="md:col-span-8 bg-slate-100 dark:bg-[#040404] p-4 sm:p-6 flex items-center justify-center overflow-auto">
            {activeTab === 'preview' ? (
              <div
                className={`bg-white dark:bg-[#0E0E10] border border-slate-300 dark:border-white/10 rounded-xl overflow-hidden shadow-xl dark:shadow-2xl transition-all duration-300 flex flex-col ${
                  viewSize === 'desktop'
                    ? 'w-full h-full'
                    : viewSize === 'tablet'
                    ? 'w-[720px] h-[520px]'
                    : 'w-[375px] h-[560px]'
                }`}
              >
                {/* Mock App Window Header */}
                <div className="px-4 py-2 bg-slate-100 dark:bg-[#141416] border-b border-slate-200 dark:border-white/5 flex items-center justify-between text-xs text-slate-600 dark:text-[#8c9095]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="font-mono-geist text-[11px] ml-2 text-slate-700 dark:text-white/70">
                      localhost:3000/app
                    </span>
                  </div>
                  <span className="font-mono-geist text-[10px] text-[#FF2D16]">v1.4-beta</span>
                </div>

                {/* Mock Application Screen */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Legal & Compliance Copilot</h4>
                      <p className="text-xs text-slate-500 dark:text-[#8c9095]">Connected to Qwen 2.5 72B · Citations verified</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#FF2D16]/10 text-[#FF2D16] text-xs font-mono-geist border border-[#FF2D16]/20">
                      Active SLA
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] text-slate-500 dark:text-[#8c9095] block">Indexed Contracts</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white font-mono-geist">1,482</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] text-slate-500 dark:text-[#8c9095] block">Inference Speed</span>
                      <span className="text-base font-bold text-[#FF2D16] font-mono-geist">42ms</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                      <span className="text-[10px] text-slate-500 dark:text-[#8c9095] block">Accuracy Score</span>
                      <span className="text-base font-bold text-slate-900 dark:text-white font-mono-geist">99.4%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-900 dark:text-white">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF2D16]" />
                      <span>Clause 14.2: Indemnification & Liability Limit</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-[#8c9095] leading-relaxed">
                      "Neither party shall be liable for consequential damages exceeding aggregate subscription fees paid in the previous twelve (12) month window."
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-[#060606] border border-slate-800 dark:border-white/10 rounded-xl p-4 font-mono-geist text-xs text-[#f3f3f1] overflow-auto">
                <pre className="text-emerald-400">// Citadel AI Application Scaffold</pre>
                <pre className="text-white/60">import React, {'{'} useState, useEffect {'}'} from 'react';</pre>
                <pre className="text-white/60">import {'{'} useCitadelModel {'}'} from '@citadel/react';</pre>
                <br />
                <pre className="text-blue-400">export default function ComplianceCopilot() {'{'}</pre>
                <pre className="text-white/80">  const {'{'} model, infer {'}'} = useCitadelModel('Qwen/Qwen2.5-72B-Instruct');</pre>
                <pre className="text-white/80">  const [result, setResult] = useState(null);</pre>
                <br />
                <pre className="text-white/80">  // Automated contract verification</pre>
                <pre className="text-white/80">  const queryClause = async (clauseText) =&gt; {'{'}</pre>
                <pre className="text-purple-400">    const response = await infer({'{'}</pre>
                <pre className="text-purple-400">      prompt: `Audit clause liability: ${'{'}clauseText{'}'}`,</pre>
                <pre className="text-purple-400">      maxTokens: 512,</pre>
                <pre className="text-purple-400">      temperature: 0.1</pre>
                <pre className="text-purple-400">    {'}'});</pre>
                <pre className="text-white/80">    setResult(response);</pre>
                <pre className="text-white/80">  {'}'};</pre>
                <pre className="text-blue-400">{'}'}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
