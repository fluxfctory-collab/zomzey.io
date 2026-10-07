# ZOMZEY Signal Atlas: style guide

A short guide to the visual system used in the homepage concept. The living version is `/styleguide.html` in the prototype, rendered from the same CSS and components, and exported as `exports/ZOMZEY-board-03-style-guide.png`. Tokens live in `src/styles/tokens.css`.

**Status key:** *Observed* values come from the current zomzey.io homepage HTML (7 Oct 2026). *Proposed* values are new supporting tokens for this concept. Neither is an official brand manual.

## Identity

- **Logo:** the original white dotted wordmark (`new99.png`, 961 × 145, transparent). Use it on navy only, 150–166px wide in the desktop header and 130–144px on mobile, with clear space of at least half its height. Never retype, recolour, rotate, rebuild or animate it, and never place it on paper. *This build shows a labelled slot until the file is supplied; see `ASSET_SOURCES.md`.*
- **Motif:** dots carry meaning. A highlighted dot is an endpoint, a participant or a workflow state. Routes are orthogonal, rounded "transit" lines drawn as chains of round dots, echoing the wordmark. Small ordered halos of oval dots sit around endpoints, and never more than 180 decorative dots in the opening. No starfields and no lines that lead nowhere.

## Colour roles

| Token | Value | Status | Use |
| --- | --- | --- | --- |
| `--navy` | `#000222` | Observed | Opening, header, process, trust panel, footer |
| `--paper` | `#FAFAF8` | Observed | Relationship stories, explorer, closing |
| `--ink` | `#0A0B1E` | Observed | Text on light surfaces (18.6:1 on paper) |
| `--signal` | `#1FA9FF` | Observed | Primary action (navy text, 7.9:1), active route, ports |
| `--creator` | `#FF6600` | Observed | 8px creator role marker only |
| `--hub` | `#FFD42E` | Observed | 8px hub role marker only (ringed on light surfaces) |
| `--positive` | `#20E3A2` | Observed, unassigned | Reserved for local success feedback; not used on the page |
| `--surface-dark` | `#101437` | Proposed | Dark cards, menu sheet, record |
| `--muted-on-dark` | `#B4BDD4` | Proposed | Secondary text on navy (10.8:1) |
| `--muted-on-light` | `#5A5C72` | Observed | Secondary text on paper (6.3:1) |
| `--signal-on-light` | `#0065A8` | Proposed | Links, focus, routes on paper (5.9:1) |
| `--control-line-dark` / `-light` | `#7D88A8` / `#8A8CA0` | Proposed | Essential control borders (5.8:1 on navy, 3.2:1 on paper) |
| `--line-dark` / `-light` | 18% white / 13% ink | Proposed | Decorative dividers only |

Rules: bright blue, orange and yellow never carry small text on white. Colour always pairs with a text label. The opening is roughly 78% navy, 17% content and imagery, and a few percent saturated colour. Light sections stay mostly paper and ink.

## Typography

One family: **Instrument Sans** (variable, 400–700, self-hosted, OFL), with `system-ui, sans-serif` as the fallback. Sentence case throughout. No all-caps labels and no display face.

| Role | Desktop | Mobile | Weight / line height / tracking |
| --- | --- | --- | --- |
| Opening H1 | 84px (1280 and wider; 72–81px in the 900–1279 layout) | 40px (360–390) | 660 / 1.03 / −0.042em, +0.07em word spacing |
| Section H2 | 52px at 1440 (fluid up to 54px) | 30px | 620 / 1.1 / −0.03em |
| Story heading | 28px | 22px | 620 / 1.18 / −0.02em |
| Lead | 20px | 17px | 400 / 1.5 |
| Body | 17px | 16px | 400 / 1.55 |
| Controls | 15–17px | 15–16px | 540–620 / 1.2 |
| Meta | 14px | 14px | 450–560 / 1.4 |

The headline's full stop is drawn as an oval signal dot that sits on the baseline. A visually hidden "." keeps the sentence intact for assistive technology. Prose stays within about 30–34em.

## Layout, spacing and shape

- Container: max 1312px, centred. Gutters 20 (390), 16 (≤374), 24 (768), 40 (1024), 48 (1280), 64 (1440+).
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112. Section padding is 52–88px. No section is forced to `100vh`.
- Opening layouts: **perimeter** at ≥1280px (a 236px | 600–720px | 236px grid), **adjacent compact scene** at 900–1279px, and **stacked vertical story** below 900px.
- Radius: 12 for controls, 16 for cards, 20–24 for story surfaces, 28 for the trust panel, round for dots and pills (chips only).
- Elevation: a soft card shadow on paper surfaces, and a raised shadow only for menus and dialogs. No glows.

## Reusable components

| Component | Notes |
| --- | --- |
| `SiteHeader` | Sticky navy bar with a border after scroll. Explore disclosure panel; Menu dialog below 1024px |
| `IntentActions` | Two links to `#explore` that set a local promote/earn mode, not an account role |
| `ConnectionScene` / `ConnectionNode` | DOM entities (ticket, portrait, postcard, mini card) over an SVG route layer measured from layout |
| `ScenarioControl` | Pressed buttons with a dot plus fill for the selected state; four equal columns on phones |
| `VerticalStory` | Project and three participant steps on a dotted rail; each step expands its example |
| `RelationshipStory` | ARIA tabs (arrows, Home, End) with a project photo, a dotted fork and two participant cards |
| `ProcessSteps` | Ordered list with numbered nodes on a dotted rail and small "Example …" artefacts |
| `Explorer` | Intent switch, labelled search (Enter or button), category chips, More filters, polite live count, empty state |
| `ExampleProfileCard` / `ExampleOpportunityCard` | Example names, qualitative reach, a "View example" dialog; no ratings or verification |
| `ProtectedWorkflow` | Illustrative collaboration record with neutral milestones and policy links |
| `Dialog` | Native `<dialog>`: focus containment, Escape, backdrop click, focus return |
| `JoinDialog` | Starting-point radios that lead to the existing sign-up or agency page; collects nothing |

## Imagery and voice

- Natural, documentary photographs: shop shelves, a small stage, a market, workshops and readers, mixed with creator scenes. Crops use `object-position` focal points, with no filters. Every person or place is an illustration of a scenario, never a member.
- Plain, active, second-person copy. Example content is labelled where it appears ("Illustrative connection", "Example profile", "Illustrative workflow"). No invented totals, testimonials, logos, ratings, verification or results. Pricing is always qualified.
