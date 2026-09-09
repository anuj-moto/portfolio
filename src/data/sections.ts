// Single source of truth for the 5 landing panels / routed sections.
// Landing, SideRail, and the router all consume this so order + labels stay in one place.

export interface SectionMeta {
  key: string
  index: string
  title: string
  path: string
  teaser: string
}

export const sections: SectionMeta[] = [
  {
    key: 'about',
    index: '01',
    title: 'About',
    path: '/about',
    teaser: 'Product designer. Systems thinker.',
  },
  {
    key: 'experience',
    index: '02',
    title: 'Work Experience',
    path: '/experience',
    teaser: 'Four years. Five chapters. One direction.',
  },
  {
    key: 'work',
    index: '03',
    title: 'Case Studies',
    path: '/work',
    teaser: 'Selected product & design work.',
  },
  {
    key: 'skills',
    index: '04',
    title: 'Skills',
    path: '/skills',
    teaser: 'Craft on one hand. Code on the other.',
  },
  {
    key: 'contact',
    index: '05',
    title: 'Contact',
    path: '/contact',
    teaser: 'Have something quiet to build?',
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
