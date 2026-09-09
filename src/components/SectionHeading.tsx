import { motion } from 'framer-motion'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const isCenter = align === 'center'
  return (
    <div
      className={`mb-20 ${isCenter ? 'text-center mx-auto' : 'text-left'}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-4 mb-10 ${
          isCenter ? 'justify-center' : ''
        }`}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] font-mono">
          {index}
        </span>
        <span className="h-px w-12 bg-[#242424]" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
          {label}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] max-w-3xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`mt-6 text-[#8A8A8A] text-base md:text-lg leading-relaxed max-w-xl ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
