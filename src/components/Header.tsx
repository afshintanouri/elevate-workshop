import React from 'react';
import { ShieldCheck, RotateCcw, FileText, Sun, Moon, Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  onResetClick: () => void;
  onPrivacyClick: () => void;
  hasSavedData: boolean;
  onViewPlanDirectly?: () => void;
  canViewPlan?: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onResetClick,
  onPrivacyClick,
  hasSavedData,
  onViewPlanDirectly,
  canViewPlan,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="border-b border-white/70 dark:border-white/10 bg-white/75 dark:bg-[#0E1424]/75 backdrop-blur-2xl sticky top-0 z-40 transition-all shadow-[0_4px_24px_-4px_rgba(35,45,75,0.04)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark with Modern Compass & Sparkles Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2D395E] via-[#232D4B] to-[#151C2E] dark:from-[#3D4F82] dark:via-[#28365E] dark:to-[#17203A] flex items-center justify-center text-[#FFD300] shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_4px_14px_rgba(35,45,75,0.25)] border border-white/25 group transition-transform hover:scale-105">
            <Compass className="w-5 h-5 text-[#FFD300] stroke-[2.2] transition-transform group-hover:rotate-45 duration-300" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#DC5300] rounded-full border border-white dark:border-[#0E1424]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-[#232D4B] dark:text-[#F1F5F9] leading-tight whitespace-nowrap">
                AI Learning Journey Designer
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block leading-tight font-medium">
              Design learning that develops capability, not just AI-assisted outputs
            </p>
          </div>
        </div>

        {/* Zone 2: Workshop Subtitle */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
          <span className="text-stone-300 dark:text-slate-700">|</span>
          <span className="font-semibold text-[#232D4B]/90 dark:text-slate-300">
            Workshop: Building Workforce Capability That Matters in the Age of AI
          </span>
        </div>

        {/* Zone 3: Actions (Theme Toggle, Plan, Privacy, Reset) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 border border-white/80 dark:border-white/15 text-[#232D4B] dark:text-[#FFD300] shadow-2xs transition-all cursor-pointer active:scale-95"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-[#FFD300] stroke-[2.2]" />
            ) : (
              <Moon className="w-4 h-4 text-[#232D4B] stroke-[2.2]" />
            )}
          </button>

          {canViewPlan && onViewPlanDirectly && (
            <button
              onClick={onViewPlanDirectly}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-black text-[#232D4B] bg-gradient-to-b from-[#FFE34D] to-[#FFD300] hover:from-[#FFE866] hover:to-[#FFD81A] border border-[#F0C400] rounded-xl transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_4px_14px_rgba(255,211,0,0.35)] whitespace-nowrap cursor-pointer active:scale-98"
              title="Jump directly to the generated Journey Plan"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Plan</span>
            </button>
          )}

          <button
            onClick={onPrivacyClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#232D4B] dark:hover:text-white bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 rounded-xl transition-all border border-white/60 dark:border-white/10 shadow-2xs whitespace-nowrap cursor-pointer"
            title="Privacy and browser storage details"
            aria-label="Privacy Information"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#5B7945] dark:text-[#98B878]" />
            <span className="hidden md:inline">Client-Side Privacy</span>
          </button>

          {hasSavedData && (
            <button
              onClick={onResetClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:text-rose-950 dark:hover:text-rose-200 bg-rose-50/60 dark:bg-rose-950/40 hover:bg-rose-100/80 dark:hover:bg-rose-900/60 rounded-xl border border-rose-200/60 dark:border-rose-800/40 transition-all whitespace-nowrap cursor-pointer shadow-2xs"
              title="Clear all stored responses from this browser"
              aria-label="Clear all stored data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Data</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
