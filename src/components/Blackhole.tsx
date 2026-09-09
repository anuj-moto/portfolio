import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const HOLE_RADIUS = 18
const RING_COUNT = 5
const RING_STEP = 14
const SPAWN_PER_FRAME = 3
const MAX_PARTICLES = 700
const GRAVITY = 1800
const MAX_SPEED = 12
const SWIRL = 0.35
const HOLE_LERP = 0.08
const ABSORB_RADIUS = HOLE_RADIUS * 0.85
const ABSORB_RADIUS_SQ = ABSORB_RADIUS * ABSORB_RADIUS

type P = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
}

export function Blackhole() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let raf = 0
    const hole = { x: 0, y: 0, tx: 0, ty: 0 }
    const particles: P[] = []

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (hole.x === 0 && hole.y === 0) {
        hole.x = width / 2
        hole.y = height / 2
        hole.tx = hole.x
        hole.ty = hole.y
      }
    }

    const spawn = () => {
      const edge = Math.floor(Math.random() * 4)
      const margin = 20
      let x = 0
      let y = 0
      switch (edge) {
        case 0:
          x = Math.random() * width
          y = -margin
          break
        case 1:
          x = width + margin
          y = Math.random() * height
          break
        case 2:
          x = Math.random() * width
          y = height + margin
          break
        default:
          x = -margin
          y = Math.random() * height
      }
      const dx = hole.x - x
      const dy = hole.y - y
      const len = Math.hypot(dx, dy) || 1
      const speed = 0.4 + Math.random() * 0.6
      particles.push({
        x,
        y,
        vx: (dx / len) * speed,
        vy: (dy / len) * speed,
        size: 0.7 + Math.random() * 1.0,
        life: 0,
      })
    }

    const step = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.18)'
      ctx.fillRect(0, 0, width, height)

      hole.x += (hole.tx - hole.x) * HOLE_LERP
      hole.y += (hole.ty - hole.y) * HOLE_LERP

      if (!reduced) {
        for (let i = 0; i < SPAWN_PER_FRAME; i++) {
          if (particles.length < MAX_PARTICLES) spawn()
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const dx = hole.x - p.x
        const dy = hole.y - p.y
        const distSq = dx * dx + dy * dy

        if (distSq < ABSORB_RADIUS_SQ) {
          particles.splice(i, 1)
          continue
        }

        const dist = Math.sqrt(distSq)
        const inv = 1 / dist
        const accel = GRAVITY / Math.max(distSq, 200)
        p.vx += dx * inv * accel * 0.016
        p.vy += dy * inv * accel * 0.016

        const tx = -dy * inv
        const ty = dx * inv
        p.vx += tx * SWIRL * (accel * 0.0004)
        p.vy += ty * SWIRL * (accel * 0.0004)

        const sp = Math.hypot(p.vx, p.vy)
        if (sp > MAX_SPEED) {
          p.vx = (p.vx / sp) * MAX_SPEED
          p.vy = (p.vy / sp) * MAX_SPEED
        }

        p.x += p.vx
        p.y += p.vy
        p.life += 1

        const proximity = 1 - Math.min(1, dist / 280)
        const alpha = 0.25 + proximity * 0.65
        const trailLen = 2 + proximity * 8
        const tx2 = p.x - p.vx * trailLen * 0.6
        const ty2 = p.y - p.vy * trailLen * 0.6

        ctx.strokeStyle = `rgba(245, 245, 245, ${alpha.toFixed(3)})`
        ctx.lineWidth = p.size
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(tx2, ty2)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }

      ctx.fillStyle = '#0A0A0A'
      ctx.beginPath()
      ctx.arc(hole.x, hole.y, HOLE_RADIUS, 0, Math.PI * 2)
      ctx.fill()

      ctx.lineWidth = 1
      for (let r = 0; r < RING_COUNT; r++) {
        const radius = HOLE_RADIUS + r * RING_STEP
        const alpha = 0.18 * (1 - r / RING_COUNT)
        ctx.strokeStyle = `rgba(138, 138, 138, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(hole.x, hole.y, radius, 0, Math.PI * 2)
        ctx.stroke()
      }

      raf = requestAnimationFrame(step)
    }

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) return
      hole.tx = x
      hole.ty = y
    }

    resize()
    raf = requestAnimationFrame(step)
    window.addEventListener('resize', resize)
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', onClick)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  )
}
