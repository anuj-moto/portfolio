import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function CursorGlow() {
  const reduced = useReducedMotion()
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 60, damping: 20, mass: 0.6 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reduced) return
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y, reduced, visible])

  if (reduced) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen"
      style={{
        x: sx,
        y: sy,
        opacity: visible ? 1 : 0,
        background:
          'radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.14) 30%, rgba(245,245,245,0.05) 55%, transparent 75%)',
        filter: 'blur(50px)',
        transition: 'opacity 500ms ease',
      }}
    />
  )
}
