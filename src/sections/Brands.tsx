import { motion } from 'framer-motion'

const brands = [
  'MasteryPrep',
  'Traya',
  'Dr. Skin',
  'Raaya',
  'Anchor',
  'Cupid Knot',
  'Photoshooto',
  'CargoConnect',
  'Wadhwa Event',
  'Zebra Learn',
]

export function Brands() {
  const row = [...brands, ...brands]

  return (
    <section className="relative py-24 border-y border-[#242424] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10 flex items-baseline justify-between">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A]">
            Brands I've Worked With
          </span>
        </motion.div>
        <span className="hidden md:block text-[10px] uppercase tracking-[0.25em] text-[#5A5A5A]">
          Selected / 2021 — 2026
        </span>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)',
        }}
      >
        <div className="flex w-max whitespace-nowrap animate-marquee will-change-transform">
          {row.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="font-display text-4xl md:text-6xl font-medium text-[#5A5A5A] hover:text-[#F5F5F5] transition-colors duration-500 tracking-tight flex items-center gap-16 pr-16"
            >
              {brand}
              <span className="text-[#242424]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
