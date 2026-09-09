import { SectionShell } from '@/components/SectionShell'
import { Block } from '@/components/Block'
import { Separator } from '@/components/Separator'

export default function AboutPage() {
  return (
    <SectionShell index="01" title="About">
      <Block>
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div>
            <div className="mb-8 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-text" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-text-muted">
                Available for projects — 2026
              </span>
            </div>
            <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-text md:text-6xl">
              Quiet interfaces.
              <br />
              <span className="text-text-dim">Honest systems.</span>
            </h2>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-text-muted md:text-lg">
              I&apos;m Anuj — a Product Designer with 4+ years building scalable
              design systems and AI-first interfaces. I ship work that lifts
              conversion, retention, and engagement for the teams I join.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden border border-border grayscale">
              <img
                src="/anuj.jpeg"
                alt="Anuj Shukla"
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-text-dim">
                Trajectory
              </p>
              <p className="font-display text-xl leading-snug text-text">
                Four years.
                <br />
                Five chapters.
                <br />
                <span className="text-text-dim">One direction.</span>
              </p>
            </div>
          </div>
        </div>
      </Block>

      <Separator />

      <Block label="Approach">
        <p className="max-w-3xl font-display text-2xl font-medium leading-snug text-text md:text-3xl">
          For the past four years I&apos;ve been shipping product design across
          health, edtech, real-estate, and consumer apps — building design
          systems from the ground up and tuning interfaces with research,
          testing, and the kind of care that shows up in conversion numbers.
        </p>
        <p className="mt-8 max-w-md text-sm uppercase tracking-[0.2em] text-text-dim">
          Design systems for AI-first products.
        </p>
      </Block>
    </SectionShell>
  )
}
