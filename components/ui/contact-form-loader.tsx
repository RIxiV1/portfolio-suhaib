'use client'

import dynamic from 'next/dynamic'

// Load the heavy contact form lazily on the client to keep the initial
// server bundle small. The real form is a client component that uses
// motion and icons; dynamic import with ssr:false ensures it is only
// loaded in the browser when needed.
const ContactForm = dynamic(
  () => import('./contact-form').then((m) => m.ContactForm),
  { ssr: false, loading: () => <div className="h-40" aria-hidden="true" /> },
)

export default function ContactFormLoader() {
  return <ContactForm />
}
