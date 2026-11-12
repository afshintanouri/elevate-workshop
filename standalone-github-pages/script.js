/**
 * AI Learning Journey Designer - Standalone Vanilla JavaScript
 * Clean, zero-dependency client-side architecture.
 */

const AUTHOR_CONFIG = {
  name: 'Dr Afshin Tanouri',
  institution: '',
  email: 'afshin.tanouri@flinders.edu.au',
  framework: 'Human-AI Learning Journey Framework',
  copyright: '© 2026 Dr Afshin Tanouri'
};

// =========================================================================
// CENTRALIZED MATRIX CONFIGURATION (Easily customize quadrant names/labels)
// Incorporates Flinders University brand colours (#232D4B, #FFD300, #DC5300, #77915D)
// =========================================================================
const MATRIX_CONFIG = {
  ENHANCE: {
    id: 'ENHANCE',
    name: 'ENHANCE',
    shortDescription: 'AI helps me do it better.',
    longerExplanation: 'The task and expected outcome are substantially defined. AI helps the learner perform the task more effectively, efficiently or extensively.',
    example: 'Complete the report you would normally produce, but use Copilot or another AI system to assist with research, analysis, drafting or refinement.',
    literacyEmphasis: 'FUNCTIONAL',
    question: 'Can I use AI effectively within a defined task?',
    accentColor: '#5B7945',
    bgColor: '#F5F8F1',
    textColor: '#2F481E'
  },
  EMPOWER: {
    id: 'EMPOWER',
    name: 'EMPOWER',
    shortDescription: 'I lead; AI expands what I can achieve.',
    longerExplanation: 'The learner has greater ownership over the goal, approach or outcome and determines how AI should be used as a resource.',
    example: 'Develop a digital marketing strategy and the assets needed to execute it. Determine what success looks like and use appropriate AI tools where they help achieve your objectives.',
    literacyEmphasis: 'ORCHESTRATIONAL',
    question: 'Can I decide where, when and how AI should contribute?',
    accentColor: '#B87F10',
    bgColor: '#FFFDF5',
    textColor: '#6A4604'
  },
  ADOPT: {
    id: 'ADOPT',
    name: 'ADOPT',
    shortDescription: 'AI structures; I evaluate.',
    longerExplanation: 'AI performs substantial structuring work by proposing a framework, model, decision process, criteria or approach. The learner must critically interrogate, adapt, accept or reject that structure.',
    example: 'Ask AI to design a decision system for a defined problem. Apply the system, interrogate its assumptions and criteria, and determine whether the resulting recommendations should be trusted.',
    literacyEmphasis: 'EVALUATIVE',
    question: 'Can I critically judge the structure AI has created?',
    accentColor: '#232D4B',
    bgColor: '#F4F6FB',
    textColor: '#17203B'
  },
  SHAPE: {
    id: 'SHAPE',
    name: 'TRANSFORM', // Updated to TRANSFORM
    shortDescription: "I structure the problem and determine AI's role.",
    longerExplanation: 'The learner works with a more ambiguous situation, determines what needs to be understood or solved, decides which criteria and evidence matter, determines how AI should contribute, and retains responsibility for governance and accountability.',
    example: 'Website traffic and sales have fallen dramatically. Determine what is happening, identify what evidence matters, and design an appropriate AI-enabled decision-support approach within relevant governance constraints.',
    literacyEmphasis: 'SYSTEMIC',
    question: 'Can I determine how humans and AI should work together around the problem?',
    accentColor: '#DC5300',
    bgColor: '#FFF5EF',
    textColor: '#8E3400'
  }
};

const REFLECTIONS = [
  { step: 1, quote: "Who is doing the thinking here?", sub: "Before assigning tools, locate where genuine human development takes place." },
  { step: 2, quote: "Are you scaffolding learning, or scaffolding away the capability you want learners to develop?", sub: "Efficiency in completing a task is not equivalent to developing capability." },
  { step: 3, quote: "What happens when AI performs the work through which learners previously developed expertise?", sub: "When intermediate cognitive struggles vanish, deliberate design must re-anchor agency." },
  { step: 4, quote: "What are you deliberately leaving difficult?", sub: "Learning requires generative struggle; frictionless outputs can disguise hollowed capability." },
  { step: 5, quote: "Could a learner produce an impressive output here without possessing the capability you intended to develop?", sub: "The journey must test human reasoning, contextual discernment, and defensibility." },
  { step: 6, quote: "What cognitive work are you making visible?", sub: "Genuine capability reveals itself in justification, interrogation, and accountability." }
];

