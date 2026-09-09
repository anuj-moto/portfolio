import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: '01',
    title: 'Research & Discovery',
    description:
      'AI-assisted synthesis of interviews, competitive scans, and market data. Pattern recognition at scale, guided by human intuition.',
    tools: ['Interviews', 'AI Synthesis', 'Competitive Audit'],
  },
  {
    number: '02',
    title: 'Strategy & Architecture',
    description:
      'Information architecture and user flows shaped by insight. Every interaction mapped before a single pixel is drawn.',
    tools: ['User Flows', 'IA Mapping', 'Jobs-to-be-Done'],
  },
  {
    number: '03',
    title: 'AI-Assisted Design',
    description:
      'Rapid exploration through generative tools. I generate dozens of directions, then curate and refine. AI proposes, I dispose.',
    tools: ['Figma', 'Generative UI', 'Design Systems'],
  },
  {
    number: '04',
    title: 'Prototype & Validate',
    description:
      'Interactive prototypes tested with real users. AI surfaces usability issues from session recordings I might miss.',
    tools: ['Prototyping', 'Usability', 'AI Analytics'],
  },
  {
    number: '05',
    title: 'Ship & Iterate',
    description:
      'Close collaboration with engineering through launch. UX monitoring catches regressions before users do.',
    tools: ['Dev Handoff', 'QA Review', 'Monitoring'],
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const rows = sectionRef.current?.querySelectorAll('.process-row')
      if (rows) {
        gsap.from(rows, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-32 md:py-44 px-6 border-t border-[#242424]"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="03"
          label="Process"
          title="A workflow built around signal."
          description="Every phase is augmented by AI — not to replace thinking, but to amplify it. The craft stays human."
        />

        <div className="mt-24">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="process-row group grid md:grid-cols-[120px_1fr_auto] items-start gap-8 md:gap-12 py-10 border-t border-[#242424] last:border-b"
            >
              <span className="font-display text-5xl md:text-6xl font-medium text-[#5A5A5A] group-hover:text-[#F5F5F5] transition-colors duration-500 leading-none">
                {step.number}
              </span>

              <div className="max-w-xl">
                <h3 className="font-display text-2xl md:text-3xl text-[#F5F5F5] mb-3 font-medium">
                  {step.title}
                </h3>
                <p className="text-[#8A8A8A] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:justify-end md:max-w-[200px]">
                {step.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-[#242424] text-[#8A8A8A]"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <span className="hidden md:block text-[10px] font-mono text-[#5A5A5A] md:col-span-3 -mt-6">
                {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
