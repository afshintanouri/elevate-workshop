/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CapabilityCheck } from '../types';
import { CAPABILITY_EVIDENCE_ITEMS } from '../config/matrixConfig';
import { ArrowLeft, ArrowRight, ShieldAlert, Award } from 'lucide-react';

interface Step6CapabilityProps {
  capability: CapabilityCheck;
  onToggleEvidence: (item: string) => void;
  onChangeField: (field: keyof CapabilityCheck, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step6Capability: React.FC<Step6CapabilityProps> = ({
  capability,
  onToggleEvidence,
  onChangeField,
  onNext,
  onPrev,
}) => {
  const isComplete =
    capability.selectedEvidence.length > 0 ||
    capability.ultimateDemonstration.trim().length > 0;

  return (
    <section aria-labelledby="step6-heading" className="max-w-5xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#DC5300]/15 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC5300]" />
          <span>Step 6: Capability Check & Assessment</span>
        </div>
        <h2 id="step6-heading" className="text-2xl sm:text-3xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
          “How will you know capability has developed?”
        </h2>

        {/* Central Assessment Provocation */}
        <div className="mt-4 p-5 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/80 dark:border-white/10 rounded-2xl flex items-start gap-3.5 shadow-2xs">
          <ShieldAlert className="w-5 h-5 text-[#DC5300] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9]">
              “A polished output is not necessarily strong evidence of human capability.”
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              When AI can generate articulate essays, immaculate code, and plausible strategy decks in seconds, grading the cosmetic finish evaluates the tool, not the human. What cognitive fingerprints prove capability?
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Capability Evidence Checkboxes */}
      <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-5">
        <div>
          <h3 className="text-lg font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
            “What evidence would convince you that the learner is genuinely capable?”
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
            Select all observable behaviors, defenses, and critical interrogations you will look for:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {CAPABILITY_EVIDENCE_ITEMS.map((item) => {
            const isChecked = capability.selectedEvidence.includes(item);
            return (
              <label
                key={item}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-white dark:bg-[#1E293B] border-[#232D4B] dark:border-[#FFD300] text-[#232D4B] dark:text-[#FFD300] font-bold shadow-sm ring-1 ring-[#232D4B]/20 dark:ring-[#FFD300]/20'
                    : 'border-white/80 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleEvidence(item)}
                  className="mt-0.5 rounded text-[#232D4B] focus:ring-[#232D4B] w-4 h-4 shrink-0"
                />
                <span className="leading-snug">{item}</span>
              </label>
            );
          })}
        </div>

        {/* Other Evidence Textarea */}
        <div className="pt-2">
          <label htmlFor="other-evidence" className="block text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9] uppercase tracking-wider mb-1.5">
            Other Distinct Evidence of Capability:
          </label>
          <textarea
            id="other-evidence"
            rows={2}
            value={capability.otherEvidence}
            onChange={(e) => onChangeField('otherEvidence', e.target.value)}
            placeholder="e.g. Real-time oral defense under live faculty questioning, blind audit of AI-suggested code vulnerabilities..."
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-xs leading-relaxed font-medium"
          />
        </div>
      </div>

      {/* Section 2: Ultimate Demonstration & Accountability */}
      <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-6">
        <div>
          <label htmlFor="ultimate-demonstration" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
            “What will learners ultimately produce or demonstrate?”
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            Describe the authentic artifact, performance, or defense through which learners exhibit their synthesis and agency.
          </p>
          <textarea
            id="ultimate-demonstration"
            rows={3}
            value={capability.ultimateDemonstration}
            onChange={(e) => onChangeField('ultimateDemonstration', e.target.value)}
            placeholder="e.g. A 10-minute executive presentation with 10 minutes of live interrogation, accompanied by a 2-page decision memorandum documenting rejected AI proposals..."
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm leading-relaxed font-medium"
          />
        </div>

        <div>
          <label htmlFor="final-accountability" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
            “Who remains accountable for the final judgement or decision?”
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            Establish the locus of professional, clinical, ethical, or organisational responsibility.
          </p>
          <textarea
            id="final-accountability"
            rows={2}
            value={capability.finalAccountability}
            onChange={(e) => onChangeField('finalAccountability', e.target.value)}
            placeholder="e.g. The human learner bears 100% legal, ethical, and organizational accountability for every recommendation submitted..."
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm leading-relaxed font-medium"
          />
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-white/10">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-white/80 dark:border-white/10 font-bold text-sm transition-all hover:shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Journey Sequence</span>
        </button>

        <div className="text-xs text-slate-500 dark:text-slate-400 text-right">
          {!isComplete && (
            <span className="text-amber-800 dark:text-amber-400 font-semibold bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40 block">
              Select capability evidence or specify demonstration.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          className={`inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-extrabold text-sm transition-all shadow-md ${
            isComplete
              ? 'bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] dark:from-[#3D4C75] dark:via-[#2A3554] dark:to-[#171F33] text-white hover:shadow-xl hover:scale-[1.02] cursor-pointer'
              : 'bg-stone-300 dark:bg-slate-700 text-stone-500 dark:text-slate-400 cursor-not-allowed opacity-75'
          }`}
        >
          <span>Generate Journey Plan</span>
          <ArrowRight className="w-4 h-4 text-[#FFD300]" />
        </button>
      </div>
    </section>
  );
};
