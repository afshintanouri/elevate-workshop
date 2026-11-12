/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { JourneyStage, QuadrantId } from '../types';
import { MATRIX_QUADRANTS, SUGGESTED_JOURNEY_TEMPLATES } from '../config/matrixConfig';
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface Step5SequenceProps {
  journey: JourneyStage[];
  onAddStage: (quadrantId: QuadrantId) => void;
  onUpdateStage: (id: string, field: keyof JourneyStage, value: string) => void;
  onRemoveStage: (id: string) => void;
  onMoveStage: (index: number, direction: 'up' | 'down') => void;
  onApplyTemplate: (template: typeof SUGGESTED_JOURNEY_TEMPLATES[0]) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step5Sequence: React.FC<Step5SequenceProps> = ({
  journey,
  onAddStage,
  onUpdateStage,
  onRemoveStage,
  onMoveStage,
  onApplyTemplate,
  onNext,
  onPrev,
}) => {
  const hasStages = journey.length > 0;
  // Check if every stage has a completed why/rationale
  const missingWhy = journey.some((s) => !s.rationale || s.rationale.trim().length === 0);
  const isValid = hasStages && !missingWhy;

  return (
    <section aria-labelledby="step5-heading" className="max-w-5xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#FFD300]/15 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC5300]" />
          <span>Step 5: Sequence The Learning Arc</span>
        </div>
        <h2 id="step5-heading" className="text-2xl sm:text-3xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
          “Build the learning journey.”
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-3xl">
          Assemble the deliberate trajectory of your learning design. There is deliberately no prescribed order: Enhance is not automatically the start, nor is Transform automatically the destination.
        </p>

        {/* Central Thesis Banner */}
        <div className="mt-4 p-4 bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/80 dark:border-white/10 rounded-2xl text-[#232D4B] dark:text-[#F1F5F9] text-xs sm:text-sm leading-relaxed shadow-2xs">
          <strong className="text-[#DC5300]">Key Principle:</strong> “There is no universal correct journey. The important question is whether the movement is deliberate and supports the capability you want to develop.”
        </div>
      </div>

      {/* Recommended Journey Arcs Bar */}
      <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9]">
            <Sparkles className="w-4 h-4 text-[#DC5300]" />
            <span>Inspirational Pedagogical Journey Arcs:</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold bg-white/60 dark:bg-white/10 px-2 py-0.5 rounded-md border border-white/60 dark:border-white/10">
            Click to load a pre-designed sequence template
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {SUGGESTED_JOURNEY_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              type="button"
              onClick={() => onApplyTemplate(tmpl)}
              className="text-xs px-3.5 py-2 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-white/80 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 hover:text-[#232D4B] dark:hover:text-white hover:shadow-md transition-all font-semibold text-left shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </div>

      {/* Add Stage Selector Buttons */}
      <div className="glass-panel rounded-3xl p-6 shadow-md">
        <span className="block text-xs font-extrabold uppercase tracking-widest text-[#232D4B] dark:text-[#F1F5F9] mb-3">
          + Add A Stage To Your Journey Sequence:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['ENHANCE', 'EMPOWER', 'ADOPT', 'SHAPE'] as QuadrantId[]).map((qid) => {
            const q = MATRIX_QUADRANTS[qid];
            return (
              <button
                key={qid}
                type="button"
                onClick={() => onAddStage(qid)}
                className="p-4 rounded-2xl border transition-all hover:shadow-lg cursor-pointer flex flex-col justify-between group hover:scale-[1.02] bg-white/70 dark:bg-white/5 backdrop-blur-md"
                style={{
                  borderColor: q.colors.accent,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md text-white shadow-2xs"
                      style={{ backgroundColor: q.colors.accent }}
                    >
                      {q.name}
                    </span>
                    <Plus className="w-4 h-4 text-[#232D4B] dark:text-[#FFD300] group-hover:scale-125 transition-transform" />
                  </div>
                  <div className="text-xs font-extrabold text-[#232D4B] dark:text-white leading-snug mt-1">
                    {q.shortDescription}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2.5">
                  {q.literacyEmphasis} Literacy
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Journey Sequence Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#232D4B] dark:text-[#F1F5F9]">
            Journey Sequence Timeline ({journey.length} {journey.length === 1 ? 'Stage' : 'Stages'})
          </h3>
          {journey.length > 0 && (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Stages can be reordered or customized below
            </span>
          )}
        </div>

        {journey.length === 0 ? (
          <div className="p-10 text-center glass-panel rounded-3xl border-2 border-dashed border-stone-300 dark:border-white/10 text-slate-500 dark:text-slate-400">
            <p className="text-sm font-bold text-[#232D4B] dark:text-[#F1F5F9] mb-1">Your journey sequence is currently empty.</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any of the quadrant buttons above or choose an inspirational arc to add your first stage.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {journey.map((stage, index) => {
              const q = MATRIX_QUADRANTS[stage.quadrantId];
              const isWhyMissing = !stage.rationale || stage.rationale.trim().length === 0;

              return (
                <div
                  key={stage.id}
                  className="glass-panel rounded-3xl p-6 sm:p-7 shadow-lg relative transition-all border-2"
                  style={{ borderColor: q.colors.accent }}
                >
                  {/* Top Bar of Stage Card */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-stone-200/80 dark:border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#232D4B] dark:bg-[#FFD300] text-[#FFD300] dark:text-[#232D4B] font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-white/40">
                        {index + 1}
                      </span>
                      <span
                        className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-lg text-white shadow-2xs"
                        style={{ backgroundColor: q.colors.accent }}
                      >
                        {q.name}
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 hidden sm:inline">
                        “{q.shortDescription}”
                      </span>
                    </div>

                    {/* Stage Ordering & Delete Controls */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onMoveStage(index, 'up')}
                        disabled={index === 0}
                        aria-label={`Move stage ${index + 1} up`}
                        className="p-2 rounded-xl bg-white/80 dark:bg-white/10 border border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onMoveStage(index, 'down')}
                        disabled={index === journey.length - 1}
                        aria-label={`Move stage ${index + 1} down`}
                        className="p-2 rounded-xl bg-white/80 dark:bg-white/10 border border-white/80 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveStage(stage.id)}
                        aria-label={`Remove stage ${index + 1}`}
                        className="p-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/40 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/60 transition-colors ml-1 shadow-2xs cursor-pointer"
                        title="Remove Stage"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Stage Title */}
                  <div className="mb-4">
                    <label className="block text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9] uppercase tracking-wider mb-1.5">
                      Stage Title / Learning Activity:
                    </label>
                    <input
                      type="text"
                      value={stage.stageTitle}
                      onChange={(e) => onUpdateStage(stage.id, 'stageTitle', e.target.value)}
                      placeholder="e.g. Critical Evaluation of AI Diagnostic Model"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FFD300]"
                    />
                  </div>

                  {/* 3 Core Questions Specified in Prompt */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Question 1: Delegated to AI */}
                    <div>
                      <label className="block text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
                        1. “What cognitive work are you intentionally delegating to AI?”
                      </label>
                      <textarea
                        rows={3}
                        value={stage.delegatedToAI}
                        onChange={(e) => onUpdateStage(stage.id, 'delegatedToAI', e.target.value)}
                        placeholder="e.g. Synthesising large raw corpora, generating preliminary outline frameworks, generating counterarguments..."
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#FFD300] font-medium"
                      />
                    </div>

                    {/* Question 2: Retained for Learner */}
                    <div>
                      <label className="block text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
                        2. “What cognitive work are you deliberately retaining for the learner?”
                      </label>
                      <textarea
                        rows={3}
                        value={stage.retainedForLearner}
                        onChange={(e) => onUpdateStage(stage.id, 'retainedForLearner', e.target.value)}
                        placeholder="e.g. Interrogating unstated criteria, validating accuracy, resolving trade-offs, owning final accountability..."
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#FFD300] font-medium"
                      />
                    </div>
                  </div>

                  {/* Question 3: Why? (Mandatory) */}
                  <div className="bg-white/80 dark:bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9] flex items-center gap-1.5">
                        <span>3. “Why?” (Pedagogical Rationale)</span>
                        <span className="text-[#DC5300] font-black">* Mandatory</span>
                      </label>
                      {isWhyMissing && (
                        <span className="text-[11px] text-[#DC5300] font-bold flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/40">
                          <AlertCircle className="w-3.5 h-3.5" /> Required before moving to Capability
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-medium">
                      Why is this specific allocation of cognitive agency essential for developing capability at this stage?
                    </p>
                    <textarea
                      rows={2}
                      value={stage.rationale}
                      onChange={(e) => onUpdateStage(stage.id, 'rationale', e.target.value)}
                      placeholder="e.g. By automating initial data aggregation, students conserve cognitive stamina for evaluating ethical implications and contextual anomalies..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-xs leading-relaxed focus:outline-none focus:ring-2 font-medium ${
                        isWhyMissing
                          ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-500 bg-rose-50/40 dark:bg-rose-950/30'
                          : 'border-white/80 dark:border-white/10 glass-input focus:ring-[#FFD300]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-white/10">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-white/80 dark:border-white/10 font-bold text-sm transition-all hover:shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Redesign Options</span>
        </button>

        <div className="text-xs text-slate-500 dark:text-slate-400 text-right">
          {!hasStages ? (
            <span className="text-amber-800 dark:text-amber-400 font-semibold bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40 block">
              Add at least one stage to proceed.
            </span>
          ) : missingWhy ? (
            <span className="text-[#DC5300] font-bold bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40 block">
              Please complete the mandatory "Why?" question for every stage.
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className={`inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-extrabold text-sm transition-all shadow-md ${
            isValid
              ? 'bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] dark:from-[#3D4C75] dark:via-[#2A3554] dark:to-[#171F33] text-white hover:shadow-xl hover:scale-[1.02] cursor-pointer'
              : 'bg-stone-300 dark:bg-slate-700 text-stone-500 dark:text-slate-400 cursor-not-allowed opacity-75'
          }`}
        >
          <span>Assess Evidence of Capability</span>
          <ArrowRight className="w-4 h-4 text-[#FFD300]" />
        </button>
      </div>
    </section>
  );
};
