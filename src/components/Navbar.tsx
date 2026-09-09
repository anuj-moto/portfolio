import { useState, useEffect } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'
import { useWipe } from '@/components/transition/TransitionProvider'

const navLinks = [
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Work', path: '/work' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
]

const social = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anuj-shukla-aba470196/',
  },
  {
    label: 'Resume',
    href: 'https://drive.google.com/file/d/1gerUpX21IzRlN5F18LThwrSOnyEElQ91/view?usp=sharing',
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const { wipeTo } = useWipe()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (path: string) => (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    setSheetOpen(false)
    wipeTo(path)
  }

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-border bg-bg/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="/"
          onClick={go('/')}
          className="shrink-0 whitespace-nowrap font-display text-base font-medium tracking-tight text-text"
        >
          Anuj Shukla
          <span className="hidden text-text-muted xl:inline"> / Designer</span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={go(link.path)}
              className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors duration-300 hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={go('/contact')}
            className="inline-flex h-9 items-center justify-center rounded-full border border-text px-5 text-xs font-medium uppercase tracking-[0.18em] text-text transition-colors duration-300 hover:bg-text hover:text-bg"
          >
            Let&apos;s Talk
          </a>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="relative flex h-10 w-10 cursor-pointer items-center justify-center lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-5 bg-text transition-transform duration-500 ${
                  sheetOpen ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-px w-5 bg-text transition-transform duration-500 ${
                  sheetOpen ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="flex w-full flex-col border-l border-border bg-bg p-0 text-text duration-500 data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full data-starting-style:opacity-100 data-ending-style:opacity-100 sm:max-w-md"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-6">
              <span className="text-[10px] uppercase leading-none tracking-[0.25em] text-text-dim">
                Index / Navigation
              </span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close menu"
                className="-mr-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center"
              >
                <span className="relative block h-5 w-5">
                  <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-text" />
                  <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-text" />
                </span>
              </button>
            </div>

            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.12 },
                },
              }}
              className="flex flex-1 flex-col overflow-y-auto px-6 pt-10"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.path}
                  href={link.path}
                  onClick={go(link.path)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="group flex items-baseline gap-5 border-b border-border py-5"
                >
                  <span className="font-mono text-[10px] tabular-nums text-text-dim">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-medium tracking-tight text-text transition-colors group-hover:text-white">
                    {link.label}
                  </span>
                  <span className="ml-auto text-text-dim transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </motion.a>
              ))}

              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                href="/contact"
                onClick={go('/contact')}
                className="mt-12 inline-flex h-14 items-center justify-center rounded-full border border-text text-xs font-medium uppercase tracking-[0.2em] text-text transition-colors hover:bg-text hover:text-bg"
              >
                Start a Conversation
              </motion.a>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="shrink-0 border-t border-border px-6 pb-8 pt-10"
            >
              <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-text-dim">
                Elsewhere
              </p>
              <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-text"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <a
                href="mailto:anujshukla521as@gmail.com"
                className="break-all font-display text-lg text-text transition-colors hover:text-white"
              >
                anujshukla521as@gmail.com
              </a>
              <p className="mt-6 font-mono text-[10px] text-text-dim">
                © {new Date().getFullYear()} / Designed in the dark
              </p>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
