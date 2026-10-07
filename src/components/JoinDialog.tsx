import { useId, useState } from 'react'
import type { Intent } from '../data/content'
import { links } from '../data/links'
import { Dialog } from './Dialog'
import { Icon } from './Icon'

type StartingPoint = Intent | 'agency'

const options: { id: StartingPoint; title: string; text: string }[] = [
  { id: 'promote', title: 'I have something to promote', text: 'A book, a product, music, an app or a new idea.' },
  { id: 'earn', title: 'I have an audience to offer', text: 'Through your content, shop, venue, community or represented talent.' },
  { id: 'agency', title: 'I represent an agency', text: 'Agency plans are paid. See what they include before you sign up.' },
]

interface JoinDialogProps {
  open: boolean
  onClose: () => void
  intent: Intent
}

/**
 * Local starting-point chooser. It collects nothing: the final step is a link to the
 * existing ZOMZEY sign-up or agency page.
 */
export function JoinDialog({ open, onClose, intent }: JoinDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Join ZOMZEY" className="join-dialog">
      <JoinChooser initial={intent} />
    </Dialog>
  )
}

function JoinChooser({ initial }: { initial: Intent }) {
  const [choice, setChoice] = useState<StartingPoint>(initial)
  const name = useId()
  const isAgency = choice === 'agency'

  return (
    <div className="join">
      <fieldset className="join__options">
        <legend className="join__legend">Choose your starting point</legend>
        {options.map((o) => (
          <label key={o.id} className="join__option">
            <input type="radio" name={name} value={o.id} checked={choice === o.id} onChange={() => setChoice(o.id)} />
            <span className="join__option-text">
              <span className="join__option-title">{o.title}</span>
              <span className="join__option-desc">{o.text}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div className="join__next">
        {isAgency ? (
          <>
            <p>Compare agency plans and pricing on zomzey.io, then create your agency account there.</p>
            <a className="button button--dark button--lg" href={links.agencies}>
              View agency plans
              <Icon name="external" size={18} />
            </a>
          </>
        ) : (
          <>
            <p>
              You will create your account on zomzey.io. Free account options are available; some features and fees are
              explained on the{' '}
              <a className="text-link" href={links.pricing}>
                pricing page
              </a>
              .
            </p>
            <a className="button button--dark button--lg" href={links.signup}>
              Continue to ZOMZEY sign-up
              <Icon name="external" size={18} />
            </a>
          </>
        )}
        <p className="join__note">This homepage concept does not collect or submit any details.</p>
      </div>
    </div>
  )
}
