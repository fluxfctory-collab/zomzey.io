import { useCallback, useEffect, useState } from 'react'
import { scenarioById, scenarios, type Intent, type ParticipantSlot, type ScenarioId } from '../data/content'
import { links } from '../data/links'
import { QUERIES, useMediaQuery } from '../lib/useMediaQuery'
import { ConnectionScene, type SceneFocus } from './ConnectionScene'
import { Icon } from './Icon'
import { VerticalStory } from './VerticalStory'

interface HeroProps {
  onIntent: (intent: Intent) => void
}

export function Hero({ onIntent }: HeroProps) {
  const isPerimeter = useMediaQuery(QUERIES.perimeter)
  const [scenarioId, setScenarioId] = useState<ScenarioId>('books')
  const [selected, setSelected] = useState<SceneFocus | null>(null)
  const [preview, setPreview] = useState<SceneFocus | null>(null)
  const scenario = scenarioById[scenarioId]
  const active: SceneFocus = preview ?? selected ?? scenario.defaultSlot


  // Tapping or clicking anywhere outside the scene's nodes/detail clears a pinned selection.
  useEffect(() => {
    if (!selected) return
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null
      if (target?.closest('.node, .vstory__node, .scene-detail, .scenario-control')) return
      setSelected(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [selected])

  const changeScenario = useCallback((id: ScenarioId) => {
    setScenarioId(id)
    setSelected(null)
    setPreview(null)
  }, [])

  const selectSlot = useCallback((slot: SceneFocus) => {
    setSelected((current) => (current === slot ? null : slot))
  }, [])

  const message = (
    <div className="hero__message">
      <h1 className="hero__title" id="hero-title">
        <span className="hero__line">Make the</span> <span className="hero__line">next connection</span>{' '}
        <span className="hero__line">
          count
          <span className="hero__stop" aria-hidden="true" />
          <span className="visually-hidden">.</span>
        </span>
      </h1>
      <p className="hero__lede">Bring your project to the people, places and communities that can help it grow.</p>
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
  )

  const control = <ScenarioControl value={scenarioId} onChange={changeScenario} />

  const detailParticipant = scenario.participants.find((p) => p.slot === active)
  const detail = (
    <div className="scene-detail" data-pinned={selected ? 'true' : 'false'}>
      <p className="scene-detail__route">
        <span>{scenario.project.kind}</span>
        <span className="scene-detail__line" aria-hidden="true" />
        <span>{detailParticipant ? detailParticipant.name : 'Three example routes'}</span>
      </p>
      <p className="scene-detail__text">{detailParticipant ? detailParticipant.detail : scenario.summary}</p>
      {selected ? (
        <button type="button" className="icon-button icon-button--small scene-detail__close" onClick={() => setSelected(null)}>
          <Icon name="close" size={18} />
          <span className="visually-hidden">Clear selected connection</span>
        </button>
      ) : null}
    </div>
  )

  return (
    <section className="hero on-dark" aria-labelledby="hero-title" data-layout={isPerimeter ? 'perimeter' : 'stacked'}>
      <div className="container hero__container">
        {isPerimeter ? (
          <ConnectionScene
            scenario={scenario}
            active={active}
            selected={selected}
            onPreview={setPreview}
            onSelect={selectSlot}
            message={message}
            band={
              <>
                <div className="scene__band-row">
                  <span className="example-tag">Illustrative connection</span>
                  {control}
                </div>
                {detail}
              </>
            }
          />
        ) : (
          <div className="hero__stack">
            {message}
            <div className="hero__story">
              <div className="hero__story-head">
                <span className="example-tag">Illustrative connection</span>
                {control}
              </div>
              <VerticalStory scenario={scenario} active={active} onSelect={(slot: ParticipantSlot) => selectSlot(slot)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ScenarioControl({ value, onChange }: { value: ScenarioId; onChange: (id: ScenarioId) => void }) {
  return (
    <div className="scenario-control" role="group" aria-label="Example scene">
      {scenarios.map((s) => (
        <button key={s.id} type="button" className="scenario-control__option" aria-pressed={value === s.id} onClick={() => onChange(s.id)}>
          {s.label}
        </button>
      ))}
    </div>
  )
}
