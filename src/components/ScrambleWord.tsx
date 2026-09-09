import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DEFAULT_POOL =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#*<>/_-'
const SWAP_INTERVAL = 50

type Props = {
  text: string
  delay?: number
  charStagger?: number
  revealDuration?: number
  glyphPool?: string
  className?: string
}

export function ScrambleWord({
  text,
  delay = 0,
  charStagger = 0.04,
  revealDuration = 0.5,
  glyphPool = DEFAULT_POOL,
  className,
}: Props) {
  const reduced = useReducedMotion()
  const [frame, setFrame] = useState<string>(() =>
    reduced ? text : text.replace(/\S/g, '\u00A0')
  )

  useEffect(() => {
    if (reduced) {
      setFrame(text)
      return
    }

    const chars = text.split('')
    const current: string[] = chars.map((c) => (c === ' ' ? ' ' : '\u00A0'))
    const startMs = performance.now() + delay * 1000
    const charRevealMs = revealDuration * 1000
    const charStaggerMs = charStagger * 1000
    let lastSwapAt = 0
    let raf = 0

    const tick = (now: number) => {
      const swap = now - lastSwapAt >= SWAP_INTERVAL
      if (swap) lastSwapAt = now
      let allDone = true
      for (let i = 0; i < chars.length; i++) {
        const real = chars[i]
        if (real === ' ') {
          current[i] = ' '
          continue
        }
        const startAt = startMs + i * charStaggerMs
        const settleAt = startAt + charRevealMs
        if (now < startAt) {
          current[i] = '\u00A0'
          allDone = false
        } else if (now < settleAt) {
          if (swap) {
            current[i] =
              glyphPool[Math.floor(Math.random() * glyphPool.length)]
          }
          allDone = false
        } else {
          current[i] = real
        }
      }
      setFrame(current.join(''))
      if (!allDone) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, charStagger, revealDuration, glyphPool, reduced])

  return (
    <span className={className} style={{ whiteSpace: 'pre' }}>
      {frame}
    </span>
  )
}
