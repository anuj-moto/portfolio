import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { Parallax } from '@/components/Parallax'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

// Folder-edge variations — each box gets a slightly different stack so the row
// doesn't look mechanical. Heights/widths in viewBox-100 units.
type Folder = { x: number; w: number; top: number; tone: string }
const FOLDER_VARIATIONS: Folder[][] = [
  [
    { x: 0, w: 17, top: 3, tone: '#EADDB8' },
    { x: 17, w: 13, top: 1, tone: '#DCC99B' },
    { x: 30, w: 18, top: 4, tone: '#E5D6AC' },
    { x: 48, w: 14, top: 2, tone: '#D2BE8E' },
    { x: 62, w: 16, top: 5, tone: '#E8DBB4' },
    { x: 78, w: 22, top: 2, tone: '#D8C593' },
  ],
  [
    { x: 0, w: 14, top: 2, tone: '#E2D3A6' },
    { x: 14, w: 19, top: 4, tone: '#D5C297' },
    { x: 33, w: 13, top: 1, tone: '#EBDFB9' },
    { x: 46, w: 17, top: 3, tone: '#D9C79B' },
    { x: 63, w: 15, top: 2, tone: '#E5D6AB' },
    { x: 78, w: 22, top: 5, tone: '#CCB987' },
  ],
  [
    { x: 0, w: 19, top: 4, tone: '#D7C495' },
    { x: 19, w: 14, top: 1, tone: '#EADDB6' },
    { x: 33, w: 17, top: 3, tone: '#DBC89C' },
    { x: 50, w: 13, top: 2, tone: '#E5D6AB' },
    { x: 63, w: 18, top: 5, tone: '#D0BC8C' },
    { x: 81, w: 19, top: 2, tone: '#E8DBB1' },
  ],
  [
    { x: 0, w: 15, top: 2, tone: '#DCC99B' },
    { x: 15, w: 18, top: 5, tone: '#CFBC8B' },
    { x: 33, w: 14, top: 1, tone: '#EBDFB9' },
    { x: 47, w: 16, top: 3, tone: '#DDCB9D' },
    { x: 63, w: 19, top: 2, tone: '#E5D6AB' },
    { x: 82, w: 18, top: 4, tone: '#D4C193' },
  ],
]

// Procedural textures via SVG feTurbulence — real noise, not gradient-fakes
const CARDBOARD_NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch' seed='4'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.85 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

const WOOD_NOISE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='80'><filter id='n'><feTurbulence type='turbulence' baseFrequency='0.018 0.7' numOctaves='2' stitchTiles='stitch' seed='2'/><feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.025  0 0 0 0 0.01  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"

// Monochrome graphite palette — warm/cool grays only, native to the #0A0A0A theme
// Each entry: face (top), edge (bottom), shadow (cast), highlight (top-left rim)
const BOX_PALETTE = [
  { face: '#2A2A2A', edge: '#1A1A1A', shadow: '#0E0E0E', highlight: '#3D3D3D' }, // charcoal-cool
  { face: '#322F2C', edge: '#1F1D1B', shadow: '#100F0E', highlight: '#48433E' }, // espresso-graphite (warm)
  { face: '#3A3A3A', edge: '#252525', shadow: '#131313', highlight: '#535353' }, // iron
  { face: '#3D3934', edge: '#28241F', shadow: '#141210', highlight: '#564F47' }, // umber-graphite (warm)
  { face: '#424242', edge: '#2C2C2C', shadow: '#171717', highlight: '#5A5A5A' }, // steel
  { face: '#46413B', edge: '#2D2924', shadow: '#161311', highlight: '#615A50' }, // bronze-graphite (warm)
  { face: '#4D4D4D', edge: '#333333', shadow: '#1A1A1A', highlight: '#666666' }, // aluminum
  { face: '#524A41', edge: '#352F29', shadow: '#1A1612', highlight: '#6E6357' }, // sand-shadow (warm)
] as const

// Minimum breathing room the hover preview keeps from either viewport edge.
const EDGE_GUTTER = 12

type CardPos = { left: number; width: number }

