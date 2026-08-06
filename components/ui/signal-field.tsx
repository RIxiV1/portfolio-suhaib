'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

// WALL·E as a set of parts, sampled separately so the binocular eyes stay
// distinct (white lens rings + indigo pupils) instead of merging into a blob.
const circle = (cx: number, cy: number, r: number) =>
  `M ${cx - r} ${cy} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`
const roundRect = (x: number, y: number, w: number, h: number, r: number) =>
  `M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`

type Part = { d: string; n: number; c: 'fg' | 'acc' }
const PARTS: Part[] = [
  // binocular eye lenses (white rings)
  { d: circle(40, 30, 15), n: 26, c: 'fg' },
  { d: circle(64, 30, 15), n: 26, c: 'fg' },
  // pupils (indigo)
  { d: circle(40, 30, 6), n: 9, c: 'acc' },
  { d: circle(64, 30, 6), n: 9, c: 'acc' },
  // neck
  { d: 'M47 45 V57', n: 5, c: 'fg' },
  { d: 'M57 45 V57', n: 5, c: 'fg' },
  // body (compactor cube)
  { d: 'M34 57 H70 L76 92 H28 Z', n: 48, c: 'fg' },
  // treads
  { d: roundRect(24, 93, 26, 16, 7), n: 22, c: 'fg' },
  { d: roundRect(56, 93, 26, 16, 7), n: 22, c: 'fg' },
  // arms
  { d: 'M23 62 V88', n: 8, c: 'fg' },
  { d: 'M83 62 V88', n: 8, c: 'fg' },
]

/**
 * WALL·E, alive: a drifting field of grey noise that resolves into a dotted,
 * glowing WALL·E — white body, indigo eyes — tightening when you hover him.
 * Decorative; hidden from assistive tech. Static under reduced-motion.
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

    const col = {
      fg: [250, 250, 250],
      acc: [129, 140, 248],
      noise: [113, 113, 122],
    }
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
      const f = s.getPropertyValue('--foreground').trim()
      const a = s.getPropertyValue('--accent').trim()
      const n = s.getPropertyValue('--subtle-foreground').trim()
      if (f) col.fg = hexRgb(f)
      if (a) col.acc = hexRgb(a)
      if (n) col.noise = hexRgb(n)
    }
    readColors()
    const rgba = (c: number[], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a})`

    // sample every part in design space, then fit-and-centre into the canvas
    const NS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('width', '0')
    svg.setAttribute('height', '0')
    svg.style.position = 'absolute'
    svg.style.opacity = '0'
    document.body.appendChild(svg)
    const raw: { x: number; y: number; c: 'fg' | 'acc' }[] = []
    for (const part of PARTS) {
      const p = document.createElementNS(NS, 'path')
      p.setAttribute('d', part.d)
      svg.appendChild(p)
      const len = p.getTotalLength()
      for (let i = 0; i < part.n; i++) {
        const q = p.getPointAtLength((i / part.n) * len)
        raw.push({ x: q.x, y: q.y, c: part.c })
      }
      svg.removeChild(p)
    }
    document.body.removeChild(svg)

    // fit the bounding box into ~86% of the canvas, centred
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity
    for (const r of raw) {
      if (r.x < minX) minX = r.x
      if (r.x > maxX) maxX = r.x
      if (r.y < minY) minY = r.y
      if (r.y > maxY) maxY = r.y
    }
    const bw = maxX - minX,
      bh = maxY - minY
    const scale = (size * 0.86) / Math.max(bw, bh)
    const offX = (size - bw * scale) / 2 - minX * scale
    const offY = (size - bh * scale) / 2 - minY * scale

    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const dot = size / 230 + 1
    const core = raw.map((r) => ({
      x: rnd(0, size),
      y: rnd(0, size),
      tx: offX + r.x * scale,
      ty: offY + r.y * scale,
      ph: rnd(0, 6.28),
      c: r.c,
    }))

    if (reduce) {
      ctx.clearRect(0, 0, size, size)
      for (const p of core) {
        ctx.fillStyle = rgba(p.c === 'acc' ? col.acc : col.fg, 1)
        ctx.beginPath()
        ctx.arc(p.tx, p.ty, dot, 0, 6.283)
        ctx.fill()
      }
      return
    }

    const noiseN = Math.round(size / 5.5)
    const noise = Array.from({ length: noiseN }, () => ({
      x: rnd(0, size),
      y: rnd(0, size),
      vx: rnd(-0.26, 0.26),
      vy: rnd(-0.26, 0.26),
      a: rnd(0.12, 0.45),
      rr: rnd(size / 180, size / 95),
    }))
    const base = 0.32

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
        g.fillStyle = rgba(col.noise, 1)
        g.beginPath()
        g.arc(p.x, p.y, p.rr, 0, 6.283)
        g.fill()
      }
      g.globalAlpha = 1

      const k = 0.05 + coh * 0.16
      const jit = (1 - coh) * 8
      for (const p of core) {
        const c = p.c === 'acc' ? col.acc : col.fg
        p.x += (p.tx - p.x) * k + Math.cos(t * 1.6 + p.ph) * jit * 0.05
        p.y += (p.ty - p.y) * k + Math.sin(t * 1.6 + p.ph) * jit * 0.05
        g.fillStyle = rgba(c, 1)
        g.shadowColor = rgba(c, 1)
        g.shadowBlur = 4 + hoverV * 10
        g.beginPath()
        g.arc(p.x, p.y, p.c === 'acc' ? dot + 0.4 : dot, 0, 6.283)
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
