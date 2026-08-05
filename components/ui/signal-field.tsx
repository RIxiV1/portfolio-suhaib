'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { SIGNAL_PATH } from '@/components/ui/logo'

/**
 * The "Signal" mark, alive: a drifting field of grey noise that resolves into
 * a glowing indigo S — and tightens further when you hover it. Decorative;
 * hidden from assistive tech. Falls back to a static S under reduced-motion.
 */
export function SignalField({
  size = 420,
  className,
}: {
  size?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    cv.width = size * dpr
    cv.height = size * dpr
    cv.style.width = `${size}px`
    cv.style.height = `${size}px`
    const ctx = cv.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    // colors from the live design tokens; refreshed when the theme flips
    const col = { acc: [129, 140, 248], faint: [113, 113, 122] }
    const hexRgb = (h: string): number[] => {
      h = h.trim().replace('#', '')
      if (h.length === 3)
        h = h
          .split('')
          .map((c) => c + c)
          .join('')
      return [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
      ]
    }
    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      const a = s.getPropertyValue('--accent').trim()
      const f = s.getPropertyValue('--subtle-foreground').trim()
      if (a) col.acc = hexRgb(a)
      if (f) col.faint = hexRgb(f)
    }
    readColors()
    const rgba = (c: number[], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a})`

    // sample the S into target points (needs a mounted path to measure)
    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.style.position = 'absolute'
    svg.style.opacity = '0'
    svg.style.pointerEvents = 'none'
    const path = document.createElementNS(NS, 'path')
    path.setAttribute('d', SIGNAL_PATH)
    svg.appendChild(path)
    document.body.appendChild(svg)
    const len = path.getTotalLength()
    const pad = size * 0.2
    const span = size - pad * 2
    const M = 120
    const targets: { x: number; y: number }[] = []
    for (let i = 0; i < M; i++) {
      const q = path.getPointAtLength((i / (M - 1)) * len)
      targets.push({ x: pad + (q.x / 100) * span, y: pad + (q.y / 100) * span })
    }
    document.body.removeChild(svg)

    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const core = targets.map((t) => ({
      x: rnd(0, size),
      y: rnd(0, size),
      tx: t.x,
      ty: t.y,
      ph: rnd(0, 6.28),
    }))

    // reduced motion: draw the resolved S once, no loop
    if (reduce) {
      ctx.clearRect(0, 0, size, size)
      ctx.fillStyle = rgba(col.acc, 1)
      for (const p of core) {
        ctx.beginPath()
        ctx.arc(p.tx, p.ty, size / 220 + 1, 0, 6.283)
        ctx.fill()
      }
      return
    }

    const noiseN = Math.round(size / 4.4)
    const noise = Array.from({ length: noiseN }, () => ({
      x: rnd(0, size),
      y: rnd(0, size),
      vx: rnd(-0.28, 0.28),
      vy: rnd(-0.28, 0.28),
      a: rnd(0.12, 0.5),
      rr: rnd(size / 180, size / 90),
    }))
    const base = 0.3
    const dot = size / 220 + 1

    let hoverV = 0
    let hoverT = 0
    let inView = true
    let raf = 0
    const t0 = performance.now()

    const onEnter = () => (hoverT = 1)
    const onLeave = () => (hoverT = 0)
    cv.addEventListener('pointerenter', onEnter)
    cv.addEventListener('pointerleave', onLeave)

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting
        if (inView && !raf) raf = requestAnimationFrame(frame)
      },
      { threshold: 0.05 },
    )
    io.observe(cv)

    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    function frame(now: number) {
      if (!inView) {
        raf = 0
        return
      }
      const g = ctx as CanvasRenderingContext2D
      const t = (now - t0) / 1000
      hoverV += (hoverT - hoverV) * 0.08
      const coh = Math.min(1, base + hoverV * (1 - base))
      g.clearRect(0, 0, size, size)

      for (const p of noise) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x += size
        if (p.x > size) p.x -= size
        if (p.y < 0) p.y += size
        if (p.y > size) p.y -= size
        g.globalAlpha = p.a * (1 - hoverV * 0.85)
        g.fillStyle = rgba(col.faint, 1)
        g.beginPath()
        g.arc(p.x, p.y, p.rr, 0, 6.283)
        g.fill()
      }
      g.globalAlpha = 1

      const k = 0.05 + coh * 0.16
      const jit = (1 - coh) * 8
      g.fillStyle = rgba(col.acc, 1)
      g.shadowColor = rgba(col.acc, 1)
      g.shadowBlur = 5 + hoverV * 13
      for (const p of core) {
        p.x += (p.tx - p.x) * k + Math.cos(t * 1.6 + p.ph) * jit * 0.05
        p.y += (p.ty - p.y) * k + Math.sin(t * 1.6 + p.ph) * jit * 0.05
        g.beginPath()
        g.arc(p.x, p.y, dot, 0, 6.283)
        g.fill()
      }
      g.shadowBlur = 0
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      io.disconnect()
      mo.disconnect()
      cv.removeEventListener('pointerenter', onEnter)
      cv.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, size])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
