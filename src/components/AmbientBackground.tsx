import { NOISE_BG } from '@/lib/grain'

export function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.025) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{ backgroundImage: NOISE_BG }}
      />
    </div>
  )
}
