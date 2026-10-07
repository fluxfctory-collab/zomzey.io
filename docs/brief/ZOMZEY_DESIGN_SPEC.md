# ZOMZEY — Homepage Design Specification

**Selected direction:** The Living Opportunity Network  
**Working visual concept:** ZOMZEY Signal Atlas  
**Prepared:** 7 October 2026  
**Purpose:** A distinctive homepage contest concept, implemented as a responsive frontend prototype and presented through desktop/mobile mock-ups, a concise style guide and interaction notes.

## طريقة استعمال هذا الملف

هذا الملف يحدد اتجاه التصميم وتفاصيل تنفيذه. ضعه في مجلد المشروع، ثم أعطِ Claude Code التعليمات الموجودة في `CLAUDE_CODE_ZOMZEY_PROMPT.md`. المواصفات بالإنجليزية لتسهيل التنفيذ الدقيق، ومحتوى الواجهة باللغة الإنجليزية. الألوان الأساسية والشعار مأخوذة من الموقع الحالي؛ أما توزيع الصفحة والتفاعلات فهي اقتراح تصميم جديد.

## 1. The outcome we are designing for

Create a homepage that makes ZOMZEY understandable and memorable within the first few seconds. Visitors should recognise a marketplace where a project can meet an audience through creators, physical shops, communities, venues, musicians and agencies. They should immediately see how to explore the platform from either side of that relationship.

The client explicitly asks for a fresh, unmistakably modern and unique homepage, polished and trustworthy execution, intuitive navigation, desktop and mobile mock-ups, a concise style guide, and a short explanation of interactions and layout rationale. An unusual composition must make the product clearer.

The defining idea is this: **the homepage presents useful connections as its organising structure.** ZOMZEY's existing dotted wordmark supplies the visual seed. Dots become connection points, controlled paths join projects to people and places, and those same paths become a readable collaboration process further down the page.

The required scope is a homepage design. The frontend prototype is a practical way to demonstrate and export it. A backend, live payments, account creation infrastructure, dashboard, full marketplace rebuild, WordPress migration and public deployment are outside this design task.

### Requirements traceability

| Client requirement | Concrete design response | Evidence in the submission |
| --- | --- | --- |
| Fresh start | Rebuild the information hierarchy around visitor intent and useful relationships | Complete desktop/mobile homepage |
| Modern and unique | An authored network composition derived from the dotted ZOMZEY logo | Opening viewport and network details |
| Original layout and visual language | Perimeter entities, a central typographic opening, relationship examples and a continuous connection motif | Desktop concept board |
| Surprise visitors | A meaningful scene combining an idea, a creator, a shop and a community | First-screen mock-up |
| Intuitive navigation | Familiar labelled navigation, a visible sign-in link, explicit buttons and a conventional mobile menu | Navigation and menu states |
| Polished and trustworthy | Restrained palette, readable type, genuine source-grounded product descriptions and transparent prototype data | UI components and trust panel |
| Desktop mock-ups | 1440px opening and complete homepage exports | Desktop PNG files |
| Mobile mock-ups | A deliberately recomposed 390px page and narrow-screen checks | Mobile PNG files |
| Concise style guide | Colour roles, type scale, spacing, identity use and reusable components | Style guide board and MD |
| Notes/walkthrough | Interaction states, mobile alternatives and the reason for the layout | Interaction board and short walkthrough |

### Evidence and decision hierarchy

1. The client's supplied brief defines the required outcome and deliverables.
2. Current first-party ZOMZEY pages and the actual logo define product facts and identity.
3. The attached 17-page Arabic research PDF supplies analysis and concept recommendations.
4. This specification selects one creative direction and resolves its implementation details.
5. Skills provide execution guidance. Their generic colour/font/layout suggestions must be reconciled with this brief.

Separate facts from proposals. The research's lime/cobalt palette, font pairings, scoring percentages and concept ratings are recommendations, rather than confirmed brand rules or official judging criteria. Retain its network insight, but use the identity observed on the current site.

## 2. Product understanding and truthful positioning

ZOMZEY serves both people promoting something and people or organisations that can help it reach an audience. Its first-party About page identifies Pioneers, Influencers, Hubs, Agencies and music participants. Its examples connect publishing, products, live music and apps to different kinds of reach. [S1–S2]

Design the entry around two intentions:

| Visitor intent | Likely participants | Immediate homepage task |
| --- | --- | --- |
| Promote something | Authors, makers, founders, brands and musicians | Find appropriate people, places or communities |
| Earn through an audience | Creators, shops, venues, communities, musicians and represented talent | Explore relevant opportunities and explain what they offer |

These are entry intentions, not mutually exclusive account restrictions. A musician, agency or another participant may act on both sides. Do not force a permanent role choice on the homepage.

Use human-readable terms before platform taxonomy. For example, show `Shop / Hub` where explaining the term helps. Retain all five participant groups in navigation or the lower-page role directory, without placing five competing primary actions in the first screen.

### Claims discipline

- Treat all proposed profile names, projects, locations and opportunities as illustrative examples. Label the example areas visibly. They are not live listings or platform endorsements.
- Do not fabricate testimonials, aggregate member counts, client logos, revenue, conversion results, star ratings, verification badges or real-time activity.
- If genuine testimonials become available, use the supplied wording and attribution accurately. Otherwise use an explanatory relationship note in their place.
- ZOMZEY documents payment protection and a delivery/review process. Describe the process cautiously and link to the current policy. Do not call it guaranteed success, guaranteed payment in every circumstance, escrow, or an unconditional refund promise. [S3–S4]
- Free account options exist, while fees, optional upgrades and paid Agency plans also exist. Use a pricing link and a qualified statement; do not advertise every role as universally free or fee-free. [S2, S5]
- No visible mock interface should pretend that a payment, verification, registration or message has actually happened.

