/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuadrantConfig, QuadrantId } from '../types';

export const AUTHOR_ATTRIBUTION = {
  name: 'Dr Afshin Tanouri',
  title: 'Academic & Learning Designer',
  institution: '',
  email: 'afshin.tanouri@flinders.edu.au',
  frameworkName: 'Human-AI Learning Journey Framework',
  copyrightYear: 2026,
};

/**
 * Centralized Configuration Object for the Human-AI Matrix & Workshop System.
 * Incorporates Flinders University institutional palette (#232D4B, #FFD300, #DC5300, #F6EEE1, #CB9828, #77915D).
 */
export const MATRIX_QUADRANTS: Record<QuadrantId, QuadrantConfig> = {
  ENHANCE: {
    id: 'ENHANCE',
    name: 'ENHANCE',
    tagline: 'Top-Left Quadrant',
    shortDescription: 'AI helps me do it better.',
    longerExplanation:
      'The task and expected outcome are substantially defined. AI helps the learner perform the task more effectively, efficiently or extensively.',
    example:
      'Complete the report you would normally produce, but use Copilot or another AI system to assist with research, analysis, drafting or refinement.',
    literacyEmphasis: 'FUNCTIONAL',
    literacyType: 'FUNCTIONAL',
    question: 'Can I use AI effectively within a defined task?',
    colors: {
      accent: '#5B7945', // Flinders Sage (#77915D harmonious shade)
      bg: '#F5F8F1',
      lightBg: '#E7EFDE',
      border: '#C0D5AF',
      text: '#2F481E',
      badge: '#486434',
    },
  },
  EMPOWER: {
    id: 'EMPOWER',
    name: 'EMPOWER',
    tagline: 'Top-Right Quadrant',
    shortDescription: 'I lead; AI expands what I can achieve.',
    longerExplanation:
      'The learner has greater ownership over the goal, approach or outcome and determines how AI should be used as a resource.',
    example:
      'Develop a digital marketing strategy and the assets needed to execute it. Determine what success looks like and use appropriate AI tools where they help achieve your objectives.',
    literacyEmphasis: 'ORCHESTRATIONAL',
    literacyType: 'ORCHESTRATIONAL',
    question: 'Can I decide where, when and how AI should contribute?',
    colors: {
      accent: '#B87F10', // Flinders Gold/Ochre (#FFD300 / #CB9828 harmonious shade)
      bg: '#FFFDF5',
      lightBg: '#FEF6D8',
      border: '#F2D785',
      text: '#6A4604',
      badge: '#996706',
    },
  },
  ADOPT: {
    id: 'ADOPT',
    name: 'ADOPT',
    tagline: 'Bottom-Left Quadrant',
    shortDescription: 'AI structures; I evaluate.',
    longerExplanation:
      'AI performs substantial structuring work by proposing a framework, model, decision process, criteria or approach. The learner must critically interrogate, adapt, accept or reject that structure.',
    example:
      'Ask AI to design a decision system for a defined problem. Apply the system, interrogate its assumptions and criteria, and determine whether the resulting recommendations should be trusted.',
    literacyEmphasis: 'EVALUATIVE',
    literacyType: 'EVALUATIVE',
    question: 'Can I critically judge the structure AI has created?',
    colors: {
      accent: '#232D4B', // Flinders Primary Deep Navy
      bg: '#F4F6FB',
      lightBg: '#E4E9F4',
      border: '#B7C4DE',
      text: '#17203B',
      badge: '#232D4B',
    },
  },
  SHAPE: {
    id: 'SHAPE',
    name: 'TRANSFORM', // Updated from SHAPE to TRANSFORM as requested
    tagline: 'Bottom-Right Quadrant',
    shortDescription: "I structure the problem and determine AI's role.",
    longerExplanation:
      "The learner works with a more ambiguous situation, determines what needs to be understood or solved, decides which criteria and evidence matter, determines how AI should contribute, and retains responsibility for governance and accountability.",
    example:
      "Website traffic and sales have fallen dramatically. Determine what is happening, identify what evidence matters, and design an appropriate AI-enabled decision-support approach within relevant governance constraints.",
    literacyEmphasis: 'SYSTEMIC',
    literacyType: 'SYSTEMIC',
    question: 'Can I determine how humans and AI should work together around the problem?',
    colors: {
      accent: '#DC5300', // Flinders Burnt Orange
      bg: '#FFF5EF',
      lightBg: '#FFE7D8',
      border: '#FFC6A3',
      text: '#8E3400',
      badge: '#B84300',
    },
  },
};

export const MATRIX_AXES = {
  vertical: {
    top: 'COMPLEMENTING',
    bottom: 'STRUCTURING',
    description:
      'Does AI mainly add resources, or participate in structuring how the problem is understood and addressed?',
  },
  horizontal: {
    left: 'AI-LED',
    right: 'LEARNER-LED',
    description: 'Where does cognitive agency primarily sit?',
  },
};

