import { links } from '../data/links'

const milestones = [
  { title: 'Agreement', text: 'Scope, price and delivery date are set out in the offer.' },
  { title: 'Funding', text: 'Payment is arranged through Protected Payments, as the policy describes.' },
  { title: 'Delivery', text: 'The work is completed and the agreed evidence is shared.' },
  { title: 'Review', text: 'Delivery is reviewed, then completion follows the platform’s process.' },
]

/** "Clarity before commitment" — a sample collaboration record, explicitly not a transaction. */
export function TrustPanel() {
  return (
    <section className="trust section on-light" aria-labelledby="trust-title">
      <div className="container">
        <div className="trust__panel on-dark">
          <div className="trust__copy">
            <h2 id="trust-title" className="section-heading">
              Know what is agreed. Understand what happens next.
            </h2>
            <p className="trust__lede">
              ZOMZEY documents how offers, delivery, review and Protected Payments work, so both sides can check what happens
              before they commit.
            </p>
            <ul className="trust__links">
              <li>
                <a className="button button--primary" href={links.protectedPayments}>
                  Read about Protected Payments
                </a>
              </li>
              <li>
                <a className="button button--secondary-dark" href={links.terms}>
                  Read the terms
                </a>
              </li>
            </ul>
          </div>

          <figure className="record">
            <div className="record__head">
              <span className="example-tag">Illustrative workflow</span>
              <p className="record__kind">Collaboration record</p>
              <p className="record__title">Launch evening at an independent bookshop</p>
            </div>
            <ol className="record__steps">
              {milestones.map((m) => (
                <li key={m.title} className="record__step">
                  <span className="record__dot" aria-hidden="true" />
                  <p className="record__step-title">{m.title}</p>
                  <p className="record__step-text">{m.text}</p>
                </li>
              ))}
            </ol>
            <figcaption className="record__caption">
              A sample record, not a real transaction. Payment conditions are set out in the Protected Payments policy.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
