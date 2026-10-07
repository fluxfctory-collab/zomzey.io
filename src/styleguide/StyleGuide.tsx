import { Photo } from '../components/Photo'
import { BrandLogo } from '../components/BrandLogo'

/*
 * Living style guide — rendered with the homepage's own tokens, CSS and components.
 * Captured at 2400 × 1600 for exports/ZOMZEY-board-03-style-guide.png.
 */

const colours = [
  { name: 'Navy', token: '--navy', hex: '#000222', role: 'Opening, header, footer, trust panel', status: 'Observed', ink: 'light' },
  { name: 'Paper', token: '--paper', hex: '#FAFAF8', role: 'Stories, explorer, closing', status: 'Observed', ink: 'dark' },
  { name: 'Ink', token: '--ink', hex: '#0A0B1E', role: 'Text on light surfaces', status: 'Observed', ink: 'light' },
  { name: 'Signal', token: '--signal', hex: '#1FA9FF', role: 'Primary action, active route', status: 'Observed', ink: 'dark' },
  { name: 'Creator', token: '--creator', hex: '#FF6600', role: 'Small creator marker only', status: 'Observed', ink: 'dark' },
  { name: 'Hub', token: '--hub', hex: '#FFD42E', role: 'Small hub marker only', status: 'Observed', ink: 'dark' },
  { name: 'Surface dark', token: '--surface-dark', hex: '#101437', role: 'Dark cards, menus', status: 'Proposed', ink: 'light' },
  { name: 'Muted on dark', token: '--muted-on-dark', hex: '#B4BDD4', role: 'Secondary text on navy, 10.8:1', status: 'Proposed', ink: 'dark' },
  { name: 'Muted on light', token: '--muted-on-light', hex: '#5A5C72', role: 'Secondary text on paper, 6.3:1', status: 'Observed', ink: 'light' },
  { name: 'Signal on light', token: '--signal-on-light', hex: '#0065A8', role: 'Links, focus, routes on paper, 5.9:1', status: 'Proposed', ink: 'light' },
]

const type = [
  { label: 'Opening H1', spec: '84 / 1.03, 660, −0.042em', cls: 'sg-h1', text: 'Make the next connection count' },
  { label: 'Section H2', spec: '52 / 1.1, 620, −0.03em', cls: 'sg-h2', text: 'Different kinds of reach.' },
  { label: 'Story heading', spec: '28 / 1.18, 620', cls: 'sg-h3', text: 'Independent bookshop' },
  { label: 'Lead', spec: '20 / 1.5, 400', cls: 'sg-lead', text: 'Bring your project to the people, places and communities that can help it grow.' },
  { label: 'Body', spec: '17 / 1.55, 400', cls: 'sg-body', text: 'A local bookshop could host a launch evening and keep copies where browsers will find them.' },
  { label: 'Meta', spec: '14 / 1.4, 520', cls: 'sg-meta', text: 'Content audience, online' },
]

