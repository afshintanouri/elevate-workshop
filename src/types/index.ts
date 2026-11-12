/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuadrantId = 'ENHANCE' | 'EMPOWER' | 'ADOPT' | 'SHAPE';

export type CognitiveLevel = 'LOW' | 'MODERATE' | 'HIGH';

export interface QuadrantConfig {
  id: QuadrantId;
  name: string;
  shortDescription: string;
  longerExplanation: string;
  example: string;
  literacyEmphasis: string;
  literacyType: 'FUNCTIONAL' | 'ORCHESTRATIONAL' | 'EVALUATIVE' | 'SYSTEMIC';
  question: string;
  tagline: string;
  colors: {
    accent: string;
    bg: string;
    border: string;
    text: string;
    badge: string;
    lightBg: string;
  };
}

export interface ActivityDefinition {
  name: string;
  learnerGroup: string;
  intendedCapability: string;
  currentActivity: string;
}

export interface CurrentDiagnosis {
  selectedQuadrants: QuadrantId[];
  rationale: string;
}

export interface CognitiveStageProfile {
  level: CognitiveLevel;
  selectedItems: string[];
}

export interface CognitiveWorkProfile {
  upstream: CognitiveStageProfile;
  production: CognitiveStageProfile;
  downstream: CognitiveStageProfile;
}

export interface RedesignCardData {
  enhance: {
    learnerAction: string;
    aiContributions: string[];
    aiContributionOther?: string;
    learnerCapability: string;
  };
  empower: {
    learnerOutcome: string;
    unprescribedChoices: string;
    aiAppropriateness: string;
  };
  adopt: {
    aiProposals: string;
    learnerInterrogations: string[];
    rejectionTriggers: string;
  };
  shape: {
    learnerFiguringOut: string;
    deliberateAmbiguity: string;
    learnerDetermines: string[];
    humanOwned: string;
  };
}

export interface JourneyStage {
  id: string;
  quadrantId: QuadrantId;
  stageTitle: string;
  delegatedToAI: string;
  retainedForLearner: string;
  rationale: string;
}

export interface CapabilityCheck {
  selectedEvidence: string[];
  otherEvidence: string;
  ultimateDemonstration: string;
  finalAccountability: string;
}

export interface AppState {
  currentStep: number;
  activity: ActivityDefinition;
  diagnosis: CurrentDiagnosis;
  cognitiveProfile: CognitiveWorkProfile;
  redesign: RedesignCardData;
  journey: JourneyStage[];
  capability: CapabilityCheck;
  lastUpdated: string;
}
