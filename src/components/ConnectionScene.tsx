import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react'
import type { Participant, ParticipantSlot, Scenario } from '../data/content'
import { drawRoute, type Gsap } from '../lib/motion'
import { useMotion } from '../lib/useMotion'
import { boxWithin, dotHalo, roundedPath, type Box, type Dot, type Point } from '../lib/routes'
import { Photo } from './Photo'

export type SceneFocus = ParticipantSlot | 'project'

interface Geometry {
  width: number
  height: number
  routes: Record<ParticipantSlot, string>
  ports: { project: Point[]; reach: Point; place: Point; community: Point }
  dots: Dot[]
}

const PORT_Y = 40 // default vertical offset of a card's side port from its top edge
const BOTTOM_PORT_X = 32 // horizontal offset of the project's lower port

/** Side-port offset: a card can ask for its port at a fixed offset or at its vertical centre. */
const portOffset = (el: HTMLElement, box: Box) =>
  el.dataset.port === 'center' ? box.h / 2 : Number(el.dataset.port ?? PORT_Y)

interface ConnectionSceneProps {
  scenario: Scenario
  active: SceneFocus
  selected: SceneFocus | null
  onPreview: (slot: SceneFocus | null) => void
  onSelect: (slot: SceneFocus) => void
  /** Headline, description and intent actions — rendered in the reserved centre. */
  message: ReactNode
  /** Scenario control and detail area — rendered under the message. */
  band: ReactNode
}

/**
 * Desktop opening (≥1280px). Four DOM entities sit on the perimeter of a reserved
 * message area; an SVG layer behind them draws the example routes. Geometry is
 * measured from the real layout, so the routes follow the grid at any width.
 */
