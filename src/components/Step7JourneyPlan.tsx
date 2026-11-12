/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppState, QuadrantId } from '../types';
import { MATRIX_QUADRANTS, MATRIX_AXES, AUTHOR_ATTRIBUTION } from '../config/matrixConfig';
import { generateCognitiveObservation } from '../utils/cognitiveAnalysis';
import {
  Printer,
  Download,
  Edit3,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Brain,
  ShieldCheck,
  FileCode,
  Share2,
} from 'lucide-react';

interface Step7JourneyPlanProps {
  state: AppState;
  onEditJourney: () => void;
  onStartNewDesign: () => void;
}

export const Step7JourneyPlan: React.FC<Step7JourneyPlanProps> = ({
  state,
  onEditJourney,
  onStartNewDesign,
}) => {
  const [copiedNotice, setCopiedNotice] = useState(false);
  const observation = generateCognitiveObservation(state.cognitiveProfile);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const exportData = {
      title: 'AI Learning Journey Design Plan',
      timestamp: new Date().toISOString(),
      workshop: 'Building Workforce Capability That Matters in the Age of AI',
      academicFramework: {
        author: AUTHOR_ATTRIBUTION.name,
        institution: AUTHOR_ATTRIBUTION.institution,
        contact: AUTHOR_ATTRIBUTION.email,
        framework: AUTHOR_ATTRIBUTION.frameworkName,
      },
      activity: state.activity,
      currentDiagnosis: {
        quadrants: state.diagnosis.selectedQuadrants,
        rationale: state.diagnosis.rationale,
        cognitiveProfile: {
          upstream: state.cognitiveProfile.upstream,
          production: state.cognitiveProfile.production,
          downstream: state.cognitiveProfile.downstream,
          deterministicObservation: observation,
        },
      },
      redesignedJourney: state.journey.map((s, idx) => ({
        stageNumber: idx + 1,
        quadrant: s.quadrantId,
        quadrantName: MATRIX_QUADRANTS[s.quadrantId]?.name,
        activityTitle: s.stageTitle,
        delegatedToAI: s.delegatedToAI,
        retainedForLearner: s.retainedForLearner,
        pedagogicalRationale: s.rationale,
      })),
      capabilityAssessment: {
        evidenceItems: state.capability.selectedEvidence,
        otherEvidence: state.capability.otherEvidence,
        ultimateDemonstration: state.capability.ultimateDemonstration,
        finalAccountability: state.capability.finalAccountability,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Learning-Journey-${(state.activity.name || 'Plan')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    const mdLines = [
      `# AI Learning Journey Plan: ${state.activity.name || 'Untitled Activity'}`,
      `*Academic Framework: ${AUTHOR_ATTRIBUTION.name} (${AUTHOR_ATTRIBUTION.institution})*`,
      `*Contact: ${AUTHOR_ATTRIBUTION.email}*`,
      `*Workshop: Building Workforce Capability That Matters in the Age of AI*`,
      `*Generated: ${new Date().toLocaleDateString()}*`,
      '',
      `## 1. Overview`,
      `- **Target Learners:** ${state.activity.learnerGroup || 'Not specified'}`,
      `- **Intended Capability:** ${state.activity.intendedCapability || 'Not specified'}`,
      `- **Original Design:** ${state.activity.currentActivity || 'Not specified'}`,
      '',
      `## 2. Current Design Diagnosis`,
      `- **Initial Quadrants:** ${state.diagnosis.selectedQuadrants.join(', ')}`,
      `- **Diagnosis Rationale:** ${state.diagnosis.rationale || 'Not specified'}`,
      `- **Cognitive Profile:** Upstream (${state.cognitiveProfile.upstream.level}) → Production (${state.cognitiveProfile.production.level}) → Downstream (${state.cognitiveProfile.downstream.level})`,
      `- **Cognitive Observation:** ${observation}`,
      '',
      `## 3. Redesigned Journey Sequence`,
      ...state.journey.map((s, idx) => [
        `### Stage ${idx + 1}: ${s.stageTitle || 'Stage ' + (idx + 1)} (${s.quadrantId})`,
        `- **AI Contribution (Delegated):** ${s.delegatedToAI || 'None'}`,
        `- **Learner Cognitive Responsibility:** ${s.retainedForLearner || 'None'}`,
        `- **Pedagogical Rationale:** ${s.rationale || 'None'}`,
        '',
      ]).flat(),
      `## 4. Human-Owned Judgement & Accountability`,
      `- **Ultimate Demonstration:** ${state.capability.ultimateDemonstration || 'Not specified'}`,
      `- **Final Accountability:** ${state.capability.finalAccountability || 'Not specified'}`,
      '',
      `## 5. Evidence of Capability`,
      ...state.capability.selectedEvidence.map((e) => `- [x] ${e}`),
      state.capability.otherEvidence ? `- [x] Other: ${state.capability.otherEvidence}` : '',
      '',
      `---`,
      `*“You didn’t simply add AI to the activity. You redesigned how learners encounter, use, evaluate and shape AI-enabled work.”*`,
    ].filter(Boolean);

    const blob = new Blob([mdLines.join('\n')], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AI-Learning-Journey-${(state.activity.name || 'Plan')
      .replace(/[^a-zA-Z0-9]/g, '-')
      .toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper to render mini 2x2 matrix for Before vs After comparison
  const renderMiniMatrix = (title: string, subtitle: string, highlightedIds: QuadrantId[], isAfter: boolean) => {
    return (
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-2xs flex-1">
        <div className="text-center mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-900 block">
            {title}
          </span>
          <span className="text-[11px] text-slate-500">{subtitle}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          {(['ENHANCE', 'EMPOWER', 'ADOPT', 'SHAPE'] as QuadrantId[]).map((qid) => {
            const q = MATRIX_QUADRANTS[qid];
            const isHighlighted = highlightedIds.includes(qid);
            const stagesInQuad = isAfter
              ? state.journey
                  .map((s, i) => (s.quadrantId === qid ? i + 1 : null))
                  .filter((v): v is number => v !== null)
              : [];

            return (
              <div
                key={qid}
                className={`p-3 rounded-lg border flex flex-col items-center justify-center min-h-[70px] transition-all ${
                  isHighlighted
                    ? 'border-2 shadow-2xs font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-400 font-normal opacity-60'
                }`}
                style={{
                  borderColor: isHighlighted ? q.colors.accent : '#E2E8F0',
                  backgroundColor: isHighlighted ? q.colors.bg : '#F8FAFC',
                  color: isHighlighted ? q.colors.text : '#94A3B8',
                }}
              >
                <span className="text-[11px] uppercase tracking-wider font-extrabold">{q.name}</span>
                <span className="text-[10px] opacity-80 mt-0.5">{q.literacyEmphasis}</span>

                {isAfter && stagesInQuad.length > 0 && (
                  <div className="flex gap-1 mt-1.5">
                    {stagesInQuad.map((num) => (
                      <span
                        key={num}
                        className="w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center"
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const redesignedQuadrantIds = Array.from(new Set(state.journey.map((s) => s.quadrantId)));

  return (
    <section aria-labelledby="plan-heading" className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Action Toolbar (Screen Only) with Frosted Liquid Glass */}
      <div className="no-print glass-panel rounded-3xl p-4 sm:p-5 shadow-lg flex flex-wrap items-center justify-between gap-3 sticky top-[110px] z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#77915D]/20 dark:bg-[#77915D]/30 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#5B7945] dark:text-[#98B878]" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#232D4B] dark:text-[#F1F5F9] block leading-tight">
              Journey Plan Ready
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Academic Capability Design
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-[#232D4B] bg-gradient-to-b from-[#FFE34D] to-[#FFD300] hover:from-[#FFF080] hover:to-[#E6BE00] border border-[#E6BE00]/80 rounded-xl shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
            title="Print or Save as PDF"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadJSON}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#232D4B] dark:text-[#F1F5F9] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-white/80 dark:border-white/15 rounded-xl transition-all shadow-2xs cursor-pointer"
            title="Download Plan as JSON"
          >
            <Download className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>JSON Plan</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#232D4B] dark:text-[#F1F5F9] bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-white/80 dark:border-white/15 rounded-xl transition-all shadow-2xs cursor-pointer"
            title="Download Plan as Markdown"
          >
            <FileCode className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <span>Markdown</span>
          </button>

          <button
            type="button"
            onClick={onEditJourney}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#232D4B] dark:text-[#F1F5F9] bg-white/80 dark:bg-white/10 border border-white/80 dark:border-white/15 hover:bg-white dark:hover:bg-white/15 rounded-xl transition-all shadow-2xs cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#DC5300]" />
            <span>Edit Journey</span>
          </button>

          <button
            type="button"
            onClick={onStartNewDesign}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-rose-700 dark:text-rose-400 hover:bg-rose-50/80 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Design</span>
          </button>
        </div>
      </div>

      {/* Printable Report Wrapper with Elevated Card Presence */}
      <div id="printable-journey-plan" className="glass-panel rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 bg-white/90">
        {/* Document Header */}
        <div className="border-b-2 border-[#232D4B] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#DC5300] bg-orange-50/80 px-2.5 py-1 rounded-md border border-orange-200/60">
              AI Learning Journey Design Plan
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Workshop: Building Workforce Capability That Matters in the Age of AI
            </span>
          </div>
          <h1 id="plan-heading" className="text-2xl sm:text-4xl font-black text-[#232D4B] tracking-tight">
            {state.activity.name || 'Untitled Learning Activity'}
          </h1>
          <p className="text-sm font-semibold text-slate-600 mt-1.5">
            Designed for: <strong className="text-[#232D4B]">{state.activity.learnerGroup || 'Cohort / Learners'}</strong>
          </p>
        </div>

        {/* Section 1: Intended Capability */}
        <div className="p-6 bg-white/80 rounded-2xl border border-white/80 shadow-2xs print-avoid-break">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#DC5300] block mb-1">
            Intended Capability (What participants must ultimately be capable of doing)
          </span>
          <p className="text-base text-[#232D4B] font-bold leading-relaxed">
            {state.activity.intendedCapability || 'Not specified'}
          </p>
        </div>

        {/* Section 2: Before vs After Transformation Matrices */}
        <div className="print-avoid-break space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-[#232D4B]">
              Human-AI Matrix Transformation (Before → After)
            </h2>
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">
              Visualizing the trajectory of cognitive agency
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderMiniMatrix(
              'Before: Original Activity',
              'Initial quadrant placement',
              state.diagnosis.selectedQuadrants,
              false
            )}
            {renderMiniMatrix(
              'After: Redesigned Journey',
              'Deliberate multi-stage progression',
              redesignedQuadrantIds,
              true
            )}
          </div>

          <div className="p-4 bg-gradient-to-r from-[#232D4B]/5 via-[#FFD300]/10 to-[#DC5300]/5 border border-white/80 rounded-2xl text-center shadow-2xs">
            <p className="text-xs sm:text-sm font-serif italic font-bold text-[#232D4B]">
              “You didn’t simply add AI to the activity. You redesigned how learners encounter, use, evaluate and shape AI-enabled work.”
            </p>
          </div>
        </div>

        {/* Section 3: Current Design Diagnosis & Cognitive Profile */}
        <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-4 print-avoid-break">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Current Design Diagnosis & Cognitive Profile
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Upstream Framing</span>
              <span className="text-base font-extrabold text-teal-900">{state.cognitiveProfile.upstream.level}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Production Execution</span>
              <span className="text-base font-extrabold text-teal-900">{state.cognitiveProfile.production.level}</span>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">Downstream Evaluation</span>
              <span className="text-base font-extrabold text-teal-900">{state.cognitiveProfile.downstream.level}</span>
            </div>
          </div>

          <div className="text-xs text-slate-700 bg-stone-50 p-3.5 rounded-lg border border-stone-200 leading-relaxed">
            <strong className="text-slate-900 font-semibold">Profile Observation:</strong> {observation}
          </div>

          {state.diagnosis.rationale && (
            <div className="text-xs text-slate-600 border-t border-stone-200 pt-3">
              <span className="font-bold text-slate-700 block mb-0.5">Original Placement Rationale:</span>
              <p className="italic">{state.diagnosis.rationale}</p>
            </div>
          )}
        </div>

        {/* Section 4: Redesigned Journey Sequence */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Redesigned Journey Sequence ({state.journey.length} Deliberate Stages)
            </h2>
            <span className="text-xs text-slate-500">
              Intentional cognitive allocation
            </span>
          </div>

          <div className="space-y-4">
            {state.journey.map((stage, idx) => {
              const q = MATRIX_QUADRANTS[stage.quadrantId];
              return (
                <div
                  key={stage.id}
                  className="bg-white border-2 rounded-xl p-5 shadow-2xs print-avoid-break space-y-3"
                  style={{ borderColor: q.colors.border }}
                >
                  {/* Stage Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span
                        className="text-xs font-extrabold uppercase px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: q.colors.accent }}
                      >
                        {q.name}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {stage.stageTitle || `Stage ${idx + 1}`}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 italic">
                      {q.literacyEmphasis} Literacy · “{q.shortDescription}”
                    </span>
                  </div>

                  {/* Stage Allocation Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                      <span className="font-bold text-slate-700 uppercase tracking-wide block mb-1 text-[11px]">
                        AI Contribution (Intentionally Delegated):
                      </span>
                      <p className="text-slate-800 leading-relaxed">
                        {stage.delegatedToAI || 'No routine work delegated to AI in this stage.'}
                      </p>
                    </div>

                    <div className="bg-teal-50/50 p-3 rounded-lg border border-teal-200/60">
                      <span className="font-bold text-teal-900 uppercase tracking-wide block mb-1 text-[11px]">
                        Learner Cognitive Responsibility (Deliberately Retained):
                      </span>
                      <p className="text-teal-950 leading-relaxed font-medium">
                        {stage.retainedForLearner || 'Autonomous cognitive ownership.'}
                      </p>
                    </div>
                  </div>

                  {/* Mandatory Pedagogical Rationale */}
                  <div className="bg-stone-100/60 p-3 rounded-lg border border-stone-200/60 text-xs">
                    <span className="font-bold text-slate-800 uppercase tracking-wide block mb-0.5 text-[11px]">
                      Pedagogical Rationale (“Why”):
                    </span>
                    <p className="text-slate-700 italic leading-relaxed">
                      {stage.rationale}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5: Human-Owned Judgement & Final Accountability */}
        <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-4 print-avoid-break">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Human-Owned Judgement & Final Accountability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1">
                Ultimate Demonstration or Artifact:
              </span>
              <p className="text-slate-900 leading-relaxed">
                {state.capability.ultimateDemonstration || 'Not specified'}
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-200">
              <span className="font-bold text-slate-800 uppercase tracking-wide block mb-1">
                Locus of Final Accountability:
              </span>
              <p className="text-slate-900 leading-relaxed font-semibold">
                {state.capability.finalAccountability || 'Human learner bears 100% accountability.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Verified Evidence of Capability */}
        <div className="p-5 bg-white border border-stone-200 rounded-xl space-y-3 print-avoid-break">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Verified Evidence of Genuine Human Capability
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {state.capability.selectedEvidence.map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#5B7945] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {state.capability.otherEvidence && (
            <div className="text-xs text-slate-600 pt-2 border-t border-stone-200">
              <strong>Additional Assessment Evidence:</strong> {state.capability.otherEvidence}
            </div>
          )}
        </div>

        {/* Section 7: Academic Framework Attribution & Contact */}
        <div className="p-6 bg-[#F6EEE1]/80 dark:bg-[#1E2638]/70 border border-[#E5DDD0] dark:border-white/10 rounded-2xl print-avoid-break flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#DC5300] block">
              Framework & Research Attribution
            </span>
            <p className="text-sm font-bold text-[#232D4B] dark:text-[#F1F5F9]">
              Human-AI Learning Journey Framework © 2026 Dr Afshin Tanouri
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              “Building Workforce Capability That Matters in the Age of AI”
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <a
              href="mailto:afshin.tanouri@flinders.edu.au"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#232D4B] dark:bg-[#FFD300] text-white dark:text-[#232D4B] rounded-xl text-xs font-bold hover:bg-[#1A2238] dark:hover:bg-[#E6BE00] transition-colors shadow-2xs"
            >
              <span>afshin.tanouri@flinders.edu.au</span>
            </a>
          </div>
        </div>

        {/* Document Footer */}
        <div className="pt-4 border-t border-stone-200 dark:border-white/10 flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span>AI Learning Journey Designer · Academic Framework</span>
          <span>Data persists exclusively in this browser</span>
        </div>
      </div>
    </section>
  );
};
