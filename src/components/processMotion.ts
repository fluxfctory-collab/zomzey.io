import { useEffect, type RefObject } from 'react'
import { loadMotion, type Gsap } from '../lib/motion'

/**
 * The process rail fills as the steps scroll into view. Bounded, scrubbed, never pinned,
 * and never hides content: the static (and reduced-motion) state is the complete route.
 */
export function useProcessMotion(scope: RefObject<HTMLElement | null>) {
  useEffect(() => {
    let mm: ReturnType<Gsap['matchMedia']> | undefined
    let cancelled = false
    void loadMotion().then(({ gsap }) => {
      const el = scope.current
      if (cancelled || !el) return
      mm = gsap.matchMedia()
      mm.add(
        '(prefers-reduced-motion: no-preference)',
        () => {
          gsap.fromTo(
            '.process__rail-fill',
            { '--progress': 0 },
            {
              '--progress': 1,
              ease: 'none',
              scrollTrigger: { trigger: '.process__track', start: 'top 85%', end: 'bottom 65%', scrub: 0.4 },
            },
          )
        },
        el,
      )
    })
    return () => {
      cancelled = true
      mm?.revert()
    }
  }, [scope])
}