export function ConnectionScene({ scenario, active, selected, onPreview, onSelect, message, band }: ConnectionSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const safeRef = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geometry | null>(null)

  useLayoutEffect(() => {
    const scene = sceneRef.current
    const safe = safeRef.current
    if (!scene || !safe) return

    const card = (slot: SceneFocus) => scene.querySelector<HTMLButtonElement>(`[data-node="${slot}"]`)
    const measure = () => {
      const cards = { project: card('project'), reach: card('reach'), place: card('place'), community: card('community') }
      if (!cards.project || !cards.reach || !cards.place || !cards.community) return
      const P = boxWithin(cards.project, scene)
      const R = boxWithin(cards.reach, scene)
      const B = boxWithin(cards.place, scene)
      const C = boxWithin(cards.community, scene)
      const S = boxWithin(safe, scene)
      const bounds: Box = { x: 0, y: 0, w: scene.clientWidth, h: scene.clientHeight }

      // Upper lane: leaves the project's right port and runs above the headline.
      const source: Point = [P.x + P.w, P.y + portOffset(cards.project, P)]
      // Run the lane straight out of the port unless it would come within 24px of the message.
      const laneY = source[1] <= S.y - 24 ? source[1] : S.y - 24
      const xA = (P.x + P.w + S.x) / 2
      const xB = (S.x + S.w + Math.min(R.x, C.x)) / 2
      const lane: Point[] = laneY === source[1] ? [source] : [source, [xA, source[1]], [xA, laneY]]
      const reachPort: Point = [R.x, R.y + portOffset(cards.reach, R)]
      const communityPort: Point = [C.x, C.y + portOffset(cards.community, C)]

      // Left descent: from the project's lower port down to the place card.
      const lower: Point = [P.x + BOTTOM_PORT_X, P.y + P.h]
      const placePort: Point = [B.x + BOTTOM_PORT_X, B.y]
      const midY = (lower[1] + placePort[1]) / 2
      const placeRoute: Point[] =
        Math.abs(lower[0] - placePort[0]) < 2
          ? [lower, [lower[0], placePort[1]]]
          : [lower, [lower[0], midY], [placePort[0], midY], placePort]

      const reachRoute: Point[] = [...lane, [xB, laneY], [xB, reachPort[1]], reachPort]
      const communityRoute: Point[] = [...lane, [xB, laneY], [xB, communityPort[1]], communityPort]
      const allRoutes = [reachRoute, communityRoute, placeRoute]
      const avoid = [P, R, B, C, S]
      const dots = [source, lower, reachPort, placePort, communityPort].flatMap((port) =>
        dotHalo(port, 46, avoid, bounds, allRoutes),
      )

      setGeo({
        width: bounds.w,
        height: bounds.h,
        routes: {
          reach: roundedPath(reachRoute),
          community: roundedPath(communityRoute),
          place: roundedPath(placeRoute),
        },
        ports: { project: [source, lower], reach: reachPort, place: placePort, community: communityPort },
        dots,
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(scene)
    ro.observe(safe)
    scene.querySelectorAll<HTMLElement>('[data-node]').forEach((el) => ro.observe(el))
    document.fonts?.ready.then(measure).catch(() => undefined)
    return () => ro.disconnect()
  }, [])

  /* ---------------- Motion (skipped entirely under reduced motion) ---------------- */
  const maskId = useId().replace(/:/g, '')
  const animate = useMotion(sceneRef)
  const introDone = useRef(false)
  const shownScenario = useRef(scenario.id)

  // Opening: the four entities settle in while one example route draws behind them.
  // Skipped if the motion code arrives after the scene has already been seen.
  useEffect(() => {
    if (!geo || introDone.current || !sceneRef.current) return
    introDone.current = true
    const scene = sceneRef.current
    const focus = active
    animate(
      (gsap) => {
        gsap.from('.node', { autoAlpha: 0, y: 14, duration: 0.42, ease: 'power2.out', stagger: 0.07, clearProps: 'transform,opacity,visibility' })
        gsap.from('.scene__dots ellipse', { opacity: 0, duration: 0.5, delay: 0.25, ease: 'none' })
        drawFocus(gsap, scene, maskId, focus, 0.62, 0.22)
      },
      { latestStart: 350 },
    )
  }, [geo, active, maskId, animate])

  // Scenario change: new participants fade in and the active route redraws (≈ 260ms).
  useEffect(() => {
    if (shownScenario.current === scenario.id || !sceneRef.current) return
    shownScenario.current = scenario.id
    const scene = sceneRef.current
    const focus = active
    animate((gsap) => {
      gsap.from('.node__photo, .node__text', { opacity: 0, duration: 0.26, ease: 'power1.out', stagger: 0.02, clearProps: 'opacity' })
      drawFocus(gsap, scene, maskId, focus, 0.32)
    })
  }, [scenario.id, active, maskId, animate])

  const isOn = (slot: ParticipantSlot) => active === slot || active === 'project'
  const bySlot = Object.fromEntries(scenario.participants.map((p) => [p.slot, p])) as Record<ParticipantSlot, Participant>
  const slots: ParticipantSlot[] = ['reach', 'place', 'community']

  const nodeProps = (slot: SceneFocus) => ({
    'data-node': slot,
    type: 'button' as const,
    'aria-pressed': selected === slot,
    'data-active': active === slot || (slot !== 'project' && active === 'project') ? 'true' : undefined,
    onPointerEnter: (e: ReactPointerEvent) => e.pointerType === 'mouse' && onPreview(slot),
    onPointerLeave: (e: ReactPointerEvent) => e.pointerType === 'mouse' && onPreview(null),
    onFocus: () => onPreview(slot),
    onBlur: () => onPreview(null),
    onClick: () => onSelect(slot),
  })

  return (
    <div className="scene" ref={sceneRef} data-scenario={scenario.id}>
      <svg
        className="scene__routes"
        width={geo?.width ?? 0}
        height={geo?.height ?? 0}
        viewBox={geo ? `0 0 ${geo.width} ${geo.height}` : undefined}
        aria-hidden="true"
        focusable="false"
      >
        {geo ? (
          <>
            <defs>
              {(['reach', 'place', 'community'] as ParticipantSlot[]).map((slot) => (
                <mask
                  key={slot}
                  id={`${maskId}-${slot}`}
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={geo.width}
                  height={geo.height}
                >
                  <path d={geo.routes[slot]} className="route-mask" />
                </mask>
              ))}
            </defs>
            <g className="scene__dots">
              {geo.dots.map((d, i) => (
                <ellipse key={i} cx={d.x} cy={d.y} rx={2.1} ry={2.9} opacity={d.o} />
              ))}
            </g>
            {slots.map((slot) => (
              <path key={`idle-${slot}`} className="route route--idle" d={geo.routes[slot]} />
            ))}
            {slots.map((slot) => (
              <path
                key={`on-${slot}`}
                className="route route--active"
                data-slot={slot}
                data-on={isOn(slot) ? 'true' : 'false'}
                d={geo.routes[slot]}
                mask={`url(#${maskId}-${slot})`}
              />
            ))}
            <circle className="route-runner" r={4.5} cx={-20} cy={-20} />
          </>
        ) : null}
      </svg>

      <div className="scene__grid">
        <button className="node node--ticket" style={{ gridArea: 'tl' }} data-port="40" {...nodeProps('project')}>
          <Photo slug={scenario.project.image} sizes="216px" className="node__photo" eager decorative />
          <span className="node__perforation" aria-hidden="true" />
          <span className="node__text">
            <span className="role role--project">Project</span>
            <span className="node__name">{scenario.project.kind}</span>
            <span className="node__meta">
              {scenario.project.title}. {scenario.project.line}.
            </span>
          </span>
        </button>

        <ParticipantNode participant={bySlot.reach} area="tr" variant="portrait" {...nodeProps('reach')} />

        <div className="scene__message" ref={safeRef}>
          {message}
        </div>

        <ParticipantNode participant={bySlot.place} area="bl" variant="postcard" {...nodeProps('place')} />
        <ParticipantNode participant={bySlot.community} area="br" variant="mini" {...nodeProps('community')} />

        <div className="scene__band">{band}</div>
      </div>

      {geo ? (
        <svg className="scene__ports" width={geo.width} height={geo.height} aria-hidden="true" focusable="false">
          {geo.ports.project.map(([x, y], i) => (
            <circle key={`p${i}`} className="port port--source" data-on="true" cx={x} cy={y} r={6} />
          ))}
          {slots.map((slot) => (
            <circle
              key={slot}
              className="port"
              data-on={isOn(slot) ? 'true' : 'false'}
              cx={geo.ports[slot][0]}
              cy={geo.ports[slot][1]}
              r={5.5}
            />
          ))}
        </svg>
      ) : null}
    </div>
  )
}

/** Draws the route(s) for the focused entity: one route, or all three for the project. */
function drawFocus(gsap: Gsap, scene: HTMLElement, maskId: string, focus: SceneFocus, duration: number, delay = 0) {
  const targets: ParticipantSlot[] = focus === 'project' ? ['reach', 'place', 'community'] : [focus]
  const runner = scene.querySelector<SVGCircleElement>('.route-runner')
  targets.forEach((slot, i) => {
    const path = scene.querySelector<SVGPathElement>(`.route--active[data-slot="${slot}"]`)
    const mask = scene.querySelector<SVGPathElement>(`#${maskId}-${slot} path`)
    if (path && mask) drawRoute(gsap, path, mask, i === 0 ? runner : null, { duration, delay })
  })
}

interface ParticipantNodeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  participant: Participant
  area: 'tr' | 'bl' | 'br'
  variant: 'portrait' | 'postcard' | 'mini'
  'data-node': SceneFocus
}

function ParticipantNode({ participant, area, variant, ...rest }: ParticipantNodeProps) {
  const photoSizes = variant === 'postcard' ? '252px' : variant === 'portrait' ? '150px' : '72px'
  return (
    <button
      className={`node node--${variant}`}
      style={{ gridArea: area }}
      data-port={variant === 'portrait' ? '92' : variant === 'mini' ? 'center' : undefined}
      {...rest}
    >
      <Photo slug={participant.image} sizes={photoSizes} className="node__photo" eager decorative />
      <span className="node__text">
        <span className={`role role--${participant.role}`}>{participant.roleLabel}</span>
        <span className="node__name">{participant.name}</span>
        <span className="node__meta">{participant.reach}</span>
      </span>
    </button>
  )
}
