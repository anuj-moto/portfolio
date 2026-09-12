import { motion } from 'framer-motion'
import { WipeLink } from '@/components/transition/WipeLink'
import { useMobileDetect } from '@/hooks/useMobileDetect'
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
  // idle: all equal (grow 1) · hovered panel grows to ~36%, the rest settle to ~16%
  const grow = isActive ? 2.2 : 1
  const alignRight = section.align === 'right'
  const { isMobile } = useMobileDetect()

  // Shared image position/appearance (transforms come from imageClass — framer only
  // animates opacity on mobile so it never fights the Tailwind translate utilities).
  const imgBase = `pointer-events-none absolute bottom-0 w-auto max-w-none select-none grayscale ${
    section.imageBrightness ?? 'brightness-90'
  } ${section.imageClass ?? 'left-1/2 -translate-x-1/2 h-[58%]'}`

  return (
    <motion.div
      onHoverStart={() => !reduced && setActive(index)}
      onHoverEnd={() => !reduced && setActive(null)}
      animate={reduced ? undefined : { flexGrow: grow }}
      transition={{ type: 'spring', stiffness: 190, damping: 28 }}
      style={{ flexGrow: reduced ? 1 : undefined, flexBasis: 0 }}
      className="group relative min-h-[38svh] flex-1 overflow-hidden md:min-h-0"
    >
      {/* Inset vertical divider (desktop) / top divider (mobile) — never on the first panel */}
      {index > 0 && (
        <>
          <span
            aria-hidden
            className="absolute left-0 bottom-0 top-0 hidden w-px bg-border md:block"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-border md:hidden"
          />
        </>
      )}

      {/* Section subject cut-out (grayscale, bottom-anchored).
          Mobile: fades in on scroll into view. Desktop: reveals on hover. */}
      {isMobile ? (
        <motion.img
          src={section.image}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={reduced ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`${imgBase} block`}
        />
      ) : (
        <img
          src={section.image}
          alt=""
          aria-hidden
          loading="eager"
          decoding="async"
          className={`${imgBase} hidden opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 md:block`}
        />
      )}

      <WipeLink
        to={section.path}
        aria-label={section.title}
        className={`absolute inset-0 flex items-start p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text/50 md:items-center md:p-6 lg:p-8 ${
          alignRight ? 'justify-end' : 'justify-start'
        }`}
      >
        <h2 className="font-display font-medium tracking-tight text-text-muted transition-colors duration-500 group-hover:font-semibold group-hover:text-white text-3xl sm:text-4xl md:text-[clamp(1.6rem,2.6vw,3rem)] md:leading-none md:rotate-180 md:[writing-mode:vertical-rl]">
          {section.title}
        </h2>
      </WipeLink>
    </motion.div>
  )
}
