// Work-experience timeline lifted verbatim from the original About section.
// `overview` is the short collapsed line; `description` is the full content
// revealed on hover (desktop) / tap (mobile).

export interface ExperienceEntry {
  year: string
  role: string
  company: string
  location: string
  overview: string
  description: string
}

export const experience: ExperienceEntry[] = [
  {
    year: '2021',
    role: 'UI Designer Intern',
    company: 'Photoshooto',
    location: 'India',
    overview: 'First real grounding in design systems — Intern of the Week & Month.',
    description:
      'Built UI components alongside product and marketing teams and got my first real grounding in design systems. Picked it up fast enough to earn Intern of the Week and Intern of the Month back-to-back.',
  },
  {
    year: '2021',
    role: 'UI/UX Designer',
    company: 'Cupid Knot',
    location: 'Surat, India',
    overview: 'Owned UX end-to-end, settling design debates with evidence.',
    description:
      'Owned the product end-to-end — my first time carrying UX on my own. Ran A/B and usability tests to settle design debates with evidence, and worked directly with stakeholders to turn market signals into shippable decisions.',
  },
  {
    year: '2022',
    role: 'Freelance UI/UX Designer',
    company: 'Anchor (Stealth Startup)',
    location: 'NYC, USA',
    overview: 'Designed a real-estate web product 0→1 and shipped it to HTML/CSS.',
    description:
      'Designed a real-estate web product 0→1 — user research, IA, and a design system from scratch, then shipped it into HTML/CSS myself. Worked shoulder-to-shoulder with the founders to keep every design call tied to a business goal.',
  },
  {
    year: '2023',
    role: 'UI/UX Designer',
    company: 'Traya',
    location: 'Mumbai, India',
    overview: 'Shipped measurable flows and built Tatva, Traya’s M3 design system.',
    description:
      'Shipped Book a Call, Diet Plan, Build a Habit, and Digital Prescription — and measured every one. Lifted retention 14–17%, conversion 12%, and Book-a-Call efficiency 11%, with user interviews and Microsoft Clarity sessions driving each iteration. Built Tatva, Traya’s M3-based design system, as the foundation under all of it.',
  },
  {
    year: '2025',
    role: 'Product Designer',
    company: 'MasteryPrep',
    location: 'Baton Rouge, USA',
    overview: 'Set the Student Experience foundation; shipped WorkKeys + a11y tooling.',
    description:
      'Set the foundational structure of the Student Experience under tight constraints, then shipped the WorkKeys student flows on top of it. Rebuilt QTI interactions around the student POV — HotText and others — and designed the accessibility toolset: Answer Masking, Strikethrough, and Read Aloud. Went past design too: built an agent that auto-resolves accessibility tickets straight from GitLab and personally cleared the a11y backlog. Ran UAT cycles and mentored engineers through the component structure. Impact numbers from the WorkKeys and accessibility work are still landing.',
  },
]
