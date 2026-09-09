import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PARTICLE_DENSITY = 0.00009
const MAX_PARTICLES = 110
const MIN_PARTICLES = 36
const LINK_DIST = 130
const LINK_DIST_SQ = LINK_DIST * LINK_DIST
const CURSOR_RADIUS = 180
const CURSOR_RADIUS_SQ = CURSOR_RADIUS * CURSOR_RADIUS
const CURSOR_PUSH = 0.55
const FRICTION = 0.985
const PARTICLE_COLOR = 'rgba(245, 245, 245, 0.55)'
const LINK_COLOR = '245, 245, 245'

type P = { x: number; y: number; vx: number; vy: number }

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: P[] = []
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999, inside: false }
    let raf = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const target = Math.max(
        MIN_PARTICLES,
        Math.min(MAX_PARTICLES, Math.floor(width * height * PARTICLE_DENSITY))
      )
      particles = new Array(target).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        if (!reduced) {
          if (mouse.inside) {
            const dx = p.x - mouse.x
            const dy = p.y - mouse.y
            const distSq = dx * dx + dy * dy
            if (distSq < CURSOR_RADIUS_SQ && distSq > 0.0001) {
              const dist = Math.sqrt(distSq)
              const t = 1 - dist / CURSOR_RADIUS
              const force = t * t * CURSOR_PUSH
              p.vx += (dx / dist) * force
              p.vy += (dy / dist) * force
            }
          }
          p.vx *= FRICTION
          p.vy *= FRICTION
          p.x += p.vx
          p.y += p.vy

          if (p.x < -10) p.x = width + 10
          else if (p.x > width + 10) p.x = -10
          if (p.y < -10) p.y = height + 10
          else if (p.y > height + 10) p.y = -10
        }
      }

      ctx.strokeStyle = LINK_COLOR
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distSq = dx * dx + dy * dy
          if (distSq < LINK_DIST_SQ) {
            const alpha = (1 - distSq / LINK_DIST_SQ) * 0.35
            ctx.strokeStyle = `rgba(${LINK_COLOR}, ${alpha.toFixed(3)})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = PARTICLE_COLOR
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.x = x
      mouse.y = y
      mouse.inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
    }

    const onLeave = () => {
      mouse.inside = false
    }

    const onResize = () => build()

    build()
    raf = requestAnimationFrame(step)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('resize', onResize)
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
