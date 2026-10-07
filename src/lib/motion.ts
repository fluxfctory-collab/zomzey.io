import type { gsap as GsapInstance } from 'gsap'

export type Gsap = typeof GsapInstance
export type GsapContext = ReturnType<Gsap['context']>

let motionModules: Promise<{ gsap: Gsap }> | null = null

/**
 * GSAP and ScrollTrigger load as a separate chunk after first render, so the opening
 * (headline, actions and scene) paints without waiting for animation code.
 */
export function loadMotion() {
  motionModules ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
    core.gsap.registerPlugin(st.ScrollTrigger)
    return { gsap: core.gsap }
  })
  return motionModules
}

/** Checked at the moment an animation would start, so a changed preference applies immediately. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Draws a dotted route by animating a solid stroke inside its mask, with one point
 * travelling along the path. The final state is the plain, fully visible route.
 */
export function drawRoute(
  gsap: Gsap,
  path: SVGPathElement,
  maskPath: SVGPathElement,
  runner: SVGCircleElement | null,
  { duration = 0.7, delay = 0 }: { duration?: number; delay?: number } = {},
) {
  const length = path.getTotalLength()
  const tl = gsap.timeline({ delay, onComplete: () => gsap.set(maskPath, { clearProps: 'strokeDasharray,strokeDashoffset' }) })
  tl.fromTo(maskPath, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration, ease: 'power1.inOut' }, 0)
  if (runner) {
    const travel = { t: 0 }
    tl.set(runner, { opacity: 1 }, 0)
    tl.to(
      travel,
      {
        t: 1,
        duration,
        ease: 'power1.inOut',
        onUpdate: () => {
          const p = path.getPointAtLength(travel.t * length)
          runner.setAttribute('cx', p.x.toFixed(1))
          runner.setAttribute('cy', p.y.toFixed(1))
        },
      },
      0,
    )
    tl.to(runner, { opacity: 0, duration: 0.18 }, '>-0.05')
  }
  return tl
}
