# ZOMZEY homepage concept — Up in lights

A homepage contest prototype for [zomzey.io](https://zomzey.io/): a responsive React + TypeScript + Vite frontend, plus exported desktop and mobile screenshots, three presentation boards and a concise design package.

The opening turns ZOMZEY's dot-matrix wordmark into an LED wall. ZOMZEY's own line, "Promote through people with followers, footfall, fans & audience.", names four kinds of reach; each word takes an observed brand colour and a duotone scene that resolves out of oval LED dots.

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
npm run images:reach                  # rebuilds the duotone LED scenes from public/images
```

## Logo

The official white dot-matrix wordmark (961 × 145, transparent) was supplied by the client and is kept unaltered as `public/brand/zomzey-logo.webp`. A 320px lossless resize of the same file (`zomzey-logo-320.webp`) serves the 138–158px header and footer. It is used on navy only, and on the light boards it sits on a navy plate.

## Deliverables

| File | Content |
| --- | --- |
| `exports/ZOMZEY-desktop-full-1440.png` | **Desktop screenshot:** the full homepage at 1440px |
| `exports/ZOMZEY-mobile-full-390@2x.png` | **Mobile screenshot:** the full homepage at 390px, 2× (1× version alongside) |
| `exports/ZOMZEY-desktop-hero-1440.png` | Opening viewport, 1440 × 900 (also `@2x`) |
| `exports/ZOMZEY-mobile-hero-390.png` | Opening viewport, 390 × 844 (also `@2x`) |
| `exports/ZOMZEY-board-01-opening.png` | Board 01, the opening concept: annotated desktop, before and after |
| `exports/ZOMZEY-board-02-responsive.png` | Board 02, mobile and responsive: three phones, a tablet, layout logic per breakpoint |
| `exports/ZOMZEY-board-03-visual-system.png` | Board 03, visual system: colour, type, LED anatomy and states, components (captured from `/styleguide.html`) |
| `exports/states/` | Individual alternate-state captures (selected scene, keyboard focus, menu, dialogs, explorer) |
| `docs/STYLE_GUIDE.md` | Colours, type, layout, logo rules, LED recipe, components |
| `docs/INTERACTION_NOTES.md` | Trigger, response, purpose, touch and reduced-motion alternatives |
| `docs/DESIGN_WALKTHROUGH.md` | Short concept and layout rationale |
| `docs/QA_REPORT.md` | Commands, browser checks, widths, lab performance, limitations |
| `docs/ASSET_SOURCES.md` | Logo, font and photo sources, licences and caveats |
| `docs/SKILLS_USED.md` | Skills installed and how each was used |

All boards are 2400 × 1600. No Figma file was produced; the screenshots and boards are captures of the running prototype.

## Structure

```
src/
  components/   Header, Hero + ReachWall (LED opening), stories, process, explorer, trust, closing, footer, dialogs
  data/         content.ts (copy, reach scenes, labelled example data), links.ts (verified destinations), images.generated.ts
  lib/          lazily loaded motion (process rail only)
  styles/       tokens.css, base, components, header, hero, sections
  styleguide/   living style guide entry (styleguide.html), also board 03
public/         images (WebP), images/reach (duotone LED scenes), fonts licence, brand/ (official wordmark)
scripts/        prepare-images.mjs, prepare-reach.mjs, export_mockups.py, lighthouse.sh, boards/ (board templates)
tests/          journeys.py
docs/           design package
exports/        screenshots and boards
```
