'use client'

import dynamic from 'next/dynamic'

export default dynamic(() => import('./magnetic-link').then((m) => m.MagneticLink), {
  ssr: false,
  loading: () => <button className="rounded-full px-5 py-2.5" aria-hidden="true" />,
})
