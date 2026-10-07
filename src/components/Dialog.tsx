import { useEffect, useId, useRef, type ReactNode } from 'react'
import { Icon } from './Icon'

interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  /** Short label above the title, e.g. "Example profile". */
  eyebrow?: ReactNode
  children: ReactNode
  className?: string
  variant?: 'light' | 'dark'
  closeLabel?: string
  /** Optional override for where focus goes on close (e.g. the section an in-page link opened). */
  returnFocus?: () => HTMLElement | null
}

/**
 * Modal built on the native <dialog>: the browser provides focus containment,
 * inertness of the page behind and Escape dismissal. Focus returns to the
 * element that opened it.
 */
export function Dialog({
  open,
  onClose,
  title,
  eyebrow,
  children,
  className,
  variant = 'light',
  closeLabel = 'Close',
  returnFocus: returnFocusOverride,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement as HTMLElement | null
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const handleClose = () => {
      onClose()
      const override = returnFocusOverride?.()
      if (override) {
        override.focus({ preventScroll: true })
        return
      }
      const target = returnFocus.current
      if (target && document.contains(target)) target.focus()
    }
    // A click on the backdrop lands on the <dialog> element itself (pointer convenience;
    // keyboard users have Escape and the visible close button).
    const handleBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close()
    }
    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('click', handleBackdrop)
    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('click', handleBackdrop)
    }
  }, [onClose, returnFocusOverride])

  return (
    <dialog
      ref={ref}
      className={['dialog', `dialog--${variant}`, variant === 'dark' ? 'on-dark' : 'on-light', className].filter(Boolean).join(' ')}
      aria-labelledby={titleId}
    >
      <div className="dialog__body">
        <div className="dialog__head">
          <div>
            {eyebrow ? <p className="dialog__eyebrow">{eyebrow}</p> : null}
            <h2 id={titleId} className="dialog__title">
              {title}
            </h2>
          </div>
          <button type="button" className="icon-button" onClick={() => ref.current?.close()}>
            <Icon name="close" />
            <span className="visually-hidden">{closeLabel}</span>
          </button>
        </div>
        {open ? children : null}
      </div>
    </dialog>
  )
}
