import { useLocation } from 'react-router-dom'
import { WipeLink } from '@/components/transition/WipeLink'
import { sections, activeSectionKey } from '@/data/sections'
import { cn } from '@/lib/utils'

/**
 * Persistent floating rail to jump between the five sections. Desktop only —
 * on smaller screens the Navbar sheet is the section switcher.
 */
export function SideRail() {
  const { pathname } = useLocation()
  const activeKey = activeSectionKey(pathname)

  return (
    <nav
      aria-label="Sections"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-full border border-border bg-surface/60 p-2 backdrop-blur-md lg:flex"
    >
      {sections.map((s) => {
        const active = s.key === activeKey
        return (
          <WipeLink
            key={s.key}
            to={s.path}
            aria-current={active ? 'page' : undefined}
            aria-label={s.title}
            className={cn(
              'group relative flex h-9 w-9 items-center justify-center rounded-full font-mono text-[11px] tabular-nums transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-text/60',
              active
                ? 'bg-text text-bg'
                : 'text-text-dim hover:bg-surface-2 hover:text-text',
            )}
          >
            {s.index}
            <span className="pointer-events-none absolute left-11 origin-left -translate-x-1 whitespace-nowrap rounded-full border border-border bg-surface px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {s.title}
            </span>
          </WipeLink>
        )
      })}
    </nav>
  )
}
