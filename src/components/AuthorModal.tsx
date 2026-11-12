/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, GraduationCap, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { AUTHOR_ATTRIBUTION } from '../config/matrixConfig';

interface AuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorModal: React.FC<AuthorModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHOR_ATTRIBUTION.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="author-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
    >
      <div className="bg-white dark:bg-[#121826] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 dark:border-white/10 space-y-5 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#232D4B] dark:bg-[#28365E] flex items-center justify-center text-[#FFD300] shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 id="author-modal-title" className="text-lg font-extrabold text-[#232D4B] dark:text-[#F1F5F9]">
                {AUTHOR_ATTRIBUTION.name}
              </h3>
              <p className="text-xs font-semibold text-[#DC5300]">
                {AUTHOR_ATTRIBUTION.frameworkName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-[#F8F5EE] dark:bg-[#1E2638] border border-[#E8E2D5] dark:border-white/10 rounded-xl space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#232D4B] dark:text-[#FFD300]">
              Academic & Pedagogical Framework
            </div>
            <p className="font-medium text-slate-800 dark:text-slate-200">
              The <strong>Human-AI Learning Journey Framework</strong> and the four-quadrant developmental matrix (<em>Enhance, Empower, Adopt, Transform</em>) represent the scholarly work and instructional design of <strong>{AUTHOR_ATTRIBUTION.name}</strong>.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Developed for the interactive masterclass: <em>“Building Workforce Capability That Matters in the Age of AI”</em>.
            </p>
          </div>

          <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Collaborations, Workshops & Inquiries
            </div>
            <p className="text-slate-600">
              For academic collaborations, keynotes, institutional workshops, or feedback regarding learning design in higher education and industry capability development:
            </p>
            <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
              <a
                href={`mailto:${AUTHOR_ATTRIBUTION.email}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-[#232D4B] text-white hover:bg-[#1C243C] font-semibold text-xs rounded-lg transition-colors shadow-2xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#FFD300]" />
                <span>{AUTHOR_ATTRIBUTION.email}</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[11px] text-slate-400">
          <span>© {AUTHOR_ATTRIBUTION.copyrightYear} {AUTHOR_ATTRIBUTION.name}. All rights reserved.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-[#232D4B] bg-[#F6EEE1] hover:bg-[#EFE5D3] rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
