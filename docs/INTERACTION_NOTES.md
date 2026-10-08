# Interaction notes

Every movement either switches the LED wall on, explains a kind of reach or confirms a change the visitor made. Boards: `exports/ZOMZEY-board-01-opening.png` (opening) and `exports/ZOMZEY-board-03-visual-system.png` (scene states); individual states: `exports/states/`.

| Interaction | Trigger | Response | Purpose | Touch alternative | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| Wall switches on | First load | Each LED screen fades in and resolves from dots to its clear centre (1% → 58%) over 1.1s, 120ms apart; each spill glows in 280ms later. Once only, pure CSS | Ties the wall to the dot-matrix wordmark: the logo "lights up" | Same | Wall is complete at first paint (no animation is declared) |
| Scene hover | Mouse over a scene | Its clear centre widens from 58% to 72% (480ms) | Invites selection without hiding anything | Not used | Immediate |
| Scene selection | Click, tap, Enter or Space on a scene | Pressed state (`aria-pressed`). The scene resolves fully (96%) and gains a coloured ring on its caption; the other three fall back to dots at 50%; their spills dim. The matching headline word gets a dotted underline. The detail line explains one hypothetical example and links to the matching ZOMZEY page | Explains what each kind of reach could do for a project | Primary method | Immediate |
| Return to all four | The same scene again, the ✕ control, or a click/tap anywhere outside the wall | All four scenes on; focus goes back to the scene after ✕ | Easy, predictable exit | Same | Immediate |
| Detail line | Any selection change | Text changes in a polite live region. Height is reserved for the longest example at every width, so nothing below moves | Announces the example; no layout shift | Same | Immediate |
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

- A skip link is the first stop and moves focus to `<main>`. Every control is a native button, link, input or radio. The four scenes are toggle buttons named by their caption (for example "Followers" and "Creators and influencers"); their photographs are decorative.
- Visible focus is a 2px outline with a 3px offset (4px on scenes): `#1FA9FF` on navy and `#0065A8` on paper. The search field shows focus on its wrapper.
- Dialogs use the native `<dialog>`, so focus is contained and the page behind is inert. Escape closes them and focus returns to the opener.
- `scroll-padding-top` keeps anchored headings and focused elements clear of the sticky header.

## Layout rationale

- **Opening:** the promise and the picture of it sit side by side. The message keeps a fixed four-line shape sized to its column; the wall carries the colour and the imagery, and the two never overlap (checked at 1920, 1440 and 1280 with 24px clearance). At 1440 × 900 the whole opening, including the detail line, fits the first screen.
- **Different widths:** a two-by-two pinwheel beside the message from 1200px, one row of four below the message from 760px, and two staggered columns on phones, where the message and both actions come first.
- **Sections:** each chapter has its own job and layout (editorial story, transit-line process, working explorer, inset record, two meeting routes). The page is not a repeated card stack. The dot is the thread between them.
