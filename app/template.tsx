'use client'

import { motion, useReducedMotion } from 'motion/react'

// Soft fade-up on every route change (home ↔ case studies). Respects
// reduced-motion. Nav lives in the layout, so it stays put across transitions.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
