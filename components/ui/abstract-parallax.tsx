'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

type Props = {
  src: string
  width?: number
  height?: number
  className?: string
  alt?: string
}

export default function AbstractParallax({ src, width = 220, height = 220, className, alt = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const motionAllowed = typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!motionAllowed) return
    const el = wrapRef.current
    if (!el) return

    let raf = 0
    let px = 0
    let py = 0
    let lx = 0
    let ly = 0

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      px = Math.max(-1, Math.min(1, x))
      py = Math.max(-1, Math.min(1, y))
      if (!raf) raf = requestAnimationFrame(update)
    }

    const onLeave = () => {
      px = 0
      py = 0
      if (!raf) raf = requestAnimationFrame(update)
    }

    const update = () => {
      lx += (px - lx) * 0.12
      ly += (py - ly) * 0.12
      const tx = lx * -8
      const ty = ly * -6
      const rot = lx * 2
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(1.02)`
      raf = 0
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointercancel', onLeave)

    const cleanupEl = el
    return () => {
      cleanupEl.removeEventListener('pointermove', onMove)
      cleanupEl.removeEventListener('pointerleave', onLeave)
      cleanupEl.removeEventListener('pointercancel', onLeave)
      if (raf) cancelAnimationFrame(raf)
      if (cleanupEl) cleanupEl.style.transform = ''
    }
  }, [motionAllowed])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{ transition: 'transform 450ms cubic-bezier(.2,.9,.2,1)', willChange: 'transform' }}
      aria-hidden={alt === ''}
    >
      <Image src={src} alt={alt} width={width} height={height} priority={false} />
    </div>
  )
}