## 3. The selected visual direction

### Three approaches considered

| Approach | Strength | Trade-off | Decision |
| --- | --- | --- | --- |
| Living Opportunity Network | Expresses the actual relationships and derives a recognisable visual language from the logo | Requires careful spacing and a separate mobile composition | Selected |
| Opportunity noticeboard | Makes browsing tangible and can mix physical/digital opportunities | Easily becomes a familiar card grid and explains the broader platform less well | Use only in the explorer preview |
| Editorial marketplace | Clear typography, strong imagery and an efficient mobile structure | Needs an additional signature idea to satisfy the client's originality request | Use as supporting layout discipline |

### Design personality

Confident, human, purposeful and precise. Pair ZOMZEY's deep navy and white dotted identity with vivid blue connection signals, natural imagery and occasional light editorial surfaces. The network is an organised marketplace illustration; it should not resemble a blockchain chart, cosmic starfield or developer diagram.

Spend the visual boldness in the opening network. Keep navigation, search, policy links and controls conventional. Allow large typography and asymmetry, while maintaining calm line lengths and alignment.

### Five visual rules

1. **Dots have meaning.** A highlighted dot marks a connection endpoint, participant or workflow state. Background dots are sparse and confined to the network field.
2. **Connections tell a story.** A path explains which project could work with which participant. Avoid ornamental lines pointing nowhere.
3. **Images show the breadth of reach.** Include a shop, a creator and a community or venue; avoid making every image an influencer portrait.
4. **Colour has a role.** Blue identifies the active route/action. Existing orange and yellow may identify participant roles through small markers; they are not large competing colour blocks.
5. **Typography creates hierarchy.** Use one coherent primary family and deliberate sizing, rather than mixing several fashionable display fonts.

## 4. Brand identity and style guide

### 4.1 Observed identity

The inspected official header asset is a white ZOMZEY wordmark made from closely spaced oval dots, including its registration mark. The source PNG is 961 × 145px, with transparency. Preserve this exact supplied brand asset and its proportions. [S6]

The homepage HTML inspected on 7 October includes these named variables: navy `#000222`, paper `#FAFAF8`, ink `#0A0B1E`, Pioneer blue `#1FA9FF`, Creator orange `#FF6600`, Hub yellow `#FFD42E` and an additional green `#20E3A2`. Its loaded global font includes Instrument Sans; individual sections also contain other fonts. These are observed implementation values, not a claim that an official brand manual was supplied. [S1]

Use the observed values as the identity foundation and the following supporting tokens as the proposed design system.

### 4.2 Colour tokens

| Token | Value | Status and use |
| --- | --- | --- |
| `--navy` | `#000222` | Observed; opening, header, footer and dark trust panel |
| `--paper` | `#FAFAF8` | Observed; relationship stories and explorer background |
| `--ink` | `#0A0B1E` | Observed; primary text on light surfaces |
| `--signal` | `#1FA9FF` | Observed; principal action and active connection |
| `--creator` | `#FF6600` | Observed; restrained Creator role marker |
| `--hub` | `#FFD42E` | Observed; restrained Hub role marker |
| `--positive` | `#20E3A2` | Observed colour, proposed functional assignment; successful local UI feedback |
| `--surface-dark` | `#101437` | Proposed; dark cards and elevated menu surfaces |
| `--text-on-dark` | `#FFFFFF` | Neutral; principal dark-surface text |
| `--muted-on-dark` | `#B4BDD4` | Proposed; secondary dark-surface text |
| `--muted-on-light` | `#5A5C72` | Observed; supporting light-surface text |
| `--line-dark` | `rgba(255,255,255,0.18)` | Proposed; nonessential dividers on navy |
| `--line-light` | `rgba(10,11,30,0.13)` | Proposed; nonessential dividers on paper |
| `--signal-on-light` | `#0065A8` | Proposed; blue text, focus or essential paths on light surfaces |

Blue primary buttons use navy text, not white text. Orange and yellow chips use ink text. Do not use the bright blue, orange, yellow or mint as ordinary small text on white. Low-contrast divider tokens are decorative; essential control boundaries and meaningful paths need a separately verified colour.

Check final composited colours against WCAG AA: at least 4.5:1 for normal text, 3:1 for qualifying large text and 3:1 for relevant non-text UI states. Colour never replaces a text label. [S7]

Approximate visual distribution on the opening: 75–85% navy/neutral space, 10–20% readable content and imagery, and a small proportion of saturated colour. This is a compositional guide, not a measurement requirement. Light sections should be mostly paper and ink.

### 4.3 Typography

**Primary family:** Instrument Sans, with `system-ui, sans-serif` as fallback. Use this for headings, body, controls and metadata. It carries existing brand continuity and reduces font complexity. Self-host the required licensed font files when available; retain the OFL licence. [S8]

| Role | Desktop target | Mobile target | Weight / line height |
| --- | --- | --- | --- |
| Opening H1 | 80–92px at 1440px | 40–46px at 390px; 38–42px at 360px | 650–700 / 1.02–1.08 |
| Section H2 | 44–56px | 30–36px | 600–650 / 1.08–1.15 |
| Feature/story heading | 24–30px | 22–26px | 600 / 1.18 |
| Opening description | 18–20px | 16–18px | 400 / 1.5 |
| Body | 16–18px | 16px | 400 / 1.55 |
| Buttons/navigation | 14–16px | 15–16px | 550–650 / 1.2 |
| Metadata | 13–14px | 13–14px | 450–550 / 1.4 |

Use normal sentence case for interface copy. Set H1 letter spacing around `-0.045em`, H2 around `-0.03em`, and body close to normal. Verify the actual font's supported weights; use the nearest available weight if necessary. No extremely compressed display face, outlined headline, unreadable dot-matrix body text or all-caps metadata treatment.

