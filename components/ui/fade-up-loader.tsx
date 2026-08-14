'use client'

import dynamic from 'next/dynamic'

// Lazy-load the FadeUp animation component on the client to avoid
// shipping motion/react in the initial server bundle.
export default dynamic(
  () => import('./fade-up').then((m) => m.FadeUp),
  { ssr: false, loading: () => <div aria-hidden="true" /> },
)
