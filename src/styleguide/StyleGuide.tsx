import type { CSSProperties, ReactNode } from 'react'
import { Photo } from '../components/Photo'
import { BrandLogo } from '../components/BrandLogo'
import type { ReachId } from '../data/content'

/*
 * Living style guide — rendered with the homepage's own tokens, CSS and components.
 * Captured at 2400 × 1600 for exports/ZOMZEY-board-03-visual-system.png.
 */

const identity = [
  { name: 'Navy', hex: '#000222', token: '--navy', role: 'Opening, header, process, footer', status: 'Observed', ink: 'light' },
  { name: 'Paper', hex: '#FAFAF8', token: '--paper', role: 'Stories, explorer, closing', status: 'Observed', ink: 'dark' },
  { name: 'Ink', hex: '#0A0B1E', token: '--ink', role: 'Text on paper, 18.6:1', status: 'Observed', ink: 'light' },
]

const reach: { id: ReachId; name: string; hex: string; token: string; role: string }[] = [
  { id: 'followers', name: 'Followers', hex: '#FF6600', token: '--creator', role: 'Creators and influencers' },
  { id: 'footfall', name: 'Footfall', hex: '#FFD42E', token: '--hub', role: 'Shops and venues' },
  { id: 'fans', name: 'Fans', hex: '#20E3A2', token: '--positive', role: 'Bands and musicians' },
  { id: 'audience', name: 'Audience', hex: '#1FA9FF', token: '--signal', role: 'Communities, agencies; primary action' },
]

const support = [
  { name: 'Surface dark', hex: '#101437', token: '--surface-dark', role: 'Dark cards, menu sheet', ink: 'light' },
  { name: 'Muted on dark', hex: '#B4BDD4', token: '--muted-on-dark', role: 'Secondary text on navy, 10.8:1', ink: 'dark' },
  { name: 'Muted on light', hex: '#5A5C72', token: '--muted-on-light', role: 'Secondary text on paper, 6.3:1', ink: 'light' },
  { name: 'Signal on light', hex: '#0065A8', token: '--signal-on-light', role: 'Links, focus, routes on paper', ink: 'light' },
]

const type = [
  { label: 'Section H2', spec: '52 / 1.1, 620, −0.03em', cls: 'sg-h2', text: 'Different kinds of reach.' },
  { label: 'Story heading', spec: '28 / 1.18, 620', cls: 'sg-h3', text: 'Independent bookshop' },
  { label: 'Lead', spec: '20 / 1.5, 400', cls: 'sg-lead', text: 'More than an influencer platform: ZOMZEY connects your project with creators, shops and venues.' },
  { label: 'Body', spec: '17 / 1.55, 400', cls: 'sg-body', text: 'A local shop or venue could stock, display or host your project where people walk in every day.' },
  { label: 'Meta', spec: '14 / 1.4, 520', cls: 'sg-meta', text: 'Shops and venues' },
]

/** One static LED scene, built from the same classes as the opening's wall. */
function Led({ id, word, who, pressed, className, style, children }: {
  id: ReachId
  word: string
  who: string
  pressed?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <div className={['reach-wall__item', 'sg__led', className].filter(Boolean).join(' ')} data-reach={id} style={style}>
      <span className="led__spill" aria-hidden="true">
        <img src={`/images/reach/${id}-160.webp`} width={160} height={120} alt="" />
      </span>
      <button type="button" className="led" aria-pressed={pressed}>
        <span className="led__screen">
          <img src={`/images/reach/${id}-640.webp`} width={640} height={480} alt="" />
        </span>
        <span className="led__label">
          <span className="led__word">{word}</span>
          <span className="led__who">{who}</span>
        </span>
      </button>
      {children}
    </div>
  )
}

