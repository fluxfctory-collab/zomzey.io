import { useCallback, useEffect, useRef, type RefObject } from 'react'
import { loadMotion, prefersReducedMotion, type Gsap, type GsapContext } from './motion'

/**
 * A scoped GSAP context for one component, created lazily once the motion chunk has
 * loaded and reverted on unmount (the gsap.context() + revert pattern from the
 * gsap-react guidance, used because the hook form cannot be code-split).
 *
 * `latestStart` (ms) skips an entrance that would begin after content has already
 * been on screen for that long, so late-arriving motion never re-hides content.
 */
export function useMotion(scope: RefObject<HTMLElement | null>) {
  const ctx = useRef<GsapContext | null>(null)

  useEffect(() => {
    if (!prefersReducedMotion()) void loadMotion()
    return () => {
      ctx.current?.revert()
      ctx.current = null
    }
  }, [])

  return useCallback(
    (animate: (gsap: Gsap) => void, { latestStart }: { latestStart?: number } = {}) => {
      if (prefersReducedMotion()) return
      const requested = performance.now()
      void loadMotion().then(({ gsap }) => {
        const el = scope.current
        if (!el || prefersReducedMotion()) return
        if (latestStart !== undefined && performance.now() - requested > latestStart) return
        ctx.current ??= gsap.context(() => {}, el)
        ctx.current.add(() => animate(gsap))
      })
    },
    [scope],
  )
}
