# QA report

Run on 8 October 2026, after the opening was redesigned ("Up in lights") and the official logo was added, against the **production build** (`npm run build`, served by `vite preview`). Environment: Node 22.22.0, Chromium 141.0.7390.37 (pre-installed), Python Playwright 1.56.0, Lighthouse 12.8.2, axe-core 4.11.0. Raw outputs are written to `tests/artifacts/` (git-ignored) and regenerate with the commands below.

## Commands

| Command | Result |
| --- | --- |
| `npm run typecheck` (`tsc -b`) | Pass, 0 errors |
| `npm run lint` (ESLint 9: typescript-eslint, react-hooks incl. React Compiler rules, jsx-a11y) | Pass, 0 errors, 0 warnings |
| `npm run build` | Pass. Homepage initial JS ≈ 279 kB min (≈ 85 kB gzip); CSS 41 kB (9 kB gzip). GSAP + ScrollTrigger (≈ 45 kB gzip) load as a separate chunk and now drive only the process rail; the opening's motion is CSS |
| `npm run test:e2e` (`tests/journeys.py` via the webapp-testing `with_server.py`) | **27 / 27 passed** |
| `bash scripts/lighthouse.sh 3` | Lab results below |
| `npm run export` | 29 PNG files written to `exports/` (screenshots, states and three boards) |

## Browser journeys (27/27 passed)

| ID | Check | Result |
| --- | --- | --- |
| J01 | No console errors, failed requests, unloaded images or fonts (1440) | Pass |
| J02 | One H1 ("Promote through people with followers, footfall, fans & audience."); header, main nav, main, footer landmarks; skip link moves focus to `<main>` | Pass |
| J03 | At 1920, 1440 and 1280: headline, description, both intent actions and pricing line keep 24px clear of every LED scene; both actions above the fold; four headline lines, each narrower than its column (widest 590/600px at 1440); scene order Followers, Footfall, Fans, Audience | Pass |
| J04 / J05 | Promote opens people and places (6 example profiles); earn opens opportunities (6) with the correct heading, label and placeholder | Pass |
| J06 | Switching intent resets category and query | Pass |
| J07 | Each of the four scenes: one pressed scene, its example text and verified link, matching headline word underlined, three muted scenes; second click returns to all four; the section below never moves | Pass |
| J08 | Enter and Space toggle a scene; the ✕ control resets and returns focus to the scene; clicking elsewhere clears; detail line is a polite live region; scene name is its caption | Pass |
| J09 | Search by Enter and by button, category, no results ("No examples match these filters."), Clear filters; count is a polite live region | Pass |
| J10 | More filters → In person narrows the data to 4 of 6 | Pass |
| J11 | Earn: Music → 1; "app" → Study app; no-results suggestion "books" → 2 | Pass |
| J12 / J13 | Detail dialogs labelled Example, linking to the real directory or opportunities; Enter, Escape, close button and backdrop work; focus contained and returned | Pass |
| J14 | Explore panel: real destinations, Escape restores focus, "Opportunities" sets earn intent | Pass |
| J15 | Join dialog: default follows intent, links to sign-up or agencies, contains no data-entry fields, focus returns | Pass |
| J16 | Relationship tabs: arrows, Home, End with wrap (roving tabindex) | Pass |
| J17 | Visible 2px focus outline on representative controls, including the scenes; search wrapper shows focus | Pass |
| J18 | All 30 external links (15 unique) are destinations listed in `src/data/links.ts`; no `#` placeholder links | Pass |
| J19 | Every image has `alt`; 20 descriptive, 8 decorative (scene photographs inside named buttons, and repeated crops) | Pass |
| J20 | Mobile menu (390): 11 links, Escape returns focus to Menu; in-page link closes the menu and focuses the section heading; Join opens from the menu | Pass |
| J21 | Touch (390): headline, description and both actions within 844px; wall in two columns; headline lines fit (45px); tap selects a scene and shows its example; tapping elsewhere clears | Pass |
| J22 | Reduced motion from load: four scenes fully on (opacity 1, 58% clear) at first paint; process rail complete; 0 animations | Pass |
| J23 | No horizontal overflow at 1920, 1440, 1280 (two-column wall), 1024, 768 (row of four) and 390, 360 (two columns). The decorative dot spill is clipped by the opening and excluded from the element check | Pass |
| J24 | 31 visible primary controls ≥ 44 × 44px at 390 (coarse pointer), including the four scenes | Pass |
| J25 | axe-core WCAG 2.0/2.1/2.2 A and AA: page at 1440, page with dialog open, and page at 390 | 0 violations |
| J26 | 200% zoom equivalent (720 × 450): no overflow; sticky header 65px; anchored heading clears it | Pass |
| J27 | Switching to reduced motion after load: selecting a scene is immediate (96% clear at once, no running transitions) | Pass |

