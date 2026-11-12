# AI Learning Journey Designer

> **Subtitle:** Design learning that develops capability, not just AI-assisted outputs.  
> **Academic Framework:** © 2026 **Dr Afshin Tanouri** (Flinders University)  
> **Contact:** [afshin.tanouri@flinders.edu.au](mailto:afshin.tanouri@flinders.edu.au)  
> **Workshop:** *“Building Workforce Capability That Matters in the Age of AI”*

The **AI Learning Journey Designer** is an interactive, browser-based learning design tool created by Dr Afshin Tanouri for university educators, learning designers, professional trainers, and workforce development leaders.

Rather than teaching prompting tricks or simply adding AI as an afterthought to an existing task, this framework guides educators to deliberately determine:
1. What cognitive work the **learner** performs
2. What cognitive work **AI** performs
3. Where learners retain **agency** and **critical discernment**
4. Where AI assists or structures thinking
5. How learners navigate deliberate developmental movements through different human-AI configurations: **Enhance**, **Empower**, **Adopt**, and **Transform**.

---

## 🎨 Institutional Palette & Visual Design

The UI has been styled around Flinders University's institutional brand palette:
- **Primary Deep Navy:** `#232D4B` (Text, primary buttons, Adopt quadrant, header)
- **Flinders Yellow / Warm Gold:** `#FFD300` (Key action badges, accent highlights)
- **Burnt Orange:** `#DC5300` (Transform quadrant, highlight tags)
- **Linen / Warm Cream Neutral:** `#F6EEE1` & `#F8F5EE` (Background canvas and cards)
- **Sage / Olive Green:** `#77915D` & `#5B7945` (Enhance quadrant, completion checks)
- **Antique Gold / Ochre:** `#CB9828` & `#B87F10` (Empower quadrant)

The application is completely static, requires **no backend, no database, no API keys, and no server**. You can host it directly on **GitHub Pages** for free using either of the following two simple methods:

### Option A: Zero-Build Vanilla Version (Fastest & Simplest)

If you don't want to run npm, node, or any build commands:
1. In your GitHub repository, upload the 3 files located in the `standalone-github-pages/` folder:
   - `index.html`
   - `styles.css`
   - `script.js`
   directly into the root of your repository (or into a `/docs` folder).
2. On GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose the `main` branch (and `/ (root)` folder), then click **Save**.
5. Your application will be live immediately at `https://<your-username>.github.io/<repo-name>/`.

### Option B: React + Vite Static Export

If you prefer building the full React application:
1. Clone your repository:
   ```bash
   npm install
   npm run build
   ```
2. The production bundle is output to the `dist/` folder.
3. Push the `dist/` contents to a `gh-pages` branch, or configure GitHub Actions to deploy the `dist/` folder automatically.

---

## 🎨 Easy Customization: Editing Quadrant Names & Labels

All quadrant names, descriptions, literacy labels, colors, and examples are stored in a **single centralized configuration object**:

- **React / TypeScript Version:** Located in `src/config/matrixConfig.ts` (`MATRIX_QUADRANTS`).
- **Standalone Vanilla Version:** Located at the top of `standalone-github-pages/script.js` (`MATRIX_CONFIG`).

To rename the `SHAPE` quadrant (or any other quadrant), simply edit the `name` field in that single configuration object:

```javascript
SHAPE: {
  id: 'SHAPE',
  name: 'CO-ORCHESTRATE', // Change this to your preferred title
  shortDescription: "I structure the problem and determine AI's role.",
  literacyEmphasis: 'SYSTEMIC',
  // ...
}
```

---

## 🧭 The 7-Step Design Flow

1. **DEFINE:** Frame a real learning activity, target cohort, and intended capability.
2. **DIAGNOSE:** Map current practice onto the 2×2 Human-AI Matrix across Complementing ↕ Structuring and AI-Led ↔ Learner-Led axes.
3. **COGNITIVE WORK:** Map where difficult cognitive effort sits across Upstream framing, Production execution, and Downstream critical defense with deterministic rule-based analysis.
4. **REDESIGN:** Explore pedagogical scaffolding prompts for Enhance, Empower, Adopt, and Shape.
5. **SEQUENCE:** Build a custom multi-stage journey with mandatory rationale for cognitive allocation.
6. **CAPABILITY CHECK:** Establish authentic assessment criteria that prove human capability beyond cosmetic AI polish.
7. **JOURNEY PLAN:** Generate an executive-ready summary report with side-by-side Before → After transformation matrices, printable to PDF, and exportable to JSON or Markdown.

---

## 🔒 Privacy & Architecture

- **100% Client-Side:** All data persists exclusively in the user's browser using `localStorage`.
- **Zero Server Transmission:** No data is transmitted over any network.
- **Offline Capable:** Works without an active internet connection once loaded.
- **Privacy Assurance:** Built-in "Clear my data" button allows instant reset of all local storage.
