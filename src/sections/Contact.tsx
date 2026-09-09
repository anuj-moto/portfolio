import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [projectType, setProjectType] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClasses =
    'w-full h-12 px-0 border-0 border-b border-[#242424] bg-transparent text-[#F5F5F5] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#F5F5F5] transition-colors duration-300'

  return (
    <section
      id="contact"
      className="relative py-32 md:py-44 px-6 border-t border-[#242424]"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="06"
          label="Contact"
          title="Have something quiet to build?"
          description="Open to select product design work and partnerships. Short notes get short replies — fast."
        />

        <div className="grid lg:grid-cols-2 gap-16 mt-24 items-start">
          <div className="space-y-10 min-w-0">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-3">
                Direct
              </p>
              <a
                href="mailto:anujshukla521as@gmail.com"
                className="font-display text-xl md:text-2xl text-[#F5F5F5] hover:text-[#FFFFFF] transition-colors inline-flex max-w-full items-center gap-3 group"
              >
                {/* min-w-0 lets the address shrink below its min-content width;
                    without it the flex item forces the grid column wider than
                    the viewport at 320px. */}
                <span className="min-w-0 [overflow-wrap:anywhere]">
                  anujshukla521as@gmail.com
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#5A5A5A] group-hover:text-[#F5F5F5] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0" />
              </a>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-3">
                Elsewhere
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://www.linkedin.com/in/anuj-shukla-aba470196/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline self-start text-[#F5F5F5] hover:text-[#FFFFFF] transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://drive.google.com/file/d/1gerUpX21IzRlN5F18LThwrSOnyEElQ91/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline self-start text-[#F5F5F5] hover:text-[#FFFFFF] transition-colors"
                >
                  Resume
                </a>
                <a
                  href="tel:+918758745659"
                  className="animated-underline self-start text-[#F5F5F5] hover:text-[#FFFFFF] transition-colors"
                >
                  +91 87587 45659
                </a>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-3">
                Based
              </p>
              <p className="text-[#F5F5F5]">India · Remote, working across time zones</p>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-[#242424] rounded-sm p-12 flex flex-col items-start gap-4"
            >
              <CheckCircle2 className="w-8 h-8 text-[#F5F5F5]" strokeWidth={1.5} />
              <h3 className="font-display text-2xl text-[#F5F5F5] font-medium">
                Message received
              </h3>
              <p className="text-[#8A8A8A] leading-relaxed">
                Thanks — I'll get back to you within 24 hours.
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A] mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="—"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A] mb-2"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="—"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-type"
                  className="block text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A] mb-2"
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
                  <option value="" disabled className="bg-[#0A0A0A]">
                    Select a type
                  </option>
                  <option value="product-design" className="bg-[#0A0A0A]">
                    Product Design
                  </option>
                  <option value="design-system" className="bg-[#0A0A0A]">
                    Design System
                  </option>
                  <option value="ai-product" className="bg-[#0A0A0A]">
                    AI Product
                  </option>
                  <option value="consulting" className="bg-[#0A0A0A]">
                    Consulting
                  </option>
                  <option value="other" className="bg-[#0A0A0A]">
                    Other
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="—"
                  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#242424] text-[#F5F5F5] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#F5F5F5] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 h-12 px-8 bg-[#F5F5F5] text-[#0A0A0A] text-xs uppercase tracking-[0.2em] font-medium rounded-full hover:bg-[#FFFFFF] transition-colors"
              >
                Send Message
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  )
}
