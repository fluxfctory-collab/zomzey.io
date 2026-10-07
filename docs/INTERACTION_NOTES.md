# Interaction notes

Every movement either explains a connection or confirms a change the visitor made. Board: `exports/ZOMZEY-board-04-interactions.png`; individual states: `exports/states/`.

| Interaction | Trigger | Response | Purpose | Touch alternative | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Opening reveal | First load, ≥1280px | Four entities settle in (y 14 → 0, staggered) while one example route draws behind them with one travelling point. 0.85s, once | Shows that the illustrated participants are related | Not used on phones: the vertical story is static | Scene is complete at once. If animation code arrives after 350ms, the reveal is skipped so visible content never re-hides |
| Node preview | Hover (mouse) or keyboard focus on a participant | Its dotted route turns blue, its port fills, and the detail area explains what it could offer (160ms) | Ties a person or place to the project | Tap selects instead (below) | Immediate |
| Node selection | Click or tap a participant | Pinned highlight (`aria-pressed`) plus a close control. Clicking or tapping elsewhere clears it | Lets visitors compare routes | Same | Immediate |
| Project selection | Click the project ticket | All three routes light | Shows the full set of example routes | Same | Immediate |
| Scenario change | Books, Products, Music or Apps | Photos, labels, details and routes change together. Content fades over 260ms and the active route redraws. Height is reserved, so nothing below moves | Shows the same platform working for a different use case | Phones: four equal options; the project and steps fade over 240ms | Immediate swap |
| Vertical story step | Tap or click a participant step (< 1280px) | Step expands its example (`aria-expanded`); the rail segment above it turns blue | Readable alternative to the perimeter network | Primary method | Immediate |
| Intent actions | "I want to promote something" / "I want to earn from my audience" | Stores a local mode (this tab only), sets the explorer dataset and navigates to `#explore` | Starts discovery from the visitor's side of the relationship | Same | Plain anchor jump (no smooth scroll) |
| Explorer intent switch | Promote something / Earn from my audience | Heading, label, placeholder, categories and data change. Category and query reset, and "Where" filters persist. Results fade in over 240ms | Prevents empty, incompatible filter combinations | Two equal halves | Immediate |
| Search | Enter, or the Search button | Filters the local example data. The count updates in a polite live region ("Showing 1 of 6 example profiles for “bookshop”") | A real first action with honest counts | Search keyboard (`enterkeyhint`) | Immediate |
| Category / More filters | Chips; the "More filters" disclosure with Online / In person | Filters immediately; the button shows the active filter count | Light, progressive filtering | 44px targets | Immediate |
| No results | Filters exclude every example | "No examples match these filters.", suggested words and Clear filters | Recovery rather than a dead end | Same | Immediate |
| Example detail | View example | Labelled dialog ("Example profile" / "Example opportunity") with a disclosure and a link to the real ZOMZEY directory or opportunities | Shows depth without implying a real member | Fits a 390 × 844 screen | No dialog animation |
| Explore panel | Explore (desktop header) | Disclosure with on-page routes, live ZOMZEY links and every participant group. Escape and outside click close it; focus returns | Keeps the primary nav short while keeping every role reachable | Mobile menu | Immediate |
| Mobile menu | Menu button (< 1024px) | Full-height sheet with all links, Sign in and Join. Escape and the close button dismiss it. In-page links close it and focus the target heading | Familiar, labelled navigation | Primary method | No slide-in |
| Join ZOMZEY | Header, menu or closing button | Choose a starting point. The final button opens the existing sign-up or agency page | Clear next step without fake registration | Same | No dialog animation |
| Relationship tabs | Click; Arrow keys, Home, End | One story visible at a time (roving tabindex) | Compares physical and digital reach | Four equal pills on phones | Immediate |
| Process route | Scrolling the process into view | The dotted rail fills, scrubbed between two bounded points. Nothing is pinned and no wheel events are intercepted | Expresses an ordered progression | Same, vertical rail | Rail shown complete; no ScrollTrigger |
| Header | Scroll past 8px | A thin divider appears | Separates the sticky header from content | Same | Immediate |

## Focus and keyboard

- A skip link is the first stop and moves focus to `<main>`. Every control is a native button, link, input or radio.
- Visible focus is a 2px outline with a 3px offset: `#1FA9FF` on navy and `#0065A8` on paper. The search field shows focus on its wrapper.
- Dialogs use the native `<dialog>`, so focus is contained and the page behind is inert. Escape closes them and focus returns to the opener.
- `scroll-padding-top` keeps anchored headings and focused elements clear of the sticky header.

## Layout rationale

- **Opening:** the message sits in a reserved centre column, so the original composition never competes with reading or acting. The perimeter shows breadth (a creator, a shop, a community) and the routes show the relationship. Lines are an SVG layer behind real HTML, measured from layout, so they follow the grid at any width.
- **Different widths:** the perimeter appears only where it fits (≥1280px). Narrower screens get a deliberate adjacent or vertical story rather than a shrunk graph.
- **Sections:** each chapter has its own job and layout (editorial story, transit-line process, working explorer, inset record, two meeting routes). The page is not a repeated card stack. The dotted route motif is the thread between them.
