/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { REFLECTION_MOMENTS } from '../config/matrixConfig';
import { Compass } from 'lucide-react';

interface ReflectionBannerProps {
  step: number;
}

export const ReflectionBanner: React.FC<ReflectionBannerProps> = ({ step }) => {
  const reflection = REFLECTION_MOMENTS.find((m) => m.stepAfter === step);

  if (!reflection) return null;

  return (
    <aside
      aria-label="Design reflection moment"
      className="my-8 p-5 sm:p-6 glass-panel rounded-3xl flex items-start gap-4 transition-all border border-amber-300/40 dark:border-amber-500/20 bg-gradient-to-r from-amber-50/50 via-white/60 to-orange-50/40 dark:from-amber-950/20 dark:via-slate-900/40 dark:to-orange-950/20 shadow-md"
    >
      <div className="w-10 h-10 rounded-2xl bg-amber-500/15 dark:bg-amber-400/10 flex items-center justify-center shrink-0 border border-amber-500/20">
        <Compass className="w-5 h-5 text-amber-600 dark:text-[#FFD300]" />
      </div>
      <div>
        <div className="text-[11px] uppercase font-extrabold tracking-widest text-amber-700 dark:text-[#FFD300] mb-1">
          Deliberate Design Reflection
        </div>
        <p className="text-base sm:text-lg font-serif font-bold italic text-[#232D4B] dark:text-[#F1F5F9] leading-snug">
          “{reflection.quote}”
        </p>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-medium">
          {reflection.subtext}
        </p>
      </div>
    </aside>
  );
};