// ─── PaperStack — real folder edges peeking from the box opening ──
function PaperStack({ variant }: { variant: number }) {
  const folders = FOLDER_VARIATIONS[variant % FOLDER_VARIATIONS.length]
  const grainId = `paper-grain-${variant}`
  const shadeId = `folder-shade-${variant}`
  const innerId = `inner-shadow-${variant}`
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <filter id={grainId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2.4"
            numOctaves="2"
            seed={3 + variant}
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
        </filter>
        <linearGradient id={shadeId} x1="0" x2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(40,25,10,0.5)" />
        </linearGradient>
        <linearGradient id={innerId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(0,0,0,0.55)" />
          <stop offset="0.6" stopColor="rgba(0,0,0,0)" />
        </linearGradient>
      </defs>

      {/* Folder slabs — varied widths and tops */}
      {folders.map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={f.top} width={f.w} height={30 - f.top} fill={f.tone} />
          {/* Right-edge shadow giving each folder depth */}
          <rect x={f.x + f.w - 1.6} y={f.top} width="1.6" height={30 - f.top} fill={`url(#${shadeId})`} />
          {/* Tiny highlight on the top edge of each folder */}
          <rect x={f.x} y={f.top} width={f.w} height="0.6" fill="rgba(255,250,235,0.55)" />
        </g>
      ))}

      {/* Paper fiber grain over everything */}
      <rect width="100" height="30" filter={`url(#${grainId})`} opacity="0.5" />

      {/* Inner shadow at the very top — makes the stack sit inside the box */}
      <rect width="100" height="6" fill={`url(#${innerId})`} />
    </svg>
  )
}

