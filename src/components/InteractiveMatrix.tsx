/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { QuadrantId } from '../types';
import { MATRIX_QUADRANTS, MATRIX_AXES } from '../config/matrixConfig';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface InteractiveMatrixProps {
  mode: 'interactive' | 'compact' | 'comparison';
  selectedQuadrants?: QuadrantId[];
  onToggleQuadrant?: (id: QuadrantId) => void;
  journeyStages?: Array<{ quadrantId: QuadrantId; stepNumber: number }>;
  showDescriptions?: boolean;
}

export const InteractiveMatrix: React.FC<InteractiveMatrixProps> = ({
  mode = 'interactive',
  selectedQuadrants = [],
  onToggleQuadrant,
  journeyStages = [],
  showDescriptions = true,
}) => {
  const isInteractive = mode === 'interactive';

  // Helper to get stage numbers in this quadrant for comparison mode
  const getStageNumbersForQuadrant = (id: QuadrantId) => {
    return journeyStages
      .filter((s) => s.quadrantId === id)
      .map((s) => s.stepNumber);
  };

  const renderQuadrantCard = (id: QuadrantId) => {
    const q = MATRIX_QUADRANTS[id];
    const isSelected = selectedQuadrants.includes(id);
    const stageNumbers = getStageNumbersForQuadrant(id);
    const hasJourneyStages = stageNumbers.length > 0;

    const isHighlighted = isInteractive ? isSelected : isSelected || hasJourneyStages;

    return (
      <div
        key={id}
        onClick={() => isInteractive && onToggleQuadrant && onToggleQuadrant(id)}
        role={isInteractive ? 'checkbox' : undefined}
        aria-checked={isInteractive ? isSelected : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={(e) => {
          if (isInteractive && onToggleQuadrant && (e.key === ' ' || e.key === 'Enter')) {
            e.preventDefault();
            onToggleQuadrant(id);
          }
        }}
        className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
          isInteractive ? 'cursor-pointer' : ''
        } ${
          isHighlighted
            ? 'glass-card-interactive shadow-lg ring-2 ring-offset-2 dark:ring-offset-slate-900 bg-white/85 dark:bg-white/10'
            : 'bg-white/70 dark:bg-white/5 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-xs hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-md'
        }`}
        style={{
          borderColor: isHighlighted ? q.colors.accent : undefined,
          ['--tw-ring-color' as any]: q.colors.accent,
        }}
      >
        {/* Specular glass reflection overlay on hover/active */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 dark:from-white/5 via-transparent to-white/60 dark:to-white/10 pointer-events-none rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Card Header: Quadrant Name, Literacy Tag, and Selection Indicator */}
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-2 mb-2.5">
            <div className="flex items-center flex-wrap gap-1.5">
              <span
                className="text-[11px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-lg text-white shadow-2xs"
                style={{ backgroundColor: q.colors.accent }}
              >
                {q.name}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-white/10 px-2 py-0.5 rounded-md border border-white/60 dark:border-white/10">
                {q.literacyEmphasis} LITERACY
              </span>
            </div>

            {/* In interactive mode: Checkbox indicator */}
            {isInteractive && (
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all shadow-2xs ${
                  isSelected
                    ? 'text-white scale-105'
                    : 'border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-white/10 hover:border-slate-400'
                }`}
                style={{
                  backgroundColor: isSelected ? q.colors.accent : undefined,
                  borderColor: isSelected ? q.colors.accent : undefined,
                }}
              >
                {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
              </div>
            )}

            {/* In comparison/plan mode: Show numbered stage pills */}
            {!isInteractive && hasJourneyStages && (
              <div className="flex items-center gap-1">
                {stageNumbers.map((num) => (
                  <span
                    key={num}
                    className="w-6 h-6 rounded-full bg-[#232D4B] dark:bg-[#FFD300] text-[#FFD300] dark:text-[#232D4B] text-xs font-extrabold flex items-center justify-center shadow-xs border border-white/40"
                    title={`Stage ${num} in Journey`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Short Tagline / Description */}
          <h4 className="text-base sm:text-lg font-extrabold text-[#232D4B] dark:text-[#F1F5F9] mt-1 mb-1.5 tracking-tight">
            “{q.shortDescription}”
          </h4>

          {/* Longer description & details (shown in interactive or full mode) */}
          {showDescriptions && (
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
              {q.longerExplanation}
            </p>
          )}
        </div>

        {/* Guiding Question & Concrete Example */}
        {showDescriptions && (
          <div className="relative z-10 mt-4 pt-3 border-t border-slate-900/10 dark:border-white/10">
            <div className="text-[11px] font-bold text-[#232D4B] dark:text-[#FFD300] italic mb-1.5 flex items-center gap-1">
              <span>Q: “{q.question}”</span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-white/5 backdrop-blur-xs p-2.5 rounded-xl border border-white/70 dark:border-white/10 shadow-2xs leading-relaxed">
              <strong className="text-[#232D4B] dark:text-[#F1F5F9] font-bold">Example:</strong> {q.example}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full">
      {/* Visual Axis Container in Liquid Glass Frame */}
      <div className="relative p-4 sm:p-6 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/75 dark:border-white/10 rounded-3xl shadow-lg ring-1 ring-black/5 dark:ring-white/5">
        {/* Ambient background light spot */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFD300]/15 dark:bg-[#FFD300]/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#DC5300]/10 dark:bg-[#DC5300]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Vertical Axis Indicator (Top: COMPLEMENTING, Bottom: STRUCTURING) */}
        <div className="relative z-10 text-center pb-3.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-[#151D2E]/80 backdrop-blur-md border border-white/80 dark:border-white/10 rounded-full text-xs font-bold text-[#232D4B] dark:text-[#FFD300] shadow-2xs">
            <span className="text-[#DC5300] font-black">▲</span>
            <span className="tracking-wide">{MATRIX_AXES.vertical.top}</span>
            <span className="text-stone-300 dark:text-slate-600">|</span>
            <span className="text-[11px] font-normal text-slate-600 dark:text-slate-400">
              {MATRIX_AXES.vertical.description}
            </span>
            <span className="text-stone-300 dark:text-slate-600">|</span>
            <span className="tracking-wide">{MATRIX_AXES.vertical.bottom}</span>
            <span className="text-[#232D4B] dark:text-[#FFD300] font-black">▼</span>
          </div>
        </div>

        {/* Horizontal Axis Guides */}
        <div className="relative z-10 flex items-center justify-between text-xs font-extrabold text-[#232D4B] dark:text-[#F1F5F9] px-3 pb-3">
          <span className="flex items-center gap-1 bg-white/70 dark:bg-white/10 px-2.5 py-1 rounded-md border border-white/60 dark:border-white/10 shadow-2xs">
            ◀ {MATRIX_AXES.horizontal.left}
          </span>
          <span className="text-[11px] font-normal text-slate-600 dark:text-slate-400 hidden sm:inline text-center px-2">
            {MATRIX_AXES.horizontal.description}
          </span>
          <span className="flex items-center gap-1 bg-white/70 dark:bg-white/10 px-2.5 py-1 rounded-md border border-white/60 dark:border-white/10 shadow-2xs">
            {MATRIX_AXES.horizontal.right} ▶
          </span>
        </div>

        {/* The 2x2 Quadrant Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Left: ENHANCE */}
          {renderQuadrantCard('ENHANCE')}

          {/* Top Right: EMPOWER */}
          {renderQuadrantCard('EMPOWER')}

          {/* Bottom Left: ADOPT */}
          {renderQuadrantCard('ADOPT')}

          {/* Bottom Right: TRANSFORM (key is SHAPE in types) */}
          {renderQuadrantCard('SHAPE')}
        </div>

        {/* Bottom Horizontal Axis Note for small screens */}
        <div className="relative z-10 sm:hidden text-center text-[10px] text-slate-500 mt-2.5 px-1">
          Horizontal Axis: {MATRIX_AXES.horizontal.description}
        </div>
      </div>
    </div>
  );
};
