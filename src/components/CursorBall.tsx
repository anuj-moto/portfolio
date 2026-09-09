import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const BALL_RADIUS = 28
const TRAIL_LENGTH = 14
const CURSOR_RADIUS = 180
const CURSOR_RADIUS_SQ = CURSOR_RADIUS * CURSOR_RADIUS
const PUSH_FORCE = 1.4
const FRICTION = 0.965
const SPAWN_X = 60
const SPAWN_Y = 60
const RESPAWN_MARGIN = 80

export function CursorBall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const [speed, setSpeed] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    const ball = { x: SPAWN_X, y: SPAWN_Y, vx: 0, vy: 0 }
    const trail: { x: number; y: number }[] = []
    const mouse = { x: -9999, y: -9999, inside: false }
    let raf = 0
    let lastEmit = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const respawn = () => {
      ball.x = SPAWN_X
      ball.y = SPAWN_Y
      ball.vx = 0
      ball.vy = 0
      trail.length = 0
    }

    const step = (now: number) => {
      ctx.clearRect(0, 0, width, height)

      if (!reduced && mouse.inside) {
        const dx = ball.x - mouse.x
        const dy = ball.y - mouse.y
        const distSq = dx * dx + dy * dy
        if (distSq < CURSOR_RADIUS_SQ && distSq > 0.0001) {
          const dist = Math.sqrt(distSq)
          const t = 1 - dist / CURSOR_RADIUS
          const force = t * t * PUSH_FORCE
          ball.vx += (dx / dist) * force
          ball.vy += (dy / dist) * force
        }
      }

      if (!reduced) {
        ball.vx *= FRICTION
        ball.vy *= FRICTION
        ball.x += ball.vx
        ball.y += ball.vy
      }

      if (
        ball.x < -RESPAWN_MARGIN ||
        ball.x > width + RESPAWN_MARGIN ||
        ball.y < -RESPAWN_MARGIN ||
        ball.y > height + RESPAWN_MARGIN
      ) {
        respawn()
      }

      trail.push({ x: ball.x, y: ball.y })
      if (trail.length > TRAIL_LENGTH) trail.shift()

      for (let i = 0; i < trail.length - 1; i++) {
        const t = i / trail.length
        const r = BALL_RADIUS * (0.4 + t * 0.6)
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 245, 245, ${(t * 0.07).toFixed(3)})`
        ctx.fill()
      }

      const glow = ctx.createRadialGradient(
        ball.x,
        ball.y,
        BALL_RADIUS * 0.2,
        ball.x,
        ball.y,
        BALL_RADIUS * 3
      )
      glow.addColorStop(0, 'rgba(245, 245, 245, 0.35)')
      glow.addColorStop(1, 'rgba(245, 245, 245, 0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, BALL_RADIUS * 3, 0, Math.PI * 2)
      ctx.fill()

      const core = ctx.createRadialGradient(
        ball.x - BALL_RADIUS * 0.3,
        ball.y - BALL_RADIUS * 0.3,
        BALL_RADIUS * 0.1,
        ball.x,
        ball.y,
        BALL_RADIUS
      )
      core.addColorStop(0, 'rgba(255, 255, 255, 1)')
      core.addColorStop(0.6, 'rgba(230, 230, 230, 0.95)')
      core.addColorStop(1, 'rgba(180, 180, 180, 0.85)')
      ctx.fillStyle = core
      ctx.beginPath()
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2)
      ctx.fill()

      if (now - lastEmit > 80) {
        lastEmit = now
        const v = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy)
        setSpeed(v)
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

    resize()
    raf = requestAnimationFrame(step)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  const speedLabel = (speed * 60).toFixed(1)

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-6 left-6 z-[3] flex items-center gap-3 rounded-full border border-[#242424] bg-[rgba(10,10,10,0.55)] px-3 py-1.5 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#F5F5F5]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
          Ball Speed
        </span>
        <span className="font-mono text-[11px] text-[#F5F5F5] tabular-nums">
          {speedLabel}
          <span className="text-[#5A5A5A]"> px/s</span>
        </span>
      </div>
    </>
  )
}