Keep normal prose to approximately 45–70 characters per line. The dotted identity belongs to the logo and network, while interface text remains easy to read.

### 4.4 Layout and spacing

- Desktop page width: fluid, with a maximum content width of 1312px; centre it on wider screens.
- Outer gutters: 64px at 1440px, 40px at 1024px, 24px at 768px and 20px at 390px. At 360px, use 16px when needed.
- Main desktop grid: 12 columns with 24px gaps. Tablet: 8 columns. Mobile: 4 columns or a single flow where appropriate.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 112px.
- Major section padding: usually 88–112px desktop and 48–64px mobile, adjusted to the actual content.
- Keep every section content-driven. Avoid setting each section to `100vh`.
- Use rounded corners selectively: 10–12px controls, 16px profile cards, 20–24px larger story surfaces and round connection dots. A pill is suitable for a chip, not every component.
- Shadows: very restrained, mainly on light cards or a raised menu. No giant blue glow surrounding every node.

### 4.5 Logo rules

- Use the original white transparent asset on navy in both header and footer. Do not retype, reconstruct, rotate, recolour or generate the logo.
- Header width target: 150–166px desktop and 130–144px mobile, with its original aspect ratio.
- Clear space: at least half the rendered logo height on each side.
- Do not put this white asset on paper. If a light-background logo is needed, obtain an approved dark version or retain a compact navy identity plate.
- Do not animate individual points inside the official logo. The separate network motif may move.
- Inspect the source image on a dark background: a white transparent logo can look blank in a white image viewer.

## 5. Information architecture and page rhythm

| Order | Section | Main job | Desktop rhythm | Mobile adaptation |
| --- | --- | --- | --- | --- |
| 1 | Header | Orient, explore, sign in and join | Quiet navy bar, about 80px | 64–68px bar and labelled menu button |
| 2 | Living network opening | Explain the difference and identify visitor intent | Authored navy network field, about 640–720px | Headline/actions first, then a compact connection story |
| 3 | Reach in different worlds | Demonstrate physical and digital relationships | Paper canvas with four selectable stories | One visible story with accessible category controls |
| 4 | From connection to collaboration | Explain the path from discovery to delivery | Readable five-step progression | Vertical ordered progression |
| 5 | Explore your next connection | Allow a meaningful first action | Real local search/filter preview | Compact form and vertically stacked results |
| 6 | Clarity before commitment | Show how a collaboration is structured | Deep navy process panel | Readable stacked process and policy link |
| 7 | Choose your starting point | Convert with a clear next step | Spacious closing pair of intent routes | Two stacked intent choices |
| 8 | Footer | Make broader roles, support and policies available | Three compact link groups | Grouped stacked links |

The same visual route motif connects the chapters, but each section has its own useful layout. Aim for a desktop full page around 3600–4600px tall at 1440px; this is a pacing target, not a fixed-height constraint. Do not stretch sparse content to match it.

## 6. Detailed section specification

### 6.1 Header

Desktop contents: original ZOMZEY logo on the left; `Explore`, `How it works`, `Pricing`, `About`; `Sign in` and a compact `Join ZOMZEY` action on the right. Keep the header visible with conventional sticky positioning and a subtle solid border after scrolling. It must remain readable over both dark and light sections.

`Explore` opens a modest labelled panel for People and places, Opportunities and participant categories. Retain access to Pioneers, Influencers, Hubs, Agencies and Music here or in the footer. Do not reproduce the current enormous list of niches in the primary header.

- Explore can also link directly to `#explore`; if using a dropdown, provide a separate visible link in it.
- How it works links to `#how-it-works`.
- Pricing and About use verified first-party destinations.
- Sign in uses the existing sign-in destination, rather than an invented login route.
- Join opens a local starting-point dialog in the prototype; its final button links to the existing ZOMZEY signup or Agency page.
- Mobile: original logo, a labelled `Menu` button and a familiar icon. The menu contains all primary links plus sign-in and join.
- A menu/dialog must close with Escape, restore focus to its trigger and manage focus appropriately. Essential links remain accessible without hover.

### 6.2 Opening: the living opportunity network

**Headline:** `Make the next connection count.`

**Proposed description:** `Bring your project to the people, places and communities that can help it grow.`

**Primary intent action:** `I want to promote something`  
**Secondary intent action:** `I want to earn from my audience`

**Qualified supporting line:** `Free account options available. See pricing for fees and agency plans.`

The headline is established ZOMZEY language. The description and interface labels are proposed homepage copy. [S2]

#### Desktop composition

Use one full-width authored composition, with typography in a reserved central area and four compact entities around its perimeter. The initial example is a book launch connecting with a reviewer, a bookshop and a book community. This already demonstrates that ZOMZEY extends beyond creator promotion.

| Element | Position/size guidance at 1440px | Behaviour |
| --- | --- | --- |
| Main message | Central 6–7 grid columns; headline uses three deliberately balanced lines | Always visible, never covered by a card or connector |
| Book launch project | Upper-left perimeter; about 180–210px wide | Source of the illustrative relationship |
| Reviewer | Upper-right perimeter; about 200–220px wide | Image, role and concise reach type |
| Bookshop | Lower-left perimeter; about 220–240px wide | Shop imagery and physical/local reach description |
| Book community | Lower-right perimeter; about 210–240px wide | Small community image and role description |
| Intent actions | Below the message in the reserved central area | Set intent and move to the explorer |
| Scenario controls | A quiet row in an available upper/lower gap | Books, Products, Music and Apps; user-controlled |
| Connection paths | Behind the entities and around the message-safe area | Explain an example relationship, not live activity |

Keep at least 24–32px clearance between text/actions and decorative paths. Render lines in an SVG layer behind DOM content with `pointer-events: none`; the actual card/button controls remain HTML. Solve the composition with grid areas and responsive scene variants, rather than assuming fixed pixel positions will work at every width.

