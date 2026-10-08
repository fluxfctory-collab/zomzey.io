import { useEffect, useState } from 'react'
import type { Intent, ReachId } from '../data/content'
import { links } from '../data/links'
import { ReachWall } from './ReachWall'

interface HeroProps {
  onIntent: (intent: Intent) => void
}

/**
 * Opening — "Up in lights". The client's own positioning line names four kinds of reach;
 * each word takes the colour of the LED scene that illustrates it on the wall beside it.
 */
export function Hero({ onIntent }: HeroProps) {
  const [tuned, setTuned] = useState<ReachId | null>(null)

  // Clicking or tapping anywhere outside the wall returns it to all four scenes.
  useEffect(() => {
    if (!tuned) return
    const onPointerDown = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest('.reach-wall')) return
      setTuned(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [tuned])

  return (
    <section className="hero on-dark" aria-labelledby="hero-title" data-tuned={tuned ?? undefined}>
      <div className="container hero__grid">
        <div className="hero__message">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dots" aria-hidden="true" />
            The opportunity-led platform
          </p>
          {/* One text block with forced breaks (not block-level lines), so the whole
              headline is a single paint and a single largest-contentful-paint candidate. */}
          <h1 className="hero__title" id="hero-title">
            <span className="hero__line">Promote through</span> <br />
            <span className="hero__line">people with</span> <br />
            <span className="hero__line">
              <span className="hero__word" data-reach="followers">
                followers,
              </span>{' '}
              <span className="hero__word" data-reach="footfall">
                footfall,
              </span>
            </span>{' '}
            <br />
            <span className="hero__line">
              <span className="hero__word" data-reach="fans">
                fans
              </span>{' '}
              &amp;{' '}
              <span className="hero__word" data-reach="audience">
                audience.
              </span>
            </span>
          </h1>
          <p className="hero__lede">
            More than an influencer platform: ZOMZEY connects your project with creators, shops, venues, musicians,
            communities and agencies.
          </p>
          <div className="intent-actions">
            <a className="button button--primary button--lg" href="#explore" onClick={() => onIntent('promote')}>
              I want to promote something
            </a>
            <a className="button button--secondary-dark button--lg" href="#explore" onClick={() => onIntent('earn')}>
              I want to earn from my audience
            </a>
          </div>
          <p className="hero__pricing">
            Free account options available.{' '}
            <a href={links.pricing} className="text-link">
              See pricing
            </a>{' '}
            for fees and agency plans.
          </p>
        </div>

        <ReachWall tuned={tuned} onTune={setTuned} />
      </div>
    </section>
  )
}
