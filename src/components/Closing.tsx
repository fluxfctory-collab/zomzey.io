import type { Intent } from '../data/content'
import { links } from '../data/links'

interface ClosingProps {
  onIntent: (intent: Intent) => void
  onJoin: () => void
}

/** "Bring what you do best." — the two sides of a connection meet at one point. */
export function Closing({ onIntent, onJoin }: ClosingProps) {
  return (
    <section className="closing section on-light" aria-labelledby="closing-title">
      <div className="container">
        <h2 id="closing-title" className="section-heading closing__title">
          Bring what you do best.
        </h2>

        <div className="closing__routes">
          <article className="route-card">
            <h3 className="route-card__title">I have something to promote</h3>
            <p className="route-card__text">A book, a product, music, an app or a new idea.</p>
            <a className="button button--dark" href="#explore" onClick={() => onIntent('promote')}>
              Explore people and places
            </a>
          </article>

          <div className="closing__meet" aria-hidden="true">
            <span className="closing__meet-line" />
            <span className="closing__meet-dot" />
            <span className="closing__meet-line" />
          </div>

          <article className="route-card">
            <h3 className="route-card__title">I have an audience to offer</h3>
            <p className="route-card__text">Through your content, shop, venue, community or represented talent.</p>
            <a className="button button--dark" href="#explore" onClick={() => onIntent('earn')}>
              Explore opportunities
            </a>
          </article>
        </div>

        <div className="closing__join">
          <button type="button" className="button button--primary button--lg closing__join-button" onClick={onJoin}>
            Join ZOMZEY
          </button>
          <p className="closing__qualifier">
            Free account options available. Fees and paid agency plans are explained on the{' '}
            <a className="text-link" href={links.pricing}>
              pricing page
            </a>
            . Representing talent?{' '}
            <a className="text-link" href={links.agencies}>
              View agency plans
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