Cards have distinct image crops and restrained differences in aspect ratio. One or two can rotate by at most 2 degrees if that improves the composition; all text must remain easy to read. Use a mix of a compact project ticket, portrait node and shop/community mini-card. Avoid four identical dashboard tiles.

Sparse dot clusters echo the wordmark near connection endpoints. They should not form a decorative starfield or become a large pseudo-logo. Use at most roughly 120–180 static decorative SVG circles in the opening, with meaningful nodes remaining separate interactive elements.

Include `Illustrative connection` near the scene. Do not show invented live member statistics. Reach labels can be qualitative: `Content audience`, `Local shop`, `Reading community`.

#### Interaction

On initial load, the content is readable immediately. If motion is enabled, draw one active connection in a short sequence while bringing in the associated cards. Do not repeatedly rotate scenarios, pulse endlessly or keep the network drifting.

Hover or keyboard focus on a node highlights its route and shows a concise explanation in a stable nearby detail area. Keep other text readable. On touch, tapping a node updates that same area; tapping elsewhere or an explicit close control dismisses it.

Selecting another scenario changes the participant images, labels and paths together. Keep the headline and intent buttons stable. No full-screen transition and no layout shift.

Selecting an intent stores a local `promote` or `earn` mode, updates the explorer appropriately and navigates to `#explore`. This is navigation, not account creation. Do not navigate away from the prototype unexpectedly.

#### Mobile composition

At 767px and below, discard the desktop perimeter positioning. Order the content as logo/header, headline, short description, two stacked intent buttons, qualified pricing line, compact scenario control and a vertical connection example.

At 390 × 844px, the headline, description and both intent buttons should be visible before substantial scrolling; move secondary imagery lower if necessary. The network example uses three compact steps and a clear vertical line, not a miniature desktop canvas. Keep all four scenario categories available through a compact wrapping control.

If a floating bottom action is used, show it only after the opening buttons leave view, hide it near the closing actions/footer, respect safe-area insets, and reserve enough space so it cannot cover content. It is optional; omit it if it adds distraction.

### 6.3 Reach in different worlds

**Heading:** `Different kinds of reach. A shared opportunity.`

Use a light paper canvas. Build one large selected story with a project on one side and a connected pair of people/places on the other. This is an editorial relationship display, with natural images, concise labels and a readable route. It should feel different from the opening scene and from a row of generic feature cards.

Provide four story controls:

| Category | Example project | Possible connections | Explanation shown |
| --- | --- | --- | --- |
| Books | An independent book launch | Reviewer, bookshop, reading community | Discover different ways a story might find readers |
| Products | A small brand's new product | Creator, independent retailer, relevant community | Combine content discovery with a physical point of contact |
| Music | A new release or local performance | Music creator, venue, fan community | Explore both online listening and in-person audiences |
| Apps | A useful new app | Reviewer, educator, niche community | Bring a demonstration to people likely to understand its value |

These are hypothetical examples, not promises that all channels or results are guaranteed. Label the display `Example connections`. Do not state that selecting a channel performs automated matching.

On mobile, show the selected story as a vertical project-to-participants composition with two concise participant cards. Controls remain explicit and keyboard operable. If implemented as ARIA tabs, support the corresponding arrow-key pattern; otherwise use ordinary pressed buttons with clear labels.

### 6.4 From connection to collaboration

**Heading:** `A clear path from first contact to finished work.`

Use five readable steps with short descriptions:

| Step | Proposed microcopy |
| --- | --- |
| Discover | Find people, places or opportunities relevant to your project. |
| Connect | Explain what you need or what you can offer. |
| Agree | Make the scope, price and delivery expectations clear. |
| Deliver | Complete the work and provide the agreed evidence. |
| Review and complete | Review delivery and follow the platform's completion process. |

Use an ordered progression, not five empty numbered boxes. Each step may have a small concrete artefact, such as a brief preview or an agreed-deliverables snippet, clearly marked as an example. A route line links the steps and may progress as the section enters view.

The sequence must remain entirely comprehensible as a static composition. Do not pin it for several screens, intercept wheel events or hide later steps until the user scrolls a precise distance. Mobile uses a vertical ordered list.

### 6.5 Explorer preview

**Promote heading:** `Who could help your project reach further?`  
**Earn heading:** `Where could your audience make a difference?`

This is the homepage's practical discovery moment. Display a labelled search input, a small number of useful category controls and a curated local preview. Advanced filters remain available through one `More filters` button; the homepage should not recreate a massive directory form.

#### Promote mode

- Search label: `Search people and places`.
- Placeholder: `Try a creator, shop or community`.
- Initial category controls: All, Creators, Shops and communities, Music and venues, Agencies.
- Show four to six illustrative records combining portraits, place imagery and one community/agency example.
- Result fields: example name, participant type, category, optional example location, qualitative reach and `View example`.
- Open a local detail dialog or sheet. This must explicitly say `Example profile` and provide a verified external route to explore actual ZOMZEY members.

#### Earn mode

- Search label: `Search opportunities`.
- Placeholder: `Try books, products or music`.
- Show sample opportunity cards with a project description, desired collaboration type and an example status label.
- Prefer no price or invented budget in the initial view. If a future supplied example needs a budget, identify it as illustrative and use consistent currency formatting.
- `View example` opens a local opportunity detail. A separate link goes to the actual ZOMZEY opportunities page.

#### Required local behaviours

Search and category changes genuinely filter the local example data. Enter submits the form; a visible search button offers the same action. Show the result count for the **example dataset**, never a made-up platform total. Use a polite live region for count updates.

When no result matches, show `No examples match these filters.` and `Clear filters`. Changing intent clears incompatible filters and restores the correct dataset. Keep the query local or in a documented prototype URL state; do not invent a backend endpoint.