// Application State
let appState = {
  currentStep: 1,
  activity: { name: '', learnerGroup: '', intendedCapability: '', currentActivity: '' },
  diagnosis: { selectedQuadrants: [], rationale: '' },
  cognitiveProfile: {
    upstream: { level: 'LOW', selectedItems: [] },
    production: { level: 'HIGH', selectedItems: [] },
    downstream: { level: 'LOW', selectedItems: [] }
  },
  journey: [],
  capability: {
    selectedEvidence: ['Explain their reasoning', 'Defend their choices', 'Critique AI output'],
    otherEvidence: '',
    ultimateDemonstration: '',
    finalAccountability: 'The human learner retains 100% accountability for final judgement.'
  }
};

const STORAGE_KEY = 'ai_learning_journey_standalone_v1';

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn('LocalStorage save failed:', e);
  }
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      appState = { ...appState, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('LocalStorage load failed:', e);
  }
}

function getCognitiveObservation(profile) {
  const u = profile.upstream.level;
  const p = profile.production.level;
  const d = profile.downstream.level;

  if (p === 'HIGH' && u === 'LOW' && d === 'LOW') {
    return 'Your current design places most learner cognitive work in production. Problem framing has already been solved for the learner, and downstream critical evaluation remains largely unexercised.';
  }
  if ((u === 'HIGH' || u === 'MODERATE') && (p === 'HIGH' || p === 'MODERATE') && d === 'LOW') {
    return 'This activity places substantial responsibility on learners upstream as well as during production. However, downstream evaluation and accountability appear relatively lightly represented.';
  }
  if (d === 'LOW' && (u !== 'LOW' || p !== 'LOW')) {
    return 'Downstream evaluation and accountability appear relatively lightly represented. Learners may produce artefacts without being required to defend their validity.';
  }
  if (u === 'LOW' && (d === 'HIGH' || d === 'MODERATE')) {
    return 'Learners encounter heavily structured inputs with low upstream framing burden, but carry significant cognitive weight downstream in evaluating and defending the final decisions.';
  }
  if (u === 'HIGH' && p === 'HIGH' && d === 'HIGH') {
    return 'This activity demands comprehensive cognitive engagement across all dimensions—from ambiguous problem framing through intensive execution to rigorous downstream defense.';
  }
  return `Current cognitive profile: Upstream is ${u.toLowerCase()}, production is ${p.toLowerCase()}, and downstream evaluation is ${d.toLowerCase()}.`;
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  initUI();
  renderStep(appState.currentStep);
});

function initUI() {
  // Bind form inputs for Step 1
  const nameInput = document.getElementById('input-activity-name');
  const groupInput = document.getElementById('input-learner-group');
  const capabilityInput = document.getElementById('input-intended-capability');
  const currentInput = document.getElementById('input-current-activity');

  if (nameInput) {
    nameInput.value = appState.activity.name;
    nameInput.addEventListener('input', (e) => {
      appState.activity.name = e.target.value;
      saveState();
    });
  }
  if (groupInput) {
    groupInput.value = appState.activity.learnerGroup;
    groupInput.addEventListener('input', (e) => {
      appState.activity.learnerGroup = e.target.value;
      saveState();
    });
  }
  if (capabilityInput) {
    capabilityInput.value = appState.activity.intendedCapability;
    capabilityInput.addEventListener('input', (e) => {
      appState.activity.intendedCapability = e.target.value;
      saveState();
    });
  }
  if (currentInput) {
    currentInput.value = appState.activity.currentActivity;
    currentInput.addEventListener('input', (e) => {
      appState.activity.currentActivity = e.target.value;
      saveState();
    });
  }

  // Diagnosis rationale
  const diagRat = document.getElementById('input-diagnosis-rationale');
  if (diagRat) {
    diagRat.value = appState.diagnosis.rationale;
    diagRat.addEventListener('input', (e) => {
      appState.diagnosis.rationale = e.target.value;
      saveState();
    });
  }
}