export function StyleGuide() {
  return (
    <div className="sg">
      <header className="sg__head on-dark">
        <div>
          <p className="sg__caption">03 · Visual system</p>
          <h1 className="sg__title">Built from one dot.</h1>
        </div>
        <p className="sg__intro">
          The official dot-matrix wordmark sets the rules: navy, upright oval dots and one family, Instrument Sans. Four
          observed brand colours name the four kinds of reach, and every photograph is lit like an LED screen.
        </p>
      </header>

      {/* Component specimens are rendered with the real classes but are not interactive here. */}
      <div className="sg__grid" inert>
        <section className="sg__panel sg__colours" aria-label="Colour">
          <h2 className="sg__label">Identity</h2>
          <ul>
            {identity.map((c) => (
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
          <h2 className="sg__label">Four kinds of reach</h2>
          <ul className="sg__ramps">
            {reach.map((c) => (
              <li key={c.id} className="sg__ramp" data-reach={c.id}>
                <span className="sg__ramp-bar" aria-hidden="true" />
                <span className="sg__swatch-text">
                  <strong>{c.name}</strong> <span className="sg__status">{c.hex}, observed</span>
                  <span className="sg__role">{c.role}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="sg__note">Each ramp is the duotone map for its scene: navy shadows, the colour in the mid-tones, a pale tint in the highlights.</p>
          <h2 className="sg__label">Supporting</h2>
          <ul className="sg__support">
            {support.map((c) => (
              <li key={c.token} className="sg__mini">
                <span className={`sg__chip sg__chip--${c.ink}`} style={{ background: `var(${c.token})` }}>
                  {c.hex}
                </span>
                <span className="sg__role">
                  <strong>{c.name}</strong>
                  {c.role}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="sg__panel sg__type" aria-label="Type hierarchy">
          <h2 className="sg__label">Instrument Sans, one family</h2>
          <div className="sg__type-row">
            <span className="sg__type-meta">
              <strong>Opening H1</strong>
              <span>12.9cqi (78 desktop, 45 at 390) / 1.02, 660, −0.045em</span>
            </span>
            <p className="sg-h1">
              Promote through people with <span className="hero__word" data-reach="followers">followers,</span>{' '}
              <span className="hero__word" data-reach="footfall">footfall,</span> <span className="hero__word" data-reach="fans">fans</span> &amp;{' '}
              <span className="hero__word" data-reach="audience">audience.</span>
            </p>
          </div>
          <ul>
            {type.map((t) => (
              <li key={t.label} className="sg__type-row">
                <span className="sg__type-meta">
                  <strong>{t.label}</strong>
                  <span>{t.spec}</span>
                </span>
                <span className={t.cls}>{t.text}</span>
              </li>
            ))}
          </ul>
          <div className="sg__scale">
            <h2 className="sg__label">Spacing and shape</h2>
            <div className="sg__space">
              {[4, 8, 12, 16, 24, 32, 48, 64, 80, 112].map((n) => (
                <span key={n} className="sg__space-step">
                  <span style={{ width: n / 2, height: n / 2 }} />
                  {n}
                </span>
              ))}
            </div>
            <p className="sg__note">Radius 12 controls and caption chips, 16 cards, 20 LED screens, 24 story surfaces. One family, sentence case, no display face.</p>
          </div>
        </section>

        <section className="sg__panel sg__panel--dark sg__anatomy on-dark" aria-label="LED scene">
          <h2 className="sg__label">Anatomy of an LED scene</h2>
          <div className="sg__anatomy-body">
            <div className="reach-wall sg__wall">
              <Led id="footfall" word="Footfall" who="Shops and venues" className="sg__led--hero">
                <span className="sg__pin" style={{ left: '50%', top: '40%' }}>1</span>
                <span className="sg__pin" style={{ left: '94%', top: '14%' }}>2</span>
                <span className="sg__pin" style={{ left: '105%', top: '62%' }}>3</span>
                <span className="sg__pin" style={{ left: '62%', top: '88%' }}>4</span>
              </Led>
            </div>
            <ol className="sg__legend">
              <li>
                <strong>Clear centre</strong>A duotone photograph resolves in a soft ellipse.
              </li>
              <li>
                <strong>LED edge</strong>Outside it, the scene shows only through 6 × 6.9px oval dots, the wordmark’s shape.
              </li>
              <li>
                <strong>Dot spill</strong>The blurred scene, through the same grid, lights the page around the screen.
              </li>
              <li>
                <strong>Caption chip</strong>Real text on navy at 84%, so it reads over any scene.
              </li>
            </ol>
          </div>

          <h2 className="sg__label">States</h2>
          <div className="sg__states">
            <figure>
              <div className="reach-wall sg__wall">
                <Led id="audience" word="Audience" who="Default" />
              </div>
              <figcaption>Default · 58% clear</figcaption>
            </figure>
            <figure>
              <div className="reach-wall sg__wall">
                <Led id="audience" word="Audience" who="Hover" style={{ '--clear': '72%' } as CSSProperties} />
              </div>
              <figcaption>Hover · 72%</figcaption>
            </figure>
            <figure>
              <div className="reach-wall sg__wall" data-tuned="audience">
                <Led id="audience" word="Audience" who="Selected" pressed />
              </div>
              <figcaption>Selected · 96%</figcaption>
            </figure>
            <figure>
              <div className="reach-wall sg__wall" data-tuned="followers">
                <Led id="audience" word="Audience" who="Muted" pressed={false} />
              </div>
              <figcaption>Muted · dots only</figcaption>
            </figure>
          </div>
          <p className="sg__note sg__note--dark">
            On load the wall switches on once: each screen fades in and resolves from 1% to 58% in 1.1s, 120ms apart. With reduced
            motion it is simply on.
          </p>

          <div className="sg__dark-row">
            <div className="sg__components">
              <p className="hero__eyebrow">
                <span className="hero__eyebrow-dots" aria-hidden="true" />
                The opportunity-led platform
              </p>
              <div className="sg__row">
                <span className="button button--primary button--lg">I want to promote something</span>
                <span className="button button--secondary-dark button--lg">I want to earn from my audience</span>
              </div>
              <p className="sg__detail">
                <span className="example-tag">Illustrative scenes</span>
                <span>
                  <strong>Footfall.</strong> A local shop or venue could stock, display or host your project.
                </span>
              </p>
            </div>
            <div className="sg__logo">
              <span className="sg__logo-frame">
                <BrandLogo />
              </span>
              <p className="sg__note sg__note--dark">
                Official wordmark, white on navy only. 158px in the header, 138px on phones, clear space half its height. Never
                retyped, recoloured or animated.
              </p>
            </div>
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
          <h2 className="sg__label">Focus</h2>
          <div className="sg__row">
            <button type="button" className="chip sg__focus" aria-pressed="false">
              Keyboard focus
            </button>
            <span className="sg__role">2px outline, 3px offset: #0065A8 on paper, #1FA9FF on navy</span>
          </div>
          <span className="example-tag">Example connections</span>
          <p className="detail__note">
            Example disclosure: illustrative people, places and opportunities are labelled as examples wherever they appear.
          </p>
        </section>
      </div>

      <footer className="sg__foot">
        <span className="sg__foot-brand">
          <span className="sg__plate">
            <BrandLogo />
          </span>
          Homepage concept · rendered from the prototype’s own tokens, CSS and components
        </span>
        <span>Board 03 / 03</span>
      </footer>
    </div>
  )
}
