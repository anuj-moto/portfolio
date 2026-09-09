import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { experience, type ExperienceEntry } from '@/data/experience'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMobileDetect } from '@/hooks/useMobileDetect'
import { cn } from '@/lib/utils'

function ExperienceRow({ entry }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const { isMobile } = useMobileDetect()

  // Hover reveals on desktop; tap toggles on touch; focus reveals for keyboard.
  const desktopHover = isMobile
    ? {}
    : { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) }

  return (
    <div
      {...desktopHover}
      tabIndex={0}
      aria-expanded={open}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => isMobile && setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen((o) => !o)
        }
      }}
      className="group cursor-pointer border-t border-border py-8 outline-none transition-colors last:border-b hover:bg-surface/30 focus-visible:bg-surface/30 md:py-10"
    >
      <div className="grid gap-3 md:grid-cols-[130px_1fr_auto] md:gap-8">
        <span className="font-mono text-xs text-text-dim">{entry.year}</span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted">
              {entry.company}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-dim">
              · {entry.location}
            </span>
          </div>
          <h3 className="mt-2 font-display text-2xl font-medium text-text md:text-3xl">
            {entry.role}
          </h3>
          <p className="mt-2 max-w-md text-text-muted">{entry.overview}</p>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-4 max-w-xl leading-relaxed text-text-muted">
                  {entry.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span aria-hidden className="hidden items-start md:flex">
          <span
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-lg leading-none text-text-muted transition-all duration-300',
              open && 'rotate-45 border-text text-text',
            )}
          >
            +
          </span>
        </span>
      </div>
    </div>
  )
}

export function ExperienceList() {
  return (
    <div>
      {experience.map((entry) => (
        <ExperienceRow key={`${entry.year}-${entry.company}`} entry={entry} />
      ))}
    </div>
  )
}
