import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STAR_RADIUS = 5
const TRAIL_LENGTH = 60
const TARGET_FPS = 30
const FRAME_MS = 1000 / TARGET_FPS
const EARTH_INDEX = 2
const EARTH_START_YEAR = 2026

type Moon = {
  r: number
  period: number
  phase: number
  size: number
}

type Body = {
  a: number
  b: number
  period: number
  phase: number
  size: number
  tilt: number
  moons: Moon[]
  trail: { x: number; y: number }[]
}

const BODIES: Omit<Body, 'trail'>[] = [
  { a: 70, b: 56, period: 6, phase: 0.2, size: 1.6, tilt: 0.15, moons: [] },
  {
    a: 130,
    b: 110,
    period: 11,
    phase: 1.4,
    size: 2.2,
    tilt: -0.25,
    moons: [{ r: 7, period: 1.4, phase: 0, size: 0.8 }],
  },
  {
    a: 200,
    b: 175,
    period: 18,
    phase: 2.6,
    size: 2.4,
    tilt: 0.4,
    moons: [{ r: 8, period: 1.5, phase: 0.3, size: 0.7 }],
  },
  {
    a: 280,
    b: 240,
    period: 28,
    phase: 3.8,
    size: 2.6,
    tilt: -0.1,
    moons: [
      { r: 9, period: 1.8, phase: 0.5, size: 0.9 },
      { r: 14, period: 3.2, phase: 2.1, size: 0.7 },
    ],
  },
  {
    a: 360,
    b: 320,
    period: 42,
    phase: 5.0,
    size: 1.4,
    tilt: 0.3,
    moons: [{ r: 6, period: 1.2, phase: 1.0, size: 0.6 }],
  },
]

export function OrbitalSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const [year, setYear] = useState(EARTH_START_YEAR)
  const earthPeriod = BODIES[EARTH_INDEX].period
  const yearsPerSec = 1 / earthPeriod

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const SCALE = isMobile ? 0.55 : 1
    const center = { x: 0, y: 0 }
    const bodies: Body[] = BODIES.map((b) => ({
      ...b,
      a: b.a * SCALE,
      b: b.b * SCALE,
      moons: b.moons.map((m) => ({ ...m, r: m.r * SCALE })),
      trail: [],
    }))
    let time = 0
    let lastFrame = performance.now()
    let lastDraw = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      center.x = isMobile ? width * 0.5 : width * 0.62
      center.y = isMobile ? height * 0.22 : height * 0.55
    }

    const orbitPos = (b: Body, time: number) => {
      const theta = (time / b.period) * Math.PI * 2 + b.phase
      const ox = Math.cos(theta) * b.a
      const oy = Math.sin(theta) * b.b
      const cos = Math.cos(b.tilt)
      const sin = Math.sin(b.tilt)
      return {
        x: center.x + ox * cos - oy * sin,
        y: center.y + ox * sin + oy * cos,
      }
    }

    let lastYearEmit = 0

    const step = (now: number) => {
      raf = requestAnimationFrame(step)

      let dt = (now - lastFrame) / 1000
      lastFrame = now
      if (dt > 0.1) dt = 0
      if (!reduced) time += dt

      if (now - lastDraw < FRAME_MS) return
      lastDraw = now

      ctx.clearRect(0, 0, width, height)

      if (!reduced && now - lastYearEmit > 80) {
        lastYearEmit = now
        setYear(EARTH_START_YEAR + time / earthPeriod)
      }

      ctx.lineWidth = 1
      for (const b of bodies) {
        ctx.strokeStyle = 'rgba(138, 138, 138, 0.10)'
        ctx.save()
        ctx.translate(center.x, center.y)
        ctx.rotate(b.tilt)
        ctx.beginPath()
        ctx.ellipse(0, 0, b.a, b.b, 0, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()
      }

      for (let bi = 0; bi < bodies.length; bi++) {
        const b = bodies[bi]
        const isEarth = bi === EARTH_INDEX
        const pos = orbitPos(b, time)

        if (!reduced) {
          b.trail.push(pos)
          if (b.trail.length > TRAIL_LENGTH) b.trail.shift()
        }

        const trailColor = isEarth ? '120, 180, 220' : '245, 245, 245'
        for (let i = 1; i < b.trail.length; i++) {
          const p = b.trail[i]
          const prev = b.trail[i - 1]
          const a = (i / b.trail.length) * 0.35
          ctx.strokeStyle = `rgba(${trailColor}, ${a.toFixed(3)})`
          ctx.lineWidth = b.size * 0.6
          ctx.lineCap = 'round'
          ctx.beginPath()
          ctx.moveTo(prev.x, prev.y)
          ctx.lineTo(p.x, p.y)
          ctx.stroke()
        }

        ctx.fillStyle = isEarth
          ? 'rgba(120, 180, 220, 0.95)'
          : 'rgba(245, 245, 245, 0.85)'
        ctx.beginPath()
        ctx.arc(pos.x, pos.y, b.size, 0, Math.PI * 2)
        ctx.fill()

        for (const m of b.moons) {
          ctx.strokeStyle = 'rgba(138, 138, 138, 0.08)'
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, m.r, 0, Math.PI * 2)
          ctx.stroke()

          const mTheta = (time / m.period) * Math.PI * 2 + m.phase
          const mx = pos.x + Math.cos(mTheta) * m.r
          const my = pos.y + Math.sin(mTheta) * m.r
          ctx.fillStyle = 'rgba(245, 245, 245, 0.7)'
          ctx.beginPath()
          ctx.arc(mx, my, m.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      const starGlow = ctx.createRadialGradient(
        center.x,
        center.y,
        0,
        center.x,
        center.y,
        STAR_RADIUS * 6
      )
      starGlow.addColorStop(0, 'rgba(245, 194, 107, 0.45)')
      starGlow.addColorStop(1, 'rgba(245, 194, 107, 0)')
      ctx.fillStyle = starGlow
      ctx.beginPath()
      ctx.arc(center.x, center.y, STAR_RADIUS * 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#F5C26B'
      ctx.beginPath()
      ctx.arc(center.x, center.y, STAR_RADIUS, 0, Math.PI * 2)
      ctx.fill()
    }

    let visible = true
    const onVisibility = () => {
      if (!document.hidden && visible) {
        lastFrame = performance.now()
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const wasVisible = visible
        visible = entries[0]?.isIntersecting ?? true
        if (visible && !wasVisible) {
          lastFrame = performance.now()
          if (!raf) raf = requestAnimationFrame(step)
        } else if (!visible && raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    resize()
    raf = requestAnimationFrame(step)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-2 md:gap-3 whitespace-nowrap rounded-full border border-[#242424] bg-[rgba(10,10,10,0.55)] px-3 py-1.5 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[rgba(120,180,220,0.95)] shrink-0" />
        <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] md:tracking-[0.2em] text-[#8A8A8A]">
          Earth Year
        </span>
        <span className="font-mono text-[10px] md:text-[11px] text-[#F5F5F5] tabular-nums">
          {year.toFixed(2)}
        </span>
        <span className="font-mono text-[9px] md:text-[10px] text-[#5A5A5A] tabular-nums">
          {yearsPerSec.toFixed(3)} yr/s
        </span>
      </div>
    </>
  )
}
