import { useRef } from 'react'
import { processSteps } from '../data/content'
import { useProcessMotion } from './processMotion'

/** "From connection to collaboration" — an ordered, fully static-readable progression. */
export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null)
  useProcessMotion(sectionRef)

  return (
    <section id="how-it-works" className="process section on-dark" aria-labelledby="process-title" ref={sectionRef}>
      <div className="container">
        <div className="process__head">
          <h2 id="process-title" className="section-heading" tabIndex={-1}>
            A clear path from first contact to finished work.
          </h2>
          <p className="process__lede">
            The same route that connects a project to its audience carries the work itself, one agreed step at a time.
          </p>
        </div>

        <div className="process__track">
          <span className="process__rail" aria-hidden="true">
            <span className="process__rail-fill" />
          </span>
          <ol className="process__steps">
          {processSteps.map((step, i) => (
            <li key={step.title} className="process__step">
              <span className="process__node" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="process__title">
                <span className="visually-hidden">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="process__text">{step.text}</p>
              <div className="artefact">
                <p className="artefact__label">{step.artefactLabel}</p>
                <ul className="artefact__lines">
                  {step.artefact.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
