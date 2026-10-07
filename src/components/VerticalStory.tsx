import { useEffect, useRef } from 'react'
import type { ParticipantSlot, Scenario } from '../data/content'
import { useMotion } from '../lib/useMotion'
import { Photo } from './Photo'
import type { SceneFocus } from './ConnectionScene'

interface VerticalStoryProps {
  scenario: Scenario
  active: SceneFocus
  onSelect: (slot: ParticipantSlot) => void
}

/**
 * Narrow-screen reinterpretation of the network: one project, a clear vertical
 * line and three compact participant steps. Each step expands its own example.
 */
export function VerticalStory({ scenario, active, onSelect }: VerticalStoryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = useRef(scenario.id)
  const animate = useMotion(ref)

  // Scenario change: the new project and participants fade in together (≈ 240ms).
  useEffect(() => {
    if (shown.current === scenario.id) return
    shown.current = scenario.id
    animate((gsap) => {
      gsap.from('.vstory__project, .vstory__node', { opacity: 0, y: 6, duration: 0.24, ease: 'power1.out', stagger: 0.04, clearProps: 'opacity,transform' })
    })
  }, [scenario.id, animate])

  return (
    <div className="vstory" data-scenario={scenario.id} ref={ref}>
      <div className="vstory__project">
        <Photo slug={scenario.project.image} sizes="72px" className="vstory__project-photo" decorative eager />
        <div>
          <span className="role role--project">Project</span>
          <p className="vstory__project-name">{scenario.project.kind}</p>
          <p className="vstory__meta">
            {scenario.project.title}. {scenario.project.line}.
          </p>
        </div>
      </div>
      <ol className="vstory__steps" aria-label={`Example connections for a ${scenario.project.kind.toLowerCase()}`}>
        {scenario.participants.map((p) => {
          const on = active === p.slot || active === 'project'
          const detailId = `vstory-${scenario.id}-${p.slot}`
          return (
            <li key={p.slot} className="vstory__step" data-on={on ? 'true' : 'false'}>
              <button
                type="button"
                className="vstory__node"
                aria-expanded={active === p.slot}
                aria-controls={detailId}
                onClick={() => onSelect(p.slot)}
              >
                <Photo slug={p.image} sizes="56px" className="vstory__photo" decorative eager />
                <span className="vstory__text">
                  <span className={`role role--${p.role}`}>{p.roleLabel}</span>
                  <span className="vstory__name">{p.name}</span>
                  <span className="vstory__meta">{p.reach}</span>
                </span>
              </button>
              <p id={detailId} className="vstory__detail" hidden={active !== p.slot}>
                {p.detail}
              </p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
