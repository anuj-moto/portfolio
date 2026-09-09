// Process steps — now shown as a simple flow on the Case Studies page.
export interface ProcessStep {
  number: string
  title: string
  description: string
  tools: string[]
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Research & Discovery',
    description:
      'AI-assisted synthesis of interviews, competitive scans, and market data. Pattern recognition at scale, guided by human intuition.',
    tools: ['Interviews', 'AI Synthesis', 'Competitive Audit'],
  },
  {
    number: '02',
    title: 'Strategy & Architecture',
    description:
      'Information architecture and user flows shaped by insight. Every interaction mapped before a single pixel is drawn.',
    tools: ['User Flows', 'IA Mapping', 'Jobs-to-be-Done'],
  },
  {
    number: '03',
    title: 'AI-Assisted Design',
    description:
      'Rapid exploration through generative tools. I generate dozens of directions, then curate and refine. AI proposes, I dispose.',
    tools: ['Figma', 'Generative UI', 'Design Systems'],
  },
  {
    number: '04',
    title: 'Prototype & Validate',
    description:
      'Interactive prototypes tested with real users. AI surfaces usability issues from session recordings I might miss.',
    tools: ['Prototyping', 'Usability', 'AI Analytics'],
  },
  {
    number: '05',
    title: 'Ship & Iterate',
    description:
      'Close collaboration with engineering through launch. UX monitoring catches regressions before users do.',
    tools: ['Dev Handoff', 'QA Review', 'Monitoring'],
  },
]
