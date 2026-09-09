import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function FluidBackdrop() {
  const reduced = useReducedMotion()
  const mx = useMotionValue(-9999)
  const my = useMotionValue(-9999)

  // Two blobs with different inertia = sense of fluid trailing depth
  const sx1 = useSpring(mx, { stiffness: 60, damping: 18, mass: 1 })
  const sy1 = useSpring(my, { stiffness: 60, damping: 18, mass: 1 })
  const sx2 = useSpring(mx, { stiffness: 22, damping: 22, mass: 1.8 })
  const sy2 = useSpring(my, { stiffness: 22, damping: 22, mass: 1.8 })

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, reduced])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Leading blob — crisp, fast */}
      <motion.div
        style={{ x: sx1, y: sy1 }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full mix-blend-screen"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 35%, rgba(255,255,255,0) 70%)',
            filter: 'blur(14px)',
          }}
        />
      </motion.div>

      {/* Trailing blob — larger, slower, tinted cool */}
      <motion.div
        style={{ x: sx2, y: sy2 }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] rounded-full mix-blend-screen"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(180,210,255,0.10) 0%, rgba(180,210,255,0.04) 45%, rgba(180,210,255,0) 75%)',
            filter: 'blur(60px)',
          }}
        />
      </motion.div>

      {/* Warm counter-blob — opposite corner drift for depth */}
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['5%', '-5%', '5%'],
        }}
        transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
        className="absolute top-1/3 right-[-8%] w-[560px] h-[560px] rounded-full mix-blend-screen"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,220,180,0.06) 0%, rgba(255,220,180,0.02) 50%, rgba(255,220,180,0) 75%)',
            filter: 'blur(80px)',
          }}
        />
      </motion.div>
    </div>
  )
}