export const COGNITIVE_STAGES_CONFIG = {
  upstream: {
    title: 'UPSTREAM',
    subtitle: 'Figuring out what needs to be done.',
    items: [
      'Problem framing',
      'Sensemaking',
      'Determining requirements',
      'Identifying relevant information',
      'Making assumptions visible',
      'Establishing criteria',
      'Understanding constraints',
      'Defining success',
      'Negotiating ambiguity',
    ],
  },
  production: {
    title: 'PRODUCTION',
    subtitle: 'Doing the work.',
    items: [
      'Research',
      'Analysis',
      'Calculation',
      'Generating',
      'Drafting',
      'Creating',
      'Synthesising',
      'Executing',
      'Producing artefacts',
    ],
  },
  downstream: {
    title: 'DOWNSTREAM',
    subtitle: 'Deciding whether to trust and act.',
    items: [
      'Verification',
      'Evaluation',
      'Contextual judgement',
      'Challenging assumptions',
      'Considering consequences',
      'Ethical judgement',
      'Governance',
      'Decision-making',
      'Accountability',
      'Defending the outcome',
    ],
  },
};

export const CAPABILITY_EVIDENCE_ITEMS = [
  'Explain their reasoning',
  'Defend their choices',
  'Critique AI output',
  'Identify limitations',
  'Identify assumptions',
  'Reject an AI recommendation when appropriate',
  'Adapt when conditions change',
  'Respond to new evidence',
  'Justify use of AI',
  'Justify non-use of AI',
  'Explain consequences',
  'Apply contextual judgement',
  'Address ethical implications',
  'Address governance requirements',
  'Demonstrate accountability',
  'Demonstrate independent judgement',
];

export const REFLECTION_MOMENTS: { stepAfter: number; quote: string; subtext: string }[] = [
  {
    stepAfter: 1,
    quote: 'Who is doing the thinking here?',
    subtext: 'Before assigning tools, locate where genuine human development takes place.',
  },
  {
    stepAfter: 2,
    quote: 'Are you scaffolding learning, or scaffolding away the capability you want learners to develop?',
    subtext: 'Efficiency in completing a task is not equivalent to developing capability.',
  },
  {
    stepAfter: 3,
    quote: 'What happens when AI performs the work through which learners previously developed expertise?',
    subtext: 'When intermediate cognitive struggles vanish, deliberate design must re-anchor agency.',
  },
  {
    stepAfter: 4,
    quote: 'What are you deliberately leaving difficult?',
    subtext: 'Learning requires generative struggle; frictionless outputs can disguise hollowed capability.',
  },
  {
    stepAfter: 5,
    quote: 'Could a learner produce an impressive output here without possessing the capability you intended to develop?',
    subtext: 'The journey must test human reasoning, contextual discernment, and defensibility.',
  },
  {
    stepAfter: 6,
    quote: 'What cognitive work are you making visible?',
    subtext: 'Genuine capability reveals itself in justification, interrogation, and accountability.',
  },
];

export const SAMPLE_WORKSHOP_PRESETS = [
  {
    name: 'Digital Marketing Strategy Project',
    learnerGroup: 'MBA students & Marketing Managers',
    intendedCapability:
      'Develop, stress-test, and defend an evidence-based digital marketing strategy with explicit ROI metrics and brand governance.',
    currentActivity:
      'Students are given a brief for an organic beverage company. They conduct market research, draft a 15-page strategy deck, outline customer personas, and present recommendations. Most groups currently paste the prompt into ChatGPT to generate persona tables and channel tactics, resulting in superficial consistency.',
    diagnosisQuadrants: ['ENHANCE'] as QuadrantId[],
    diagnosisRationale:
      'Learners primarily use AI to draft personas and generate channel tactics for a predetermined brief. AI assists production, but learners rarely interrogate the underlying marketing assumptions or design novel frameworks.',
    cognitiveProfile: {
      upstream: { level: 'LOW' as const, selectedItems: ['Identifying relevant information'] },
      production: { level: 'HIGH' as const, selectedItems: ['Research', 'Drafting', 'Creating', 'Producing artefacts'] },
      downstream: { level: 'LOW' as const, selectedItems: ['Evaluation'] },
    },
  },
  {
    name: 'Industrial Engineering Root-Cause Analysis',
    learnerGroup: 'Graduate Engineers & Plant Operations Specialists',
    intendedCapability:
      'Isolate failure vectors in automated manufacturing lines, interrogate AI diagnostic models, and establish safety protocols under operational ambiguity.',
    currentActivity:
      'Engineers receive an incident log from a packaging conveyor stoppage. Currently, they load error codes into the vendor diagnostic software, accept the automated recommendation checklist, and write a standard compliance incident memo.',
    diagnosisQuadrants: ['ADOPT'] as QuadrantId[],
    diagnosisRationale:
      'The engineering team accepts diagnostic decision trees created by the AI vendor system. They follow the structure rather than questioning false positives or sensor blindspots.',
    cognitiveProfile: {
      upstream: { level: 'LOW' as const, selectedItems: ['Understanding constraints'] },
      production: { level: 'MODERATE' as const, selectedItems: ['Analysis', 'Execution'] },
      downstream: { level: 'MODERATE' as const, selectedItems: ['Verification', 'Decision-making'] },
    },
  },
  {
    name: 'Healthcare Clinical Diagnostic Reasoning',
    learnerGroup: 'Postgraduate Medical Residents & Clinical Fellows',
    intendedCapability:
      'Synthesise atypical patient presentations, calibrate diagnostic AI suggestions against clinical examination, and defend triage decisions with patient-centred ethics.',
    currentActivity:
      'Residents review electronic health record cases with rare multi-organ symptoms. They review AI differential diagnoses, select tests, and outline management plans.',
    diagnosisQuadrants: ['ADOPT', 'ENHANCE'] as QuadrantId[],
    diagnosisRationale:
      'AI proposes differential diagnoses and summaries. Residents often accept the top recommendations without challenging model bias or atypical edge cases.',
    cognitiveProfile: {
      upstream: { level: 'MODERATE' as const, selectedItems: ['Problem framing', 'Sensemaking'] },
      production: { level: 'HIGH' as const, selectedItems: ['Research', 'Analysis', 'Synthesising'] },
      downstream: { level: 'MODERATE' as const, selectedItems: ['Verification', 'Contextual judgement', 'Accountability'] },
    },
  },
];

