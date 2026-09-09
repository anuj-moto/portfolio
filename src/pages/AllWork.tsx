import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { BoxFile, Plank } from '@/sections/Work'
import { projects } from '@/data/projects'

export default function AllWork() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative bg-[#0A0A0A] text-[#F5F5F5]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" />
            Home
          </Link>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] font-mono">
              Index
            </span>
            <span className="h-px w-12 bg-[#242424]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
              All Work
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-6xl font-medium tracking-tight text-[#F5F5F5] max-w-3xl"
          >
            Every project. Every case study.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[#8A8A8A] text-base md:text-lg leading-relaxed max-w-xl"
          >
            Hover any file to peek inside. Click to open the case study.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] whitespace-nowrap"
          >
            <span>{String(projects.length).padStart(2, '0')} Projects</span>
            <span className="text-[#3A3A3A]">·</span>
            <span className="text-[#8A8A8A] normal-case tracking-normal">
              2023 — 2026
            </span>
          </motion.div>
        </div>
      </section>

      {/* Shelves */}
      <section className="relative px-6 pb-32 md:pb-44">
        <div className="max-w-6xl mx-auto">
          {/* Shelf */}
          <div className="work-shelf relative">
            <div
              aria-hidden
              className="absolute inset-x-[-10%] top-0 bottom-0 -z-10"
              style={{
                background:
                  'radial-gradient(60% 50% at 50% 75%, rgba(60,40,20,0.06) 0%, rgba(10,10,10,0) 70%)',
              }}
            />

            <div
              className="hidden md:block space-y-12"
              style={{ ['--folder-w' as never]: 'clamp(48px, 5.5vw, 76px)' }}
            >
              {(() => {
                const MAX_PER_ROW = 10
                const numRows = Math.ceil(projects.length / MAX_PER_ROW)
                const perRow = Math.ceil(projects.length / numRows)
                return Array.from({ length: numRows }, (_, rowIdx) => {
                  const rowStart = rowIdx * perRow
                  const rowItems = projects.slice(rowStart, rowStart + perRow)
                  return (
                    <div key={rowIdx}>
                      <div className="relative flex items-end justify-center gap-3 px-0">
                        {rowItems.map((p, i) => (
                          <BoxFile key={p.slug} project={p} index={rowStart + i} />
                        ))}
                      </div>
                      <Plank />
                    </div>
                  )
                })
              })()}
            </div>

            <div
              className="md:hidden space-y-10"
              style={{ ['--folder-w' as never]: 'clamp(48px, 14vw, 72px)' }}
            >
              {Array.from(
                { length: Math.ceil(projects.length / 4) },
                (_, rowIdx) => {
                  const rowItems = projects.slice(rowIdx * 4, rowIdx * 4 + 4)
                  return (
                    <div key={rowIdx}>
                      <div className="relative flex items-end justify-center gap-2 px-2">
                        {rowItems.map((p, i) => (
                          <BoxFile
                            key={p.slug}
                            project={p}
                            index={rowIdx * 4 + i}
                          />
                        ))}
                      </div>
                      <Plank />
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
