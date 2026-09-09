import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BlockProps {
  /** Small mono eyebrow label above the block. */
  label?: string
  /** Optional right-aligned meta text (e.g. count / date range). */
  meta?: string
  children: ReactNode
  className?: string
}

/**
 * A single content block inside a section page. Consistent eyebrow rhythm so
 * every block on every page reads the same way.
 */
export function Block({ label, meta, children, className }: BlockProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn('py-14 md:py-20', className)}
    >
      {(label || meta) && (
        <div className="mb-8 flex items-baseline justify-between gap-4">
          {label && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              {label}
            </p>
          )}
          {meta && (
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
              {meta}
            </p>
          )}
        </div>
      )}
      {children}
    </motion.section>
  )
}
