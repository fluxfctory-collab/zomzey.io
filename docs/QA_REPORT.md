# QA report

Run on 7 October 2026 against the **production build** (`npm run build`, served by `vite preview`). Environment: Node 22.22.0, Chromium 141.0.7390.37 (pre-installed), Python Playwright 1.56.0, Lighthouse 12.8.2, axe-core 4.11.0. Raw outputs are written to `tests/artifacts/` (git-ignored) and regenerate with the commands below.

## Commands

| Command | Result |
| --- | --- |
| `npm run typecheck` (`tsc -b`) | Pass, 0 errors |
| `npm run lint` (ESLint 9: typescript-eslint, react-hooks incl. React Compiler rules, jsx-a11y) | Pass, 0 errors, 0 warnings |
| `npm run build` | Pass. Homepage initial JS ≈ 287 kB min (≈ 88 kB gzip); GSAP + ScrollTrigger (≈ 45 kB gzip) load as a separate chunk after first render |
| `npm run test:e2e` (`tests/journeys.py` via the webapp-testing `with_server.py`) | **27 / 27 passed** |
| `bash scripts/lighthouse.sh 3` | Lab results below |
| `npm run export` | 30 PNG files written to `exports/` |

## Browser journeys (27/27 passed)

| ID | Check | Result |
| --- | --- | --- |
| J01 | No console errors, failed requests, unloaded images or fonts (1440) | Pass |
| J02 | One H1; header, main nav, main, footer landmarks; skip link moves focus to `<main>` | Pass |
| J03 | Headline, description, both intent actions and pricing line never intersect perimeter cards (16px clearance) at 1920, 1440, 1280; both actions above the fold; 114 decorative dots (≤ 180) | Pass |
| J04 / J05 | Promote opens people and places (6 example profiles); earn opens opportunities (6) with the correct heading, label and placeholder | Pass |
| J06 | Switching intent resets category and query | Pass |
| J07 | Books, Products, Music and Apps swap ticket, three participants, image and detail together; content below the opening does not move | Pass |
| J08 | Focus previews a route; click pins it; clicking elsewhere clears; project lights all three routes | Pass |
| J09 | Search by Enter and by button, category, no results ("No examples match these filters."), Clear filters; count is a polite live region | Pass |
| J10 | More filters → In person narrows the data to 4 of 6 | Pass |
| J11 | Earn: Music → 1; "app" → Study app; no-results suggestion "books" → 2 | Pass |
| J12 / J13 | Detail dialogs labelled Example, linking to the real directory or opportunities; Enter, Escape, close button and backdrop work; focus contained and returned | Pass |
| J14 | Explore panel: real destinations, Escape restores focus, "Opportunities" sets earn intent | Pass |
| J15 | Join dialog: default follows intent, links to sign-up or agencies, contains no data-entry fields, focus returns | Pass |
| J16 | Relationship tabs: arrows, Home, End with wrap (roving tabindex) | Pass |
| J17 | Visible 2px focus outline on representative controls; search wrapper shows focus | Pass |
| J18 | All 30 external links (15 unique) are destinations listed in `src/data/links.ts`; no `#` placeholder links | Pass |
| J19 | Every image has `alt`; 18 descriptive, 4 decorative (repeating adjacent text inside buttons) | Pass |
| J20 | Mobile menu (390): 11 links, Escape returns focus to Menu; in-page link closes the menu and focuses the section heading; Join opens from the menu | Pass |
| J21 | Touch (390): the vertical story replaces the perimeter; tap expands a step; scenario updates the story; headline, description and both actions within 844px | Pass |
| J22 | Reduced motion from load: routes, cards and process rail complete; 0 running animations | Pass |
| J23 | No horizontal overflow at 1920, 1440, 1280 (perimeter) and 1024, 768, 390, 360 (stacked) | Pass |
| J24 | 34 visible primary controls ≥ 44 × 44px at 390 (coarse pointer) | Pass |
| J25 | axe-core WCAG 2.0/2.1/2.2 A and AA: page at 1440, page with dialog open, and page at 390 | 0 violations |
| J26 | 200% zoom equivalent (720 × 450): no overflow; sticky header 65px; anchored heading clears it | Pass |
| J27 | Switching to reduced motion after load: scenario change is immediate (no running transitions or fades) | Pass |

