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
  // The images are transparent PNG cut-outs of each section's subject, so they
  // sit on the dark UI with no rectangle/seam — no masks or fades needed.
  // object-contain shows the whole subject; object-bottom anchors it low.
  const imageClass = section.imageZoom ?? 'object-contain object-bottom'
  // per-image brightness: dark subjects stay visible, bright ones (phone, papers)
  // get dimmed so they read as quiet texture, not a bright pop.
  const imageBrightness = section.imageBrightness ?? 'brightness-[0.9]'

  return (
    <motion.div
      onHoverStart={() => !reduced && setActive(index)}
      onHoverEnd={() => !reduced && setActive(null)}
      animate={reduced ? undefined : { flexGrow: grow }}
      transition={{ type: 'spring', stiffness: 190, damping: 28 }}
      style={{ flexGrow: reduced ? 1 : undefined, flexBasis: 0 }}
      className="group relative min-h-[38svh] flex-1 overflow-hidden border-border border-t first:border-t-0 md:min-h-0 md:border-t-0 md:border-l md:first:border-l-0"
    >
      {/* Hover-reveal — a transparent PNG cut-out of the section's subject.
          Because it has no background, it sits on the dark UI with no rectangle,
          seam, or fade needed. Sits behind <WipeLink> (earlier in DOM), desktop-only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden overflow-hidden opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none md:block"
      >
        <img
          src={section.image}
          alt=""
          loading="eager"
          decoding="async"
          className={`absolute inset-0 h-full w-full grayscale ${imageBrightness} ${imageClass}`}
        />
        {/* subtle bottom scrim → keeps the teaser legible over the subject */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/4"
          style={{
            background:
              'linear-gradient(0deg,rgba(10,10,10,0.8) 0%,transparent 100%)',
          }}
        />
      </div>

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
