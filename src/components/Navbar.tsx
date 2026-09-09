import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Process', href: '/#process' },
  { label: 'Work', href: '/work' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/70 backdrop-blur-xl border-b border-[#242424]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-base font-medium tracking-tight text-[#F5F5F5] shrink-0 whitespace-nowrap"
        >
          Anuj Shukla
          <span className="text-[#8A8A8A] hidden xl:inline"> / Designer</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="animated-underline text-xs uppercase tracking-[0.18em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="inline-flex items-center justify-center h-9 px-5 border border-[#F5F5F5] text-[#F5F5F5] text-xs uppercase tracking-[0.18em] font-medium rounded-full transition-colors duration-300 hover:bg-[#F5F5F5] hover:text-[#0A0A0A]"
          >
            Let's Talk
          </a>
        </div>

        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger
            className="lg:hidden relative w-10 h-10 flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block w-5 h-px bg-[#F5F5F5] transition-transform duration-500 ${
                  sheetOpen ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`block w-5 h-px bg-[#F5F5F5] transition-transform duration-500 ${
                  sheetOpen ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </span>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="bg-[#0A0A0A] border-l border-[#242424] w-full sm:max-w-md p-0 text-[#F5F5F5] flex flex-col duration-500 data-[side=right]:data-starting-style:translate-x-full data-[side=right]:data-ending-style:translate-x-full data-starting-style:opacity-100 data-ending-style:opacity-100"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            <div className="flex items-center justify-between px-6 h-16 border-b border-[#242424] shrink-0">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] leading-none">
                Index / Navigation
              </span>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 flex items-center justify-center -mr-2 cursor-pointer shrink-0"
              >
                <span className="relative block w-5 h-5">
                  <span className="absolute top-1/2 left-0 w-5 h-px bg-[#F5F5F5] rotate-45" />
                  <span className="absolute top-1/2 left-0 w-5 h-px bg-[#F5F5F5] -rotate-45" />
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
              className="flex-1 flex flex-col px-6 pt-10 overflow-y-auto"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setSheetOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className="group flex items-baseline gap-5 py-5 border-b border-[#242424]"
                >
                  <span className="font-mono text-[10px] text-[#5A5A5A] tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-3xl font-medium text-[#F5F5F5] tracking-tight transition-colors group-hover:text-[#FFFFFF]">
                    {link.label}
                  </span>
                  <span className="ml-auto text-[#5A5A5A] group-hover:translate-x-1 transition-transform">
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
                href="/#contact"
                onClick={() => setSheetOpen(false)}
                className="mt-12 inline-flex items-center justify-center h-14 border border-[#F5F5F5] text-[#F5F5F5] uppercase tracking-[0.2em] text-xs font-medium rounded-full hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
              >
                Start a Conversation
              </motion.a>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="px-6 pb-8 pt-10 border-t border-[#242424] shrink-0"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-4">
                Elsewhere
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
                {social.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animated-underline text-xs uppercase tracking-[0.18em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <a
                href="mailto:anujshukla521as@gmail.com"
                className="font-display text-lg text-[#F5F5F5] hover:text-[#FFFFFF] transition-colors break-all"
              >
                anujshukla521as@gmail.com
              </a>
              <p className="mt-6 text-[10px] font-mono text-[#5A5A5A]">
                © {new Date().getFullYear()} / Designed in the dark
              </p>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
