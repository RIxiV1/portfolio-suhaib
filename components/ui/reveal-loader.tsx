'use client'

import dynamic from 'next/dynamic'

// Export client-side lazy wrappers for the reveal components.
export const Stagger = dynamic(
  () => import('./reveal').then((m) => m.Stagger),
  { ssr: false, loading: () => <div aria-hidden="true" /> },
)

export const StaggerItem = dynamic(
  () => import('./reveal').then((m) => m.StaggerItem),
  { ssr: false, loading: () => <div aria-hidden="true" /> },
)
