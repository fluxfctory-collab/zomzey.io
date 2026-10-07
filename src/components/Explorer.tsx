import { useId, useMemo, useState, type FormEvent } from 'react'
import {
  exampleOpportunities,
  exampleProfiles,
  opportunityCategories,
  profileCategories,
  whereLabels,
  type ExampleOpportunity,
  type ExampleProfile,
  type Intent,
  type Where,
} from '../data/content'
import { images } from '../data/images.generated'
import { links } from '../data/links'
import { Dialog } from './Dialog'
import { Icon } from './Icon'
import { Photo } from './Photo'

const copy = {
  promote: {
    heading: 'Who could help your project reach further?',
    label: 'Search people and places',
    placeholder: 'Try a creator, shop or community…',
    noun: ['example profile', 'example profiles'],
    suggestions: ['bookshop', 'venue', 'reviewer'],
    browse: { label: 'Browse ZOMZEY members', href: links.directory },
  },
  earn: {
    heading: 'Where could your audience make a difference?',
    label: 'Search opportunities',
    placeholder: 'Try books, products or music…',
    noun: ['example opportunity', 'example opportunities'],
    suggestions: ['books', 'music', 'app'],
    browse: { label: 'Browse ZOMZEY opportunities', href: links.opportunities },
  },
} as const

const matches = (haystack: string, query: string) => {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  const text = haystack.toLowerCase()
  return terms.every((t) => text.includes(t))
}

interface ExplorerProps {
  intent: Intent
  onIntentChange: (intent: Intent) => void
}

