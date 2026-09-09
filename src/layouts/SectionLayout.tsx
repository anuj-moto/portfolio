import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AmbientBackground } from '@/components/AmbientBackground'
import { Navbar } from '@/components/Navbar'
import { SideRail } from '@/components/SideRail'

/** Reset scroll on every route change — happens while the wipe covers the screen. */
function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * Shared shell for every section page: persistent ambient backdrop, navbar and
 * side rail, with the routed page swapping inside <Outlet/>.
 */
export function SectionLayout() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      <AmbientBackground />
      <ScrollReset />
      <Navbar />
      <SideRail />
      <main className="relative z-10">
        <Suspense fallback={<div className="min-h-screen bg-bg" />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
