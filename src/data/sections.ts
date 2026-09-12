// Single source of truth for the 5 landing panels / routed sections.
// Landing, SideRail, and the router all consume this so order + labels stay in one place.

export interface SectionMeta {
  key: string
  index: string
  title: string
  path: string
  teaser: string
  // Root-served (public/) hover image — a transparent PNG cut-out of the section's
  // subject, so it sits on the dark UI with no rectangle or seam.
  image: string
  // Positioning classes for the hover image: height (% of panel) + horizontal anchor.
  // Default in SplitPanel: 'left-1/2 -translate-x-1/2 h-[58%]'.
  imageClass?: string
  // Brightness class — bright subjects (papers, phone) are dimmed so they read as
  // quiet texture, not a bright pop. Default 'brightness-90'.
  imageBrightness?: string
  // Which edge the vertical title hugs. Default 'left'; the last panel uses 'right'
  // so its label sits on the outer edge with the image toward the row's centre.
  align?: 'left' | 'right'
}

export const sections: SectionMeta[] = [
  {
    key: 'about',
    index: '01',
    title: 'About',
    path: '/about',
    teaser: 'Product designer. Systems thinker.',
    image: '/anuj_pf_images.png',
    // larger (helmet ~middle), shifted slightly right of centre, legs crop at bottom
    imageClass: 'left-[55%] -translate-x-1/2 translate-y-[4%] h-[70%]',
    imageBrightness: 'brightness-100',
  },
  {
    key: 'experience',
    index: '02',
    title: 'Work Experience',
    path: '/experience',
    teaser: 'Four years. Five chapters. One direction.',
    // filename has a space — served from public/, URL-encoded
    image: '/building%20Image_pf.png',
    imageClass: 'left-1/2 -translate-x-1/2 translate-y-[3%] h-[56%]',
    imageBrightness: 'brightness-[0.85]',
  },
  {
    key: 'work',
    index: '03',
    title: 'Case Studies',
    path: '/work',
    teaser: 'Selected product & design work.',
    image: '/case_studies_pf.png',
    // tight crop (aspect 1.23) — larger, slightly left, bottom-cropped
    imageClass: 'left-[49%] -translate-x-1/2 translate-y-[6%] h-[52%]',
    imageBrightness: 'brightness-[0.85]',
  },
  {
    key: 'skills',
    index: '04',
    title: 'Skills & Hobbies',
    path: '/skills',
    teaser: 'Craft on one hand. Code on the other.',
    image: '/riding_skill_pf.png',
    // tight crop (aspect 0.79, tall) — larger, anchored right with a small gap, wheels crop
    imageClass: 'right-[-2%] translate-y-[4%] h-[70%]',
    imageBrightness: 'brightness-[0.85]',
  },
  {
    key: 'contact',
    index: '05',
    title: 'Contact',
    path: '/contact',
    teaser: 'Have something quiet to build?',
    image: '/contact_pf.png',
    // larger, anchored right, lifted so it floats above the bottom edge (not cropped)
    imageClass: 'right-[6%] -translate-y-[8%] h-[48%]',
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
