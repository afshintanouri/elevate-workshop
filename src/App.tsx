/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  AppState,
  ActivityDefinition,
  CurrentDiagnosis,
  CognitiveWorkProfile,
  CognitiveLevel,
  RedesignCardData,
  JourneyStage,
  CapabilityCheck,
  QuadrantId,
} from './types';
import { SAMPLE_WORKSHOP_PRESETS, SUGGESTED_JOURNEY_TEMPLATES } from './config/matrixConfig';
import { Header } from './components/Header';
import { StepNavigation } from './components/StepNavigation';
import { ReflectionBanner } from './components/ReflectionBanner';
import { Step1Define } from './components/Step1Define';
import { Step2Diagnose } from './components/Step2Diagnose';
import { Step3CognitiveWork } from './components/Step3CognitiveWork';
import { Step4Redesign } from './components/Step4Redesign';
import { Step5Sequence } from './components/Step5Sequence';
import { Step6Capability } from './components/Step6Capability';
import { Step7JourneyPlan } from './components/Step7JourneyPlan';
import { ResetModal } from './components/ResetModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AuthorModal } from './components/AuthorModal';
import { AUTHOR_ATTRIBUTION } from './config/matrixConfig';
import { ShieldCheck, RotateCcw, Mail, GraduationCap } from 'lucide-react';

const STORAGE_KEY = 'ai_learning_journey_designer_state_v1';

