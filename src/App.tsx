import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AmbientBackground } from './components/AmbientBackground'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Brands } from './sections/Brands'
import { About } from './sections/About'
import { Figures } from './sections/Figures'
import { Process } from './sections/Process'
import { Work } from './sections/Work'
import { Skills } from './sections/Skills'
import { Contact } from './sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return
    const id = hash.slice(1)

    let cancelled = false
    let attempts = 0
    const tryScroll = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempts++ < 30) requestAnimationFrame(tryScroll)
    }
    requestAnimationFrame(tryScroll)
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative bg-[var(--color-bg)] text-[var(--color-text)]">
      <AmbientBackground />
      <Navbar />
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />
        <Brands />
        <About />
        <Figures />
        <Process />
        <Work />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
