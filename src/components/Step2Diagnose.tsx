/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CurrentDiagnosis, QuadrantId } from '../types';
import { InteractiveMatrix } from './InteractiveMatrix';
import { ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

interface Step2DiagnoseProps {
  diagnosis: CurrentDiagnosis;
  onToggleQuadrant: (id: QuadrantId) => void;
  onRationaleChange: (rationale: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step2Diagnose: React.FC<Step2DiagnoseProps> = ({
  diagnosis,
  onToggleQuadrant,
  onRationaleChange,
  onNext,
  onPrev,
}) => {
  const isComplete = diagnosis.selectedQuadrants.length > 0;

  return (
    <section aria-labelledby="step2-heading" className="max-w-5xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#DC5300]/15 dark:from-[#DC5300]/10 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC5300]" />
          <span>Step 2: Diagnose Using The Human-AI Matrix</span>
        </div>
        <h2 id="step2-heading" className="text-2xl sm:text-3xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
          Where does your current activity sit?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-3xl font-medium">
          Select one or more quadrants that best capture how learners currently interact with AI in this activity.
          Remember: no quadrant is inherently good or bad—this is an honest diagnosis of where cognitive agency and structuring currently sit.
        </p>
      </div>

      {/* Interactive 2x2 Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
          <span className="font-bold text-[#232D4B] dark:text-slate-200">
            Click quadrant(s) to select or deselect:
          </span>
          <span className="bg-white/70 dark:bg-white/10 px-2.5 py-1 rounded-md border border-white/60 dark:border-white/10 font-semibold text-[#232D4B] dark:text-[#FFD300]">
            {diagnosis.selectedQuadrants.length === 0
              ? 'None selected yet'
              : `${diagnosis.selectedQuadrants.length} quadrant(s) selected`}
          </span>
        </div>

        <InteractiveMatrix
          mode="interactive"
          selectedQuadrants={diagnosis.selectedQuadrants}
          onToggleQuadrant={onToggleQuadrant}
          showDescriptions={true}
        />
      </div>

      {/* Rationale Reflection Field */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-md">
        <label htmlFor="diagnosis-rationale" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
          “Why did you place the activity here?”
        </label>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">
          Reflect on what the learner is actually doing versus what AI does. Who determines the questions, the criteria, and the final quality judgements?
        </p>
        <textarea
          id="diagnosis-rationale"
          rows={4}
          value={diagnosis.rationale}
          onChange={(e) => onRationaleChange(e.target.value)}
          placeholder="e.g. In our current design, students rely on ChatGPT to generate outline options, so AI is providing structure, but students are not actively required to interrogate that structure before drafting..."
          className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#232D4B] dark:focus:ring-[#FFD300] focus:border-transparent transition-all text-sm leading-relaxed font-medium"
        />
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-white/10">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-white/80 dark:border-white/10 font-bold text-sm transition-all hover:shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Define</span>
        </button>

        <div className="text-xs text-slate-500 text-right">
          {!isComplete && (
            <span className="text-amber-800 dark:text-amber-300 font-semibold bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40 block">
              Select at least one quadrant to proceed.
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!isComplete}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl font-extrabold text-sm transition-all shadow-md ${
            isComplete
              ? 'bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] text-white hover:shadow-xl hover:scale-[1.02] cursor-pointer'
              : 'bg-stone-300 dark:bg-slate-800 text-stone-500 dark:text-slate-600 cursor-not-allowed opacity-75'
          }`}
        >
          <span>Examine Cognitive Work</span>
          <ArrowRight className="w-4 h-4 text-[#FFD300]" />
        </button>
      </div>
    </section>
  );
};
