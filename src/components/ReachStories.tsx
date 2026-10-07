import { useRef, useState, type KeyboardEvent } from 'react'
import { scenarios, type ScenarioId } from '../data/content'
import { Photo } from './Photo'

/**
 * "Reach in different worlds" — one large editorial relationship story at a time,
 * switched with an ARIA tab pattern (arrow keys, Home and End supported).
 */
export function ReachStories() {
  const [selected, setSelected] = useState<ScenarioId>('books')
  const tabRefs = useRef<Record<ScenarioId, HTMLButtonElement | null>>({ books: null, products: null, music: null, apps: null })

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: scenarios.length - 1,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    const next = scenarios[(keys[event.key] + scenarios.length) % scenarios.length]
    setSelected(next.id)
    tabRefs.current[next.id]?.focus()
  }

  return (
    <section className="reach section on-light" aria-labelledby="reach-title">
      <div className="container">
        <div className="reach__head">
          <h2 id="reach-title" className="section-heading">
            Different kinds of reach. A shared opportunity.
          </h2>
          <p className="reach__lede">
            A project rarely grows through one channel. ZOMZEY brings creators, shops, venues and communities into the same
            place, so online and in-person reach can work together.
          </p>
        </div>
        <div className="reach__grid">
          <div className="reach__tabs" role="tablist" aria-label="Example projects">
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabRefs.current[s.id] = el
                }}
                id={`reach-tab-${s.id}`}
                type="button"
                role="tab"
                className="reach__tab"
                aria-selected={selected === s.id}
                aria-controls={`reach-panel-${s.id}`}
                tabIndex={selected === s.id ? 0 : -1}
                onClick={() => setSelected(s.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="reach__tab-label">{s.label}</span>
                <span className="reach__tab-desc">{s.story.explanation}</span>
              </button>
            ))}
          </div>

        {scenarios.map((s) => {
          const [a, b] = s.story.pair.map((slot) => s.participants.find((p) => p.slot === slot)!)
          const others = s.participants.filter((p) => !s.story.pair.includes(p.slot))
          return (
            <div
              key={s.id}
              id={`reach-panel-${s.id}`}
              role="tabpanel"
              aria-labelledby={`reach-tab-${s.id}`}
              className="story"
              hidden={selected !== s.id}
              tabIndex={0}
            >
              <figure className="story__project">
                <Photo slug={s.project.storyImage ?? s.project.image} sizes="(min-width: 1280px) 440px, (min-width: 768px) 46vw, 100vw" className="story__project-photo" />
                <figcaption className="story__ticket">
                  <span className="role role--project">Project</span>
                  <span className="story__ticket-name">{s.project.kind}</span>
                  <span className="story__ticket-line">
                    {s.project.title}. {s.project.line}.
                  </span>
                </figcaption>
              </figure>

              <svg className="story__route" viewBox="0 0 120 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path d="M0 200 H48 Q60 200 60 188 V112 Q60 100 72 100 H120" />
                <path d="M0 200 H48 Q60 200 60 212 V288 Q60 300 72 300 H120" />
              </svg>

              <ul className="story__pair" aria-label={`Example connections for a ${s.project.kind.toLowerCase()}`}>
                {[a, b].map((p) => (
                  <li key={p.slot} className="story__card">
                    <Photo slug={p.image} sizes="(min-width: 768px) 136px, 96px" className="story__card-photo" />
                    <div className="story__card-text">
                      <span className={`role role--${p.role} on-light`}>{p.roleLabel}</span>
                      <h3 className="story__card-name">{p.name}</h3>
                      <p className="story__card-reach">{p.reach}</p>
                      <p className="story__card-detail">{p.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="story__foot">
                <span className="example-tag">Example connections</span>
                <p className="story__also">
                  {s.story.explanation} Also possible: {others.map((o) => o.name.toLowerCase()).join(', ')}.
                </p>
              </div>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}