function renderStep(step) {
  appState.currentStep = step;
  saveState();

  // Update tabs
  document.querySelectorAll('.step-item').forEach((btn, idx) => {
    const stepNum = idx + 1;
    btn.classList.toggle('active', stepNum === step);
    btn.classList.toggle('completed', stepNum < step);
  });

  // Toggle active panel
  document.querySelectorAll('.step-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `step-panel-${step}`);
  });

  // Render reflection banner
  const banner = document.getElementById('reflection-banner');
  const quoteObj = REFLECTIONS.find((r) => r.step === step);
  if (banner && quoteObj && step < 7) {
    banner.style.display = 'block';
    banner.innerHTML = `
      <div class="reflection-kicker">Deliberate Design Reflection</div>
      <div class="reflection-quote">“${quoteObj.quote}”</div>
      <div class="reflection-sub">${quoteObj.sub}</div>
    `;
  } else if (banner) {
    banner.style.display = 'none';
  }

  // Custom renders for specific steps
  if (step === 2) renderMatrixDiagnosis();
  if (step === 3) renderCognitiveSummary();
  if (step === 5) renderJourneyList();
  if (step === 7) renderJourneyPlan();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMatrixDiagnosis() {
  const container = document.getElementById('diagnosis-matrix-container');
  if (!container) return;

  container.innerHTML = `
    <div class="matrix-grid">
      ${Object.keys(MATRIX_CONFIG).map((qid) => {
        const q = MATRIX_CONFIG[qid];
        const isSelected = appState.diagnosis.selectedQuadrants.includes(qid);
        return `
          <div class="quadrant-card ${isSelected ? 'selected' : ''}" 
               style="border-color: ${isSelected ? q.accentColor : '#CBD5E1'}; background-color: ${isSelected ? q.bgColor : '#FFF'}"
               onclick="toggleDiagnosisQuadrant('${qid}')">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem">
                <span style="background:${q.accentColor}; color:#fff; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:4px">${q.name}</span>
                <span style="font-size:0.75rem; font-weight:700; color:${q.textColor}">${q.literacyEmphasis} LITERACY</span>
              </div>
              <h4 style="font-size:1.05rem; font-weight:800; color:#0F172A">“${q.shortDescription}”</h4>
              <p style="font-size:0.8rem; color:#475569; margin-top:0.5rem; line-height:1.4">${q.longerExplanation}</p>
            </div>
            <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid rgba(0,0,0,0.06); font-size:0.75rem; color:#64748B">
              <strong>Example:</strong> ${q.example}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

window.toggleDiagnosisQuadrant = function(qid) {
  const list = appState.diagnosis.selectedQuadrants;
  appState.diagnosis.selectedQuadrants = list.includes(qid)
    ? list.filter((q) => q !== qid)
    : [...list, qid];
  saveState();
  renderMatrixDiagnosis();
};

function renderCognitiveSummary() {
  const obsEl = document.getElementById('cognitive-observation-text');
  if (obsEl) {
    obsEl.textContent = getCognitiveObservation(appState.cognitiveProfile);
  }
}

window.setCognitiveLevel = function(stage, level) {
  appState.cognitiveProfile[stage].level = level;
  saveState();
  renderCognitiveSummary();
};

function renderJourneyList() {
  const list = document.getElementById('journey-stages-list');
  if (!list) return;

  if (appState.journey.length === 0) {
    list.innerHTML = `<div style="padding:2rem; text-align:center; color:#94A3B8; border:2px dashed #CBD5E1; border-radius:12px">Your journey sequence is currently empty. Click one of the buttons below to add a stage.</div>`;
    return;
  }

  list.innerHTML = appState.journey.map((s, idx) => {
    const q = MATRIX_CONFIG[s.quadrantId];
    return `
      <div class="card" style="border-left: 6px solid ${q.accentColor}">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem">
          <div>
            <span style="background:#0F172A; color:#fff; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:12px; margin-right:6px">Stage ${idx + 1}</span>
            <span style="background:${q.accentColor}; color:#fff; font-size:0.75rem; font-weight:800; padding:2px 8px; border-radius:4px">${q.name}</span>
          </div>
          <div>
            <button class="btn btn-secondary" onclick="moveJourneyStage(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>▲</button>
            <button class="btn btn-secondary" onclick="moveJourneyStage(${idx}, 1)" ${idx === appState.journey.length - 1 ? 'disabled' : ''}>▼</button>
            <button class="btn btn-danger" onclick="removeJourneyStage('${s.id}')">✕</button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Stage Title / Learning Activity:</label>
          <input type="text" value="${s.stageTitle}" onchange="updateJourneyField('${s.id}', 'stageTitle', this.value)" placeholder="e.g. Critical Evaluation of AI Diagnostic Model">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem">
          <div>
            <label class="form-label">1. What cognitive work are you intentionally delegating to AI?</label>
            <textarea rows="3" onchange="updateJourneyField('${s.id}', 'delegatedToAI', this.value)">${s.delegatedToAI}</textarea>
          </div>
          <div>
            <label class="form-label">2. What cognitive work are you deliberately retaining for the learner?</label>
            <textarea rows="3" onchange="updateJourneyField('${s.id}', 'retainedForLearner', this.value)">${s.retainedForLearner}</textarea>
          </div>
        </div>

        <div style="background:#F8FAFC; padding:1rem; border-radius:8px; border:1px solid #E2E8F0">
          <label class="form-label" style="color:#0F172A">3. “Why?” (Pedagogical Rationale) <span style="color:#E05D44">* Mandatory</span></label>
          <textarea rows="2" placeholder="Why is this allocation of cognitive agency essential at this stage?" onchange="updateJourneyField('${s.id}', 'rationale', this.value)">${s.rationale}</textarea>
        </div>
      </div>
    `;
  }).join('');
}

window.addJourneyStage = function(qid) {
  const newStage = {
    id: String(Date.now()),
    quadrantId: qid,
    stageTitle: `${MATRIX_CONFIG[qid].name} Stage Activity`,
    delegatedToAI: '',
    retainedForLearner: '',
    rationale: ''
  };
  appState.journey.push(newStage);
  saveState();
  renderJourneyList();
};

window.removeJourneyStage = function(id) {
  appState.journey = appState.journey.filter((s) => s.id !== id);
  saveState();
  renderJourneyList();
};

window.moveJourneyStage = function(idx, dir) {
  const target = idx + dir;
  if (target < 0 || target >= appState.journey.length) return;
  const [item] = appState.journey.splice(idx, 1);
  appState.journey.splice(target, 0, item);
  saveState();
  renderJourneyList();
};

window.updateJourneyField = function(id, field, val) {
  const stage = appState.journey.find((s) => s.id === id);
  if (stage) {
    stage[field] = val;
    saveState();
  }
};

function renderJourneyPlan() {
  const container = document.getElementById('plan-render-container');
  if (!container) return;

  container.innerHTML = `
    <div style="border-bottom:2px solid #0F172A; padding-bottom:1rem; margin-bottom:1.5rem">
      <h2 style="font-size:2rem; font-weight:800; color:#0F172A">${appState.activity.name || 'Untitled Learning Activity'}</h2>
      <p style="color:#64748B; font-weight:600">Target Learners: ${appState.activity.learnerGroup || 'General cohort'}</p>
      <p style="color:#0F766E; font-weight:700; margin-top:0.5rem">Intended Capability: ${appState.activity.intendedCapability}</p>
    </div>

    <div class="card">
      <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:0.75rem">Redesigned Journey Sequence</h3>
      <div style="display:flex; flex-direction:column; gap:1rem">
        ${appState.journey.map((s, i) => `
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:1rem">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem">
              <strong>${i + 1}. ${s.stageTitle} (${s.quadrantId})</strong>
              <span style="font-size:0.75rem; color:#64748B">${MATRIX_CONFIG[s.quadrantId]?.literacyEmphasis} Literacy</span>
            </div>
            <p style="font-size:0.85rem; margin-bottom:0.25rem"><strong>AI Delegated:</strong> ${s.delegatedToAI || 'None'}</p>
            <p style="font-size:0.85rem; margin-bottom:0.25rem"><strong>Learner Retained:</strong> ${s.retainedForLearner || 'None'}</p>
            <p style="font-size:0.85rem; color:#475569; font-style:italic"><strong>Rationale:</strong> ${s.rationale}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="background:#F6EEE1; border:1px solid #E5DDD0; padding:1.25rem; border-radius:12px; margin:1.5rem 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem">
      <div>
        <div style="font-size:0.7rem; font-weight:800; text-transform:uppercase; color:#DC5300; letter-spacing:0.05em">Framework Attribution</div>
        <strong style="color:#232D4B; font-size:0.95rem">Human-AI Learning Journey Framework © 2026 Dr Afshin Tanouri</strong>
        <p style="font-size:0.8rem; color:#64748B; margin-top:2px">“Building Workforce Capability That Matters in the Age of AI”</p>
      </div>
      <div>
        <a href="mailto:afshin.tanouri@flinders.edu.au" style="display:inline-block; padding:0.5rem 1rem; background:#232D4B; color:#fff; text-decoration:none; border-radius:8px; font-weight:700; font-size:0.8rem">afshin.tanouri@flinders.edu.au</a>
      </div>
    </div>

    <div style="background:#F0FDFA; border:1px solid #99F6E4; padding:1.25rem; border-radius:12px; text-align:center; margin:1.5rem 0">
      <p style="font-style:italic; font-weight:700; color:#115E59">“You didn’t simply add AI to the activity. You redesigned how learners encounter, use, evaluate and shape AI-enabled work.”</p>
    </div>
  `;
}

window.toggleTheme = function() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('ai_learning_journey_theme', isDark ? 'dark' : 'light');
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
};

// Initialize theme from storage
(function initTheme() {
  const saved = localStorage.getItem('ai_learning_journey_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = '☀️';
  }
})();

window.clearAllData = function() {
  if (confirm('Are you sure you want to clear all data from this browser?')) {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }
};
