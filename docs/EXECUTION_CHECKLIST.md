# Execution checklist

Internal requirement trace for the ZOMZEY Signal Atlas homepage prototype, derived from `ZOMZEY_DESIGN_SPEC.md` (sections 1–16) and the client brief. Final status below; evidence in `docs/QA_REPORT.md`.

## Inputs and constraints

- [x] Spec read in full. Research PDF: **not supplied** (not in uploads or Drive); spec's summary of it used instead.
- [x] Repo empty → React + TypeScript + Vite default (spec §10).
- [ ] Official logo `new99.png` — **blocked**: `zomzey.io` denied by this environment's egress policy. Drop-in path `public/brand/zomzey-logo.png`; labelled slot until supplied. Never invent/retype.
- [x] Imagery: stock hosts blocked; Open Images (CC BY 2.0 listed, Flickr originals) via S3. Credits recorded per image.
- [x] Fonts: Instrument Sans (OFL) self-hosted via `@fontsource-variable/instrument-sans`.

## Page (spec §5–6), in order

1. [x] Header (logo shown as labelled slot until the asset is supplied): Explore (panel), How it works, Pricing, About, Sign in, Join (local dialog); sticky + border after scroll; mobile `Menu` button + dialog (Esc, focus return).
2. [x] Opening: H1 "Make the next connection count." (3 balanced lines), description, 2 intent buttons, qualified pricing line, 4 perimeter entities (project ticket TL, reviewer portrait TR, bookshop BL, community BR), SVG route layer behind DOM (`pointer-events:none`), ≤180 decorative dots, "Illustrative connection", stable detail area, Books/Products/Music/Apps control. Mobile: text + buttons first, vertical 3-step story.
3. [x] Reach in different worlds: paper canvas, one large story, 4 accessible tabs, "Example connections".
4. [x] From connection to collaboration: 5-step `<ol>`, route line, small example artefacts; bounded scroll progress; static complete.
5. [x] Explorer: intent-aware heading/label/placeholder; search (Enter + button); categories; More filters; example-dataset count in polite live region; no-results + Clear filters; intent switch resets incompatible filters; detail dialogs labelled Example + external route.
6. [x] Clarity before commitment: navy panel, illustrative workflow record, Protected Payments + Terms links, no verification ticks, no testimonials.
7. [x] Closing: "Bring what you do best." two starting points, Join ZOMZEY, pricing link, View agency plans.
8. [x] Footer: logo on navy, description, Explore/Help/Policies groups, verified destinations, image credits.

## Claims discipline (spec §2)

- [x] Every example area visibly labelled; generic example names; qualitative reach only.
- [x] No member totals, testimonials, logos, ratings, verification badges, live activity, revenue.
- [x] Pricing always qualified; agency plans explicit; Protected Payments described high-level + linked.
- [x] No UI pretending a payment/registration/message happened.

## Interaction & motion (spec §8)

- [x] Intent → stores `promote`/`earn`, updates explorer, navigates to `#explore`.
- [x] Scenario change swaps images/labels/paths together, no layout shift.
- [x] Node hover/focus/tap highlights route + updates detail; tap elsewhere/close dismisses.
- [x] GSAP: one opening route reveal (600–900ms), scenario crossfade, process progress; reduced motion checked at start; lazily loaded GSAP in scoped `gsap.context()` reverted on unmount.
- [x] No autoplay carousels, pinning, scroll hijack, custom cursor, endless motion.

## Accessibility (spec §9)

- [x] One H1, landmarks, skip link, heading order.
- [x] Focus visible (2px + 3px offset), 44px targets, keyboard for every control.
- [x] Dialog naming, focus containment, Esc, focus return.
- [x] Contrast AA verified on actual surfaces; decorative SVG hidden; alt text meaningful.
- [x] No horizontal overflow at 1920/1440/1280/1024/768/390/360.

## Deliverables (spec §13)

- [x] `exports/ZOMZEY-desktop-hero-1440.png`, `-desktop-full-1440.png`, `-mobile-hero-390.png`, `-mobile-full-390.png`
- [x] Boards 01 desktop, 02 mobile (opening, example detail, menu), 03 style guide, 04 interactions
- [x] `docs/STYLE_GUIDE.md`, `INTERACTION_NOTES.md`, `DESIGN_WALKTHROUGH.md`, `QA_REPORT.md`, `ASSET_SOURCES.md`, `SKILLS_USED.md`
