/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';

interface StepNavigationProps {
  currentStep: number;
  maxVisitedStep: number;
  onSelectStep: (step: number) => void;
}

export const STEPS = [
  { id: 1, label: 'Define', shortLabel: '1. Define', description: 'Current Activity' },
  { id: 2, label: 'Diagnose', shortLabel: '2. Diagnose', description: '2×2 Matrix' },
  { id: 3, label: 'Cognitive Work', shortLabel: '3. Cognitive', description: 'Upstream/Prod/Downstream' },
  { id: 4, label: 'Redesign', shortLabel: '4. Redesign', description: 'Quadrant Options' },
  { id: 5, label: 'Sequence', shortLabel: '5. Sequence', description: 'Build Journey' },
  { id: 6, label: 'Capability', shortLabel: '6. Capability', description: 'Evidence of Mastery' },
  { id: 7, label: 'Journey Plan', shortLabel: '7. Plan', description: 'Executive Summary' },
];

export const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  maxVisitedStep,
  onSelectStep,
}) => {
  return (
    <nav
      aria-label="Progress navigation"
      className="glass-pill-nav sticky top-[57px] z-30 transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto no-scrollbar py-2.5">
          <ol className="flex items-center justify-between min-w-[680px] sm:min-w-0 gap-1 sm:gap-2">
            {STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep || (step.id <= maxVisitedStep && step.id !== currentStep);
              const isAccessible = step.id <= Math.max(currentStep, maxVisitedStep);

              return (
                <li key={step.id} className="flex-1 min-w-[90px]">
                  <button
                    onClick={() => isAccessible && onSelectStep(step.id)}
                    disabled={!isAccessible}
                    aria-current={isActive ? 'step' : undefined}
                    className={`w-full text-left p-2.5 rounded-xl transition-all text-xs group flex flex-col justify-center ${
                      isActive
                        ? 'bg-gradient-to-r from-[#2D395E] via-[#232D4B] to-[#151C2E] text-white shadow-md font-semibold ring-2 ring-[#FFD300]/50'
                        : isCompleted
                        ? 'text-[#232D4B] dark:text-slate-200 hover:bg-white dark:hover:bg-white/10 cursor-pointer bg-white/70 dark:bg-white/5 border border-white/80 dark:border-white/10'
                        : 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50 bg-stone-50/50 dark:bg-white/2'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? 'bg-[#FFD300] text-[#232D4B]'
                            : isCompleted
                            ? 'bg-[#E7EFDE] dark:bg-[#77915D]/30 text-[#2F481E] dark:text-[#98B878]'
                            : 'bg-stone-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isCompleted && !isActive ? (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        ) : (
                          step.id
                        )}
                      </span>
                      <span className="truncate uppercase tracking-wider text-[10px] font-extrabold">
                        {step.label}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] truncate block ${
                        isActive
                          ? 'text-[#FFD300]/90 font-medium'
                          : isCompleted
                          ? 'text-slate-600 dark:text-slate-400'
                          : 'text-slate-400 dark:text-slate-600'
                      }`}
                    >
                      {step.description}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </nav>
  );
};
