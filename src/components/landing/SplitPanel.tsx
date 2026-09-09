import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { WipeLink } from '@/components/transition/WipeLink'
import type { SectionMeta } from '@/data/sections'

interface SplitPanelProps {
  section: SectionMeta
  index: number
  active: number | null
  setActive: (i: number | null) => void
  reduced: boolean
}

export function SplitPanel({
  section,
  index,
  active,
  setActive,
  reduced,
}: SplitPanelProps) {
  const isActive = active === index
  // idle: all equal · one hovered: it grows, the rest compress
  const grow = active === null ? 1 : isActive ? 2.4 : 0.72

  return (
    <motion.div
      onHoverStart={() => !reduced && setActive(index)}
      onHoverEnd={() => !reduced && setActive(null)}
      animate={reduced ? undefined : { flexGrow: grow }}
      transition={{ type: 'spring', stiffness: 190, damping: 28 }}
      style={{ flexGrow: reduced ? 1 : undefined, flexBasis: 0 }}
      className="group relative min-h-[38svh] flex-1 overflow-hidden border-border border-t first:border-t-0 md:min-h-0 md:border-t-0 md:border-l md:first:border-l-0"
    >
      <WipeLink
        to={section.path}
        aria-label={`${section.title} — ${section.teaser}`}
        className="absolute inset-0 flex flex-col justify-between p-5 transition-colors duration-500 hover:bg-surface/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text/50 md:p-6 lg:p-8"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-text-dim transition-colors duration-300 group-hover:text-text-muted">
            {section.index}
          </span>
          <ArrowUpRight className="h-4 w-4 text-text-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <div className="flex flex-1 items-end md:items-center">
          <h2 className="font-display font-medium tracking-tight text-text-dim transition-colors duration-500 group-hover:text-text text-3xl sm:text-4xl md:text-[clamp(1.5rem,2.4vw,2.75rem)] md:leading-none md:[writing-mode:vertical-rl]">
            {section.title}
          </h2>
        </div>

        <p className="max-w-[24ch] text-xs text-text-muted opacity-70 transition-all duration-500 md:translate-y-2 md:text-sm md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {section.teaser}
        </p>
      </WipeLink>
    </motion.div>
  )
}
