import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SeparatorProps {
  className?: string
  /** Animate the line drawing in from the left on mount. */
  animated?: boolean
}

/**
 * The reusable hairline that divides every content block across the site.
 * Centralizes the border token so we never scatter ad-hoc `border-t` rules.
 */
export function Separator({ className, animated = false }: SeparatorProps) {
  if (animated) {
    return (
      <motion.div
        role="separator"
        aria-hidden
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'left' }}
        className={cn('h-px w-full bg-border', className)}
      />
    )
  }
  return (
    <div role="separator" aria-hidden className={cn('h-px w-full bg-border', className)} />
  )
}