export const SUGGESTED_JOURNEY_TEMPLATES = [
  {
    name: 'Critical Interrogation Arc',
    description: 'Begin with an AI-structured proposal, interrogate its blindspots, and take full ownership of the strategic solution.',
    sequence: [
      {
        quadrantId: 'ADOPT' as QuadrantId,
        stageTitle: 'Interrogate AI Structured Baseline',
        delegatedToAI: 'Generate an initial multi-attribute decision matrix and structural options based on industry benchmark data.',
        retainedForLearner: 'Interrogate unstated assumptions, data omissions, and stakeholder conflicts embedded in the AI framework.',
        rationale: 'Exposes learners to algorithmic bias and structural critique early before any drafting begins.',
      },
      {
        quadrantId: 'SHAPE' as QuadrantId,
        stageTitle: 'Reframing & Defining Human Governance',
        delegatedToAI: 'Summarise historical regulatory precedents and edge-case failure modes upon user request.',
        retainedForLearner: 'Establish problem boundaries, ethical thresholds, and non-negotiable success criteria for this specific organizational context.',
        rationale: 'Forces the learner to exercise systemic agency in determining what matters and what AI must not decide.',
      },
      {
        quadrantId: 'EMPOWER' as QuadrantId,
        stageTitle: 'Orchestrating Solution & Defending Choices',
        delegatedToAI: 'Produce simulation data runs and rapid visual prototypes for different audience archetypes.',
        retainedForLearner: 'Synthesise strategic trade-offs, orchestrate tooling choices, and defend the final recommendation before an executive panel.',
        rationale: 'Learner retains full ownership of the outcome, using AI as an instrument while owning the final judgement.',
      },
    ],
  },
  {
    name: 'Scaffolded Orchestration Arc',
    description: 'Start with guided productivity, move to critical framework evaluation, and culminate in open orchestrational leadership.',
    sequence: [
      {
        quadrantId: 'ENHANCE' as QuadrantId,
        stageTitle: 'Targeted Research & Landscape Mapping',
        delegatedToAI: 'Compile comparative competitor data and extract key themes from extensive customer review corpora.',
        retainedForLearner: 'Verify factual accuracy of data points and discern market signal from marketing noise.',
        rationale: 'Accelerates mechanical gathering to preserve cognitive energy for higher-order sensemaking.',
      },
      {
        quadrantId: 'ADOPT' as QuadrantId,
        stageTitle: 'Evaluating AI-Generated Scenario Models',
        delegatedToAI: 'Structure three divergent financial and market response models with distinct sensitivity variables.',
        retainedForLearner: 'Stress-test model parameters, challenge optimistic growth assumptions, and identify unmodelled external risks.',
        rationale: 'Cultivates evaluative literacy by requiring rigorous inspection of AI-generated frameworks.',
      },
      {
        quadrantId: 'EMPOWER' as QuadrantId,
        stageTitle: 'Autonomous Strategy Synthesis & Defence',
        delegatedToAI: 'Generate alternative counterarguments and role-play aggressive stakeholder objections.',
        retainedForLearner: 'Formulate original strategic vision, make final resource allocation calls, and defend decisions in real time.',
        rationale: 'Demands authentic orchestrational agency and personal accountability for the final outcome.',
      },
    ],
  },
];
