import { SectionShell } from '@/components/SectionShell'
import { Block } from '@/components/Block'
import { Separator } from '@/components/Separator'
import { ProcessFlow } from '@/components/ProcessFlow'
import { CaseStudyScroller } from '@/components/CaseStudyScroller'
import { projects } from '@/data/projects'

export default function CaseStudiesPage() {
  return (
    <SectionShell index="03" title="Case Studies">
      <Block label="Process" meta="A workflow built around signal">
        <p className="mb-10 max-w-xl text-text-muted">
          Every phase is augmented by AI — not to replace thinking, but to
          amplify it. The craft stays human.
        </p>
        <ProcessFlow />
      </Block>

      <Separator />

      <Block
        label="Selected Work"
        meta={`${projects.length} Projects · 2023 — 2026`}
        className="pb-8"
      >
        <h2 className="mb-10 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text md:text-5xl">
          The work.
        </h2>
        <CaseStudyScroller />
      </Block>
    </SectionShell>
  )
}
