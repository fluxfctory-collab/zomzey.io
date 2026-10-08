# Execution checklist

Internal requirement trace for the ZOMZEY Signal Atlas homepage prototype, derived from `ZOMZEY_DESIGN_SPEC.md` (sections 1–16) and the client brief. Final status below; evidence in `docs/QA_REPORT.md`.

## Inputs and constraints

- [x] Spec read in full. Research PDF: **not supplied** (not in uploads or Drive); spec's summary of it used instead.
- [x] Repo empty → React + TypeScript + Vite default (spec §10).
- [x] Official logo — supplied by the client (WebP, 961 × 145) and used unaltered as `public/brand/zomzey-logo.webp`, plus a lossless 320px resize for the header. Never invented or retyped.
- [x] Imagery: stock hosts blocked; Open Images (CC BY 2.0 listed, Flickr originals) via S3. Credits recorded per image.
- [x] Fonts: Instrument Sans (OFL) self-hosted via `@fontsource-variable/instrument-sans`.

## Page (spec §5–6), in order

1. [x] Header (official logo): Explore (panel), How it works, Pricing, About, Sign in, Join (local dialog); sticky + border after scroll; mobile `Menu` button + dialog (Esc, focus return).
2. [x] Opening, redesigned on request ("Up in lights"): H1 is ZOMZEY's own line "Promote through people with followers, footfall, fans & audience." in four fixed lines with colour-coded reach words; description; 2 intent buttons; qualified pricing line; LED wall of four duotone scenes (followers, footfall, fans, audience) that resolve out of oval dots and spill light; scenes are toggle buttons with a reserved, polite detail line and verified links; "Illustrative scenes". Mobile: text + buttons first, then two staggered columns; tablets one row of four.
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
- [x] Scene selection resolves the scene, mutes the others, lights the headline word and explains an example; no layout shift at any width; tap elsewhere / ✕ / second click returns to all four.
- [x] Opening motion: one CSS power-on sequence (1.1s per screen, 120ms apart), declared only for `prefers-reduced-motion: no-preference`. GSAP (lazily loaded, scoped) now drives only the bounded process progress.
- [x] No autoplay carousels, pinning, scroll hijack, custom cursor, endless motion.

## Accessibility (spec §9)

- [x] One H1, landmarks, skip link, heading order.
- [x] Focus visible (2px + 3px offset), 44px targets, keyboard for every control.
- [x] Dialog naming, focus containment, Esc, focus return.
- [x] Contrast AA verified on actual surfaces; decorative SVG hidden; alt text meaningful.
- [x] No horizontal overflow at 1920/1440/1280/1024/768/390/360.

## Deliverables (spec §13)

- [x] `exports/ZOMZEY-desktop-hero-1440.png`, `-desktop-full-1440.png`, `-mobile-hero-390.png`, `-mobile-full-390.png`
- [x] Boards 01 opening concept (annotated desktop, before and after), 02 mobile and responsive (three phones, tablet, layout logic), 03 visual system (living style guide)
- [x] `docs/STYLE_GUIDE.md`, `INTERACTION_NOTES.md`, `DESIGN_WALKTHROUGH.md`, `QA_REPORT.md`, `ASSET_SOURCES.md`, `SKILLS_USED.md`