Example data should be clearly marked at section level and in opened details. Use generic sample names such as `Book reviewer example` and `Independent bookshop example`, rather than implying that a fictional named person is a real member.

### 6.6 Clarity before commitment

**Heading:** `Know what is agreed. Understand what happens next.`

Create a restrained navy panel around a sample collaboration record. Show its agreement, funding, delivery and review milestones with clear labels. A small `Illustrative workflow` caption distinguishes it from an actual transaction.

Supporting copy can explain that the platform documents how offers, delivery, review and Protected Payments work. Include `Read about Protected Payments` and a terms link. Keep the policy wording high-level and accurate; payment conditions belong to the actual policy rather than invented diagram details. [S3–S4]

Do not place a verification check beside every example member. If showing a verification component in the style guide, call it an example component and explain that it is displayed only when real source data justifies it.

If authentic client-supplied social proof exists, place one short attributed quote as an annotation near a relevant relationship or process step. If it does not exist, leave out testimonials entirely. Do not write fictional praise to complete the layout.

### 6.7 Closing starting point

**Heading:** `Bring what you do best.`

Use two concise starting points:

| Starting point | Supporting text | Action |
| --- | --- | --- |
| I have something to promote | A book, a product, music, an app or a new idea. | Explore people and places |
| I have an audience to offer | Through your content, shop, venue, community or represented talent. | Explore opportunities |

Below them, include one clear `Join ZOMZEY` action and a pricing link. The local join dialog identifies the chosen starting point and provides the appropriate external continuation. It collects no credentials and submits no registration.

Agency visitors receive an explicit `View agency plans` route. Do not hide paid Agency conditions behind a blanket free-signup statement.

### 6.8 Footer

Repeat the original logo on navy. Use a short product description and three link groups: Explore, Help, and Policies. Make broader participant roles and music available without repeating a huge niche directory.

Use verified destinations. Include Pricing, About, Support Hub, Terms and Privacy. If including Accessibility, verify its current route. Company/legal identity should follow the actual current site; do not invent addresses, registration data or partnership badges.

## 7. Component contracts and important states

| Component | Structure | States and behaviour |
| --- | --- | --- |
| `SiteHeader` | Logo, primary links, sign-in, join, mobile menu | Top/scrolled, menu open/closed, keyboard focus |
| `IntentActions` | Two plainly labelled actions | Selected promote/earn mode; no permanent role assignment |
| `ConnectionScene` | DOM entities plus a noninteractive SVG path layer | Default, focused node, selected scenario, reduced motion |
| `ConnectionNode` | Image or icon, role, concise label, optional detail trigger | Default, hover, focus, selected, touch detail open |
| `ScenarioControl` | Books, Products, Music, Apps | Selected category and accessible state indication |
| `RelationshipStory` | Project and related participants | Category-specific content, static mobile layout |
| `ProcessSteps` | Semantic ordered list and small illustrative artefacts | Fully readable default, optional route progress |
| `Explorer` | Intent-aware form, categories and local results | Query, filtered, no results, reset, dataset change |
| `ExampleProfileCard` | Generic example identity and qualitative reach | Focus, detail open; no invented verified status |
| `ExampleOpportunityCard` | Project, desired collaboration and detail action | Focus, detail open; illustrative data disclosure |
| `ProtectedWorkflow` | Sample milestones and source-policy links | Static readable record; no real transaction status |
| `JoinDialog` | Starting point and verified continuation links | Open, choose intent, choose agency route, close |
| `DetailDialog` | Clearly labelled sample information | Open/closed, correct focus restoration |
| `SiteFooter` | Identity, navigation and policies | Responsive grouped layout |

Use semantic links for navigation and buttons for state changes. Avoid clickable `div` controls. Every apparent action must either work, navigate meaningfully, or be visibly identified as a noninteractive illustration.

## 8. Interaction and motion specification

| Interaction | Proposed timing | What it communicates | Reduced-motion alternative |
| --- | --- | --- | --- |
| First connection reveal | One 600–900ms sequence | The illustrated participants are related | Show the complete scene immediately |
| Node highlight | 140–200ms | Which path belongs to the selected participant | Immediate highlight and detail update |
| Scenario change | 220–320ms | The same platform supports a different use case | Immediate content replacement |
| Intent selection | 180–260ms UI feedback | Which exploration route is active | Immediate update and ordinary anchor navigation |
| Menu/dialog | 160–220ms | A temporary navigation/detail layer has opened | Immediate open/close |
| Workflow route progress | Short, bounded scroll-linked update | A collaboration has an ordered progression | Complete static ordered list |

No auto-advancing carousel, scroll hijacking, custom cursor, heavy 3D scene, ambient endless animation, spinning globe, aggressive parallax or hover-only essential content. A normal pointer remains a normal pointer.

If GSAP is used, keep animation local to the components, clean up on unmount and responsive changes, and respect `prefers-reduced-motion`. In React, use a scoped context or the recommended React integration. Use GSAP for meaningful route sequencing; use CSS for basic button/menu transitions. Do not give the same property to two competing animation systems. [S9]

Lines can animate through SVG stroke drawing and a single travelling point. Fade/transform effects must not hide the actual content while a slow script loads. Text, buttons and static examples remain usable without animation.

## 9. Responsive, accessibility and asset requirements

### Responsive checks

| Width/viewport | Requirement |
| --- | --- |
| 1920px | Centred maximum-width content; no scattered nodes at screen extremes |
| 1440 × 900 | Primary desktop reference; composition and intent actions work in the opening viewport |
| 1280 × 800 | No collisions between headline, buttons and perimeter cards |
| 1024 × 768 | Simplify to fewer simultaneously visible perimeter entities or an adjacent compact scene |
| 768 × 1024 | Tablet-specific composition; controls comfortably reachable |
| 390 × 844 | Primary mobile reference; deliberate vertical relationships and complete touch controls |
| 360 × 800 | No overflow, clipped logo, truncated primary action or unreadable metadata |

