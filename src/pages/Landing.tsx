import { useState } from 'react'
import { AmbientBackground } from '@/components/AmbientBackground'
import { SplitPanel } from '@/components/landing/SplitPanel'
import { MobileLanding } from '@/components/landing/MobileLanding'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { sections } from '@/data/sections'

export default function Landing() {
  const { isMobile } = useMobileDetect()
  const [active, setActive] = useState<number | null>(null)
  const reduced = useReducedMotion()

  // Mobile gets the scroll-driven accordion; desktop keeps the hover split-panels.
  if (isMobile) return <MobileLanding />

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-bg text-text">
      <AmbientBackground />

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between px-5 md:px-8">
          <span className="font-display text-sm font-medium tracking-tight text-text">
            Anuj Shukla
            <span className="text-text-muted"> / Designer</span>
          </span>
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-text" />
            Available — 2026
          </span>
        </header>

        <div
          className="flex flex-1 flex-col md:flex-row"
          onMouseLeave={() => setActive(null)}
        >
          {sections.map((s, i) => (
            <SplitPanel
              key={s.key}
              section={s}
              index={i}
              active={active}
              setActive={setActive}
              reduced={reduced}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
