// Single source of truth for the 5 landing panels / routed sections.
// Landing, SideRail, and the router all consume this so order + labels stay in one place.

export interface SectionMeta {
  key: string
  index: string
  title: string
  path: string
  teaser: string
  // Root-served (public/) hover image. These are transparent PNG cut-outs of the
  // section's subject, so they sit on the dark UI with no rectangle or seam.
  image: string
  // Optional per-image classes (object-fit / object-position). Defaults to
  // 'object-contain object-bottom' in SplitPanel (whole subject, anchored low).
  imageZoom?: string
  // Optional per-image brightness (Tailwind class). Defaults to brightness-[0.9];
  // bright subjects (papers, phone) override it lower so they read as quiet texture.
  imageBrightness?: string
}

export const sections: SectionMeta[] = [
  {
    key: 'about',
    index: '01',
    title: 'About',
    path: '/about',
    teaser: 'Product designer. Systems thinker.',
    image: '/anuj_pf_images.png',
    imageZoom: 'object-contain object-bottom scale-95',
  },
  {
    key: 'experience',
    index: '02',
    title: 'Work Experience',
    path: '/experience',
    teaser: 'Four years. Five chapters. One direction.',
    // filename has a space — served from public/, URL-encoded
    image: '/building%20Image_pf.png',
    imageZoom: 'object-contain object-bottom scale-90',
    imageBrightness: 'brightness-[0.85]',
  },
  {
    key: 'work',
    index: '03',
    title: 'Case Studies',
    path: '/work',
    teaser: 'Selected product & design work.',
    image: '/case_studies_pf.png',
    // floating in the lower-middle (lifted off the bottom)
    imageZoom: 'object-contain object-bottom scale-90 -translate-y-[14%]',
    imageBrightness: 'brightness-[0.85]',
  },
  {
    key: 'skills',
    index: '04',
    title: 'Skills',
    path: '/skills',
    teaser: 'Craft on one hand. Code on the other.',
    // rider on the Triumph — fully isolated subject (skills_pf.png = parked bike alt)
    image: '/riding_skill_pf.png',
    imageBrightness: 'brightness-[0.85]',
  },
  {
    key: 'contact',
    index: '05',
    title: 'Contact',
    path: '/contact',
    teaser: 'Have something quiet to build?',
    image: '/contact_pf.png',
    imageBrightness: 'brightness-[0.85]',
  },
]

// A path belongs to a section if it matches exactly or is nested under it
// (e.g. /work/:slug lives under the Case Studies section).
export function activeSectionKey(pathname: string): string | null {
  const match = sections.find(
    (s) => pathname === s.path || pathname.startsWith(`${s.path}/`),
  )
  return match?.key ?? null
}
