# ZOMZEY "Up in lights": style guide

A short guide to the visual system used in the homepage concept. The living version is `/styleguide.html` in the prototype, rendered from the same CSS and components, and exported as `exports/ZOMZEY-board-03-visual-system.png`. Tokens live in `src/styles/tokens.css`.

**Status key:** *Observed* values come from the current zomzey.io homepage HTML (7 Oct 2026). *Proposed* values are new supporting tokens for this concept. Neither is an official brand manual.

## Identity

- **Logo:** the official white dot-matrix wordmark, supplied by the client (961 × 145, transparent, `public/brand/zomzey-logo.webp`). Use it on navy only, 158px wide in the desktop header and footer and 138px below 1024px, with clear space of at least half its height. On light boards it sits on a compact navy plate. Never retype, recolour, rotate, rebuild or animate it, and never place it on paper.
- **Motif:** the logo's upright oval dot. It becomes the LED pitch of the opening (6 × 6.9px on tablets and desktops, 5 × 5.75px on phones), the dotted underline of a selected headline word, the six-dot mark in the eyebrow and board captions, and the dotted routes further down the page. Dots always mean light, a connection or a step. No starfields and no decorative lines that lead nowhere.

## Colour roles

| Token | Value | Status | Use |
| --- | --- | --- | --- |
| `--navy` | `#000222` | Observed | Opening, header, process, trust panel, footer |
| `--paper` | `#FAFAF8` | Observed | Relationship stories, explorer, closing |
| `--ink` | `#0A0B1E` | Observed | Text on light surfaces (18.6:1 on paper) |
| `--creator` | `#FF6600` | Observed | **Followers** (word and scene); creator role marker. 6.9:1 on navy |
| `--hub` | `#FFD42E` | Observed | **Footfall** (word and scene); hub role marker. 14.2:1 on navy |
| `--positive` | `#20E3A2` | Observed | **Fans** (word and scene). 12.2:1 on navy |
| `--signal` | `#1FA9FF` | Observed | **Audience** (word and scene); primary action (navy text, 7.9:1); focus on navy |
| `--surface-dark` | `#101437` | Proposed | Dark cards, menu sheet, record |
| `--muted-on-dark` | `#B4BDD4` | Proposed | Secondary text on navy (10.8:1) |
| `--muted-on-light` | `#5A5C72` | Observed | Secondary text on paper (6.3:1) |
| `--signal-on-light` | `#0065A8` | Proposed | Links, focus, routes on paper (5.9:1) |
| `--control-line-dark` / `-light` | `#7D88A8` / `#8A8CA0` | Proposed | Essential control borders (5.8:1 on navy, 3.2:1 on paper) |
| `--line-dark` / `-light` | 18% white / 13% ink | Proposed | Decorative dividers only |

Rules: the four reach colours appear large only in the opening headline and its scenes, on navy. Elsewhere they are 8px markers. Bright blue, orange, yellow and green never carry small text on white. Colour always pairs with a text label.

## The LED recipe

1. **Duotone.** Each scene photograph is mapped through three stops: navy shadows, the reach colour at 58% luminance, and a pale tint (72% white) in the highlights (`scripts/prepare-reach.mjs`).
2. **Clear centre.** A soft ellipse (58% of the screen by default) shows the photograph clearly.
3. **LED edge.** Outside it, the photograph shows only through the oval dot grid, with faint unlit dots where the scene is dark.
4. **Dot spill.** A blurred copy of the scene, seen through the same grid and offset by whole dots so the grids line up, lights the page around the screen.
5. **Caption chip.** Real text on navy at 84% with a light blur: word in white (≥ 16:1 measured), description in muted (≥ 8.6:1 measured).

States: default 58% clear, hover 72%, selected 96%, muted (another scene selected) dots only at 50% opacity. The wall switches on once on load.

## Typography

One family: **Instrument Sans** (variable, 400–700, self-hosted, OFL), with `system-ui, sans-serif` as the fallback. Sentence case throughout. No all-caps labels and no display face.

| Role | Desktop | Mobile | Weight / line height / tracking |
| --- | --- | --- | --- |
| Opening H1 | 12.9cqi of its column: 78px at 1440, 69px at 1280 | 45px at 390, 42px at 360 | 660 / 1.02 / −0.045em, +0.06em word spacing |
| Section H2 | 52px at 1440 (fluid up to 54px) | 30px | 620 / 1.1 / −0.03em |
| Story heading | 28px | 22px | 620 / 1.18 / −0.02em |
| Lead | 20px | 17px | 400 / 1.5 |
| Scene caption | 19px word, 13px description | 15px, 12px | 640 / 1.2; 400 / 1.35 |
| Body | 17px | 16px | 400 / 1.55 |
| Controls | 15–17px | 15–16px | 540–620 / 1.2 |
| Meta | 14px | 14px | 450–560 / 1.4 |

The headline is always four lines: "Promote through / people with / followers, footfall, / fans & audience." Its longest line measures 7.63em, so a container-query size of 12.9cqi fills the column exactly. Prose stays within about 31–34em.

## Layout, spacing and shape

- Container: max 1312px, centred. Gutters 20 (390), 16 (≤374), 24 (768), 40 (1024), 48 (1280), 64 (1440+).
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112. Section padding is 52–88px.
- Opening layouts: **message beside a two-by-two pinwheel** at ≥1200px (fits 1440 × 900 exactly), **message above one row of four** at 760–1199px, **message above two staggered columns** below 760px.
- Radius: 12 for controls and caption chips, 16 for cards (and LED screens on phones), 20 for LED screens, 24 for story surfaces, 28 for the trust panel, round for dots and pills (chips only).
- Elevation: a soft card shadow on paper surfaces, and a raised shadow only for menus and dialogs. The only glow on the page is the scenes' own dot spill.

## Reusable components

| Component | Notes |
| --- | --- |
| `SiteHeader` | Sticky navy bar with a border after scroll. Explore disclosure panel; Menu dialog below 1024px |
| `Hero` | Eyebrow, four-line headline with coloured reach words, lead, `IntentActions`, qualified pricing line |
| `IntentActions` | Two links to `#explore` that set a local promote/earn mode, not an account role |
| `ReachWall` / LED scene | Four toggle buttons (`aria-pressed`) named by their caption; detail line in a polite live region with a clear control |
| `RelationshipStory` | ARIA tabs (arrows, Home, End) with a project photo, a dotted fork and two participant cards |
| `ProcessSteps` | Ordered list with numbered nodes on a dotted rail and small "Example …" artefacts |
| `Explorer` | Intent switch, labelled search (Enter or button), category chips, More filters, polite live count, empty state |
| `ExampleProfileCard` / `ExampleOpportunityCard` | Example names, qualitative reach, a "View example" dialog; no ratings or verification |
| `ProtectedWorkflow` | Illustrative collaboration record with neutral milestones and policy links |
| `Dialog` | Native `<dialog>`: focus containment, Escape, backdrop click, focus return |
| `JoinDialog` | Starting-point radios that lead to the existing sign-up or agency page; collects nothing |

## Imagery and voice

- Opening: four duotone scenes, one per kind of reach, always labelled "Illustrative scenes". Lower sections: natural, documentary photographs with `object-position` focal points and no filters. Every person or place illustrates a scenario and is never presented as a member.
- Plain, active, second-person copy. Example content is labelled where it appears ("Illustrative scenes", "Example profile", "Illustrative workflow"). Examples use "could", never results. No invented totals, testimonials, logos, ratings, verification or outcomes. Pricing is always qualified.