Use fewer decorative entities at intermediate widths. Do not shrink body type or primary controls to save a desktop arrangement. At 200% zoom, preserve a usable flow and avoid content hidden by sticky elements.

### Accessibility floor

- One meaningful H1; logical heading levels and landmarks; a working skip link.
- Text contrast and essential UI contrast verified on actual backgrounds.
- Keyboard-accessible menu, scenario controls, intent controls, search and dialogs.
- Visible focus: for example a 2px suitable blue/navy outline with a 3px offset, checked against its surface.
- Primary touch targets at least 44 × 44px; adequate separation between neighbouring actions.
- Decorative SVG/circles hidden from assistive technology. Relationship explanations remain available as real HTML text.
- Meaningful image alt text and empty alt text for purely decorative crops.
- Dialog naming, focus containment, Escape dismissal and return focus.
- Search has a visible label; errors and empty states explain the next action.
- Reduced motion works both at initial load and after the preference changes.
- No essential distinction communicated through colour, hover or animation alone.

### Asset direction

Use local, optimised imagery wherever possible. Choose a consistent natural photographic style: contemporary creator workspaces, an independent shop/bookshelf, a small venue/performance space and a plausible community activity. Match lighting and crop treatment across the set. Avoid glossy unrelated corporate stock photos.

Every image must have an appropriate usage source or licence, recorded in `docs/ASSET_SOURCES.md`. Prefer supplied assets, licensed stock or owned materials. AI imagery, if used with an available authorised tool, illustrates a scenario rather than impersonating a real ZOMZEY member. Mark example content accordingly.

Download the actual official logo from its observed URL and verify the returned image file. If unavailable, try approved local assets. Do not replace it with an invented mark or blank rectangle. Keep progress on the other sections and report that exact missing asset if necessary.

Reserve dimensions for every image. Use WebP/AVIF where supported, responsive source sizes and lazy loading below the fold. Do not lazy-load the meaningful opening image if doing so would compromise the first-screen presentation.

## 10. Implementation boundaries and structure

### Stack choice

Inspect the existing repository first. Preserve its framework, package manager, conventions and existing working features. If there is no existing app, use a small React + TypeScript + Vite frontend, with CSS variables and either the existing styling system or well-organised CSS. This is a prototype default, not a demand to migrate a working project.

SVG and DOM are sufficient for the network. Introduce no Three.js/WebGL dependency. Install GSAP only if the selected motion warrants it. A modest local dataset powers the explorer; credentials, payment SDKs and private services are unnecessary.

### Suggested organisation

| Area | Responsibility |
| --- | --- |
| Homepage components | Header, connection scene, stories, process, explorer, trust, closing and footer |
| Shared UI | Buttons, role chips, search fields, menu and dialog primitives |
| Content/data | Proposed homepage copy and clearly marked example records |
| Style tokens | Observed brand foundation, typography, spacing and interaction colours |
| Local assets | Original logo, licensed photographs, fonts and their licences |
| Motion utilities | Reduced-motion handling and narrowly scoped scene animations |
| `docs/` | Style guide, interaction notes, sources, QA and handoff |
| `exports/` | Screenshot mock-ups and presentation boards |

Make intent, scenario, selected category and detail state explicit. Do not intertwine live external navigation with local example filtering. Keep the full homepage accessible even when optional motion fails.

### Verified external destinations observed on 7 October

| Purpose | Destination |
| --- | --- |
| Homepage | `https://zomzey.io/` |
| Actual member directory | `https://zomzey.io/?ian_zz_directory=1&zzd_view=all` |
| Actual opportunities | `https://zomzey.io/opportunities/` |
| Signup | `https://zomzey.io/signup/` |
| Sign in | `https://zomzey.io/signup/#signin` |
| About | `https://zomzey.io/about/` |
| Pricing | `https://zomzey.io/pricing/` |
| Pioneers | `https://zomzey.io/what-is-a-pioneer/` |
| Influencers | `https://zomzey.io/what-is-an-influencer/` |
| Hubs | `https://zomzey.io/what-is-a-hub/` |
| Agencies | `https://zomzey.io/agencies/` |
| Music | `https://zomzey.io/bands-singers-musicians/` |
| Protected Payments | `https://zomzey.io/zomzey-protected-payments/` |
| Support | `https://zomzey.io/zomzey-support-hub/` |
| Terms | `https://zomzey.io/terms/` |
| Privacy | `https://zomzey.io/privacy/` |
| Accessibility | `https://zomzey.io/accessibility/` |

Recheck links when implementing because current routes and account flows can change. Preserve the observed directory query rather than inventing new query parameters for intent or role. An observed destination is not proof that a successful registration or transaction was tested.

## 11. Skills for Claude Code

Use a small relevant toolkit. Read each skill only for the phase where it contributes; do not load an entire marketplace of unrelated instructions. Check existing project/global skills and plugins before installing anything. Install missing skills in project scope where the installer supports it.

| Skill/source | Role in this project | Use phase |
| --- | --- | --- |
| Anthropic `frontend-design` | Distinctive composition, visual hierarchy and critique of generic layouts | Art direction and implementation |
| NextLevelBuilder `ui-ux-pro-max` | Responsive UI, component states, legibility and UX review | System design and refinement |
| GreenSock `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-performance` | Correct, restrained path sequencing and performance | Motion only |
| GreenSock `gsap-react` | React animation lifecycle and cleanup | Only in a React implementation |
| Vercel `web-design-guidelines` | Accessibility, focus, forms, navigation and interface audit | Post-implementation review |
| Anthropic `webapp-testing` | Local browser journeys, screenshot capture and console checks | Verification and exports |

