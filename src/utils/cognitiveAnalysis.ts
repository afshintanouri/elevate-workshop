/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CognitiveWorkProfile, JourneyStage, AppState } from '../types';

/**
 * Deterministic, rule-based cognitive work observation generator.
 * Evaluates the distribution of learner cognitive effort across UPSTREAM, PRODUCTION, and DOWNSTREAM.
 */
export function generateCognitiveObservation(profile: CognitiveWorkProfile): string {
  const { upstream, production, downstream } = profile;

  const u = upstream.level;
  const p = production.level;
  const d = downstream.level;

  // Case 1: High production, low upstream & downstream
  if (p === 'HIGH' && u === 'LOW' && d === 'LOW') {
    return 'Your current design places most learner cognitive work in production. Problem framing has already been solved for the learner, and downstream critical evaluation remains largely unexercised.';
  }

  // Case 2: Substantial responsibility upstream and in production, but low downstream
  if ((u === 'HIGH' || u === 'MODERATE') && (p === 'HIGH' || p === 'MODERATE') && d === 'LOW') {
    return 'This activity places substantial responsibility on learners upstream as well as during production. However, downstream evaluation and accountability appear relatively lightly represented.';
  }

  // Case 3: Downstream lightly represented overall
  if (d === 'LOW' && (u !== 'LOW' || p !== 'LOW')) {
    return 'Downstream evaluation, ethical critique, and accountability appear relatively lightly represented. Learners may produce artefacts without being required to defend or stress-test their validity.';
  }

  // Case 4: Upstream lightly represented, high downstream
  if (u === 'LOW' && (d === 'HIGH' || d === 'MODERATE')) {
    return 'Learners encounter heavily structured inputs with low upstream framing burden, but carry significant cognitive weight downstream in evaluating, verifying, and defending the final decisions.';
  }

  // Case 5: High across all three stages
  if (u === 'HIGH' && p === 'HIGH' && d === 'HIGH') {
    return 'This activity demands comprehensive cognitive engagement across all dimensions—from ambiguous problem framing through intensive execution to rigorous downstream defense.';
  }

  // Case 6: High upstream, low/moderate production, high downstream (Strategic Orchestrator)
  if (u === 'HIGH' && (p === 'LOW' || p === 'MODERATE') && d === 'HIGH') {
    return 'Learners focus their cognitive capital upstream on framing and downstream on critical governance, while routine production work is largely streamlined or delegated.';
  }

  // Case 7: Moderate across the board
  if (u === 'MODERATE' && p === 'MODERATE' && d === 'MODERATE') {
    return 'Learner cognitive work is evenly distributed across problem framing, production execution, and critical evaluation, providing a balanced developmental arc.';
  }

  // Default fallback for low across all or other combinations
  if (u === 'LOW' && p === 'LOW' && d === 'LOW') {
    return 'Cognitive demands appear low across all three stages. Consider identifying where learners will experience generative challenge that builds real workforce capability.';
  }

  return `Current cognitive profile: Upstream is ${u.toLowerCase()}, production is ${p.toLowerCase()}, and downstream evaluation is ${d.toLowerCase()}. Good learning design intentionally allocates this cognitive effort rather than defaulting to mechanical production.`;
}

/**
 * Validates journey completeness for proceeding to the final plan.
 */
export function validateJourneySteps(stages: JourneyStage[]): {
  isValid: boolean;
  missingRationales: number[];
  errors: string[];
} {
  const errors: string[] = [];
  const missingRationales: number[] = [];

  if (stages.length === 0) {
    errors.push('At least one journey stage is required to build a learning journey.');
  }

  stages.forEach((stage, index) => {
    if (!stage.rationale || stage.rationale.trim().length === 0) {
      missingRationales.push(index + 1);
      errors.push(`Stage ${index + 1} (${stage.stageTitle || 'Untitled'}) requires a rationale for why cognitive work is allocated this way.`);
    }
  });

  return {
    isValid: errors.length === 0,
    missingRationales,
    errors,
  };
}

/**
 * Checks overall completeness of user inputs across all steps.
 */
export function checkStepCompletion(step: number, state: AppState): {
  isComplete: boolean;
  message?: string;
} {
  switch (step) {
    case 1:
      return {
        isComplete: !!(state.activity.name.trim() && state.activity.intendedCapability.trim()),
        message: 'Enter the activity name and intended capability to proceed.',
      };
    case 2:
      return {
        isComplete: state.diagnosis.selectedQuadrants.length > 0,
        message: 'Select at least one quadrant representing the current activity.',
      };
    case 3:
      return {
        isComplete: true, // Has default values
      };
    case 4:
      return {
        isComplete: true, // Redesign cards are exploratory
      };
    case 5:
      return {
        isComplete: state.journey.length > 0 && state.journey.every((s) => s.rationale.trim().length > 0),
        message: 'Add at least one stage and provide a rationale for each stage.',
      };
    case 6:
      return {
        isComplete: state.capability.selectedEvidence.length > 0 || state.capability.ultimateDemonstration.trim().length > 0,
        message: 'Select capability evidence or specify what learners will ultimately produce.',
      };
    case 7:
      return {
        isComplete: true,
      };
    default:
      return { isComplete: true };
  }
}
