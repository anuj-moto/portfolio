// Skill groups lifted verbatim from the original Skills section.
export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Design',
    skills: [
      'UI Design',
      'UX Design',
      'Design Systems',
      'Prototyping',
      'Wireframing',
      'Branding & Visual Identity',
      'Responsive Design',
    ],
  },
  {
    category: 'Research',
    skills: [
      'User Research',
      'Usability Testing',
      'A/B Testing',
      'Design Thinking',
      'Microsoft Clarity',
      'JTBD',
    ],
  },
  {
    category: 'AI & Tech',
    skills: [
      'AI Product Design',
      'Skills for AI-Agents',
      'Agentic AI',
      'AI Workflow Automation',
      'Conversational UI',
      'Prompt Engineering',
      'HTML / CSS',
      'Web3 / Crypto',
      'Developer Tools',
    ],
  },
  {
    category: 'Tools',
    skills: [
      'Figma',
      'FigJam',
      'Adobe Creative Suite',
      'Blender',
      'Spline',
      'Notion',
      'ClickUp',
      'VS Code',
      'Cursor',
      'Github',
      'Gitlab',
    ],
  },
]
