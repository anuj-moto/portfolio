import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SectionHeading } from '../components/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2021',
    role: 'UI Designer Intern',
    company: 'Photoshooto',
    location: 'India',
    description:
      'Built UI components alongside product and marketing teams and got my first real grounding in design systems. Picked it up fast enough to earn Intern of the Week and Intern of the Month back-to-back.',
  },
  {
    year: '2021',
    role: 'UI/UX Designer',
    company: 'Cupid Knot',
    location: 'Surat, India',
    description:
      'Owned the product end-to-end — my first time carrying UX on my own. Ran A/B and usability tests to settle design debates with evidence, and worked directly with stakeholders to turn market signals into shippable decisions.',
  },
  {
    year: '2022',
    role: 'Freelance UI/UX Designer',
    company: 'Anchor (Stealth Startup)',
    location: 'NYC, USA',
    description:
      'Designed a real-estate web product 0→1 — user research, IA, and a design system from scratch, then shipped it into HTML/CSS myself. Worked shoulder-to-shoulder with the founders to keep every design call tied to a business goal.',
  },
  {
    year: '2023',
    role: 'UI/UX Designer',
    company: 'Traya',
    location: 'Mumbai, India',
    description:
      'Shipped Book a Call, Diet Plan, Build a Habit, and Digital Prescription — and measured every one. Lifted retention 14–17%, conversion 12%, and Book-a-Call efficiency 11%, with user interviews and Microsoft Clarity sessions driving each iteration. Built Tatva, Traya\'s M3-based design system, as the foundation under all of it.',
  },
  {
    year: '2025',
    role: 'Product Designer',
    company: 'MasteryPrep',
    location: 'Baton Rouge, USA',
    description:
      'Set the foundational structure of the Student Experience under tight constraints, then shipped the WorkKeys student flows on top of it. Rebuilt QTI interactions around the student POV — HotText and others — and designed the accessibility toolset: Answer Masking, Strikethrough, and Read Aloud. Went past design too: built an agent that auto-resolves accessibility tickets straight from GitLab and personally cleared the a11y backlog. Ran UAT cycles and mentored engineers through the component structure. Impact numbers from the WorkKeys and accessibility work are still landing.',
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (progressRef.current && timelineRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 75%',
              end: 'bottom 70%',
              scrub: true,
            },
          }
        )
      }

      const items = sectionRef.current?.querySelectorAll('.timeline-item')
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' },
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 md:py-44 px-6 border-t border-[#242424]"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          index="01"
          label="About"
          title="Quiet interfaces. Honest systems."
          description="For the past four years I've been shipping product design across health, edtech, real-estate, and consumer apps — building design systems from the ground up and tuning interfaces with research, testing, and the kind of care that shows up in conversion numbers."
        />

        <div className="grid md:grid-cols-[1fr_2fr] gap-16 mt-24">
          {/* No <Parallax> here: it sets a transform on the wrapper, which makes
              it the containing block and stops the sticky column from pinning. */}
          <div className="sticky top-32">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-4">
              Trajectory
            </p>
            <p className="font-display text-2xl text-[#F5F5F5] leading-snug">
              Four years.<br />
              Five chapters.<br />
              <span className="text-[#5A5A5A]">One direction.</span>
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-[#242424]" />
            <div
              ref={progressRef}
              className="absolute left-0 top-2 bottom-2 w-px bg-[#F5F5F5] origin-top"
            />

            {timeline.map((item) => (
              <div
                key={`${item.year}-${item.company}`}
                className="timeline-item relative pl-10 pb-16 last:pb-0"
              >
                <div className="absolute left-[-3px] top-2 w-[7px] h-[7px] rounded-full bg-[#F5F5F5]" />
                <div className="flex items-baseline flex-wrap gap-x-4 gap-y-1 mb-3">
                  <span className="font-mono text-xs text-[#5A5A5A]">
                    {item.year}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                    {item.company}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#5A5A5A]">
                    · {item.location}
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[#F5F5F5] mb-3 font-medium">
                  {item.role}
                </h3>
                <p className="text-[#8A8A8A] leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
