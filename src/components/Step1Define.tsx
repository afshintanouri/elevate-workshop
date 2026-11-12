/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ActivityDefinition } from '../types';
import { SAMPLE_WORKSHOP_PRESETS } from '../config/matrixConfig';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface Step1DefineProps {
  activity: ActivityDefinition;
  onChange: (field: keyof ActivityDefinition, value: string) => void;
  onNext: () => void;
  onLoadPreset: (preset: typeof SAMPLE_WORKSHOP_PRESETS[0]) => void;
}

export const Step1Define: React.FC<Step1DefineProps> = ({
  activity,
  onChange,
  onNext,
  onLoadPreset,
}) => {
  const isFormValid =
    activity.name.trim().length > 0 &&
    activity.intendedCapability.trim().length > 0;

  return (
    <section aria-labelledby="step1-heading" className="max-w-4xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#FFD300]/15 dark:from-[#FFD300]/10 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC5300]" />
          <span>Step 1: Define Current Design</span>
        </div>
        <h2 id="step1-heading" className="text-2xl sm:text-3xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
          “Start with something real.”
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-2xl font-medium">
          Choose an existing learning activity, assessment, employee training activity or professional development exercise that you currently use or are familiar with.
        </p>
      </div>

      {/* Preset Quick Load Bar for Workshops */}
      <div className="glass-panel p-5 rounded-2xl relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#232D4B] dark:text-[#FFD300]">
            <Sparkles className="w-4 h-4 text-[#DC5300]" />
            <span>Workshop Demo Presets (Click to preload an authentic example):</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold bg-white/60 dark:bg-white/10 px-2.5 py-0.5 rounded-md border border-white/60 dark:border-white/10">
            Dr Afshin Tanouri Framework
          </span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {SAMPLE_WORKSHOP_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => onLoadPreset(preset)}
              className="text-xs px-3.5 py-2 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-white/80 dark:border-white/15 rounded-xl text-slate-800 dark:text-slate-200 hover:text-[#232D4B] dark:hover:text-[#FFD300] hover:shadow-md transition-all font-semibold text-left shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields in Frosted Glass Panel */}
      <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-6">
        {/* Field 1: Activity Name */}
        <div>
          <label htmlFor="activity-name" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
            1. Activity Name <span className="text-[#DC5300]">*</span>
          </label>
          <input
            id="activity-name"
            type="text"
            value={activity.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="e.g. Digital Marketing Strategy Project"
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#232D4B] dark:focus:ring-[#FFD300] focus:border-transparent transition-all text-sm font-medium"
          />
        </div>

        {/* Field 2: Learner Group */}
        <div>
          <label htmlFor="learner-group" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
            2. Learner Group
          </label>
          <input
            id="learner-group"
            type="text"
            value={activity.learnerGroup}
            onChange={(e) => onChange('learnerGroup', e.target.value)}
            placeholder="e.g. MBA students, graduate engineers, sales managers"
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#232D4B] dark:focus:ring-[#FFD300] focus:border-transparent transition-all text-sm font-medium"
          />
        </div>

        {/* Field 3: Intended Capability */}
        <div>
          <label htmlFor="intended-capability" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
            3. Intended Capability <span className="text-[#DC5300]">*</span>
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            “What should participants ultimately be capable of doing?”
          </p>
          <textarea
            id="intended-capability"
            rows={4}
            value={activity.intendedCapability}
            onChange={(e) => onChange('intendedCapability', e.target.value)}
            placeholder="e.g. Develop and defend an evidence-based digital marketing strategy under volatile market conditions."
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#232D4B] dark:focus:ring-[#FFD300] focus:border-transparent transition-all text-sm leading-relaxed font-medium"
          />
        </div>

        {/* Field 4: Current Activity */}
        <div>
          <label htmlFor="current-activity" className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
            4. Current Activity
          </label>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
            “How does the activity currently work?” Briefly describe what learners are asked to do, what instructions or resources they receive, and what they ultimately produce.
          </p>
          <textarea
            id="current-activity"
            rows={4}
            value={activity.currentActivity}
            onChange={(e) => onChange('currentActivity', e.target.value)}
            placeholder="Briefly describe what learners currently do, what materials they are given, and what they deliver..."
            className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#232D4B] dark:focus:ring-[#FFD300] focus:border-transparent transition-all text-sm leading-relaxed font-medium"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-white/10">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {!isFormValid && (
            <span className="text-amber-800 dark:text-amber-300 font-semibold bg-amber-50/80 dark:bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40 inline-block">
              Please enter an Activity Name and Intended Capability to proceed.
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className={`inline-flex items-center gap-2.5 px-7 py-3 rounded-2xl font-extrabold text-sm transition-all shadow-md ${
            isFormValid
              ? 'bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] text-white hover:shadow-xl hover:scale-[1.02] cursor-pointer ring-1 ring-white/20'
              : 'bg-stone-300 dark:bg-slate-800 text-stone-500 dark:text-slate-600 cursor-not-allowed opacity-75'
          }`}
        >
          <span>Diagnose the current design</span>
          <ArrowRight className="w-4 h-4 text-[#FFD300]" />
        </button>
      </div>
    </section>
  );
};