A selection-shift check across 320–1920px found and fixed one defect during this round: on desktop the longest example wrapped to a third line and pushed the next section down by 20px (J07 caught it). The detail line now reserves the longest example at every width; the ✕ control has its own grid cell, so it never covers text.

**axe "needs review":** `color-contrast` is reported as needing review for the detail line under the wall (it partially overlaps the decorative dot spill, so axe cannot resolve a single background). In the unchanged lower sections at 390 it also lists text beside decorative pseudo-element rails (`pseudoContent`) and the one-digit process numbers (`shortTextContent`); their colour pairs are in the table. Contrast for the opening was measured from the rendered pixels, against the brightest pixel behind the text:

| Pair | Ratio |
| --- | --- |
| Scene caption word, white on its chip (all four scenes, 390–1440) | ≥ 16.0:1 |
| Scene caption description, `#B4BDD4` on its chip | ≥ 8.6:1 |
| Detail line, `#B4BDD4` over navy and the faint spill (390–1440) | ≥ 7.6:1 |
| Headline words on navy: orange / yellow / green / blue | 6.9 / 14.2 / 12.2 / 7.9:1 |
| White / navy | 20.35:1 |
| Muted-on-dark `#B4BDD4` / navy, surface | 10.83 / 9.49:1 |
| Navy text / signal button | 7.93:1 |
| Ink / paper | 18.61:1 |
| Muted-on-light `#5A5C72` / paper, white | 6.26 / 6.54:1 |
| Signal-on-light `#0065A8` / paper (links, focus, routes) | 5.86:1 |
| Control lines (non-text): dark / navy, light / paper | 5.78 / 3.17:1 |

## Widths and viewports inspected visually

1920 × 1080, 1440 × 900 (primary), 1280 × 800, 1199 × 800, 1024 × 768, 768 × 1024, 759 × 900, 600 × 900, 390 × 844 (primary), 360 × 800 and 320 × 640, plus full-page captures at 1440 and 390, the selected state of every scene, keyboard focus, the load sequence and reduced motion. At 1440 × 900 the whole opening, including the detail line, fits the first screen.

## Lab performance (Lighthouse 12.8.2, simulated throttling; median of 3)

| Preset | Performance | Accessibility | Best practices | SEO | LCP | FCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Mobile | 98 (95, 98, 98) | 100 | 100 | 100 | 2.27 s | 1.56 s | 51 ms | 0 |
| Desktop | 100 (100, 100, 100) | 100 | 100 | 100 | 0.60 s | 0.37 s | 0 ms | 0 |

The LCP element is the headline on both presets. A first run of the new opening scored mobile 90 with LCP 3.4 s: the headline was split into four block-level lines, so a lazy-loaded decorative spill image became the LCP element, and the 50 kB original logo plus eager scene images were in the critical window. Fixes: one text block with forced line breaks, a 9 kB resize of the logo for the header, 160px sources for the blurred spill, and lazy scene photographs. These are **lab diagnostics on a local server**, not field data; they cannot certify field LCP or INP.

## Claims and content checks

- Every illustrative area is labelled: "Illustrative scenes", "Example connections", "Example preview with illustrative data", "Example profile / opportunity", "Example …" artefacts, "Illustrative workflow".
- The headline is ZOMZEY's own line from the current homepage. Scene examples say "could"; none promises results.
- None of the following appear anywhere: member totals, testimonials, ratings, client logos, verification badges, live activity, budgets or results. The "world's first" claim from the current homepage is not repeated.
- Pricing is always qualified ("Free account options available. See pricing for fees and agency plans."), and agency plans have their own route.
- Protected Payments is described at a high level and linked; nothing claims guaranteed payment, escrow or refunds.
- Join collects nothing and hands off to the existing sign-up or agency page.

## Limitations (concrete, unresolved)

1. **Logo file format.** The wordmark was supplied as a 961 × 145 WebP (the original on zomzey.io is `new99.png`, same size). It is used unaltered; the header uses a lossless 320px resize of it. If the client prefers the original PNG, drop it in and point `BrandLogo` at it.
2. **Destinations not re-verified live.** `zomzey.io` is still blocked by this environment's egress policy. Links use the destinations the spec observed on 7 October 2026; the client's saved copy of the homepage (8 October) was used only as reference for copy and structure. No registration or transaction flow was tested (none is in scope).
3. **Photography licences** are as listed by Open Images (CC BY 2.0) and could not be re-checked on Flickr. There are no model releases. The four opening scenes are duotone derivatives of four of these photographs. See `ASSET_SOURCES.md`.
4. **Browser coverage:** automated and visual checks ran in Chromium only. The LED effect relies on CSS masks with `mask-composite` and on `@property` for its transitions (Chrome 120+, Safari 16.4+, Firefox 128+); older browsers show the scenes without the smooth resolve. Firefox, Safari/WebKit, real iOS and Android devices, and screen readers (VoiceOver, NVDA) were not tested; keyboard behaviour was verified by automation.
5. **No native Figma file** was produced. The screenshots and boards are captures of the running prototype.
