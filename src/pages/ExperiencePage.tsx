import { SectionShell } from '@/components/SectionShell'
import { Block } from '@/components/Block'
import { Separator } from '@/components/Separator'
import { BrandsMarquee } from '@/components/BrandsMarquee'
import { ExperienceList } from '@/components/ExperienceList'

export default function ExperiencePage() {
  return (
    <SectionShell index="02" title="Work Experience">
      <Block label="Brands I've Worked With" meta="Selected / 2021 — 2026">
        <BrandsMarquee />
      </Block>

      <Separator />

      <Block label="Career" meta="2021 — 2026">
        <p className="mb-10 max-w-xl text-text-muted">
          Five chapters across health, edtech, real-estate, and consumer apps.
          Hover a role to read the full story.
        </p>
        <ExperienceList />
      </Block>
    </SectionShell>
  )
}
