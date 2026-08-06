'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

// Draw a stylised WALL·E (binocular eyes, boxy body, treads) and sample his
// outline as particle targets — so the noise resolves into him, in white dots.
function walleEdges(): [number, number][] {
  const W = 220
  const H = 260
  const oc = document.createElement('canvas')
  oc.width = W
  oc.height = H
  const g = oc.getContext('2d')
  if (!g) return []
  g.fillStyle = '#fff'
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    g.beginPath()
    g.moveTo(x + r, y)
    g.arcTo(x + w, y, x + w, y + h, r)
    g.arcTo(x + w, y + h, x, y + h, r)
    g.arcTo(x, y + h, x, y, r)
    g.arcTo(x, y, x + w, y, r)
    g.closePath()
    g.fill()
  }
  const circle = (x: number, y: number, r: number) => {
    g.beginPath()
    g.arc(x, y, r, 0, 7)
    g.fill()
  }
  rr(40, 196, 60, 44, 20) // left tread
  rr(120, 196, 60, 44, 20) // right tread
  g.beginPath() // body / compactor cube
  g.moveTo(66, 96)
  g.lineTo(154, 96)
  g.lineTo(166, 196)
  g.lineTo(54, 196)
  g.closePath()
  g.fill()
  rr(38, 110, 16, 74, 8) // left arm
  rr(166, 110, 16, 74, 8) // right arm
  circle(46, 190, 10) // left hand
  circle(174, 190, 10) // right hand
  rr(96, 80, 28, 20, 6) // neck
  rr(58, 34, 104, 34, 17) // eye bar
  circle(84, 50, 28) // left eye
  circle(136, 50, 28) // right eye

  const img = g.getImageData(0, 0, W, H).data
  const on = (x: number, y: number) =>
    x >= 0 && x < W && y >= 0 && y < H && img[(y * W + x) * 4 + 3] > 128
  const edges: [number, number][] = []
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (
        on(x, y) &&
        (!on(x - 1, y) || !on(x + 1, y) || !on(x, y - 1) || !on(x, y + 1))
      )
        edges.push([x, y])
    }
  }
  return edges
}

/**
 * WALL·E, alive: a drifting field of grey noise that resolves into a dotted,
 * glowing WALL·E — and tightens when you hover him. Decorative; hidden from
 * assistive tech. Static under reduced-motion.
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

    const col = { fg: [250, 250, 250], noise: [113, 113, 122] }
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
      const n = s.getPropertyValue('--subtle-foreground').trim()
      if (f) col.fg = hexRgb(f)
      if (n) col.noise = hexRgb(n)
    }
    readColors()
    const rgba = (c: number[], a: number) =>
      `rgba(${c[0]},${c[1]},${c[2]},${a})`

    // build WALL·E targets, scaled to fit the square canvas (he's portrait)
    const edges = walleEdges()
    const scale = (size * 0.92) / 260
    const ox = (size - 220 * scale) / 2
    const oy = (size - 260 * scale) / 2
    const N = 300
    const rnd = (a: number, b: number) => a + Math.random() * (b - a)
    const dot = size / 240 + 1
    const core = Array.from({ length: N }, (_, i) => {
      const e = edges.length
        ? edges[Math.floor((i * edges.length) / N)]
        : [110, 130]
      return {
        x: rnd(0, size),
        y: rnd(0, size),
        tx: ox + e[0] * scale,
        ty: oy + e[1] * scale,
        ph: rnd(0, 6.28),
      }
    })

    if (reduce) {
      ctx.clearRect(0, 0, size, size)
      ctx.fillStyle = rgba(col.fg, 1)
      for (const p of core) {
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
      g.fillStyle = rgba(col.fg, 1)
      g.shadowColor = rgba(col.fg, 1)
      g.shadowBlur = 4 + hoverV * 10
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
