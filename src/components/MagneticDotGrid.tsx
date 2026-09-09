import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SPACING = 40
const DOT_RADIUS = 1
const INFLUENCE = 140
const INFLUENCE_SQ = INFLUENCE * INFLUENCE
const MAX_PUSH = 22
const EASE = 0.12
const DOT_COLOR = 'rgba(90, 90, 90, 0.55)'

type Dot = { x: number; y: number; dx: number; dy: number }

export function MagneticDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dots: Dot[] = []
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const mouse = { x: -9999, y: -9999, inside: false }
    let running = false
    let raf = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      const cols = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1
      const offsetX = (width - (cols - 1) * SPACING) / 2
      const offsetY = (height - (rows - 1) * SPACING) / 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: offsetX + c * SPACING,
            y: offsetY + r * SPACING,
            dx: 0,
            dy: 0,
          })
        }
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = DOT_COLOR
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x + d.dx, d.y + d.dy, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const step = () => {
      if (!reduced && mouse.inside) {
        for (const d of dots) {
          const vx = d.x - mouse.x
          const vy = d.y - mouse.y
          const distSq = vx * vx + vy * vy
          let targetDx = 0
          let targetDy = 0
          if (distSq < INFLUENCE_SQ && distSq > 0.0001) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / INFLUENCE
            const push = t * t * MAX_PUSH
            targetDx = (vx / dist) * push
            targetDy = (vy / dist) * push
          }
          d.dx += (targetDx - d.dx) * EASE
          d.dy += (targetDy - d.dy) * EASE
        }
      } else {
        let settling = false
        for (const d of dots) {
          d.dx += (0 - d.dx) * EASE
          d.dy += (0 - d.dy) * EASE
          if (Math.abs(d.dx) > 0.05 || Math.abs(d.dy) > 0.05) settling = true
        }
        if (!settling && !mouse.inside) {
          running = false
          render()
          return
        }
      }
      render()
      raf = requestAnimationFrame(step)
    }

    const start = () => {
      if (running || reduced) return
      running = true
      raf = requestAnimationFrame(step)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouse.x = x
      mouse.y = y
      const wasInside = mouse.inside
      mouse.inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      if (mouse.inside && !wasInside) start()
    }

    const onLeave = () => {
      mouse.inside = false
      start()
    }

    const onResize = () => {
      build()
      render()
    }

    build()
    render()
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
