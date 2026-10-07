import { useCallback, useState } from 'react'
import type { Intent } from './data/content'
import { Closing } from './components/Closing'
import { Explorer } from './components/Explorer'
import { Hero } from './components/Hero'
import { JoinDialog } from './components/JoinDialog'
import { ProcessSteps } from './components/ProcessSteps'
import { ReachStories } from './components/ReachStories'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { TrustPanel } from './components/TrustPanel'

const INTENT_KEY = 'zomzey-prototype-intent'

const readStoredIntent = (): Intent => {
  try {
    return sessionStorage.getItem(INTENT_KEY) === 'earn' ? 'earn' : 'promote'
  } catch {
    return 'promote'
  }
}

export default function App() {
  const [intent, setIntent] = useState<Intent>(readStoredIntent)
  const [joinOpen, setJoinOpen] = useState(false)

  // Intent is a local browsing mode, not an account role. It is kept for this tab only.
  const chooseIntent = useCallback((next: Intent) => {
    setIntent(next)
    try {
      sessionStorage.setItem(INTENT_KEY, next)
    } catch {
      /* storage unavailable: the in-memory state still works */
    }
  }, [])

  const openJoin = useCallback(() => setJoinOpen(true), [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader onIntent={chooseIntent} onJoin={openJoin} />
      <main id="main" tabIndex={-1}>
        <Hero onIntent={chooseIntent} />
        <ReachStories />
        <ProcessSteps />
        <Explorer intent={intent} onIntentChange={chooseIntent} />
        <TrustPanel />
        <Closing onIntent={chooseIntent} onJoin={openJoin} />
      </main>
      <SiteFooter onIntent={chooseIntent} />
      <JoinDialog open={joinOpen} onClose={() => setJoinOpen(false)} intent={intent} />
    </>
  )
}
