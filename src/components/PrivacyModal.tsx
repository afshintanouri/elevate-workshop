/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, X, HardDrive, Lock, EyeOff } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-opacity"
    >
      <div className="bg-white dark:bg-[#121826] rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 dark:border-white/10 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#77915D]/20 flex items-center justify-center text-[#5B7945] dark:text-[#A8C78B] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 id="privacy-modal-title" className="text-lg font-extrabold text-slate-900 dark:text-white">
                100% Client-Side Privacy
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Your reflections stay on your device</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="flex items-start gap-3 p-3.5 bg-stone-50 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10">
            <HardDrive className="w-4 h-4 text-[#232D4B] dark:text-[#FFD300] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block mb-0.5">Local Browser Storage Only</strong>
              All entered learning designs, quadrant analyses, and pedagogical sequences are saved exclusively to your browser's local storage (<code>localStorage</code>).
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-stone-50 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10">
            <Lock className="w-4 h-4 text-[#232D4B] dark:text-[#FFD300] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block mb-0.5">No Backend, Server, or Database</strong>
              This application has zero servers, zero external databases, and zero tracking scripts. No data ever transmits over the network.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-stone-50 dark:bg-white/5 rounded-2xl border border-stone-200 dark:border-white/10">
            <EyeOff className="w-4 h-4 text-[#232D4B] dark:text-[#FFD300] shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block mb-0.5">No External AI API Calls</strong>
              The diagnostic observations and capability evaluations are strictly deterministic, rule-based algorithms. Your proprietary curricula and assessments are never fed into any model training corpus.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end pt-3 border-t border-stone-100 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-extrabold text-[#232D4B] bg-[#FFD300] hover:bg-[#ffe043] rounded-xl transition-all cursor-pointer shadow-md hover:scale-[1.02]"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
