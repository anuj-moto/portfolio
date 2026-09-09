import { motion } from 'framer-motion'
import { processSteps } from '@/data/process'

/** The design process, shown as a simple left→right flow. */
export function ProcessFlow() {
  return (
    <div className="grid gap-10 md:grid-cols-5 md:gap-4">
      {processSteps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          {/* connector line to the next node (desktop) */}
          {i < processSteps.length - 1 && (
            <span
              aria-hidden
              className="absolute left-10 right-0 top-4 hidden h-px bg-border md:block"
            />
          )}

          <div className="flex items-center gap-3">
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-bg font-mono text-xs text-text-muted transition-colors duration-300 group-hover:border-text group-hover:text-text">
              {step.number}
            </span>
            <span aria-hidden className="h-px flex-1 bg-border md:hidden" />
          </div>

          <h3 className="mt-4 font-display text-lg font-medium text-text">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {step.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {step.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-text-dim"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
