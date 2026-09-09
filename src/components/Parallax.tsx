import { useRef, type ReactNode, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Speed = 'slow' | 'base' | 'fast' | number

const SPEED_MAP: Record<'slow' | 'base' | 'fast', number> = {
  slow: 0.15,
  base: 0.35,
  fast: 0.6,
}

interface ParallaxProps {
  children: ReactNode
  speed?: Speed
  className?: string
  style?: CSSProperties
  as?: 'div' | 'span' | 'section'
}

export function Parallax({
  children,
  speed = 'base',
  className,
  style,
  as: Tag = 'div',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const factor =
    typeof speed === 'number' ? speed : SPEED_MAP[speed]

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      const el = ref.current
      const distance = 140 * factor

      const tween = gsap.fromTo(
        el,
        { yPercent: 0, y: -distance / 2 },
        {
          yPercent: 0,
          y: distance / 2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { dependencies: [factor, reduced], scope: ref }
  )

  return (
    <Tag ref={ref as never} className={className} style={style}>
      {children}
    </Tag>
  )
}

ScrollTrigger.config({ ignoreMobileResize: true })
