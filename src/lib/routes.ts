export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export type Point = [number, number]

/** Layout-box position of `el` relative to `root`, ignoring CSS transforms (rotations, motion). */
export function boxWithin(el: HTMLElement, root: HTMLElement): Box {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

/** Orthogonal polyline with rounded corners — the "transit map" route style. */
export function roundedPath(points: Point[], radius = 22): string {
  const pts = points.filter((p, i) => i === 0 || p[0] !== points[i - 1][0] || p[1] !== points[i - 1][1])
  if (pts.length < 2) return ''
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1]
    const [cx, cy] = pts[i]
    const [nx, ny] = pts[i + 1]
    const inLen = Math.hypot(cx - px, cy - py)
    const outLen = Math.hypot(nx - cx, ny - cy)
    const r = Math.min(radius, inLen / 2, outLen / 2)
    const ax = cx - ((cx - px) / inLen) * r
    const ay = cy - ((cy - py) / inLen) * r
    const bx = cx + ((nx - cx) / outLen) * r
    const by = cy + ((ny - cy) / outLen) * r
    d += ` L${ax.toFixed(1)} ${ay.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  d += ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`
  return d
}

export interface Dot {
  x: number
  y: number
  o: number
}

const inside = (x: number, y: number, b: Box, pad: number) =>
  x > b.x - pad && x < b.x + b.w + pad && y > b.y - pad && y < b.y + b.h + pad

const distToSegment = (x: number, y: number, a: Point, b: Point) => {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len2 = dx * dx + dy * dy || 1
  const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / len2))
  return Math.hypot(x - (a[0] + t * dx), y - (a[1] + t * dy))
}

/**
 * An ordered halo of oval points around a connection endpoint, echoing the dotted
 * wordmark's grid. Points never fall inside cards, the message-safe area or on a route.
 */
export function dotHalo(
  center: Point,
  radius: number,
  avoid: Box[],
  bounds: Box,
  routes: Point[][] = [],
  pitch = 10,
): Dot[] {
  const dots: Dot[] = []
  const steps = Math.ceil(radius / pitch)
  for (let gy = -steps; gy <= steps; gy++) {
    for (let gx = -steps; gx <= steps; gx++) {
      const x = center[0] + gx * pitch + (Math.abs(gy) % 2 ? pitch / 2 : 0)
      const y = center[1] + gy * pitch * 0.92
      const dist = Math.hypot(x - center[0], y - center[1]) / radius
      if (dist > 1 || dist < 0.28) continue
      if (!inside(x, y, bounds, -4)) continue
      if (avoid.some((b) => inside(x, y, b, 7))) continue
      if (routes.some((line) => line.some((p, i) => i > 0 && distToSegment(x, y, line[i - 1], p) < 6))) continue
      dots.push({ x, y, o: +(0.5 - dist * 0.38).toFixed(2) })
    }
  }
  return dots
}
