import type { gsap as GsapInstance } from 'gsap'

export type Gsap = typeof GsapInstance

let motionModules: Promise<{ gsap: Gsap }> | null = null

/**
 * GSAP and ScrollTrigger load as a separate chunk after first render, so the opening
 * (headline, actions and LED wall) paints without waiting for animation code.
 */
export function loadMotion() {
  motionModules ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([core, st]) => {
    core.gsap.registerPlugin(st.ScrollTrigger)
    return { gsap: core.gsap }
  })
  return motionModules
}