// ─── BoxFile ─────────────────────────────────────────────────────
export function BoxFile({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const palette = BOX_PALETTE[index % BOX_PALETTE.length]
  const [isHovered, setIsHovered] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [cardPos, setCardPos] = useState<CardPos>({ left: 0, width: 340 })

  // The preview is far wider than the folder it hangs off, so centering it
  // blindly pushes it off-screen at the ends of a shelf row (and `overflow-x:
  // clip` on <html> silently cuts it). Measure on hover and clamp into view.
  const handleEnter = () => {
    const el = wrapRef.current
    if (el) {
      const r = el.getBoundingClientRect()
      const vw = document.documentElement.clientWidth
      const width = Math.min(340, vw - EDGE_GUTTER * 2)
      const desired = r.left + r.width / 2 - width / 2
      const clamped = Math.min(
        Math.max(EDGE_GUTTER, desired),
        vw - width - EDGE_GUTTER
      )
      setCardPos({ left: clamped - r.left, width })
    }
    setIsHovered(true)
  }

  return (
    <div
      ref={wrapRef}
      data-work-item
      onMouseEnter={handleEnter}
      onMouseLeave={() => setIsHovered(false)}
      className="relative shrink-0 snap-center"
      style={{ width: 'var(--folder-w, clamp(56px, 6.4vw, 84px))' }}
    >
      <div className="block">
        <HoverPreviewCard project={project} visible={isHovered} pos={cardPos} />
      </div>
      <motion.div
        whileHover={{ y: -18, rotate: -1.2, scale: 1.035 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Link
        to={`/work/${project.slug}`}
        aria-label={`${project.title} — case study`}
        className="block relative"
      >
        {/* Stack of folder edges peeking out of the box opening */}
        <div
          aria-hidden
          className="relative h-[24px] mx-[4px] rounded-t-[2px] overflow-hidden"
          style={{
            boxShadow:
              'inset 0 -4px 6px rgba(0,0,0,0.55), inset 1px 0 0 rgba(0,0,0,0.3), inset -1px 0 0 rgba(0,0,0,0.3)',
          }}
        >
          <PaperStack variant={index} />
        </div>

        {/* Box body */}
        <div
          className="relative rounded-[2px] overflow-hidden"
          style={{
            height: 'clamp(210px, 27vw, 290px)',
            background: palette.face,
            boxShadow: `
              inset 0 10px 16px -6px rgba(0,0,0,0.55),
              inset 0 -2px 0 rgba(0,0,0,0.30),
              0 22px 30px -14px ${palette.shadow}
            `,
          }}
        >
          {/* Cardboard fiber noise — real procedural texture */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-multiply opacity-[0.45]"
            style={{ backgroundImage: CARDBOARD_NOISE, backgroundSize: '220px 220px' }}
          />
          {/* Lighter cardboard fiber — adds organic variation */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay opacity-[0.35]"
            style={{ backgroundImage: CARDBOARD_NOISE, backgroundSize: '110px 110px' }}
          />

          {/* Soft directional lighting on top of the texture */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(178deg, transparent 0%, transparent 60%, ${palette.edge}99 100%)`,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-[6px] pointer-events-none"
            style={{
              background: `linear-gradient(90deg, ${palette.highlight}55 0%, transparent 100%)`,
            }}
          />
          <div
            aria-hidden
            className="absolute inset-y-0 right-0 w-[8px] pointer-events-none"
            style={{
              background:
                'linear-gradient(270deg, rgba(0,0,0,0.4) 0%, transparent 100%)',
            }}
          />

          {/* Top concave scoop — front cutout of a magazine box */}
          <div
            aria-hidden
            className="absolute top-0 left-0 right-0 h-8 pointer-events-none overflow-hidden"
          >
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 w-[140%] h-14 rounded-[50%]"
              style={{ background: '#0A0A0A' }}
            />
            <div
              className="absolute -top-[26px] left-1/2 -translate-x-1/2 w-[140%] h-14 rounded-[50%]"
              style={{
                background: `linear-gradient(180deg, ${palette.shadow} 0%, ${palette.edge} 70%, ${palette.face} 100%)`,
                boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Vertical seam down the right edge — suggests folded card stock */}
          <div
            aria-hidden
            className="absolute top-3 bottom-3 right-[3px] w-px"
            style={{ background: 'rgba(0,0,0,0.32)' }}
          />

          {/* Subtle wear streak on the left edge */}
          <div
            aria-hidden
            className="absolute top-[20%] bottom-[30%] left-[4px] w-px"
            style={{ background: 'rgba(0,0,0,0.18)' }}
          />

          {/* Small index — embossed at top */}
          <p
            className="absolute top-[14%] left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.3em] leading-none uppercase"
            style={{
              color: 'rgba(255,255,255,0.18)',
              textShadow: '0 1px 0 rgba(0,0,0,0.4)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </p>

          {/* Project name — 2 lines, center aligned, blended */}
          <p
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-1.5 text-center font-display font-medium uppercase line-clamp-2 break-words"
            style={{
              fontSize: 'clamp(8px, 0.85vw, 10px)',
              letterSpacing: '0.14em',
              lineHeight: 1.25,
              color: 'rgba(255,255,255,0.24)',
              textShadow: '0 1px 0 rgba(0,0,0,0.45)',
            }}
          >
            {project.title}
          </p>

          {/* Wooden knob with proper directional lighting */}
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[14px] h-[14px] rounded-full"
            style={{
              background:
                'radial-gradient(circle at 32% 28%, #C99965 0%, #8C5E32 50%, #4E2F12 100%)',
              boxShadow:
                'inset 0 -1px 2px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,220,180,0.4), 0 1px 2px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.35)',
            }}
          >
            {/* Knob center pin */}
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full"
              style={{ background: 'rgba(0,0,0,0.4)' }}
            />
          </div>
        </div>
      </Link>
      </motion.div>
    </div>
  )
}

// ─── Plank (wooden shelf under a row) ────────────────────────────
export function Plank() {
  return (
    <>
      <div
        aria-hidden
        data-work-item
        className="relative mt-[-4px] h-[26px] rounded-[3px] overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #4A2E1A 0%, #36210F 55%, #1F1208 100%)',
          boxShadow:
            'inset 0 1px 0 rgba(180,130,80,0.28), inset 0 -2px 3px rgba(0,0,0,0.7), 0 22px 36px -20px rgba(0,0,0,0.95)',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-multiply opacity-90"
          style={{ backgroundImage: WOOD_NOISE, backgroundSize: '600px 80px' }}
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-50"
          style={{
            backgroundImage: WOOD_NOISE,
            backgroundSize: '900px 60px',
            backgroundPosition: '120px 0',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(180,130,80,0.4) 50%, transparent 100%)',
          }}
        />
      </div>

      <div
        aria-hidden
        className="relative h-[6px] rounded-b-[3px]"
        style={{
          background:
            'linear-gradient(180deg, #1A0F06 0%, rgba(10,10,10,0) 100%)',
        }}
      />

      <div
        aria-hidden
        className="mx-auto h-[36px] w-[78%] rounded-[50%] -mt-2"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 0%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)',
        }}
      />
    </>
  )
}

// ─── HoverPreviewCard ────────────────────────────────────────────
function HoverPreviewCard({
  project,
  visible,
  pos,
}: {
  project: Project
  visible: boolean
  pos: CardPos
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preview"
          initial={{ opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          style={{ left: pos.left, width: pos.width }}
          className="absolute bottom-full -translate-y-3 z-20 pointer-events-none"
        >
          <div className="rounded-2xl border border-[#242424] bg-[#0D0D0D]/95 backdrop-blur-md p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#0A0A0A]">
              <img
                src={project.cover}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.55) 100%)',
                }}
              />
            </div>

            <div className="pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
                {project.category}{' '}
                <span className="text-[#3A3A3A]">·</span> {project.year}
              </p>
              <h4 className="mt-2 font-display font-medium text-[#F5F5F5] tracking-tight leading-[1.15] text-xl">
                {project.title}
              </h4>
              <p className="mt-2 text-sm text-[#A0A0A0] leading-relaxed line-clamp-2">
                {project.summary}
              </p>

              <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A8A8A]">
                  Case Study
                </span>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#F5F5F5] bg-[#F5F5F5] text-[#0A0A0A]">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Section ─────────────────────────────────────────────────────
// Landing page shows only the latest projects in a single shelf; the full
// archive lives on /work via "View All". Keep this ≤ ~10 to fit one row.
const HOME_PROJECT_COUNT = 8

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const featured = projects.slice(0, HOME_PROJECT_COUNT)

  useGSAP(
    () => {
      const items = sectionRef.current?.querySelectorAll('[data-work-item]')
      if (!items?.length) return
      gsap.from(items, {
        opacity: 0,
        y: 40,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current?.querySelector('.work-shelf'),
          start: 'top 80%',
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-32 md:py-44 px-6 border-t border-[#242424]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <SectionHeading
            index="04"
            label="Selected Work"
            title="Built for calm. Shipped at pace."
          />
          <Parallax speed="fast" className="md:shrink-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A]">
              <span>{String(projects.length).padStart(2, '0')} Projects</span>
              <span className="text-[#3A3A3A]">·</span>
              <span className="text-[#8A8A8A] normal-case tracking-normal">2023 — 2026</span>
              <span className="text-[#3A3A3A]">·</span>
              <Link
                to="/work"
                className="group inline-flex items-center gap-1.5 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
              >
                View All
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </Parallax>
        </div>

        {/* Shelf */}
        <div className="work-shelf relative">
          {/* Backdrop wall — barely-there vignette to read as a lit shelf */}
          <div
            aria-hidden
            className="absolute inset-x-[-10%] top-0 bottom-0 -z-10"
            style={{
              background:
                'radial-gradient(60% 50% at 50% 75%, rgba(60,40,20,0.06) 0%, rgba(10,10,10,0) 70%)',
            }}
          />

          {/* Desktop / tablet — one shelf of the latest projects */}
          <div className="hidden md:block">
            <div className="relative flex items-end justify-center gap-3 px-0">
              {featured.map((p, i) => (
                <BoxFile key={p.slug} project={p} index={i} />
              ))}
            </div>
            <Plank />
          </div>

          {/* Mobile — the same latest projects, stacked in rows of 4 */}
          <div
            className="md:hidden space-y-10"
            style={{ ['--folder-w' as never]: 'clamp(56px, 19vw, 90px)' }}
          >
            {Array.from(
              { length: Math.ceil(featured.length / 4) },
              (_, rowIdx) => {
                const rowItems = featured.slice(rowIdx * 4, rowIdx * 4 + 4)
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
  )
}
