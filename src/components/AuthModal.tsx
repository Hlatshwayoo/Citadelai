import React, { useState } from 'react';
import { X, ArrowRight, Github, Mail, Shield, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'signin' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'signup',
  onClose,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#0B0B0C] border border-slate-200 dark:border-white/15 p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-[#f3f3f1] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-500 hover:text-black dark:text-[#8c9095] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FF2D16]" />
            <span className="font-mono-geist text-xs text-slate-500 dark:text-[#8c9095] uppercase">
              Citadel Workspace
            </span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {mode === 'signup' ? 'Start building AI applications' : 'Welcome back to Citadel'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-[#8c9095]">
            {mode === 'signup'
              ? 'Join engineering teams shipping with unified cloud builds and open models.'
              : 'Enter your work email to access your account workspace and projects.'}
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FF2D16]/20 text-[#FF2D16] flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white">Verification link sent</h4>
            <p className="text-xs text-slate-600 dark:text-[#8c9095]">
              We sent a secure magic sign-in link to <span className="font-medium text-slate-900 dark:text-white">{email}</span>. Click to launch your Citadel workspace.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 w-full py-2.5 px-4 rounded-full bg-[#0b0b0c] dark:bg-[#f3f3f1] text-white dark:text-[#0b0b0c] text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {/* OAuth Quick Options */}
            <div className="space-y-3">
              <button
                onClick={() => setSubmitted(true)}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-xs sm:text-sm font-medium text-slate-900 dark:text-white transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Continue with GitHub</span>
              </button>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 dark:text-[#8c9095]">
              <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
              <span>or email</span>
              <div className="h-px bg-slate-200 dark:bg-white/10 flex-1" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-[#8c9095] mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 dark:text-[#8c9095] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-[#060606] border border-slate-300 dark:border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#8c9095] focus:outline-none focus:border-[#FF2D16] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#FF2D16] hover:bg-[#ff4430] text-white text-sm font-semibold transition-colors shadow-lg cursor-pointer"
              >
                <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                className="text-xs text-slate-600 dark:text-[#8c9095] hover:text-[#FF2D16] transition-colors"
              >
                {mode === 'signup'
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Start building free"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-[#8c9095]/70 pt-2 border-t border-slate-200 dark:border-white/5">
              <Shield className="w-3.5 h-3.5 text-[#FF2D16]" />
              <span>End-to-end encrypted · SOC 2 Type II compliant</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
