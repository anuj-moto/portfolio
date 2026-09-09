import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { WipeLink } from '@/components/transition/WipeLink'
import { Separator } from '@/components/Separator'

interface SectionShellProps {
  index: string
  title: string
  backTo?: string
  backLabel?: string
  children: ReactNode
}

/**
 * The consistent template every section page inherits:
 * Navbar (from layout) → [← Back] left / index · title right → separator →
 * content blocks. Same layout throughout the site.
 */
export function SectionShell({
  index,
  title,
  backTo = '/',
  backLabel = 'Back',
  children,
}: SectionShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-24 md:px-8 md:pt-28 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <WipeLink
            to={backTo}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-text-muted transition-colors hover:text-text focus:outline-none focus-visible:text-text"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            {backLabel}
          </WipeLink>
          <h1 className="flex items-baseline gap-3 text-right font-display text-2xl font-medium tracking-tight text-text md:text-4xl">
            <span className="font-mono text-xs text-text-dim md:text-sm">{index}</span>
            {title}
          </h1>
        </div>

        <Separator className="mt-6 md:mt-8" />

        <div className="mt-10 md:mt-14">{children}</div>
      </div>
    </motion.div>
  )
}