Optional: Vercel's React performance skill if the existing project uses React and a measured issue warrants it. It is unnecessary for deciding this homepage's creative concept.

### Installation: interactive Claude Code route

These are **Claude Code slash commands**, not shell commands:

```text
/plugin install frontend-design@claude-plugins-official

/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

The official marketplace is usually already available. If absent, add the actual official marketplace using Claude Code's plugin management guidance. For GSAP, a selective CLI skill installation below avoids guessing a plugin ID.

### Installation: terminal route for an agent with shell access

Run these only for missing capabilities, from the project root. First inspect each installer's help/current README if a flag differs. Do not use a global install or `sudo` merely to obtain these project skills.

```bash
claude plugin install frontend-design@claude-plugins-official --scope project

npx --yes ui-ux-pro-max-cli init --ai claude

npx --yes skills add greensock/gsap-skills --agent claude-code --skill gsap-core --skill gsap-timeline --skill gsap-scrolltrigger --skill gsap-performance --skill gsap-react -y

npx --yes skills add vercel-labs/agent-skills --agent claude-code --skill web-design-guidelines -y

npx --yes skills add anthropics/skills --agent claude-code --skill webapp-testing -y
```

For a non-React project, omit `gsap-react`. If an installed version does not expose a listed skill, run that source's `--list` discovery and select the equivalent actual skill. Never silently invent a successful installation.

If the plugin route is unavailable, the official frontend-design skill can be installed selectively from `anthropics/claude-plugins-official` using the skills CLI after listing its available skills. UI/UX Pro Max's own CLI is its documented alternative to marketplace installation. [S10–S13]

After installation, verify actual skill folders or plugin status and read the relevant `SKILL.md`. Keep a compact `docs/SKILLS_USED.md` with source, installed version/commit when available, purpose and availability. If reload or a fresh session is required, explain the exact step. Installing is not evidence that a skill was loaded.

If network access or a runtime dependency blocks a skill, record the precise limitation and continue with this specification and available guidance. Do not install unrelated operating-system software or stall the design to chase optional tooling.

## 12. Execution sequence

1. **Read and audit:** Read this document, the client brief, the attached research when accessible, repository instructions and existing project files. Verify the logo and primary source facts.
2. **Prepare the working basis:** Identify the existing stack, load/install relevant skills, organise local assets and record factual limitations. Write a compact execution checklist.
3. **Build the static opening first:** Create header, typography, complete first-scene composition and the mobile arrangement. Inspect screenshots at 1440px and 390px before adding animation.
4. **Build the complete narrative:** Add relationship stories, process, explorer, trust panel, closing routes and footer. Keep their layouts varied and their hierarchy consistent.
5. **Make interaction real:** Implement intent switching, scenario controls, local search/filtering, no-results/reset, detail dialogs and mobile navigation.
6. **Add restrained motion:** Enhance the network and process only after the static result is strong. Confirm reduced motion and cleanup.
7. **Review the rendered interface:** Check visual quality, identity, keyboard/touch behaviour and every required viewport. Correct concrete findings.
8. **Export the contest package:** Capture actual rendered desktop/mobile mock-ups, build concise visual-system and interaction boards, and write the walkthrough.
9. **Run final checks and hand off:** Run available project checks and relevant browser journeys. Report precisely what was built, what was verified and any remaining limitations.

The user has selected this direction for implementation by giving the accompanying prompt to Claude. Routine layout refinements and reversible local fixes can proceed within the brief. A materially different concept, public deployment, backend integration or use of a paid external service is a separate scope decision.

## 13. Required contest deliverables

The frontend alone is not the full contest submission. Export readable visual deliverables that show the requested design and its reasoning.

| File | Required content |
| --- | --- |
| `exports/ZOMZEY-desktop-hero-1440.png` | Actual opening viewport at 1440 × 900px |
| `exports/ZOMZEY-desktop-full-1440.png` | Actual full homepage at 1440px width |
| `exports/ZOMZEY-mobile-hero-390.png` | Actual opening viewport at 390 × 844px |
| `exports/ZOMZEY-mobile-full-390.png` | Actual full mobile page at 390px width |
| `exports/ZOMZEY-board-01-desktop.png` | Clean desktop presentation board, suggested 2400 × 1600px |
| `exports/ZOMZEY-board-02-mobile.png` | Mobile presentation with opening, example detail and menu states |
| `exports/ZOMZEY-board-03-style-guide.png` | Colour roles, type hierarchy and reusable component samples |
| `exports/ZOMZEY-board-04-interactions.png` | Default/focus/scenario/intent states and mobile alternatives |
| `docs/STYLE_GUIDE.md` | Concise, approximately 1–2 pages of system guidance |
| `docs/INTERACTION_NOTES.md` | Trigger, response, purpose and touch/reduced-motion alternative |
| `docs/DESIGN_WALKTHROUGH.md` | A short explanation, approximately 250–400 words |
| `docs/QA_REPORT.md` | Commands/results, browser checks, tested widths and limitations |
| `docs/ASSET_SOURCES.md` | Original logo URL, image/font sources and usage notes |
| `docs/SKILLS_USED.md` | Actual installed/used skill sources and limitations |

Suggested board captions: `Desktop concept`, `Mobile concept`, `Visual system`, `Interaction story`. Keep presentation text brief and secondary to the actual interface. Do not put implementation instructions, fake metrics or giant explanatory paragraphs inside the page design.

Capture after fonts and images are ready and the deterministic default scene is stable. Export full-page images without stitching mistakes, sticky-header duplication, transient dialogs or elements frozen half-visible. Capture alternate states deliberately as separate images.

Use a direct image format for mock-ups. If no native Figma file is produced, do not claim one exists. A PDF overview is optional and cannot replace the clear PNG mock-ups.

### Proposed submission rationale

> I built the concept around the useful relationships at the heart of ZOMZEY. The dotted identity becomes a network connecting projects with creators, shops, venues and communities. Clear entry choices and familiar navigation keep the experience approachable, while the mobile layout reinterprets the network as a simple vertical journey.

This is proposed designer rationale. It is not a client quotation or platform testimonial.

## 14. Acceptance criteria and meaningful verification

### Visual acceptance

- The first viewport is recognisably an authored ZOMZEY concept, with the original logo and a meaningful connection scene.
- A physical shop/community/venue is represented alongside digital reach.
- The headline, description and both intent actions remain unobscured at reference widths.
- Page sections have distinct layouts; the entire page is not a repeated bento/card stack.
- Colour, typography, image crops, spacing, borders and component states are consistent.
- Mobile is recomposed and usable, rather than a compressed desktop graph.
- Example captions are readable without overwhelming the design.

### Functional acceptance

1. Select promote intent and confirm the explorer displays the people/place dataset.
2. Select earn intent and confirm it displays opportunities, with incompatible filters reset.
3. Change each scenario and confirm labels, images and relationship explanations change together.
4. Search for a matching example, apply a category, trigger no results and clear filters.
5. Open and close profile/opportunity details with mouse, touch and keyboard.
6. Open the mobile menu, use its links, dismiss it with Escape and verify focus returns.
7. Traverse the page using only a keyboard, including search and join/detail dialogs.
8. Verify reduced-motion rendering remains complete and usable.
9. Confirm visible external links use verified current destinations and local actions do not perform live transactions.
10. Inspect every required screenshot for clipping, overlap, overflow, poor contrast and unloaded assets.

Use the existing build/type/lint commands where available. Add only browser checks that exercise actual user behaviours; avoid tests that merely repeat CSS/token values. Capture console errors and failed resource loads. Report any check that cannot run rather than inventing a pass.

### Performance targets

Keep the network lightweight and reserve image dimensions. Use a production build for performance assessment. Reasonable field targets are LCP ≤ 2.5s, INP ≤ 200ms and CLS ≤ 0.1; a local Lighthouse run is a lab diagnostic and cannot certify field INP. Aim for a mobile Lighthouse performance score around 90 when the environment supports a representative run, and record the actual result. These are project targets, not claims that they have been achieved. [S14]

### Final completion gate

The work is ready to present only when the full responsive page, the four presentation subjects, the required screenshot exports and the concise guide/notes are present, visually inspected and honestly documented. An attractive hero by itself is not completion.

## 15. Patterns to avoid

- A conventional headline-plus-stock-portrait hero followed immediately by testimonials.
- A new unrelated logo, purple SaaS wash, random 3D spheres, crypto aesthetics or a generic lime-on-black rebrand.
- Five competing primary calls to action or a huge advanced-filter form in the opening.
- Large dashboard screenshots with invented charts and transactions.
- Networks used only as background decoration without clear relationships.
- Hover-only information, tiny mobile controls and nonfunctional demonstration buttons.
- Fabricated testimonials, brand partnerships, verified users, member totals or guaranteed outcomes.
- Always-moving effects, long pinned scroll sequences, excessive glow and visual clutter.
- A desktop-only screenshot while treating mobile and the style guide as optional.
- Stopping after implementation without exporting the actual contest deliverables.

## 16. Source register

Sources were checked on 7 October 2026 unless otherwise stated. The supplied PDF was read in full; its recommendations informed the concept, while current first-party material grounded identity and product facts.

| Reference | Source | How it informed this specification |
| --- | --- | --- |
| Client brief | Text supplied in the conversation | Required originality, usability and submission deliverables |
| Research PDF | `تحليل عميق لمسابقة إعادة تصميم الصفحة الرئيسية لـ ZOMZEY.pdf`, 17 pages | Network concept, two-sided intent, mobile reinterpretation and submission strategy |
| S1 | [ZOMZEY homepage](https://zomzey.io/) | Scope, navigation; inspected HTML identity variables and font links |
| S2 | [About ZOMZEY](https://zomzey.io/about/) | Participant groups, existing connection language and example use cases |
| S3 | [Protected Payments](https://zomzey.io/zomzey-protected-payments/) | Source-policy link for the trust panel |
| S4 | [Terms](https://zomzey.io/terms/) | Agreement, delivery and payment-process boundaries |
| S5 | [Pricing](https://zomzey.io/pricing/) | Free options, fees and Agency-plan qualification |
| S6 | [Original header logo](https://zomzey.io/wp-content/uploads/2026/05/new99.png) | Inspected dotted white wordmark and image dimensions |
| S7 | [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) | Text, essential interface-state and meaningful-graphic contrast requirements |
| S8 | [Instrument Sans OFL](https://github.com/google/fonts/blob/main/ofl/instrumentsans/OFL.txt) | Font-source and licence verification |
| S9 | [Official GSAP skills](https://github.com/greensock/gsap-skills) | Selective motion skills and documented lifecycle/performance guidance |
| S10 | [Official Anthropic frontend-design](https://github.com/anthropics/claude-plugins-official/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) | Art-direction skill source |
| S11 | [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Documented marketplace/CLI install routes |
| S12 | [Vercel agent skills](https://github.com/vercel-labs/agent-skills) and [skills CLI](https://github.com/vercel-labs/skills) | Interface-audit skill and selective project installation |
| S13 | [Anthropic webapp-testing](https://github.com/anthropics/skills/blob/main/skills/webapp-testing/SKILL.md) and [Claude plugin documentation](https://code.claude.com/docs/en/discover-plugins) | Local-browser skill source and plugin installation scope |
| S14 | [Web Vitals](https://web.dev/articles/vitals) | Field performance targets and lab/field distinction |

