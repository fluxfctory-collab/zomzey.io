import { useRef, type CSSProperties } from 'react'
import { reachKinds, type ReachId } from '../data/content'
import { Icon } from './Icon'

interface ReachWallProps {
  /** The scene the visitor has tuned in to, if any. */
  tuned: ReachId | null
  onTune: (id: ReachId | null) => void
}

// Duotone photographs written by scripts/prepare-reach.mjs. They are decorative and lazy:
// the headline, not a picture, is the opening's first meaningful paint. The spill is blurred,
// so it uses the 160px file.
const srcSet = (id: ReachId) => [320, 640, 960].map((w) => `/images/reach/${id}-${w}.webp ${w}w`).join(', ')
const SIZES = '(min-width: 1200px) 300px, (min-width: 760px) 23vw, 46vw'

/**
 * The opening's LED wall: four duotone scenes, one per kind of reach in the headline.
 * Each photograph resolves out of a dot-matrix screen, echoing the dotted wordmark,
 * and spills its colour into the page as a field of dots. Selecting a scene brings it
 * fully into focus and explains, with a hypothetical example, what it could offer.
 * The scenes are toggle buttons named by their caption, so the photographs are decorative.
 */
export function ReachWall({ tuned, onTune }: ReachWallProps) {
  const current = reachKinds.find((k) => k.id === tuned)
  const buttons = useRef<Partial<Record<ReachId, HTMLButtonElement | null>>>({})

  // The clear control disappears once used, so focus returns to the scene it closed.
  const showAll = () => {
    const last = tuned
    onTune(null)
    if (last) buttons.current[last]?.focus()
  }

  return (
    <div className="reach-wall" data-tuned={tuned ?? undefined}>
      <ul className="reach-wall__grid" aria-label="Four kinds of reach">
        {reachKinds.map((k, i) => (
          <li
            key={k.id}
            className="reach-wall__item"
            data-reach={k.id}
            data-state={tuned ? (tuned === k.id ? 'tuned' : 'muted') : undefined}
            style={{ '--i': i } as CSSProperties}
          >
            <span className="led__spill" aria-hidden="true">
              <img src={`/images/reach/${k.id}-160.webp`} width={160} height={120} alt="" loading="lazy" decoding="async" />
            </span>
            <button
              ref={(el) => {
                buttons.current[k.id] = el
              }}
              type="button"
              className="led"
              aria-pressed={tuned === k.id}
              aria-controls="reach-detail"
              onClick={() => onTune(tuned === k.id ? null : k.id)}
            >
              <span className="led__screen">
                <img
                  src={`/images/reach/${k.id}-640.webp`}
                  srcSet={srcSet(k.id)}
                  sizes={SIZES}
                  width={640}
                  height={480}
                  alt=""
                  style={{ objectPosition: k.focus }}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="led__label">
                <span className="led__word">{k.word}</span>
                <span className="led__who">{k.who}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="reach-wall__detail" id="reach-detail" aria-live="polite">
        <span className="example-tag">Illustrative scenes</span>
        {current ? (
          <p className="reach-wall__text" data-reach={current.id}>
            <strong>{current.word}.</strong> {current.example}{' '}
            <a className="text-link reach-wall__more" href={current.more.href}>
              {current.more.label}
            </a>
          </p>
        ) : (
          <p className="reach-wall__text">Online and in person: choose a scene to see what each kind of reach could do for a project.</p>
        )}
        {current ? (
          <button type="button" className="icon-button icon-button--small reach-wall__clear" onClick={showAll}>
            <Icon name="close" size={18} />
            <span className="visually-hidden">Show all four scenes</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
