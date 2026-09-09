import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Phase = 'idle' | 'cover' | 'reveal'

interface WipeContextValue {
  /** Cover the screen with a left→right line-wipe, then navigate to `path`. */
  wipeTo: (path: string) => void
  busy: boolean
}

const WipeContext = createContext<WipeContextValue>({
  wipeTo: () => {},
  busy: false,
})

// eslint-disable-next-line react-refresh/only-export-components
export function useWipe() {
  return useContext(WipeContext)
}

const DURATION = 0.5

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const pendingRef = useRef<string | null>(null)
  const busyRef = useRef(false)

  const wipeTo = useCallback(
    (path: string) => {
      if (busyRef.current) return
      if (path === location.pathname) return
      if (reduced) {
        navigate(path)
        return
      }
      busyRef.current = true
      pendingRef.current = path
      setPhase('cover')
    },
    [location.pathname, navigate, reduced],
  )

  const handleComplete = () => {
    if (phase === 'cover') {
      // Screen is fully covered — swap the route behind the bar, then reveal.
      if (pendingRef.current) navigate(pendingRef.current)
      setPhase('reveal')
    } else if (phase === 'reveal') {
      pendingRef.current = null
      busyRef.current = false
      setPhase('idle')
    }
  }

  // idle: parked off-screen left (reset instantly so it never sweeps backwards)
  // cover: sweep in to full-cover (leading edge moves left→right)
  // reveal: sweep out to the right (uncovering edge moves left→right)
  const x = phase === 'cover' ? '0%' : phase === 'reveal' ? '100%' : '-100%'

  return (
    <WipeContext.Provider value={{ wipeTo, busy: phase !== 'idle' }}>
      {children}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ x }}
        transition={{ duration: phase === 'idle' ? 0 : DURATION, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={handleComplete}
        style={{ pointerEvents: phase === 'idle' ? 'none' : 'auto' }}
        className="fixed inset-0 z-[100] bg-bg"
      >
        {/* Bright leading edges — a line reads as sweeping L→R in both phases */}
        <span className="absolute inset-y-0 right-0 w-px bg-text/80" />
        <span className="absolute inset-y-0 left-0 w-px bg-text/80" />
      </motion.div>
    </WipeContext.Provider>
  )
}
