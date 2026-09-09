import { brands } from '@/data/brands'

const MASK =
  'linear-gradient(90deg, transparent 0%, #000 12%, #000 88%, transparent 100%)'

export function BrandsMarquee() {
  const row = [...brands, ...brands]
  return (
    <div
      className="relative overflow-hidden"
      style={{ maskImage: MASK, WebkitMaskImage: MASK }}
    >
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform">
        {row.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="flex items-center gap-16 pr-16 font-display text-4xl font-medium tracking-tight text-text-dim transition-colors duration-500 hover:text-text md:text-6xl"
          >
            {brand}
            <span className="text-border">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
