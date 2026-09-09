import { ArrowUpRight } from 'lucide-react'
import { WipeLink } from '@/components/transition/WipeLink'
import type { Project } from '@/data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <WipeLink
      to={`/work/${project.slug}`}
      className="group flex h-full flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-text/50"
    >
      <div className="relative overflow-hidden border border-border">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <span className="absolute left-3 top-3 rounded-full border border-border bg-bg/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted backdrop-blur-sm">
          {project.kind}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-2">
        <span className="truncate text-[10px] uppercase tracking-[0.2em] text-text-dim">
          {project.category}
        </span>
        <span className="shrink-0 font-mono text-[10px] text-text-dim">
          {project.year}
        </span>
      </div>
      <h3 className="mt-2 font-display text-lg font-medium leading-snug tracking-tight text-text transition-colors group-hover:text-white">
        {project.title}
      </h3>
      <span className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-text">
        Case Study
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </WipeLink>
  )
}