export function Explorer({ intent, onIntentChange }: ExplorerProps) {
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [where, setWhere] = useState<Where[]>([])
  const [moreOpen, setMoreOpen] = useState(false)
  const [detail, setDetail] = useState<{ kind: 'profile'; item: ExampleProfile } | { kind: 'opportunity'; item: ExampleOpportunity } | null>(null)

  // When the intent changes (from here, the opening or the header), the category set
  // and search vocabulary change with it, so those filters reset. "Where" still applies.
  const [shownIntent, setShownIntent] = useState(intent)
  if (shownIntent !== intent) {
    setShownIntent(intent)
    setCategory('all')
    setQuery('')
    setDraft('')
  }

  const text = copy[intent]
  const inputId = useId()
  const filtersId = useId()
  const categories = intent === 'promote' ? profileCategories : opportunityCategories

  const profiles = useMemo(
    () =>
      exampleProfiles.filter(
        (p) =>
          (category === 'all' || p.category === category) &&
          (where.length === 0 || where.some((w) => p.where.includes(w))) &&
          matches(`${p.name} ${p.type} ${p.reach} ${p.summary} ${p.keywords}`, query),
      ),
    [category, where, query],
  )
  const opportunities = useMemo(
    () =>
      exampleOpportunities.filter(
        (o) =>
          (category === 'all' || o.category === category) &&
          (where.length === 0 || where.some((w) => o.where.includes(w))) &&
          matches(`${o.title} ${o.seeking} ${o.summary} ${o.keywords}`, query),
      ),
    [category, where, query],
  )

  const total = intent === 'promote' ? exampleProfiles.length : exampleOpportunities.length
  const shown = intent === 'promote' ? profiles.length : opportunities.length
  const filtersActive = query !== '' || category !== 'all' || where.length > 0

  const clearFilters = () => {
    setDraft('')
    setQuery('')
    setCategory('all')
    setWhere([])
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setQuery(draft.trim())
  }

  const toggleWhere = (w: Where) => setWhere((cur) => (cur.includes(w) ? cur.filter((x) => x !== w) : [...cur, w]))

  return (
    <section id="explore" className="explorer section on-light" aria-labelledby="explore-title">
      <div className="container">
        <div className="explorer__head">
          <div>
            <span className="example-tag">Example preview with illustrative data</span>
            <h2 id="explore-title" className="section-heading" tabIndex={-1}>
              {text.heading}
            </h2>
          </div>
          <div className="segmented" role="group" aria-label="What would you like to do?">
            <button type="button" className="segmented__option" aria-pressed={intent === 'promote'} onClick={() => onIntentChange('promote')}>
              Promote something
            </button>
            <button type="button" className="segmented__option" aria-pressed={intent === 'earn'} onClick={() => onIntentChange('earn')}>
              Earn from my audience
            </button>
          </div>
        </div>

        <form className="explorer__form" role="search" onSubmit={submit}>
          <label htmlFor={inputId} className="explorer__label">
            {text.label}
          </label>
          <div className="explorer__controls">
            <div className="search-field">
              <Icon name="search" />
              <input
                id={inputId}
                name="q"
                type="search"
                value={draft}
                placeholder={text.placeholder}
                autoComplete="off"
                enterKeyHint="search"
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
            <button type="submit" className="button button--dark explorer__submit">
              Search
            </button>
            <button
              type="button"
              className="button button--secondary-light explorer__more"
              aria-expanded={moreOpen}
              aria-controls={filtersId}
              onClick={() => setMoreOpen((v) => !v)}
            >
              <Icon name="filters" />
              More filters{where.length ? ` (${where.length})` : ''}
            </button>
          </div>

          <fieldset id={filtersId} className="explorer__more-panel" hidden={!moreOpen}>
            <legend>Where it happens</legend>
            <div className="explorer__checks">
              {(Object.keys(whereLabels) as Where[]).map((w) => (
                <label key={w} className="check">
                  <input type="checkbox" checked={where.includes(w)} onChange={() => toggleWhere(w)} />
                  <span>{whereLabels[w]}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <div className="chips explorer__chips" role="group" aria-label="Category">
          {categories.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="explorer__status">
          <p role="status" aria-live="polite" aria-atomic="true" className="explorer__count">
            Showing {shown} of {total} {text.noun[total === 1 ? 0 : 1]}
            {query ? ` for “${query}”` : ''}
          </p>
          {filtersActive ? (
            <button type="button" className="text-button" onClick={clearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>

        <div className="explorer__results" key={intent}>
        {shown === 0 ? (
          <div className="explorer__empty">
            <p className="explorer__empty-title">No examples match these filters.</p>
            <p>
              Try a broader word, such as{' '}
              {text.suggestions.map((s, i) => (
                <span key={s}>
                  <button
                    type="button"
                    className="text-button text-button--inline"
                    onClick={() => {
                      setCategory('all')
                      setWhere([])
                      setDraft(s)
                      setQuery(s)
                    }}
                  >
                    {s}
                  </button>
                  {i < text.suggestions.length - 2 ? ', ' : i === text.suggestions.length - 2 ? ' or ' : ''}
                </span>
              ))}
              , or clear everything.
            </p>
            <button type="button" className="button button--dark" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ) : intent === 'promote' ? (
          <ul className="profile-grid">
            {profiles.map((p) => (
              <li key={p.id}>
                <article className="pcard">
                  <Photo slug={p.image} sizes="(min-width: 600px) 140px, 112px" className="pcard__photo" />
                  <div className="pcard__body">
                    <span className={`role role--${p.role} on-light`}>{p.type}</span>
                    <h3 className="pcard__name">{p.name}</h3>
                    <p className="pcard__summary">{p.summary}</p>
                    <p className="pcard__meta">
                      {p.reach}, {p.where.map((w) => whereLabels[w].toLowerCase()).join(' and ')}
                    </p>
                    <button
                      type="button"
                      className="button button--secondary-light pcard__action"
                      aria-label={`View example: ${p.name}`}
                      onClick={() => setDetail({ kind: 'profile', item: p })}
                    >
                      View example
                    </button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="opportunity-grid">
            {opportunities.map((o) => (
              <li key={o.id}>
                <article className="ocard">
                  <div className="ocard__body">
                    <p className="ocard__status">
                      <span className="ocard__status-tag">Example</span>
                      {o.status}
                    </p>
                    <h3 className="ocard__title">{o.title}</h3>
                    <p className="ocard__summary">{o.summary}</p>
                    <p className="ocard__seeking">
                      <span>Looking for</span> {o.seeking}
                    </p>
                    <div className="ocard__foot">
                      <span className="ocard__meta">
                        {opportunityCategories.find((c) => c.id === o.category)?.label}, {o.where.map((w) => whereLabels[w].toLowerCase()).join(' and ')}
                      </span>
                      <button
                        type="button"
                        className="button button--secondary-light"
                        aria-label={`View example: ${o.title}`}
                        onClick={() => setDetail({ kind: 'opportunity', item: o })}
                      >
                        View example
                      </button>
                    </div>
                  </div>
                  <Photo slug={o.image} sizes="160px" className="ocard__photo" decorative />
                </article>
              </li>
            ))}
          </ul>
        )}
        </div>

        <p className="explorer__note">
          These are illustrative examples, not ZOMZEY members or live listings.{' '}
          <a className="text-link text-link--accent" href={text.browse.href}>
            {text.browse.label}
          </a>
        </p>
      </div>

      <Dialog
        open={detail !== null}
        onClose={() => setDetail(null)}
        title={detail ? (detail.kind === 'profile' ? detail.item.name : detail.item.title) : ''}
        eyebrow={<span className="example-tag">{detail?.kind === 'opportunity' ? 'Example opportunity' : 'Example profile'}</span>}
        className="detail-dialog"
      >
        {detail?.kind === 'profile' ? <ProfileDetail item={detail.item} /> : null}
        {detail?.kind === 'opportunity' ? <OpportunityDetail item={detail.item} /> : null}
      </Dialog>
    </section>
  )
}

function ProfileDetail({ item }: { item: ExampleProfile }) {
  return (
    <div className="detail">
      <Photo slug={item.image} sizes="(min-width: 600px) 496px, 100vw" className="detail__photo" />
      <p className="detail__credit">Illustrative photo: {images[item.image].credit.author}, CC BY 2.0</p>
      <p className="detail__lede">{item.summary}</p>
      <dl className="detail__facts">
        <div>
          <dt>Type</dt>
          <dd>{item.type}</dd>
        </div>
        <div>
          <dt>Reach</dt>
          <dd>{item.reach}</dd>
        </div>
        <div>
          <dt>Where</dt>
          <dd>{item.where.map((w) => whereLabels[w]).join(' and ')}</dd>
        </div>
      </dl>
      <h3 className="detail__subhead">What they could offer</h3>
      <ul className="detail__list">
        {item.offers.map((o) => (
          <li key={o}>{o}</li>
        ))}
      </ul>
      <p className="detail__note">This profile is an example written for this homepage concept. It is not a ZOMZEY member.</p>
      <div className="detail__actions">
        <a className="button button--dark" href={links.directory}>
          Browse actual ZOMZEY members
          <Icon name="external" size={18} />
        </a>
      </div>
    </div>
  )
}

function OpportunityDetail({ item }: { item: ExampleOpportunity }) {
  return (
    <div className="detail">
      <p className="detail__lede">{item.summary}</p>
      <dl className="detail__facts">
        <div>
          <dt>Looking for</dt>
          <dd>{item.seeking}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{opportunityCategories.find((c) => c.id === item.category)?.label}</dd>
        </div>
        <div>
          <dt>Example status</dt>
          <dd>{item.status}</dd>
        </div>
      </dl>
      <h3 className="detail__subhead">Collaboration ideas</h3>
      <ul className="detail__list">
        {item.wants.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <p className="detail__note">This opportunity is an example written for this homepage concept. It is not a live listing and has no budget attached.</p>
      <div className="detail__actions">
        <a className="button button--dark" href={links.opportunities}>
          See current opportunities on ZOMZEY
          <Icon name="external" size={18} />
        </a>
      </div>
    </div>
  )
}