export function StyleGuide() {
  return (
    <div className="sg">
      <header className="sg__head on-dark">
        <div>
          <p className="sg__caption">Visual system</p>
          <h1 className="sg__title">ZOMZEY Signal Atlas</h1>
        </div>
        <p className="sg__intro">
          Observed identity (logo, navy, signal blue, role colours, Instrument Sans) with proposed supporting tokens. One
          family, one motif: dots become connection points.
        </p>
      </header>

      {/* Component specimens are rendered with the real classes but are not interactive here. */}
      <div className="sg__grid" inert>
        <section className="sg__panel sg__colours" aria-label="Colour roles">
          <h2 className="sg__label">Colour roles</h2>
          <ul>
            {colours.map((c) => (
              <li key={c.token} className="sg__swatch">
                <span className={`sg__chip sg__chip--${c.ink}`} style={{ background: `var(${c.token})` }}>
                  {c.hex}
                </span>
                <span className="sg__swatch-text">
                  <strong>{c.name}</strong> <span className="sg__status">{c.status}</span>
                  <span className="sg__role">{c.role}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="sg__note">Bright blue, orange and yellow never carry small text on white. Colour always pairs with a label.</p>
          <div className="sg__balance">
            <h2 className="sg__label">Opening colour balance</h2>
            <div className="sg__bar" aria-hidden="true">
              <span style={{ flex: 78, background: 'var(--navy)' }} />
              <span style={{ flex: 17, background: 'var(--surface-dark)' }} />
              <span style={{ flex: 2.5, background: 'var(--signal)' }} />
              <span style={{ flex: 1.3, background: 'var(--creator)' }} />
              <span style={{ flex: 1.2, background: 'var(--hub)' }} />
            </div>
            <p className="sg__note">About 78% navy field, 17% content and imagery, a few percent saturated signal and role colour.</p>
          </div>
        </section>

        <section className="sg__panel sg__type" aria-label="Type hierarchy">
          <h2 className="sg__label">Instrument Sans, one family</h2>
          <ul>
            {type.map((t) => (
              <li key={t.label} className="sg__type-row">
                <span className="sg__type-meta">
                  <strong>{t.label}</strong>
                  <span>{t.spec}</span>
                </span>
                <span className={t.cls}>
                  {t.text}
                  {t.cls === 'sg-h1' ? <span className="hero__stop" aria-hidden="true" /> : null}
                </span>
              </li>
            ))}
          </ul>
          <div className="sg__scale">
            <h2 className="sg__label">Spacing, radius, motion</h2>
            <div className="sg__space">
              {[4, 8, 12, 16, 24, 32, 48, 64, 80, 112].map((n) => (
                <span key={n} className="sg__space-step">
                  <span style={{ width: n / 2, height: n / 2 }} />
                  {n}
                </span>
              ))}
            </div>
            <p className="sg__note">
              Radius 12 controls, 16 cards, 24 story surfaces, round dots. Motion 160–320ms state changes, one 0.85s
              opening; none under reduced motion.
            </p>
          </div>
        </section>

        <section className="sg__panel sg__panel--dark on-dark" aria-label="Components on navy">
          <h2 className="sg__label">On navy</h2>
          <div className="sg__row">
            <span className="button button--primary">I want to promote something</span>
            <span className="button button--secondary-dark">I want to earn from my audience</span>
          </div>
          <div className="sg__row">
            <span className="scenario-control">
              <button type="button" className="scenario-control__option" aria-pressed="true">
                Books
              </button>
              <button type="button" className="scenario-control__option" aria-pressed="false">
                Products
              </button>
              <button type="button" className="scenario-control__option" aria-pressed="false">
                Music
              </button>
            </span>
            <span className="example-tag">Illustrative connection</span>
          </div>
          <div className="sg__row sg__roles">
            <span className="role role--project">Project</span>
            <span className="role role--creator">Creator</span>
            <span className="role role--hub">Shop / Hub</span>
            <span className="role role--community">Community / Hub</span>
            <span className="role role--agency">Agency</span>
          </div>
          <div className="sg__nodes">
            <span className="node node--ticket">
              <Photo slug="book-pages" sizes="216px" className="node__photo" decorative eager />
              <span className="node__perforation" />
              <span className="node__text">
                <span className="role role--project">Project</span>
                <span className="node__name">Book launch</span>
                <span className="node__meta">Ticket: the project</span>
              </span>
            </span>
            <span className="node node--portrait" data-active="true">
              <Photo slug="reader-park" sizes="150px" className="node__photo" decorative eager />
              <span className="node__text">
                <span className="role role--creator">Creator</span>
                <span className="node__name">Portrait node</span>
                <span className="node__meta">Active state</span>
              </span>
            </span>
            <span className="node node--mini">
              <Photo slug="reading-group" sizes="72px" className="node__photo" decorative eager />
              <span className="node__text">
                <span className="role role--community">Community / Hub</span>
                <span className="node__name">Mini card</span>
                <span className="node__meta">Community</span>
              </span>
            </span>
          </div>
          <svg className="sg__routes" viewBox="0 0 560 70" aria-hidden="true">
            <path className="route route--idle" d="M10 20 H250" />
            <path className="route route--active" data-on="true" d="M10 50 H250" />
            <circle className="port" cx="300" cy="20" r="5.5" />
            <circle className="port" data-on="true" cx="300" cy="50" r="5.5" />
            {Array.from({ length: 18 }, (_, i) => (
              <ellipse key={i} cx={360 + (i % 6) * 10 + (Math.floor(i / 6) % 2) * 5} cy={20 + Math.floor(i / 6) * 9.2} rx="2.1" ry="2.9" fill="#b4bdd4" opacity={0.5 - (i % 6) * 0.06} />
            ))}
          </svg>
          <p className="sg__note sg__note--dark">Idle route, active route, ports and an endpoint halo. Lines sit behind real HTML.</p>
          <div className="sg__logo">
            <BrandLogo />
            <p className="sg__note sg__note--dark">
              Official white wordmark on navy only, 150–166px header, clear space half its height. Never retyped, recoloured or
              animated. Slot shown until new99.png is supplied.
            </p>
          </div>
        </section>

        <section className="sg__panel sg__panel--light on-light" aria-label="Components on paper">
          <h2 className="sg__label">On paper</h2>
          <div className="sg__row">
            <span className="button button--dark">Search</span>
            <span className="button button--secondary-light">View example</span>
            <span className="button button--primary">Join ZOMZEY</span>
          </div>
          <div className="sg__row chips">
            <button type="button" className="chip" aria-pressed="true">
              All
            </button>
            <button type="button" className="chip" aria-pressed="false">
              Creators
            </button>
            <button type="button" className="chip" aria-pressed="false">
              Shops and communities
            </button>
          </div>
          <article className="pcard sg__pcard">
            <Photo slug="bookshop" sizes="136px" className="pcard__photo" decorative eager />
            <div className="pcard__body">
              <span className="role role--hub on-light">Shop / Hub</span>
              <h3 className="pcard__name">Independent bookshop example</h3>
              <p className="pcard__summary">Explorer card: example label in the name, qualitative reach, local detail.</p>
              <p className="pcard__meta">Local shop, in person</p>
              <span className="button button--secondary-light">View example</span>
            </div>
          </article>
          <div className="sg__row sg__process">
            <span className="process__node sg__pnode">3</span>
            <span>
              <strong>Agree</strong>
              <span className="sg__role">Numbered only where the content is a sequence.</span>
            </span>
          </div>
          <h2 className="sg__label">States</h2>
          <div className="sg__row">
            <button type="button" className="chip sg__focus" aria-pressed="false">
              Keyboard focus
            </button>
            <span className="sg__role">2px outline, 3px offset: #0065A8 on paper, #1FA9FF on navy</span>
          </div>
          <div className="sg__mobile on-dark">
            <span className="sg__label">Mobile alternative: one step of the vertical story</span>
            <div className="vstory__step" data-on="true">
              <span className="vstory__node">
                <Photo slug="bookshop" sizes="56px" className="vstory__photo" decorative eager />
                <span className="vstory__text">
                  <span className="role role--hub">Shop / Hub</span>
                  <span className="vstory__name">Independent bookshop</span>
                  <span className="vstory__meta">Local shop</span>
                </span>
              </span>
            </div>
          </div>
          <span className="example-tag">Example connections</span>
          <p className="detail__note">
            Example disclosure: illustrative people, places and opportunities are labelled as examples wherever they appear.
          </p>
        </section>
      </div>
    </div>
  )
}
