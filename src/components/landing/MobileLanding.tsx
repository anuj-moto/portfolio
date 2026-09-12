import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { AmbientBackground } from '@/components/AmbientBackground'
import { WipeLink } from '@/components/transition/WipeLink'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { sections } from '@/data/sections'

// Viewport-heights of scroll spent on each section before the next expands.
const STEP = 0.85

/**
 * Mobile landing: a scroll-driven accordion. The section in focus expands to
 * show its image + "Click to view more"; the others collapse to title rows.
 * A tall scroll track drives which one is active while the accordion stays
 * pinned (sticky), so heights animate without the page jumping.
 */
export function MobileLanding() {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const step = window.innerHeight * STEP
        const idx = step > 0 ? Math.round(window.scrollY / step) : 0
        setActive(Math.max(0, Math.min(sections.length - 1, idx)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const goTo = (i: number) =>
    window.scrollTo({
      top: Math.round(window.innerHeight * STEP * i),
      behavior: 'smooth',
    })

  const rowTransition = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 260, damping: 34 }

  return (
    <div
      className="relative bg-bg text-text"
      style={{ height: `${(sections.length - 1) * STEP * 100 + 100}svh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <AmbientBackground />

        <header className="relative z-20 flex h-14 shrink-0 items-center justify-between px-5">
          <span className="font-display text-sm font-medium tracking-tight text-text">
            Anuj Shukla<span className="text-text-muted"> / Designer</span>
          </span>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              className="relative -mr-2 flex h-10 w-10 items-center justify-center"
              aria-label="Open menu"
            >
              <span className="flex flex-col gap-[6px]">
                <span className="block h-px w-6 bg-text" />
                <span className="block h-px w-6 bg-text" />
              </span>
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="flex w-full flex-col border-l border-border bg-bg p-0 text-text duration-500 data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full data-starting-style:opacity-100 data-ending-style:opacity-100 sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
                <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-text" />
                  Available — 2026
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="-mr-2 flex h-10 w-10 items-center justify-center"
                >
                  <span className="relative block h-5 w-5">
                    <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-text" />
                    <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-text" />
                  </span>
                </button>
              </div>

              <nav className="flex flex-1 flex-col overflow-y-auto px-6 pt-8">
                {sections.map((s) => (
                  <WipeLink
                    key={s.key}
                    to={s.path}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-border py-5"
                  >
                    <span className="font-mono text-[10px] tabular-nums text-text-dim">
                      {s.index}
                    </span>
                    <span className="font-display text-2xl font-medium tracking-tight text-text transition-colors group-hover:text-white">
                      {s.title}
                    </span>
                    <span className="ml-auto text-text-dim">↗</span>
                  </WipeLink>
                ))}
              </nav>

              <div className="shrink-0 border-t border-border px-6 pb-8 pt-6">
                <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2">
                  <a
                    href="https://www.linkedin.com/in/anuj-shukla-aba470196/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1gerUpX21IzRlN5F18LThwrSOnyEElQ91/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
                  >
                    Resume
                  </a>
                </div>
                <a
                  href="mailto:anujshukla521as@gmail.com"
                  className="break-all font-display text-base text-text transition-colors hover:text-white"
                >
                  anujshukla521as@gmail.com
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          {sections.map((s, i) => {
            const isActive = i === active
            // Keep the mobile image big: drop the desktop height and let it fill the
            // panel, so taller collapsed rows don't shrink the image.
            const imgPos = (s.imageClass ?? 'left-1/2 -translate-x-1/2 h-[58%]')
              .replace(/\s*h-\[[^\]]*\]/g, '')
              .trim()
            const body = (
              <>
                {isActive && (
                  <motion.img
                    key={s.image}
                    src={s.image}
                    alt=""
                    aria-hidden
                    loading="eager"
                    decoding="async"
                    initial={reduced ? false : { opacity: 0 }}
                    animate={reduced ? undefined : { opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`pointer-events-none absolute bottom-0 w-auto max-w-none select-none grayscale ${
                      s.imageBrightness ?? 'brightness-90'
                    } ${imgPos} h-[85%]`}
                  />
                )}
                <div
                  className={
                    isActive
                      ? 'relative z-10 flex h-full flex-col justify-between p-5'
                      : 'relative z-10 flex min-h-[6rem] items-center px-5 py-4'
                  }
                >
                  <motion.h2
                    layout="position"
                    className={`font-display font-medium tracking-tight ${
                      isActive ? 'text-3xl text-white' : 'text-lg text-text-muted'
                    }`}
                  >
                    {s.title}
                  </motion.h2>
                  {isActive && (
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                      Click to view more
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </>
            )
            return (
              <motion.div
                key={s.key}
                layout
                transition={rowTransition}
                className={`relative overflow-hidden border-t border-border first:border-t-0 ${
                  isActive ? 'flex-1' : 'shrink-0'
                }`}
              >
                {isActive ? (
                  <WipeLink to={s.path} aria-label={s.title} className="block h-full">
                    {body}
                  </WipeLink>
                ) : (
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to ${s.title}`}
                    className="block w-full text-left"
                  >
                    {body}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {active < sections.length - 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex flex-col items-center gap-1 text-[9px] uppercase tracking-[0.25em] text-text-muted">
            <span>Scroll</span>
            <motion.span
              animate={reduced ? undefined : { y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <ArrowDown className="h-3 w-3" />
            </motion.span>
          </div>
        )}
      </div>
    </div>
  )
}
