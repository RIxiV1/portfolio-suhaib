'use client'

import dynamic from 'next/dynamic'

export default dynamic(() => import('./signal-field').then((m) => m.SignalField), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="h-40 w-40" />,
})
