import { useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { OrbitalSystem } from '@/components/OrbitalSystem'
import { ScrambleWord } from '@/components/ScrambleWord'

const WORD_STAGGER = 0.18
const CHAR_STAGGER = 0.04
const REVEAL_DURATION = 0.5

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  const line1 = ['Design', 'systems']
  const line2 = ['for', 'AI-first', 'products.']

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(
        subtitleRef.current,
        { opacity: 0, y: 16, duration: 0.8, ease: 'power3.out' },
        0.7
      ).from(
        ctaRef.current,
        { opacity: 0, y: 16, duration: 0.6, ease: 'power3.out' },
        1.0
      )
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] min-h-[640px] flex flex-col justify-end pb-24 lg:pb-28 pt-28 px-6 overflow-hidden"
    >
      {/* Interactive backdrop — fluid cursor blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <OrbitalSystem />

        {/* Top + bottom fade so navbar and scroll indicator stay clean */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.45) 0%, transparent 18%, transparent 82%, rgba(10,10,10,0.7) 100%)',
          }}
        />
        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-[2] max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5F5F5]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
            Available for projects — 2026
          </span>
        </motion.div>

        <h1
          className="font-display font-medium text-[#F5F5F5] tracking-tight"
          style={{
            fontSize: 'clamp(2.25rem, 6.5vw, 6rem)',
            lineHeight: 0.95,
          }}
        >
          <span className="block pb-[0.15em]">
            {line1.map((word, wi) => (
              <span key={word} className="inline-block mr-[0.2em]">
                <ScrambleWord
                  text={word}
                  delay={wi * WORD_STAGGER}
                  charStagger={CHAR_STAGGER}
                  revealDuration={REVEAL_DURATION}
                />
              </span>
            ))}
          </span>
          <span className="block pb-[0.15em]">
            {line2.map((word, wi) => (
              <span
                key={word}
                className={`inline-block mr-[0.2em] ${
                  wi === line2.length - 1
                    ? 'text-[#5A5A5A] italic font-light'
                    : ''
                }`}
              >
                <ScrambleWord
                  text={word}
                  delay={(line1.length + wi) * WORD_STAGGER}
                  charStagger={CHAR_STAGGER}
                  revealDuration={REVEAL_DURATION}
                />
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <p
            ref={subtitleRef}
            className="text-base md:text-lg text-[#8A8A8A] max-w-xl leading-relaxed"
          >
            I'm Anuj — a Product Designer with 4+ years building scalable
            design systems and AI-first interfaces. I ship work that lifts
            conversion, retention, and engagement for the teams I join.
          </p>

          <div ref={ctaRef} className="flex gap-4 flex-wrap">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 h-12 px-7 bg-[#F5F5F5] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-colors hover:bg-[#FFFFFF]"
            >
              View Work
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 h-12 px-7 border border-[#242424] text-[#F5F5F5] text-xs uppercase tracking-[0.2em] font-medium rounded-full transition-colors hover:border-[#F5F5F5]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-6 z-[3] hidden lg:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3 h-3" />
        </motion.span>
      </motion.div>
    </section>
  )
}