const INITIAL_STATE: AppState = {
  currentStep: 1,
  activity: {
    name: '',
    learnerGroup: '',
    intendedCapability: '',
    currentActivity: '',
  },
  diagnosis: {
    selectedQuadrants: [],
    rationale: '',
  },
  cognitiveProfile: {
    upstream: { level: 'LOW', selectedItems: [] },
    production: { level: 'HIGH', selectedItems: [] },
    downstream: { level: 'LOW', selectedItems: [] },
  },
  redesign: {
    enhance: {
      learnerAction: '',
      aiContributions: ['Research', 'Drafting'],
      learnerCapability: '',
    },
    empower: {
      learnerOutcome: '',
      unprescribedChoices: '',
      aiAppropriateness: '',
    },
    adopt: {
      aiProposals: '',
      learnerInterrogations: ['assumptions', 'criteria'],
      rejectionTriggers: '',
    },
    shape: {
      learnerFiguringOut: '',
      deliberateAmbiguity: '',
      learnerDetermines: ['the underlying problem', 'success criteria'],
      humanOwned: '',
    },
  },
  journey: [],
  capability: {
    selectedEvidence: [
      'Explain their reasoning',
      'Defend their choices',
      'Critique AI output',
    ],
    otherEvidence: '',
    ultimateDemonstration: '',
    finalAccountability: 'The human learner retains 100% accountability for the final output and ethical consequences.',
  },
  lastUpdated: new Date().toISOString(),
};

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STATE, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load stored state from localStorage:', e);
    }
    return INITIAL_STATE;
  });

  const [maxVisitedStep, setMaxVisitedStep] = useState<number>(state.currentStep);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const storedTheme = localStorage.getItem('ai_learning_journey_theme');
      if (storedTheme) return storedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Sync dark class on document element
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('ai_learning_journey_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('ai_learning_journey_theme', 'light');
      }
    } catch (e) {
      console.warn('Could not sync dark mode to documentElement:', e);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [state]);

  const goToStep = (stepNumber: number) => {
    setState((prev) => ({ ...prev, currentStep: stepNumber }));
    setMaxVisitedStep((prev) => Math.max(prev, stepNumber));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preset loader
  const handleLoadPreset = (preset: typeof SAMPLE_WORKSHOP_PRESETS[0]) => {
    setState((prev) => ({
      ...prev,
      activity: {
        name: preset.name,
        learnerGroup: preset.learnerGroup,
        intendedCapability: preset.intendedCapability,
        currentActivity: preset.currentActivity,
      },
      diagnosis: {
        selectedQuadrants: preset.diagnosisQuadrants,
        rationale: preset.diagnosisRationale,
      },
      cognitiveProfile: preset.cognitiveProfile,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Activity update
  const handleActivityChange = (field: keyof ActivityDefinition, value: string) => {
    setState((prev) => ({
      ...prev,
      activity: { ...prev.activity, [field]: value },
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Diagnosis matrix toggle
  const handleToggleQuadrant = (id: QuadrantId) => {
    setState((prev) => {
      const exists = prev.diagnosis.selectedQuadrants.includes(id);
      const updated = exists
        ? prev.diagnosis.selectedQuadrants.filter((q) => q !== id)
        : [...prev.diagnosis.selectedQuadrants, id];
      return {
        ...prev,
        diagnosis: { ...prev.diagnosis, selectedQuadrants: updated },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleDiagnosisRationaleChange = (rationale: string) => {
    setState((prev) => ({
      ...prev,
      diagnosis: { ...prev.diagnosis, rationale },
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Cognitive Work update
  const handleChangeCognitiveLevel = (
    stageKey: keyof CognitiveWorkProfile,
    level: CognitiveLevel
  ) => {
    setState((prev) => ({
      ...prev,
      cognitiveProfile: {
        ...prev.cognitiveProfile,
        [stageKey]: { ...prev.cognitiveProfile[stageKey], level },
      },
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleToggleCognitiveItem = (
    stageKey: keyof CognitiveWorkProfile,
    item: string
  ) => {
    setState((prev) => {
      const currentList = prev.cognitiveProfile[stageKey].selectedItems;
      const updated = currentList.includes(item)
        ? currentList.filter((i) => i !== item)
        : [...currentList, item];
      return {
        ...prev,
        cognitiveProfile: {
          ...prev.cognitiveProfile,
          [stageKey]: { ...prev.cognitiveProfile[stageKey], selectedItems: updated },
        },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  // Redesign update
  const handleRedesignChange = (newRedesignData: RedesignCardData) => {
    setState((prev) => ({
      ...prev,
      redesign: newRedesignData,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Journey sequence management
  const handleAddStage = (quadrantId: QuadrantId) => {
    const defaultTitles: Record<QuadrantId, string> = {
      ENHANCE: 'Enhanced Research & Drafting Support',
      EMPOWER: 'Learner-Led Strategic Synthesis',
      ADOPT: 'Critical Interrogation of AI-Structured Model',
      SHAPE: 'Problem Boundary Framing & Governance',
    };

    const newStage: JourneyStage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      quadrantId,
      stageTitle: defaultTitles[quadrantId] || 'Learning Stage',
      delegatedToAI: '',
      retainedForLearner: '',
      rationale: '',
    };

    setState((prev) => ({
      ...prev,
      journey: [...prev.journey, newStage],
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleUpdateStage = (
    id: string,
    field: keyof JourneyStage,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      journey: prev.journey.map((stage) =>
        stage.id === id ? { ...stage, [field]: value } : stage
      ),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleRemoveStage = (id: string) => {
    setState((prev) => ({
      ...prev,
      journey: prev.journey.filter((s) => s.id !== id),
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleMoveStage = (index: number, direction: 'up' | 'down') => {
    setState((prev) => {
      const newJourney = [...prev.journey];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newJourney.length) return prev;
      const [moved] = newJourney.splice(index, 1);
      newJourney.splice(targetIndex, 0, moved);
      return {
        ...prev,
        journey: newJourney,
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleApplyTemplate = (template: typeof SUGGESTED_JOURNEY_TEMPLATES[0]) => {
    const instantiatedStages: JourneyStage[] = template.sequence.map((s) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      quadrantId: s.quadrantId,
      stageTitle: s.stageTitle,
      delegatedToAI: s.delegatedToAI,
      retainedForLearner: s.retainedForLearner,
      rationale: s.rationale,
    }));

    setState((prev) => ({
      ...prev,
      journey: instantiatedStages,
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Capability check update
  const handleToggleEvidence = (item: string) => {
    setState((prev) => {
      const current = prev.capability.selectedEvidence;
      const updated = current.includes(item)
        ? current.filter((i) => i !== item)
        : [...current, item];
      return {
        ...prev,
        capability: { ...prev.capability, selectedEvidence: updated },
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleCapabilityFieldChange = (
    field: keyof CapabilityCheck,
    value: string
  ) => {
    setState((prev) => ({
      ...prev,
      capability: { ...prev.capability, [field]: value },
      lastUpdated: new Date().toISOString(),
    }));
  };

  // Reset confirmation
  const handleConfirmReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ ...INITIAL_STATE, currentStep: 1 });
    setMaxVisitedStep(1);
    setIsResetOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasSavedData =
    Boolean(state.activity.name) ||
    state.diagnosis.selectedQuadrants.length > 0 ||
    state.journey.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] dark:bg-[#0C1019] text-slate-900 dark:text-slate-100 selection:bg-teal-100 selection:text-teal-900 transition-colors duration-300">
      {/* Top Header */}
      <Header
        onResetClick={() => setIsResetOpen(true)}
        onPrivacyClick={() => setIsPrivacyOpen(true)}
        hasSavedData={hasSavedData}
        canViewPlan={state.journey.length > 0}
        onViewPlanDirectly={() => goToStep(7)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* 7-Step Navigation */}
      <StepNavigation
        currentStep={state.currentStep}
        maxVisitedStep={maxVisitedStep}
        onSelectStep={goToStep}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {state.currentStep === 1 && (
          <Step1Define
            activity={state.activity}
            onChange={handleActivityChange}
            onNext={() => goToStep(2)}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {state.currentStep === 2 && (
          <Step2Diagnose
            diagnosis={state.diagnosis}
            onToggleQuadrant={handleToggleQuadrant}
            onRationaleChange={handleDiagnosisRationaleChange}
            onNext={() => goToStep(3)}
            onPrev={() => goToStep(1)}
          />
        )}

        {state.currentStep === 3 && (
          <Step3CognitiveWork
            profile={state.cognitiveProfile}
            onChangeLevel={handleChangeCognitiveLevel}
            onToggleItem={handleToggleCognitiveItem}
            onNext={() => goToStep(4)}
            onPrev={() => goToStep(2)}
          />
        )}

        {state.currentStep === 4 && (
          <Step4Redesign
            data={state.redesign}
            onChange={handleRedesignChange}
            onNext={() => goToStep(5)}
            onPrev={() => goToStep(3)}
          />
        )}

        {state.currentStep === 5 && (
          <Step5Sequence
            journey={state.journey}
            onAddStage={handleAddStage}
            onUpdateStage={handleUpdateStage}
            onRemoveStage={handleRemoveStage}
            onMoveStage={handleMoveStage}
            onApplyTemplate={handleApplyTemplate}
            onNext={() => goToStep(6)}
            onPrev={() => goToStep(4)}
          />
        )}

        {state.currentStep === 6 && (
          <Step6Capability
            capability={state.capability}
            onToggleEvidence={handleToggleEvidence}
            onChangeField={handleCapabilityFieldChange}
            onNext={() => goToStep(7)}
            onPrev={() => goToStep(5)}
          />
        )}

        {state.currentStep === 7 && (
          <Step7JourneyPlan
            state={state}
            onEditJourney={() => goToStep(5)}
            onStartNewDesign={() => setIsResetOpen(true)}
          />
        )}

        {/* Reflection Moment Banner (Between Steps 1-6) */}
        {state.currentStep < 7 && (
          <ReflectionBanner step={state.currentStep} />
        )}
      </main>

      {/* Modern Academic Footer with Dr Afshin Tanouri Attribution */}
      <footer className="no-print border-t border-[#E5E0D6] dark:border-white/10 bg-white/80 dark:bg-[#0E1424]/80 backdrop-blur-xs py-6 px-4 sm:px-6 text-xs text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <button
              onClick={() => setIsAuthorOpen(true)}
              className="inline-flex items-center gap-1.5 font-bold text-[#232D4B] dark:text-[#FFD300] hover:text-[#DC5300] dark:hover:text-white transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#DC5300]" />
              <span>Framework: {AUTHOR_ATTRIBUTION.name}</span>
            </button>
            <span className="hidden sm:inline text-stone-300 dark:text-slate-700">·</span>
            <a
              href={`mailto:${AUTHOR_ATTRIBUTION.email}`}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-[#232D4B] dark:hover:text-white hover:underline"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{AUTHOR_ATTRIBUTION.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#5B7945] dark:text-[#98B878]" />
              <span>100% Client-Side Privacy</span>
            </div>
            <span className="text-stone-300 dark:text-slate-700">·</span>
            <button
              onClick={() => setIsResetOpen(true)}
              className="text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-200 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Clear my data
            </button>
          </div>
        </div>
      </footer>

      {/* Confirmation and Info Modals */}
      <ResetModal
        isOpen={isResetOpen}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <AuthorModal
        isOpen={isAuthorOpen}
        onClose={() => setIsAuthorOpen(false)}
      />
    </div>
  );
}
