const SRC = '/anuj.jpeg'

export function HeroVideo() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0A0A0A]"
      aria-hidden
    >
      <img
        src={SRC}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.9)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/60" />
      {/* Vertical scrim to keep hero type readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.15) 40%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,0.9) 100%)',
        }}
      />
      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgba(10,10,10,0.75) 100%)',
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
