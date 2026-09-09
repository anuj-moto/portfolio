import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const figures = [
  {
    value: 27,
    suffix: '+',
    label: 'Projects Shipped',
    description:
      'Across in-house and freelance work — from health and edtech to real-estate and consumer apps.',
  },
  {
    value: 14,
    suffix: '%+',
    label: 'Avg. Metrics Movement',
    description:
      'Mean lift across retention, conversion, and efficiency wins shipped at Traya, MasteryPrep, and beyond.',
  },
]

export function Figures() {
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useGSAP(
    () => {
      const cells = sectionRef.current?.querySelectorAll('.figure-cell')
      if (cells) {
        gsap.from(cells, {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        })
      }

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            numberRefs.current.forEach((el, i) => {
              if (!el) return
              const fig = figures[i]
              const obj = { val: 0 }
              gsap.to(obj, {
                val: fig.value,
                duration: 1.6,
                ease: 'power2.out',
                snap: { val: 1 },
                onUpdate: () => {
                  el.textContent = `${obj.val}${fig.suffix}`
                },
              })
            })
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative py-32 md:py-44 px-6 border-t border-[#242424]"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="02"
          label="Impact"
          title="Numbers behind the work."
          description="Four years of shipping product design — counted, averaged, and held to evidence."
        />

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-[#242424] border-t border-b border-[#242424]">
          {figures.map((f, i) => (
            <div
              key={f.label}
              className="figure-cell group px-0 md:px-10 py-10 first:md:pl-0 last:md:pr-0 border-b border-[#242424] md:border-b-0 last:border-b-0"
            >
              <span
                ref={(el) => {
                  numberRefs.current[i] = el
                }}
                className="block font-display text-5xl md:text-6xl font-medium text-[#5DBF8C] leading-none tabular-nums"
                style={{
                  textShadow:
                    '0 0 22px rgba(93, 191, 140, 0.30), 0 0 44px rgba(93, 191, 140, 0.12)',
                }}
              >
                {`${f.value}${f.suffix}`}
              </span>

              <h3 className="font-display text-xl md:text-2xl text-[#F5F5F5] mt-5 font-medium">
                {f.label}
              </h3>
              <p className="text-sm text-[#8A8A8A] leading-relaxed mt-2">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
