import { SectionShell } from '@/components/SectionShell'
import { Block } from '@/components/Block'
import { skillGroups } from '@/data/skills'

export default function SkillsPage() {
  return (
    <SectionShell index="04" title="Skills">
      <Block label="Capabilities">
        <h2 className="max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-text md:text-5xl">
          Craft on one hand. Fluency on the other.
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-text-muted md:text-lg">
          I speak both languages — the designer&apos;s and the engineer&apos;s —
          and use that overlap to ship faster with fewer surprises.
        </p>

        <div className="mt-14 divide-y divide-border border-b border-t border-border">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="grid gap-6 py-10 md:grid-cols-[240px_1fr] md:gap-16"
            >
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-text-dim">
                  Stack
                </p>
                <h3 className="font-display text-2xl font-medium text-text">
                  {group.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex cursor-default items-center rounded-full border border-border px-4 py-2 text-sm text-text transition-colors duration-300 hover:border-text"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>
    </SectionShell>
  )
}
