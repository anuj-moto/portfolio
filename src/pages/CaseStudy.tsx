import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Parallax } from '@/components/Parallax'
import { getProject, getNextProject, type CaseSection } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

function SectionBlock({ section }: { section: CaseSection }) {
  switch (section.kind) {
    case 'text':
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16"
        >
          <div>
            {section.label && (
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-2 sticky top-32">
                {section.label}
              </p>
            )}
          </div>
          <div className="max-w-2xl">
            {section.heading && (
              <h3 className="font-display text-3xl md:text-4xl text-[#F5F5F5] font-medium mb-6 leading-[1.1] tracking-tight">
                {section.heading}
              </h3>
            )}
            {section.body && (
              <p className="text-[#8A8A8A] leading-relaxed text-base md:text-lg">
                {section.body}
              </p>
            )}
          </div>
        </motion.div>
      )

    case 'image':
      return (
        <Parallax speed="slow" className="block">
          <motion.figure
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="my-8"
          >
            <div className="overflow-hidden border border-[#242424] grayscale">
              <img
                src={section.image}
                alt={section.caption ?? ''}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            {section.caption && (
              <figcaption className="mt-4 text-xs text-[#5A5A5A] font-mono">
                {section.caption}
              </figcaption>
            )}
          </motion.figure>
        </Parallax>
      )

    case 'quote':
      return (
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="border-l border-[#F5F5F5] pl-8 md:pl-12 my-8 max-w-3xl"
        >
          <p className="font-display text-2xl md:text-3xl text-[#F5F5F5] leading-snug font-light italic">
            {section.body}
          </p>
          {section.caption && (
            <footer className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
              {section.caption}
            </footer>
          )}
        </motion.blockquote>
      )

    case 'split':
      return (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-[200px_1fr_1fr] gap-8 md:gap-16"
        >
          <div />
          <div>
            {section.heading && (
              <h3 className="font-display text-2xl md:text-3xl text-[#F5F5F5] font-medium mb-6 leading-tight md:col-span-2 max-w-xl">
                {section.heading}
              </h3>
            )}
            <p className="text-[#8A8A8A] leading-relaxed">{section.left}</p>
          </div>
          <div className="md:pt-12">
            <p className="text-[#8A8A8A] leading-relaxed">{section.right}</p>
          </div>
        </motion.div>
      )
  }
}

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useGSAP(
    () => {
      const words = heroRef.current?.querySelectorAll('.title-word')
      if (!words) return
      gsap.from(words, {
        yPercent: 110,
        opacity: 0,
        stagger: 0.06,
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.1,
      })
    },
    { scope: heroRef, dependencies: [slug] }
  )

  if (!project) return <Navigate to="/" replace />

  const next = getNextProject(slug)
  const titleWords = project.title.split(' ')

  return (
    <div className="relative bg-[#0A0A0A] text-[#F5F5F5]">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" />
            All Work
          </Link>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
              {project.category}
            </span>
            <span className="h-px w-12 bg-[#242424]" />
            <span className="font-mono text-xs text-[#5A5A5A]">
              {project.year}
            </span>
          </div>

          <h1
            className="font-display font-medium text-[#F5F5F5] tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 0.95,
            }}
          >
            <span className="block overflow-hidden">
              {titleWords.map((w) => (
                <span
                  key={w}
                  className="title-word inline-block mr-[0.2em]"
                >
                  {w}
                </span>
              ))}
            </span>
          </h1>

          <p className="mt-10 text-[#8A8A8A] text-lg md:text-xl max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Hero image */}
      <Parallax speed="slow" className="block px-6 mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto overflow-hidden border border-[#242424]">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-auto"
          />
        </div>
      </Parallax>

      {/* Meta grid */}
      <section className="px-6 mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 border-t border-b border-[#242424] py-12">
          {[
            ['Role', project.role],
            ['Timeline', project.timeline],
            ['Client', project.client],
            ['Platform', project.platform],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-2">
                {label}
              </p>
              <p className="text-[#F5F5F5] text-sm leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Approach */}
      <section className="px-6 mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-4">
              The Problem
            </p>
            <p className="font-display text-2xl md:text-3xl text-[#F5F5F5] leading-snug font-medium">
              {project.problem}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-4">
              The Approach
            </p>
            <p className="text-[#8A8A8A] leading-relaxed text-base md:text-lg">
              {project.approach}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <div className="px-6 space-y-24 md:space-y-32 mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto space-y-24 md:space-y-32">
          {project.sections.map((s, i) => (
            <SectionBlock key={i} section={s} />
          ))}
        </div>
      </div>

      {/* Metrics */}
      <section className="px-6 mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-12">
            Outcomes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 border-t border-b border-[#242424] py-16">
            {project.metrics.map((m) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="font-display text-4xl md:text-5xl text-[#F5F5F5] font-medium tracking-tight mb-3">
                  {m.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <section className="px-6 mb-24 md:mb-32">
          <div className="max-w-6xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-8">
              Gallery
            </p>
            <div className="space-y-6">
              {project.gallery.map((src, i) => (
                <Parallax key={src} speed={i % 2 === 0 ? 'slow' : 'base'}>
                  <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8 }}
                    className="overflow-hidden border border-[#242424] grayscale"
                  >
                    <img
                      src={src}
                      alt={`${project.title} — ${i + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </motion.div>
                </Parallax>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tags */}
      <section className="px-6 mb-24 md:mb-32">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-6">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[#242424] text-[#F5F5F5] text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="px-6 pb-32 md:pb-44 border-t border-[#242424] pt-20">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A] mb-6">
            Next Project
          </p>
          <Link to={`/work/${next.slug}`} className="group block">
            <div className="grid md:grid-cols-[1fr_auto] items-end gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A] mb-3">
                  {next.category} &nbsp;/&nbsp; {next.year}
                </p>
                <h3 className="font-display text-4xl md:text-6xl text-[#F5F5F5] font-medium leading-[1.05] tracking-tight group-hover:text-[#FFFFFF] transition-colors">
                  {next.title}
                </h3>
                <p className="mt-5 text-[#8A8A8A] max-w-md">{next.summary}</p>
              </div>
              <span className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A] group-hover:text-[#F5F5F5] transition-colors">
                Continue
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
