import { useCallback, useEffect, useId, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import type { Intent } from '../data/content'
import { links, participantLinks } from '../data/links'
import { BrandLogo } from './BrandLogo'
import { Dialog } from './Dialog'
import { Icon } from './Icon'

interface SiteHeaderProps {
  onIntent: (intent: Intent) => void
  onJoin: () => void
}

export function SiteHeader({ onIntent, onJoin }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="site-header on-dark" data-scrolled={scrolled ? 'true' : 'false'}>
      <div className="container site-header__inner">
        <a href="#top" className="site-header__brand">
          <BrandLogo />
          <span className="visually-hidden">home</span>
        </a>

        <nav className="site-nav" aria-label="Main">
          <ul className="site-nav__list">
            <li>
              <ExploreDisclosure onIntent={onIntent} />
            </li>
            <li>
              <a className="site-nav__link" href="#how-it-works">
                How it works
              </a>
            </li>
            <li>
              <a className="site-nav__link" href={links.pricing}>
                Pricing
              </a>
            </li>
            <li>
              <a className="site-nav__link" href={links.about}>
                About
              </a>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <a className="site-nav__link site-header__signin" href={links.signin}>
            Sign in
          </a>
          <button type="button" className="button button--primary button--sm site-header__join" onClick={onJoin}>
            Join ZOMZEY
          </button>
          <button
            type="button"
            className="button button--ghost-dark button--sm site-header__menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Icon name="menu" />
            Menu
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onIntent={onIntent} onJoin={onJoin} />
    </header>
  )
}

function ExploreDisclosure({ onIntent }: { onIntent: (intent: Intent) => void }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget && !wrapRef.current?.contains(event.relatedTarget as Node)) setOpen(false)
    }
    const wrap = wrapRef.current
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    wrap?.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      wrap?.removeEventListener('focusout', onFocusOut)
    }
  }, [open])

  const choose = (intent: Intent) => {
    onIntent(intent)
    setOpen(false)
  }

  return (
    <div className="explore" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        className="site-nav__link explore__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        Explore
        <Icon name="chevron" size={18} />
      </button>
      <div id={panelId} className="explore__panel" hidden={!open}>
        <div className="explore__col">
          <p className="explore__heading">On this page</p>
          <ul className="explore__list">
            <li>
              <a href="#explore" className="explore__link" onClick={() => choose('promote')}>
                <span className="explore__label">People and places</span>
                <span className="explore__desc">Creators, shops, venues and communities</span>
              </a>
            </li>
            <li>
              <a href="#explore" className="explore__link" onClick={() => choose('earn')}>
                <span className="explore__label">Opportunities</span>
                <span className="explore__desc">Projects looking for reach</span>
              </a>
            </li>
          </ul>
          <p className="explore__heading">On ZOMZEY</p>
          <ul className="explore__list">
            <li>
              <a href={links.directory} className="explore__link">
                <span className="explore__label">Browse members</span>
                <span className="explore__desc">The live ZOMZEY directory</span>
              </a>
            </li>
            <li>
              <a href={links.opportunities} className="explore__link">
                <span className="explore__label">Browse opportunities</span>
                <span className="explore__desc">Current projects on ZOMZEY</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="explore__col explore__col--roles">
          <p className="explore__heading">Who takes part</p>
          <ul className="explore__list">
            {participantLinks.map((p) => (
              <li key={p.label}>
                <a href={p.href} className="explore__link">
                  <span className="explore__label">{p.label}</span>
                  <span className="explore__desc">{p.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onIntent: (intent: Intent) => void
  onJoin: () => void
}

function MobileMenu({ open, onClose, onIntent, onJoin }: MobileMenuProps) {
  // When a link inside the menu targets a section on this page, focus that section's
  // heading after the menu closes instead of returning to the Menu button.
  const focusTarget = useRef<string | null>(null)
  const returnFocus = useCallback(() => {
    const id = focusTarget.current
    focusTarget.current = null
    return id ? document.getElementById(id) : null
  }, [])
  // In-page links close the menu, set the browsing intent where relevant and
  // hand focus to the section heading they opened.
  const onMenuLink = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget
    focusTarget.current = link.dataset.focus ?? null
    link.closest('dialog')?.close()
    if (link.dataset.intent === 'promote' || link.dataset.intent === 'earn') onIntent(link.dataset.intent)
  }
  const onMenuJoin = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.currentTarget.closest('dialog')?.close()
    onJoin()
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Menu"
      variant="dark"
      className="menu-sheet"
      closeLabel="Close menu"
      returnFocus={returnFocus}
    >
      <nav aria-label="Mobile">
        <ul className="menu-sheet__primary">
          <li>
            <a href="#explore" data-intent="promote" data-focus="explore-title" onClick={onMenuLink}>
              People and places
            </a>
          </li>
          <li>
            <a href="#explore" data-intent="earn" data-focus="explore-title" onClick={onMenuLink}>
              Opportunities
            </a>
          </li>
          <li>
            <a href="#how-it-works" data-focus="process-title" onClick={onMenuLink}>
              How it works
            </a>
          </li>
          <li>
            <a href={links.pricing}>Pricing</a>
          </li>
          <li>
            <a href={links.about}>About</a>
          </li>
        </ul>
        <p className="menu-sheet__heading">Who takes part</p>
        <ul className="menu-sheet__roles">
          {participantLinks.map((p) => (
            <li key={p.label}>
              <a href={p.href}>{p.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="menu-sheet__actions">
        <button type="button" className="button button--primary button--lg" onClick={onMenuJoin}>
          Join ZOMZEY
        </button>
        <a className="button button--secondary-dark button--lg" href={links.signin}>
          Sign in
        </a>
      </div>
    </Dialog>
  )
}
