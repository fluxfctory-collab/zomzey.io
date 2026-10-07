import { useSyncExternalStore } from 'react'

/** Subscribes to a CSS media query. Reads synchronously so the first render already matches. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const QUERIES = {
  perimeter: '(min-width: 1280px)',
  wide: '(min-width: 900px)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const
