/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { generateCognitiveObservation, validateJourneySteps } from './cognitiveAnalysis';
import { CognitiveWorkProfile, JourneyStage } from '../types';

test('generateCognitiveObservation produces correct deterministic rule feedback for high production', () => {
  const profile: CognitiveWorkProfile = {
    upstream: { level: 'LOW', selectedItems: [] },
    production: { level: 'HIGH', selectedItems: [] },
    downstream: { level: 'LOW', selectedItems: [] },
  };

  const observation = generateCognitiveObservation(profile);
  assert.match(observation, /places most learner cognitive work in production/i);
});

test('generateCognitiveObservation detects substantial responsibility upstream & production with low downstream', () => {
  const profile: CognitiveWorkProfile = {
    upstream: { level: 'HIGH', selectedItems: ['Problem framing'] },
    production: { level: 'HIGH', selectedItems: ['Analysis'] },
    downstream: { level: 'LOW', selectedItems: [] },
  };

  const observation = generateCognitiveObservation(profile);
  assert.match(observation, /places substantial responsibility on learners upstream as well as during production/i);
  assert.match(observation, /downstream evaluation and accountability appear relatively lightly represented/i);
});

test('generateCognitiveObservation detects high downstream with low upstream', () => {
  const profile: CognitiveWorkProfile = {
    upstream: { level: 'LOW', selectedItems: [] },
    production: { level: 'MODERATE', selectedItems: [] },
    downstream: { level: 'HIGH', selectedItems: ['Defending the outcome'] },
  };

  const observation = generateCognitiveObservation(profile);
  assert.match(observation, /structured inputs with low upstream framing burden/i);
});

test('validateJourneySteps enforces non-empty stages and mandatory rationale', () => {
  const emptyStages: JourneyStage[] = [];
  const emptyValidation = validateJourneySteps(emptyStages);
  assert.equal(emptyValidation.isValid, false);
  assert.equal(emptyValidation.errors.length, 1);

  const missingRationaleStages: JourneyStage[] = [
    {
      id: '1',
      quadrantId: 'ENHANCE',
      stageTitle: 'Research',
      delegatedToAI: 'Data collection',
      retainedForLearner: 'Verification',
      rationale: '', // missing
    },
  ];
  const invalidValidation = validateJourneySteps(missingRationaleStages);
  assert.equal(invalidValidation.isValid, false);
  assert.equal(invalidValidation.missingRationales.includes(1), true);

  const validStages: JourneyStage[] = [
    {
      id: '1',
      quadrantId: 'ENHANCE',
      stageTitle: 'Research',
      delegatedToAI: 'Data collection',
      retainedForLearner: 'Verification',
      rationale: 'Retains epistemic vigilance while reducing clerical toil.',
    },
  ];
  const validValidation = validateJourneySteps(validStages);
  assert.equal(validValidation.isValid, true);
  assert.equal(validValidation.errors.length, 0);
});
