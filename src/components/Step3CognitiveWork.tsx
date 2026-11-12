/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CognitiveWorkProfile, CognitiveLevel } from '../types';
import { COGNITIVE_STAGES_CONFIG } from '../config/matrixConfig';
import { generateCognitiveObservation } from '../utils/cognitiveAnalysis';
import { ArrowLeft, ArrowRight, ArrowRightCircle, CheckSquare, Square, Brain } from 'lucide-react';

interface Step3CognitiveWorkProps {
  profile: CognitiveWorkProfile;
  onChangeLevel: (stageKey: keyof CognitiveWorkProfile, level: CognitiveLevel) => void;
  onToggleItem: (stageKey: keyof CognitiveWorkProfile, item: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3CognitiveWork: React.FC<Step3CognitiveWorkProps> = ({
  profile,
  onChangeLevel,
  onToggleItem,
  onNext,
  onPrev,
}) => {
  const observation = generateCognitiveObservation(profile);

  const renderStageCard = (
    stageKey: 'upstream' | 'production' | 'downstream',
    stageNumber: number
  ) => {
    const config = COGNITIVE_STAGES_CONFIG[stageKey];
    const currentData = profile[stageKey];

    const getBadgeStyle = (level: CognitiveLevel) => {
      switch (level) {
        case 'HIGH':
          return 'bg-[#232D4B] text-[#FFD300] shadow-2xs border border-white/30';
        case 'MODERATE':
          return 'bg-[#FEF6D8] text-[#6A4604] border border-[#F2D785]';
        case 'LOW':
          return 'bg-stone-100 text-slate-600 border border-stone-200';
      }
    };

    return (
      <div className="flex-1 glass-panel rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/30 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="relative z-10">
          {/* Card Title & Subtitle */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC5300]" />
              Stage 0{stageNumber}
            </span>
            <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg ${getBadgeStyle(currentData.level)}`}>
              {currentData.level} COGNITIVE WORK
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
            {config.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 italic font-medium">
            “{config.subtitle}”
          </p>

          {/* Level Selection Segmented Control */}
          <div className="mb-5">
            <label className="block text-[11px] font-extrabold text-[#232D4B] dark:text-[#FFD300] uppercase tracking-wider mb-2">
              Learner Cognitive Effort:
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-stone-200/50 dark:bg-white/5 backdrop-blur-xs rounded-xl border border-white/60 dark:border-white/10">
              {(['LOW', 'MODERATE', 'HIGH'] as CognitiveLevel[]).map((level) => {
                const isSelected = currentData.level === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => onChangeLevel(stageKey, level)}
                    className={`py-2 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white dark:bg-[#232D4B] text-[#232D4B] dark:text-[#FFD300] shadow-sm border border-white dark:border-white/20'
                        : 'text-slate-600 dark:text-slate-400 hover:text-[#232D4B] dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capability Checkbox List */}
          <div>
            <div className="text-[11px] font-extrabold text-[#232D4B] dark:text-[#F1F5F9] uppercase tracking-wider mb-2.5">
              Specific Cognitive Capabilities Exercised:
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {config.items.map((item) => {
                const isChecked = currentData.selectedItems.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl text-xs cursor-pointer transition-all border ${
                      isChecked
                        ? 'bg-white dark:bg-white/10 text-[#232D4B] dark:text-white font-bold border-[#FFD300] shadow-2xs'
                        : 'border-transparent hover:bg-white/60 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleItem(stageKey, item)}
                      className="mt-0.5 rounded text-[#232D4B] dark:text-[#FFD300] focus:ring-[#232D4B] w-4 h-4"
                    />
                    <span className="leading-snug">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section aria-labelledby="step3-heading" className="max-w-6xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#77915D]/15 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC5300]" />
          <span>Step 3: Where Is The Cognitive Work?</span>
        </div>
        <h2 id="step3-heading" className="text-2xl sm:text-3xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
          “Where is the learner doing the difficult cognitive work?”
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-3xl font-medium">
          AI changes how cognitive effort is distributed. In many traditional activities, learners spend 80% of their effort in production (drafting, formatting, calculating). Evaluate whether cognitive agency sits upstream in framing, during execution, or downstream in critical evaluation.
        </p>
      </div>

      {/* 3 Horizontal Connected Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {renderStageCard('upstream', 1)}
        {renderStageCard('production', 2)}
        {renderStageCard('downstream', 3)}
      </div>

      {/* Visual Summary & Deterministic Rule-Based Observation */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/80 dark:border-white/10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Cognitive Profile Summary
            </span>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="font-bold text-sm text-[#232D4B] dark:text-slate-200 bg-white/70 dark:bg-white/10 px-3 py-1 rounded-lg border border-white/60 dark:border-white/10 shadow-2xs">
                UPSTREAM: <span className="text-[#DC5300]">{profile.upstream.level}</span>
              </span>
              <span className="text-stone-300 dark:text-slate-600 font-bold">→</span>
              <span className="font-bold text-sm text-[#232D4B] dark:text-slate-200 bg-white/70 dark:bg-white/10 px-3 py-1 rounded-lg border border-white/60 dark:border-white/10 shadow-2xs">
                PRODUCTION: <span className="text-[#DC5300]">{profile.production.level}</span>
              </span>
              <span className="text-stone-300 dark:text-slate-600 font-bold">→</span>
              <span className="font-bold text-sm text-[#232D4B] dark:text-slate-200 bg-white/70 dark:bg-white/10 px-3 py-1 rounded-lg border border-white/60 dark:border-white/10 shadow-2xs">
                DOWNSTREAM: <span className="text-[#DC5300]">{profile.downstream.level}</span>
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Categorised as Low / Moderate / High without pseudo-scientific percentages
          </div>
        </div>

        {/* Plain Language Deterministic Observation */}
        <div className="mt-4 flex items-start gap-3.5 bg-white/80 dark:bg-white/5 backdrop-blur-xs p-4 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs">
          <Brain className="w-5 h-5 text-[#232D4B] dark:text-[#FFD300] shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#232D4B] dark:text-[#FFD300] block mb-0.5">
              Deterministic Profile Observation
            </span>
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
              {observation}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 bg-white/80 hover:bg-white border border-white/80 font-bold text-sm transition-all hover:shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Diagnose Matrix</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] text-white hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer shadow-md"
        >
          <span>Explore Redesign Options</span>
          <ArrowRight className="w-4 h-4 text-[#FFD300]" />
        </button>
      </div>
    </section>
  );
};
