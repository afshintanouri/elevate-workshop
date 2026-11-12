/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RedesignCardData, QuadrantId } from '../types';
import { MATRIX_QUADRANTS } from '../config/matrixConfig';
import { ArrowLeft, ArrowRight, Layers, HelpCircle, CheckSquare } from 'lucide-react';

interface Step4RedesignProps {
  data: RedesignCardData;
  onChange: (data: RedesignCardData) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Step4Redesign: React.FC<Step4RedesignProps> = ({
  data,
  onChange,
  onNext,
  onPrev,
}) => {
  const [activeTab, setActiveTab] = useState<QuadrantId>('ENHANCE');

  const updateEnhance = (field: keyof RedesignCardData['enhance'], value: any) => {
    onChange({
      ...data,
      enhance: { ...data.enhance, [field]: value },
    });
  };

  const toggleEnhanceCheckbox = (item: string) => {
    const list = data.enhance.aiContributions.includes(item)
      ? data.enhance.aiContributions.filter((i) => i !== item)
      : [...data.enhance.aiContributions, item];
    updateEnhance('aiContributions', list);
  };

  const updateEmpower = (field: keyof RedesignCardData['empower'], value: any) => {
    onChange({
      ...data,
      empower: { ...data.empower, [field]: value },
    });
  };

  const updateAdopt = (field: keyof RedesignCardData['adopt'], value: any) => {
    onChange({
      ...data,
      adopt: { ...data.adopt, [field]: value },
    });
  };

  const toggleAdoptCheckbox = (item: string) => {
    const list = data.adopt.learnerInterrogations.includes(item)
      ? data.adopt.learnerInterrogations.filter((i) => i !== item)
      : [...data.adopt.learnerInterrogations, item];
    updateAdopt('learnerInterrogations', list);
  };

  const updateShape = (field: keyof RedesignCardData['shape'], value: any) => {
    onChange({
      ...data,
      shape: { ...data.shape, [field]: value },
    });
  };

  const toggleShapeCheckbox = (item: string) => {
    const list = data.shape.learnerDetermines.includes(item)
      ? data.shape.learnerDetermines.filter((i) => i !== item)
      : [...data.shape.learnerDetermines, item];
    updateShape('learnerDetermines', list);
  };

  return (
    <section aria-labelledby="step4-heading" className="max-w-5xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-32 bg-gradient-to-l from-[#CB9828]/15 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#DC5300]" />
          <span>Step 4: Redesign The Journey</span>
        </div>
        <h2 id="step4-heading" className="text-2xl sm:text-3xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] tracking-tight">
          “Don’t choose a quadrant. Design the journey.”
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed max-w-3xl">
          Different stages of learning can deliberately use different human-AI configurations. The objective is not to reach one ‘best’ quadrant, but to decide what type of cognitive work learners should undertake at different stages.
          Explore the possibilities of each quadrant below.
        </p>
      </div>

      {/* Quadrant Selector Tabs in Glass Capsule */}
      <div className="glass-panel p-2 rounded-2xl flex flex-wrap gap-2">
        {(['ENHANCE', 'EMPOWER', 'ADOPT', 'SHAPE'] as QuadrantId[]).map((qid) => {
          const q = MATRIX_QUADRANTS[qid];
          const isActive = activeTab === qid;
          return (
            <button
              key={qid}
              type="button"
              onClick={() => setActiveTab(qid)}
              className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl text-xs font-extrabold transition-all text-left flex items-center justify-between cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-[#1E293B] text-[#232D4B] dark:text-[#FFD300] shadow-md border border-white dark:border-white/20 ring-2 ring-offset-1'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#232D4B] dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
              }`}
              style={{
                ['--tw-ring-color' as any]: q.colors.accent,
              }}
            >
              <div>
                <span className="block uppercase tracking-wider text-[10px] text-slate-500 dark:text-slate-400 font-extrabold">
                  {q.literacyEmphasis}
                </span>
                <span className="text-sm font-extrabold text-[#232D4B] dark:text-white">{q.name}</span>
              </div>
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs border border-white/80 dark:border-white/30"
                style={{ backgroundColor: q.colors.accent }}
              />
            </button>
          );
        })}
      </div>

      {/* Quadrant 1: ENHANCE */}
      {activeTab === 'ENHANCE' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-6 relative overflow-hidden">
          <div className="border-b border-stone-200/80 dark:border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5B7945] dark:text-[#A8C78B] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#77915D]" />
              {MATRIX_QUADRANTS.ENHANCE.name} Mode · Functional Literacy
            </span>
            <h3 className="text-xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mt-1 tracking-tight">
              “How could AI help learners perform part of this work more effectively?”
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {MATRIX_QUADRANTS.ENHANCE.longerExplanation}
            </p>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              “In this stage, learners will…”
            </label>
            <textarea
              rows={3}
              value={data.enhance.learnerAction}
              onChange={(e) => updateEnhance('learnerAction', e.target.value)}
              placeholder="e.g. Conduct background market research, review literature, or extract key themes from raw survey data..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              “What could AI contribute?”
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Information',
                'Explanation',
                'Examples',
                'Research',
                'Drafting',
                'Analysis',
                'Feedback',
                'Alternative perspectives',
                'Content generation',
                'Other',
              ].map((item) => {
                const checked = data.enhance.aiContributions.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      checked
                        ? 'bg-teal-50 dark:bg-[#77915D]/20 border-teal-300 dark:border-[#77915D] text-teal-900 dark:text-[#A8C78B] font-semibold'
                        : 'border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEnhanceCheckbox(item)}
                      className="rounded text-teal-700 focus:ring-teal-700 w-3.5 h-3.5"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              “What capability must the learner still demonstrate?”
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Even when AI accelerates the execution, what core judgement or skill remains strictly human-verified?
            </p>
            <textarea
              rows={3}
              value={data.enhance.learnerCapability}
              onChange={(e) => updateEnhance('learnerCapability', e.target.value)}
              placeholder="e.g. Verify the empirical validity of sources, identify unstated corporate bias, and integrate context..."
              className="w-full px-4 py-2.5 rounded-lg border border-stone-300 dark:border-white/10 glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm"
            />
          </div>
        </div>
      )}

      {/* Quadrant 2: EMPOWER */}
      {activeTab === 'EMPOWER' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-6 relative overflow-hidden">
          <div className="border-b border-stone-200/80 dark:border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#B38318] dark:text-[#E8B84B] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CB9828]" />
              {MATRIX_QUADRANTS.EMPOWER.name} Mode · Orchestrational Literacy
            </span>
            <h3 className="text-xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mt-1 tracking-tight">
              “What outcome should learners own while using AI as a resource?”
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {MATRIX_QUADRANTS.EMPOWER.longerExplanation}
            </p>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              Learner-Owned Outcome:
            </label>
            <textarea
              rows={3}
              value={data.empower.learnerOutcome}
              onChange={(e) => updateEmpower('learnerOutcome', e.target.value)}
              placeholder="e.g. Design a complete multichannel launch campaign and justify the budget allocation..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
              “What choices should you deliberately NOT prescribe?”
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
              Prompts to consider: goals, audience, approach, tools, channels, evidence, format, resources, success criteria.
            </p>
            <textarea
              rows={3}
              value={data.empower.unprescribedChoices}
              onChange={(e) => updateEmpower('unprescribedChoices', e.target.value)}
              placeholder="e.g. We deliberately leave the choice of AI tools open, as well as the format of final presentation..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              “How can learners decide which AI tools or capabilities are appropriate?”
            </label>
            <textarea
              rows={3}
              value={data.empower.aiAppropriateness}
              onChange={(e) => updateEmpower('aiAppropriateness', e.target.value)}
              placeholder="e.g. Learners must articulate why a specific tool was chosen, its limitations, and why another was rejected..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>
        </div>
      )}

      {/* Quadrant 3: ADOPT */}
      {activeTab === 'ADOPT' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-6 relative overflow-hidden">
          <div className="border-b border-stone-200/80 dark:border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#232D4B] dark:text-[#FFD300] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#232D4B] dark:bg-[#FFD300]" />
              {MATRIX_QUADRANTS.ADOPT.name} Mode · Evaluative Literacy
            </span>
            <h3 className="text-xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mt-1 tracking-tight">
              “What could AI structure or propose for the learner?”
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {MATRIX_QUADRANTS.ADOPT.longerExplanation}
            </p>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1">
              AI-Proposed Structure or Model:
            </label>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 font-medium">
              Examples: decision model, analytical framework, criteria, categories, workflow, strategy, evaluation framework, recommendation system.
            </p>
            <textarea
              rows={3}
              value={data.adopt.aiProposals}
              onChange={(e) => updateAdopt('aiProposals', e.target.value)}
              placeholder="e.g. Prompt AI to generate three competing strategic decision frameworks for entering an emerging market..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-2.5">
              “What must the learner interrogate?”
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                'assumptions',
                'criteria',
                'evidence',
                'omissions',
                'relationships',
                'weightings',
                'limitations',
                'risks',
                'stakeholder consequences',
                'recommendations',
              ].map((item) => {
                const checked = data.adopt.learnerInterrogations.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all capitalize font-medium ${
                      checked
                        ? 'bg-white dark:bg-[#1E293B] border-[#232D4B] dark:border-[#FFD300] text-[#232D4B] dark:text-[#FFD300] font-bold shadow-2xs'
                        : 'border-white/80 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAdoptCheckbox(item)}
                      className="rounded text-[#232D4B] focus:ring-[#232D4B] w-4 h-4"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              “What could cause the learner to reject or modify the AI-generated structure?”
            </label>
            <textarea
              rows={3}
              value={data.adopt.rejectionTriggers}
              onChange={(e) => updateAdopt('rejectionTriggers', e.target.value)}
              placeholder="e.g. Inappropriate risk weightings, overlooked regulatory constraints, or reliance on outdated data..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>
        </div>
      )}

      {/* Quadrant 4: TRANSFORM (formerly SHAPE) */}
      {activeTab === 'SHAPE' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-9 shadow-lg space-y-6 relative overflow-hidden">
          <div className="border-b border-stone-200/80 dark:border-white/10 pb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC5300] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC5300]" />
              {MATRIX_QUADRANTS.SHAPE.name} Mode · Systemic Literacy
            </span>
            <h3 className="text-xl font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mt-1 tracking-tight">
              “What should the learner have to figure out?”
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              {MATRIX_QUADRANTS.SHAPE.longerExplanation}
            </p>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              What the Learner Must Figure Out:
            </label>
            <textarea
              rows={3}
              value={data.shape.learnerFiguringOut}
              onChange={(e) => updateShape('learnerFiguringOut', e.target.value)}
              placeholder="e.g. Diagnose why customer churn has spiked when dashboard metrics appeared positive..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              “What ambiguity will you deliberately leave in the activity?”
            </label>
            <textarea
              rows={3}
              value={data.shape.deliberateAmbiguity}
              onChange={(e) => updateShape('deliberateAmbiguity', e.target.value)}
              placeholder="e.g. Incomplete data logs, conflicting stakeholder testimonies, and undefined success criteria..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-2.5">
              “What must learners determine themselves?”
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                'the underlying problem',
                'relevant evidence',
                'stakeholders',
                'assumptions',
                'success criteria',
                'constraints',
                'decision criteria',
                'AI’s role',
                'human judgement required',
                'governance boundaries',
                'accountability',
              ].map((item) => {
                const checked = data.shape.learnerDetermines.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all capitalize font-medium ${
                      checked
                        ? 'bg-white dark:bg-[#1E293B] border-[#DC5300] text-[#DC5300] font-bold shadow-2xs'
                        : 'border-white/80 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleShapeCheckbox(item)}
                      className="rounded text-[#DC5300] focus:ring-[#DC5300] w-4 h-4"
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mb-1.5">
              “What must remain human-owned?”
            </label>
            <textarea
              rows={3}
              value={data.shape.humanOwned}
              onChange={(e) => updateShape('humanOwned', e.target.value)}
              placeholder="e.g. Ethical liability, trade-off prioritization, and final sign-off before implementation..."
              className="w-full px-4 py-3 rounded-xl glass-input text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FFD300] text-sm font-medium"
            />
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200/80 dark:border-white/10">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 border border-white/80 dark:border-white/10 font-bold text-sm transition-all hover:shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back: Cognitive Work</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] dark:from-[#3D4C75] dark:via-[#2A3554] dark:to-[#171F33] text-white hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer shadow-md"
        >
          <span>Build the Journey Sequence</span>
          <ArrowRight className="w-4 h-4 text-[#FFD300]" />
        </button>
      </div>
    </section>
  );
};
