// Shared film-grain texture — an inline SVG feTurbulence fractal-noise tile.
// The same string powers the site-wide grain in AmbientBackground / HeroVideo;
// exported here so new layers (e.g. the landing panel hover reveal) reuse the
// exact same texture instead of duplicating the data URL a fourth time.
export const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
