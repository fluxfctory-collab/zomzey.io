import { useState } from 'react'
import type { Intent } from '../data/content'
import { images } from '../data/images.generated'
import { links, participantLinks } from '../data/links'
import { BrandLogo } from './BrandLogo'
import { Dialog } from './Dialog'

export function SiteFooter({ onIntent }: { onIntent: (intent: Intent) => void }) {
  const [creditsOpen, setCreditsOpen] = useState(false)

  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <BrandLogo />
            <p className="site-footer__about">
              ZOMZEY connects projects with the creators, shops, venues, communities and agencies that can help them reach an
              audience.
            </p>
          </div>

          <nav className="site-footer__groups" aria-label="Footer">
            <div className="site-footer__group site-footer__group--wide">
              <h2 className="site-footer__heading">Explore</h2>
              <ul>
                <li>
                  <a href="#explore" onClick={() => onIntent('promote')}>
                    People and places
                  </a>
                </li>
                <li>
                  <a href="#explore" onClick={() => onIntent('earn')}>
                    Opportunities
                  </a>
                </li>
                <li>
                  <a href={links.directory}>Browse members</a>
                </li>
                {participantLinks.map((p) => (
                  <li key={p.label}>
                    <a href={p.href}>{p.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="site-footer__group">
              <h2 className="site-footer__heading">Help</h2>
              <ul>
                <li>
                  <a href="#how-it-works">How it works</a>
                </li>
                <li>
                  <a href={links.pricing}>Pricing</a>
                </li>
                <li>
                  <a href={links.about}>About</a>
                </li>
                <li>
                  <a href={links.support}>Support Hub</a>
                </li>
                <li>
                  <a href={links.signin}>Sign in</a>
                </li>
              </ul>
            </div>
            <div className="site-footer__group">
              <h2 className="site-footer__heading">Policies</h2>
              <ul>
                <li>
                  <a href={links.protectedPayments}>Protected Payments</a>
                </li>
                <li>
                  <a href={links.terms}>Terms</a>
                </li>
                <li>
                  <a href={links.privacy}>Privacy</a>
                </li>
                <li>
                  <a href={links.accessibility}>Accessibility</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>Homepage concept prototype. People, places and opportunities shown on this page are illustrative examples.</p>
          <button type="button" className="text-button text-button--dark" onClick={() => setCreditsOpen(true)}>
            Photo credits
          </button>
        </div>
      </div>

      <Dialog open={creditsOpen} onClose={() => setCreditsOpen(false)} title="Photo credits" className="credits-dialog">
        <p className="credits__intro">
          Illustrative photographs from the Open Images dataset, listed there under CC BY 2.0. They show example scenarios, not
          ZOMZEY members.
        </p>
        <ul className="credits__list">
          {Object.entries(images).map(([slug, img]) => (
            <li key={slug}>
              <a className="text-link" href={img.credit.landing}>
                {img.credit.title}
              </a>{' '}
              by {img.credit.author},{' '}
              <a className="text-link" href="https://creativecommons.org/licenses/by/2.0/">
                CC BY 2.0
              </a>
            </li>
          ))}
        </ul>
      </Dialog>
    </footer>
  )
}
