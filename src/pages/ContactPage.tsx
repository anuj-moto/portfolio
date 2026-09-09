import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { SectionShell } from '@/components/SectionShell'
import { Block } from '@/components/Block'
import { Separator } from '@/components/Separator'

const inputClasses =
  'w-full h-12 px-0 border-0 border-b border-border bg-transparent text-text placeholder:text-text-dim focus:outline-none focus:border-text transition-colors duration-300'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [projectType, setProjectType] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <SectionShell index="05" title="Contact">
      <Block>
        <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text md:text-5xl">
          Have something quiet to build?
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-text-muted md:text-lg">
          Open to select product design work and partnerships. Short notes get
          short replies — fast.
        </p>

        <div className="mt-14 grid items-start gap-16 lg:grid-cols-2">
          <div className="min-w-0 space-y-10">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-text-dim">
                Direct
              </p>
              <a
                href="mailto:anujshukla521as@gmail.com"
                className="group inline-flex max-w-full items-center gap-3 font-display text-xl text-text transition-colors hover:text-white md:text-2xl"
              >
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  anujshukla521as@gmail.com
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
              </a>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-text-dim">
                Elsewhere
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/in/anuj-shukla-aba470196/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline self-start text-text transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://drive.google.com/file/d/1gerUpX21IzRlN5F18LThwrSOnyEElQ91/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline self-start text-text transition-colors hover:text-white"
                >
                  Resume
                </a>
                <a
                  href="tel:+918758745659"
                  className="animated-underline self-start text-text transition-colors hover:text-white"
                >
                  +91 87587 45659
                </a>
              </div>
            </div>

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-text-dim">
                Based
              </p>
              <p className="text-text">India · Remote, working across time zones</p>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start gap-4 rounded-sm border border-border p-12"
            >
              <CheckCircle2 className="h-8 w-8 text-text" strokeWidth={1.5} />
              <h3 className="font-display text-2xl font-medium text-text">
                Message received
              </h3>
              <p className="leading-relaxed text-text-muted">
                Thanks — I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-text-dim"
                  >
                    Name
                  </label>
                  <input id="name" type="text" required placeholder="—" className={inputClasses} />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-text-dim"
                  >
                    Email
                  </label>
                  <input id="email" type="email" required placeholder="—" className={inputClasses} />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-type"
                  className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-text-dim"
                >
                  Project Type
                </label>
                <select
                  id="project-type"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className={`${inputClasses} appearance-none`}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='%238A8A8A' viewBox='0 0 16 16'%3E%3Cpath d='M4.5 6l3.5 4 3.5-4z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 4px center',
                  }}
                >
                  <option value="" disabled className="bg-bg">
                    Select a type
                  </option>
                  <option value="product-design" className="bg-bg">Product Design</option>
                  <option value="design-system" className="bg-bg">Design System</option>
                  <option value="ai-product" className="bg-bg">AI Product</option>
                  <option value="consulting" className="bg-bg">Consulting</option>
                  <option value="other" className="bg-bg">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-text-dim"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="—"
                  className="w-full resize-none border-0 border-b border-border bg-transparent px-0 py-3 text-text placeholder:text-text-dim transition-colors focus:border-text focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex h-12 items-center gap-3 rounded-full bg-text px-8 text-xs font-medium uppercase tracking-[0.2em] text-bg transition-colors hover:bg-white"
              >
                Send Message
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </Block>

      <Separator />

      <Block>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <p className="max-w-md font-display text-2xl leading-tight text-text md:text-3xl">
            Let&apos;s build something quiet, and considered.
          </p>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/anuj-shukla-aba470196/"
                target="_blank"
                rel="noopener noreferrer"
                className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
              >
                LinkedIn
              </a>
              <a
                href="https://drive.google.com/file/d/1gerUpX21IzRlN5F18LThwrSOnyEElQ91/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
              >
                Resume
              </a>
              <a
                href="mailto:anujshukla521as@gmail.com"
                className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
              >
                Email
              </a>
            </div>
            <p className="text-xs text-text-dim">
              © {new Date().getFullYear()} Anuj Shukla. Designed in the dark.
            </p>
          </div>
        </div>
      </Block>
    </SectionShell>
  )
}