**axe "needs review":** `color-contrast` was reported as needing review on hero text, because the transparent route/port SVG layer (`pointer-events: none`) overlaps the scene and axe cannot resolve the background. Contrast was computed directly instead:

| Pair | Ratio |
| --- | --- |
| White / navy | 20.35:1 |
| Muted-on-dark `#B4BDD4` / navy, surface, detail panel | 10.83 / 9.49 / 9.90:1 |
| Navy text / signal button | 7.93:1 |
| Ink / paper | 18.61:1 |
| Muted-on-light `#5A5C72` / paper, white | 6.26 / 6.54:1 |
| Signal-on-light `#0065A8` / paper (links, focus, routes) | 5.86:1 |
| Control lines (non-text): dark / navy, light / paper | 5.78 / 3.17:1 |
| Signal route or focus / navy (non-text) | 7.93:1 |

## Widths and viewports inspected visually

1920 × 1080, 1440 × 900 (primary), 1280 × 800, 1200 × 800, 1024 × 768, 768 × 1024, 390 × 844 (primary), 360 × 800, plus full-page captures at 1440 and 390. Defects found and fixed during inspection:

- Lane jog at the project port.
- Random-looking dot clusters, replaced with ordered halos.
- Oval full stop sitting below the baseline.
- Reach story overflow, and a page length of 6.4k px (now 5.3k).
- Horizontal process rail rendered as a solid line.
- 1280px community card overflowing its column (perimeter now starts at 1280).
- Four-line headline at 1024.
- Orphaned "Apps" option at 360/390 (scenario control and reach tabs).
- Detail-box height shift between scenarios.
- Detail dialog clipping at 390 × 844.
- Menu sheet height regression.
- Board crops (full-page strip, hero sliver).

## Lab performance (Lighthouse 12.8.2, simulated throttling; median of 3)

| Preset | Performance | Accessibility | Best practices | SEO | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 97 (99, 97, 96) | 100 | 100 | 100 | 2.24 s | 1.71 s | 82 ms | 0 |
| Desktop | 100 (100, 100, 100) | 100 | 100 | 100 | 0.57 s | 0.45 s | 2 ms | 0 |

These are **lab diagnostics on a local server**, not field data. They cannot certify field LCP or INP. An earlier run before code-splitting GSAP and adding smaller image sizes scored mobile 87 (LCP 2.8 s, TBT 360 ms).

## Claims and content checks

- Every illustrative area is labelled: "Illustrative connection", "Example connections", "Example preview with illustrative data", "Example profile / opportunity", "Example …" artefacts, "Illustrative workflow".
- None of the following appear anywhere: member totals, testimonials, ratings, client logos, verification badges, live activity, budgets or results.
- Pricing is always qualified ("Free account options available. See pricing for fees and agency plans."), and agency plans have their own route.
- Protected Payments is described at a high level and linked; nothing claims guaranteed payment, escrow or refunds.
- Join collects nothing and hands off to the existing sign-up or agency page.

## Limitations (concrete, unresolved)

1. **Official logo missing.** `zomzey.io` is blocked by this environment's egress policy, so `new99.png` could not be downloaded. Mock-ups show a labelled 961:145 slot. Fix: add `public/brand/zomzey-logo.png`, then run `npm run build && npm run export`.
2. **Destinations not re-verified live.** The same block prevented re-checking the zomzey.io routes. Links use the destinations the spec observed on 7 October 2026. No registration or transaction flow was tested (none is in scope).
3. **Research PDF not available.** Only `ZOMZEY_DESIGN_SPEC.md` was supplied; the spec's summary of the PDF was used.
4. **Photography licences** are as listed by Open Images (CC BY 2.0) and could not be re-checked on Flickr. There are no model releases. See `ASSET_SOURCES.md`.
5. **Browser coverage:** automated and visual checks ran in Chromium only. Firefox, Safari/WebKit, real iOS and Android devices, and screen readers (VoiceOver, NVDA) were not tested; keyboard behaviour was verified by automation.
6. **No native Figma file** was produced. The mock-ups and boards are captures of the running prototype.
