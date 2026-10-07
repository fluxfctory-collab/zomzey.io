# ZOMZEY homepage concept — The Living Opportunity Network

A homepage contest prototype for [zomzey.io](https://zomzey.io/): a responsive React + TypeScript + Vite frontend, plus exported desktop and mobile mock-ups, presentation boards and a concise design package.

> Concept prototype only. People, places and opportunities on the page are labelled illustrative examples. Search and filtering run on local example data; join, sign in and live browsing link to the existing zomzey.io pages. There is no backend, account creation, data collection or payment.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173  (homepage)   /styleguide.html (living style guide)
npm run build        # typecheck + production build to dist/
npm run preview      # serve the production build on http://localhost:4173
```

Quality checks:

```bash
npm run typecheck
npm run lint
python3 -m venv .venv && .venv/bin/pip install playwright==1.56.0   # once; uses the installed Chromium
npm run build && npm run test:e2e     # 27 browser journeys (tests/journeys.py)
bash scripts/lighthouse.sh 3          # lab-only Lighthouse runs (needs CHROME_PATH or the default path)
npm run build && npm run export       # regenerates every PNG in exports/
```

## Official logo

The original wordmark (`https://zomzey.io/wp-content/uploads/2026/05/new99.png`) could not be fetched from this build environment: its network policy blocks `zomzey.io`. The header and footer therefore show a labelled slot with the logo's exact proportions. No mark was invented.

To finish: save the original file unchanged as `public/brand/zomzey-logo.png`, then run `npm run build && npm run export`. The build detects the file automatically, and all mock-ups and boards are regenerated.

## Deliverables

| File | Content |
| --- | --- |
| `exports/ZOMZEY-desktop-hero-1440.png` | Opening viewport, 1440 × 900 (also `@2x`) |
| `exports/ZOMZEY-desktop-full-1440.png` | Full homepage at 1440px |
| `exports/ZOMZEY-mobile-hero-390.png` | Opening viewport, 390 × 844 (also `@2x`) |
| `exports/ZOMZEY-mobile-full-390.png` | Full homepage at 390px (also `@2x`) |
| `exports/ZOMZEY-board-01-desktop.png` | Desktop concept board, 2400 × 1600 |
| `exports/ZOMZEY-board-02-mobile.png` | Mobile concept: opening, story, example detail, menu |
| `exports/ZOMZEY-board-03-style-guide.png` | Visual system (captured from `/styleguide.html`) |
| `exports/ZOMZEY-board-04-interactions.png` | Interaction story: default, focus, scenario, intent states and mobile alternatives |
| `exports/states/` | Individual alternate-state captures used on the boards |
| `docs/STYLE_GUIDE.md` | Colours, type, layout, logo rules, components |
| `docs/INTERACTION_NOTES.md` | Trigger, response, purpose, touch and reduced-motion alternatives |
| `docs/DESIGN_WALKTHROUGH.md` | Short concept and layout rationale |
| `docs/QA_REPORT.md` | Commands, browser checks, widths, lab performance, limitations |
| `docs/ASSET_SOURCES.md` | Logo, font and photo sources, licences and caveats |
| `docs/SKILLS_USED.md` | Skills installed and how each was used |

No Figma file was produced; the mock-ups are captures of the running prototype.

## Structure

```
src/
  components/   Header, opening scene, vertical story, stories, process, explorer, trust, closing, footer, dialogs
  data/         content.ts (copy + labelled example data), links.ts (verified destinations), images.generated.ts
  lib/          route geometry, media queries, lazily loaded motion
  styles/       tokens.css, base, components, header, hero, sections
  styleguide/   living style guide entry (styleguide.html)
public/         images (WebP), fonts licence, brand/ (logo drop-in)
scripts/        prepare-images.mjs, export_mockups.py, lighthouse.sh, boards/ (board templates)
tests/          journeys.py
docs/           design package
exports/        mock-ups and boards
```
