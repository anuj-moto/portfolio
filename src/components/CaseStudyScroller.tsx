import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'

/**
 * Horizontally-scrollable shelf of case studies. Up to 5 cards across on
 * desktop; native touch / trackpad scroll + snap, prev/next buttons, and
 * arrow-key support — no wheel hijacking.
 */
export function CaseStudyScroller() {
  const ref = useRef<HTMLDivElement>(null)

  const scrollByCard = (dir: number) => {
    const el = ref.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          {projects.length} projects · drag, scroll, or use the arrows
        </p>
        <div className="flex items-center gap-2">
          {[
            { dir: -1, label: 'Previous', Icon: ArrowLeft },
            { dir: 1, label: 'Next', Icon: ArrowRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollByCard(dir)}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-text hover:text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-text/50"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div
        ref={ref}
        role="region"
        aria-label="Case studies, horizontally scrollable"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') {
            e.preventDefault()
            scrollByCard(1)
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault()
            scrollByCard(-1)
          }
        }}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <div
            key={p.slug}
            data-card
            className="shrink-0 basis-[78%] snap-start sm:basis-[42%] lg:basis-[calc((100%-5rem)/5)]"
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
