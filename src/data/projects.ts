import cs1 from '@/cs_media/CS-1.webp'

export interface CaseSection {
  kind: 'text' | 'quote' | 'image' | 'split'
  heading?: string
  label?: string
  body?: string
  image?: string
  caption?: string
  left?: string
  right?: string
}

export interface Metric {
  value: string
  label: string
}

export type ProjectKind = 'In-house' | 'Freelance' | 'Concept' | 'Personal'

export interface Project {
  slug: string
  title: string
  category: string
  year: string
  kind: ProjectKind
  summary: string
  description: string
  cover: string
  heroImage: string
  role: string
  timeline: string
  client: string
  platform: string
  tags: string[]
  metrics: Metric[]
  problem: string
  approach: string
  sections: CaseSection[]
  gallery: string[]
}

// NOTE: cover/heroImage/section image URLs are placeholders (picsum.photos).
// Replace with real screenshots from each Notion case-study page.
export const projects: Project[] = [
  // ── MasteryPrep (In-house) — current professional work, leads the section ──
  // NOTE: metrics with value 'PLACEHOLDER' are drafts — Anuj to replace with real numbers.
  {
    slug: 'student-experience-foundations',
    title: 'Student Experience — Foundations',
    category: 'EdTech · Assessment / Student Experience',
    year: '2024',
    kind: 'In-house',
    summary:
      'The foundational structure and early design decisions behind MasteryPrep’s student test-taking experience.',
    description:
      'Before MasteryPrep’s student platform could grow, it needed a spine. I led the foundational structure and the early design decisions for the student test-taking experience — the navigation model, the test player layout, the question patterns, and the rules that everything built later would inherit. This is the groundwork the rest of the student work stands on.',
    cover: 'https://picsum.photos/seed/student-experience-foundations-cover/1200/900',
    heroImage: cs1,
    role: 'Product Designer',
    timeline: 'In-house · MasteryPrep · 2024',
    client: 'MasteryPrep',
    platform: 'Web · Student test-taking platform',
    tags: ['Product Design', 'Information Architecture', 'Design System', 'Assessment', 'EdTech'],
    metrics: [
      { value: '0 → 1', label: 'Student experience defined from scratch' },
      { value: 'PLACEHOLDER', label: 'Reusable patterns established' },
      { value: 'PLACEHOLDER', label: 'Question types supported' },
      { value: 'Foundation', label: 'Spine for all later student work' },
    ],
    problem:
      'A test-taking platform isn’t one screen — it’s dozens of question types, timers, navigation states, and accommodations that all have to feel like one product on test day. Early on, those decisions were being made screen-by-screen, which meant every new feature re-litigated the basics. The student experience needed a foundation: a shared structure and a set of early decisions that everything after could build on without starting over.',
    approach:
      'I worked from the test-day moment backward. I mapped the student’s path — land, start, answer, navigate, review, submit — and turned the repeating parts into a structure: a consistent test player layout, a navigation model, and a small set of question patterns the team could compose instead of redraw. The early decisions were deliberately conservative and legible, because they were going to be inherited by every feature that came later.',
    sections: [
      {
        kind: 'text',
        label: 'Brief',
        heading: 'Decide the basics once.',
        body:
          'The goal wasn’t a single beautiful screen — it was a structure that would hold as the platform grew. I focused on the decisions that are expensive to change later: how the test player is laid out, how a student moves between questions, and how a question is framed regardless of its type.',
      },
      {
        kind: 'split',
        heading: 'Structure before surface.',
        left:
          'I mapped the full student path on test day and pulled out the parts that repeat — the player frame, the navigator, the answer area, the review and submit states. Those became the fixed structure everything else slots into.',
        right:
          'On top of that, a small set of question patterns: the shared anatomy a stimulus, prompt, and response share, so a new question type is a variation of something known rather than a fresh invention.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/student-experience-foundations-01/1800/900',
        caption: 'The test player frame — the fixed structure new question types are composed inside.',
      },
      {
        kind: 'text',
        label: 'Decisions',
        heading: 'Early calls, made to be inherited.',
        body:
          'Each early decision was written down as much as drawn — why the navigator behaves the way it does, what a question always owes the student, where accommodations live. Documenting the reasoning is what let the rest of the team extend the system without re-opening it.',
      },
      {
        kind: 'quote',
        body:
          'Get the foundation right and most of the later arguments simply don’t happen — the structure already answered them.',
        caption: 'Student Experience — design principles',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/student-experience-foundations-g1/1400/1000',
      'https://picsum.photos/seed/student-experience-foundations-g2/1400/1000',
      'https://picsum.photos/seed/student-experience-foundations-g3/1400/1000',
    ],
  },
  {
    slug: 'student-experience-uat',
    title: 'Student Experience — UAT',
    category: 'EdTech · QA / User Acceptance Testing',
    year: '2024',
    kind: 'In-house',
    summary:
      'Structuring and driving user acceptance testing to validate the student experience before it reached test day.',
    description:
      'Designing the student experience is only half the job — the other half is proving it holds up under real conditions. I structured and drove UAT for the student platform: building the test plans, defining what “pass” meant for each flow, running sessions, and turning what we found into prioritized, fixable issues before anything reached a student on test day.',
    cover: 'https://picsum.photos/seed/student-experience-uat-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/student-experience-uat-hero/1800/1100',
    role: 'Product Designer · UAT Lead',
    timeline: 'In-house · MasteryPrep · 2024',
    client: 'MasteryPrep',
    platform: 'Web · Student test-taking platform',
    tags: ['UAT', 'QA', 'Test Planning', 'Assessment', 'EdTech'],
    metrics: [
      { value: 'PLACEHOLDER', label: 'Flows covered by test plans' },
      { value: 'PLACEHOLDER', label: 'Issues found pre-release' },
      { value: 'PLACEHOLDER', label: 'Critical bugs caught before test day' },
      { value: 'Test-day', label: 'Validated against real conditions' },
    ],
    problem:
      'In assessment, a bug isn’t a cosmetic annoyance — a broken timer or a question that won’t submit can cost a student a real score. The student experience needed acceptance testing that matched those stakes: not a quick click-through, but a structured pass over every flow under the conditions students actually face.',
    approach:
      'I treated UAT as a design deliverable. I wrote test plans tied to the actual student flows, defined explicit acceptance criteria so “done” wasn’t a judgment call, and ran sessions that mirrored test-day conditions — timers running, accommodations on, edge cases included. Findings went back to the team as prioritized, reproducible issues rather than a pile of notes.',
    sections: [
      {
        kind: 'text',
        label: 'Approach',
        heading: 'Acceptance, not a click-through.',
        body:
          'UAT here had to be deliberate. I built plans around the real flows a student moves through, and wrote acceptance criteria for each one so the result was a clear pass or fail — not a vibe.',
      },
      {
        kind: 'split',
        heading: 'Test the conditions, not just the screens.',
        left:
          'Sessions ran the way test day runs — timers live, accommodations enabled, navigation pushed to its edges — because those are exactly the conditions where assessment software tends to break.',
        right:
          'Every issue came back reproducible and prioritized: what broke, the steps to see it, and how much it mattered. That’s what made fixes fast instead of a debate.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/student-experience-uat-01/1800/900',
        caption: 'UAT coverage — flows, acceptance criteria, and tracked outcomes.',
      },
      {
        kind: 'quote',
        body:
          'On test day there’s no second take. UAT is where we earn the confidence that there won’t need to be one.',
        caption: 'Student Experience — UAT',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/student-experience-uat-g1/1400/1000',
      'https://picsum.photos/seed/student-experience-uat-g2/1400/1000',
      'https://picsum.photos/seed/student-experience-uat-g3/1400/1000',
    ],
  },
  {
    slug: 'workkeys-student-experience',
    title: 'WorkKeys — Student Experience',
    category: 'EdTech · Assessment / Student Experience',
    year: '2025',
    kind: 'In-house',
    summary:
      'The student test-taking experience for ACT WorkKeys career-readiness assessments.',
    description:
      'WorkKeys measures the skills people actually use on the job — applied math, reading for information, locating information in workplace documents. I designed the student experience for WorkKeys on MasteryPrep’s platform, adapting the foundational test player to WorkKeys’ specific question types and document-heavy stimuli while keeping it calm enough for a high-stakes, career-defining sitting.',
    cover: 'https://picsum.photos/seed/workkeys-student-experience-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/workkeys-student-experience-hero/1800/1100',
    role: 'Product Designer',
    timeline: 'In-house · MasteryPrep · 2025',
    client: 'MasteryPrep',
    platform: 'Web · WorkKeys student assessment',
    tags: ['Product Design', 'Assessment', 'WorkKeys', 'Accessibility', 'EdTech'],
    metrics: [
      { value: 'PLACEHOLDER', label: 'WorkKeys assessments supported' },
      { value: 'PLACEHOLDER', label: 'Question types designed' },
      { value: 'Reused', label: 'Built on the student foundation' },
      { value: 'Career-ready', label: 'Workplace-skill assessment' },
    ],
    problem:
      'WorkKeys isn’t a standard multiple-choice test — it leans on workplace documents, tables, and applied scenarios a student has to read, locate, and reason through. The student experience had to make that dense, document-heavy content approachable on screen, under time, without losing the rigor that makes a WorkKeys score mean something to an employer.',
    approach:
      'I extended the existing student foundation rather than forking it — same player, same navigation, same accommodations — and focused the design effort where WorkKeys is genuinely different: presenting long workplace documents alongside their questions, handling applied-math scenarios, and keeping locating-information tasks legible. The result feels like the same product students already know, tuned for the demands of a career-readiness exam.',
    sections: [
      {
        kind: 'text',
        label: 'Context',
        heading: 'Skills for the job, tested on screen.',
        body:
          'WorkKeys asks students to work the way a job does — read a memo, read a table, do the math the situation calls for. The design job was to make that dense material sit comfortably in a timed, on-screen test without watering it down.',
      },
      {
        kind: 'split',
        heading: 'Same foundation, WorkKeys-specific demands.',
        left:
          'The player, navigator, and accommodations carried straight over from the student foundation, so nothing familiar had to be relearned.',
        right:
          'The new work concentrated on WorkKeys’ document-heavy stimuli and applied scenarios — pairing long source material with its questions, and keeping locating-information tasks readable under time.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/workkeys-student-experience-01/1800/900',
        caption: 'A WorkKeys item — workplace document paired with its question, readable under time.',
      },
      {
        kind: 'quote',
        body:
          'A WorkKeys score is something a student hands to an employer. The experience around it had to feel that serious — and that fair.',
        caption: 'WorkKeys — Student Experience',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/workkeys-student-experience-g1/1400/1000',
      'https://picsum.photos/seed/workkeys-student-experience-g2/1400/1000',
      'https://picsum.photos/seed/workkeys-student-experience-g3/1400/1000',
    ],
  },
  {
    slug: 'ai-demo-student-experience',
    title: 'AI Ecosystem — Demo Student Experience',
    category: 'EdTech · AI / Product',
    year: '2025',
    kind: 'In-house',
    summary:
      'An AI ecosystem that powers a believable, end-to-end demo of the student experience for prospects and sales.',
    description:
      'Selling an assessment platform means showing it working — with real-feeling questions, students, and results, not lorem ipsum. I built an AI ecosystem that generates and drives a complete demo student experience: realistic items, plausible student behavior, and populated results, so a prospect can walk the full journey end-to-end without us hand-building every screen.',
    cover: 'https://picsum.photos/seed/ai-demo-student-experience-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/ai-demo-student-experience-hero/1800/1100',
    role: 'Product Designer · AI Prototyping',
    timeline: 'In-house · MasteryPrep · 2025',
    client: 'MasteryPrep',
    platform: 'Web · AI-driven demo environment',
    tags: ['AI', 'Product Design', 'Prototyping', 'Demo', 'EdTech'],
    metrics: [
      { value: 'End-to-end', label: 'Full student journey, demo-ready' },
      { value: 'PLACEHOLDER', label: 'Demo scenarios generated' },
      { value: 'PLACEHOLDER', label: 'Time saved per demo build' },
      { value: 'AI-driven', label: 'Content + behavior generated' },
    ],
    problem:
      'A great demo is the difference between a prospect imagining the product and seeing it. But hand-building demo content — believable questions, students, and results for every scenario — is slow and goes stale the moment the product changes. Sales needed a demo student experience that looked real, covered different scenarios, and didn’t require a designer to assemble it by hand each time.',
    approach:
      'I built an AI ecosystem around the demo: generated assessment content that reads like the real thing, simulated student behavior so results populate plausibly, and a setup that lets someone spin up a scenario instead of mocking one. The design work was making all of that feel intentional — a demo a prospect trusts — rather than obviously synthetic.',
    sections: [
      {
        kind: 'text',
        label: 'Brief',
        heading: 'Show it working, not mocked.',
        body:
          'The demo had to feel like a live product mid-use — real questions, a real-seeming student, real results — so a prospect could picture their own students inside it. Anything that read as placeholder undercut the pitch.',
      },
      {
        kind: 'split',
        heading: 'An ecosystem, not a script.',
        left:
          'AI generates the parts that used to be hand-built — plausible items, student responses, and the results that follow — so the demo populates itself across scenarios.',
        right:
          'My role was to keep it convincing and on-brand: deciding what “realistic” means for assessment content, and shaping the generated output so it never reads as synthetic.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/ai-demo-student-experience-01/1800/900',
        caption: 'A generated demo scenario — student, items, and results, all populated by the ecosystem.',
      },
      {
        kind: 'text',
        label: 'Why it matters',
        heading: 'Faster demos, fewer stale screens.',
        body:
          'Because the content is generated, the demo keeps pace with the product instead of drifting behind it — and a new scenario is a setup step, not a design project.',
      },
      {
        kind: 'quote',
        body:
          'The best demo doesn’t look like a demo. It looks like the product, already full of students.',
        caption: 'AI Ecosystem — Demo Student Experience',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/ai-demo-student-experience-g1/1400/1000',
      'https://picsum.photos/seed/ai-demo-student-experience-g2/1400/1000',
      'https://picsum.photos/seed/ai-demo-student-experience-g3/1400/1000',
    ],
  },
  {
    slug: 'a11y-ticket-agent',
    title: 'a11y Ticket Resolver Agent',
    category: 'AI Agent · Accessibility / Tooling',
    year: '2025',
    kind: 'In-house',
    summary:
      'An AI agent that resolves GitLab accessibility tickets against the team’s Figma design system.',
    description:
      'Accessibility tickets pile up because each one is a small investigation — read the issue, find the right component, decide if it’s a design-system fix or a one-off, and propose a change that uses real tokens. I built an agent that does that investigation: it reads a GitLab a11y ticket, locates the source-of-truth Figma frame, decides component-vs-screen scope, and proposes a fix referencing only existing tokens and components — then waits for a human to approve.',
    cover: 'https://picsum.photos/seed/a11y-ticket-agent-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/a11y-ticket-agent-hero/1800/1100',
    role: 'Product Designer · Agent Builder',
    timeline: 'In-house · MasteryPrep · 2025',
    client: 'MasteryPrep',
    platform: 'AI Agent · GitLab + Figma',
    tags: ['AI Agent', 'Accessibility', 'Design Systems', 'GitLab', 'Figma'],
    metrics: [
      { value: 'PLACEHOLDER', label: 'Tickets triaged by the agent' },
      { value: 'PLACEHOLDER', label: 'Avg. time to a proposal' },
      { value: 'Human-in-loop', label: 'Proposes, never auto-merges' },
      { value: 'Tokens-only', label: 'Fixes use the existing system' },
    ],
    problem:
      'Accessibility debt accumulates faster than a team can clear it, and each ticket carries the same overhead — understand the issue, find the real component behind the screen, and propose a fix that respects the design system instead of inventing a one-off. That triage is exactly the kind of repeatable judgment work that buries designers.',
    approach:
      'I built an agent that mirrors how a careful designer would handle each ticket. It diagnoses the issue from the GitLab ticket, traces it to the source-of-truth Figma frame, decides whether the fix belongs at the component or the screen level, and writes a proposal that references only existing tokens and components. Crucially, it stops there and waits for explicit approval — it accelerates the judgment, it doesn’t replace the reviewer.',
    sections: [
      {
        kind: 'text',
        label: 'Brief',
        heading: 'Automate the triage, keep the judgment.',
        body:
          'The repetitive part of an a11y ticket is the investigation — not the decision. I built the agent to do the investigation thoroughly and then hand a clear, system-aware proposal to a human, rather than trying to close tickets on its own.',
      },
      {
        kind: 'split',
        heading: 'From ticket to grounded proposal.',
        left:
          'The agent reads the GitLab ticket, locates the source-of-truth Figma frame, and decides component-vs-screen scope — the same first moves a designer makes.',
        right:
          'Its proposal references only tokens and components that already exist, so a fix never drifts from the design system — then it waits for approve, reject, or an alternative.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/a11y-ticket-agent-01/1800/900',
        caption: 'A generated proposal — diagnosis, scope, and a token-grounded fix, pending human approval.',
      },
      {
        kind: 'text',
        label: 'Design stance',
        heading: 'A proposal, not a merge.',
        body:
          'The agent is deliberately bounded: it produces a recommendation and stops. That boundary is what makes it trustworthy on accessibility work, where a confident wrong fix is worse than no fix.',
      },
      {
        kind: 'quote',
        body:
          'The goal wasn’t to close tickets automatically — it was to make sure a human only ever has to make the decision, not do the digging.',
        caption: 'a11y Ticket Resolver Agent',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/a11y-ticket-agent-g1/1400/1000',
      'https://picsum.photos/seed/a11y-ticket-agent-g2/1400/1000',
      'https://picsum.photos/seed/a11y-ticket-agent-g3/1400/1000',
    ],
  },
  {
    slug: 'hottext-qti-interaction',
    title: 'HotText — QTI Interaction',
    category: 'EdTech · QTI Interaction Design',
    year: '2025',
    kind: 'In-house',
    summary:
      'A redesign of the HotText QTI interaction — selectable words and phrases — for clarity, affordance, and accessibility.',
    description:
      'HotText is a QTI interaction where a student selects words or phrases inside a passage to answer. It’s deceptively hard to get right: what’s selectable has to be obvious, the selected state has to be unmistakable, and the whole thing has to work with a keyboard and a screen reader. I improved the HotText interaction for students on MasteryPrep’s platform across all of those fronts.',
    cover: 'https://picsum.photos/seed/hottext-qti-interaction-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/hottext-qti-interaction-hero/1800/1100',
    role: 'Product Designer',
    timeline: 'In-house · MasteryPrep · 2025',
    client: 'MasteryPrep',
    platform: 'Web · QTI item interaction',
    tags: ['Interaction Design', 'QTI', 'Accessibility', 'Assessment', 'EdTech'],
    metrics: [
      { value: 'PLACEHOLDER', label: 'Reduction in mis-selections' },
      { value: 'WCAG', label: 'Keyboard + screen-reader support' },
      { value: 'PLACEHOLDER', label: 'Item types using HotText' },
      { value: 'Clearer', label: 'Affordance + selected state' },
    ],
    problem:
      'In a HotText item the student is reading and choosing at the same time, and the old interaction made both harder than they needed to be — it wasn’t obvious which words could be picked, the selected state was easy to miss, and it didn’t hold up to keyboard or screen-reader use. On a scored item, that ambiguity becomes a fairness problem, not just a polish one.',
    approach:
      'I reworked the interaction around two questions a student shouldn’t have to think about: “what can I click?” and “what did I just choose?” Selectable text got a clear, consistent affordance; the selected state became unmistakable; and the whole interaction was built to work with a keyboard and announce itself correctly to assistive tech — so the answer reflects what a student knows, not how well they decoded the UI.',
    sections: [
      {
        kind: 'text',
        label: 'Problem',
        heading: 'Reading and choosing at once.',
        body:
          'HotText asks a lot of a student — comprehend the passage and select within it simultaneously. The interaction has to disappear so the thinking can happen. The old one didn’t: selectable words were ambiguous and the chosen state was too quiet.',
      },
      {
        kind: 'split',
        heading: 'Two questions, answered instantly.',
        left:
          '“What can I select?” — selectable spans now carry a clear, consistent affordance, so the student never guesses what’s interactive.',
        right:
          '“What did I choose?” — the selected state is unmistakable, and toggling a choice on and off is obvious by sight and by keyboard.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/hottext-qti-interaction-01/1800/900',
        caption: 'HotText — selectable affordance and a clear selected state inside the passage.',
      },
      {
        kind: 'text',
        label: 'Accessibility',
        heading: 'Works without a mouse.',
        body:
          'The interaction is fully keyboard-operable and announces its state to screen readers, so students using accommodations get the same clarity — a requirement on a scored item, not a nice-to-have.',
      },
      {
        kind: 'quote',
        body:
          'A scored interaction should never test whether the student understood the interface. HotText now gets out of the way.',
        caption: 'HotText — QTI Interaction',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/hottext-qti-interaction-g1/1400/1000',
      'https://picsum.photos/seed/hottext-qti-interaction-g2/1400/1000',
      'https://picsum.photos/seed/hottext-qti-interaction-g3/1400/1000',
    ],
  },
  {
    slug: 'student-accessibility-tools',
    title: 'Student Accessibility Tools',
    category: 'EdTech · Accessibility / Accommodations',
    year: '2025',
    kind: 'In-house',
    summary:
      'Accommodation tools built into the student test player — Answer Masking, Strikethrough, and Read Aloud.',
    description:
      'Standardized tests grant accommodations for a reason, and the digital test player has to deliver them as first-class tools, not afterthoughts. I designed and built a set of student accessibility tools into MasteryPrep’s test player — Answer Masking to reduce visual load, Strikethrough for eliminating choices, and Read Aloud for text-to-speech — each one usable mid-question without breaking a student’s focus.',
    cover: 'https://picsum.photos/seed/student-accessibility-tools-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/student-accessibility-tools-hero/1800/1100',
    role: 'Product Designer',
    timeline: 'In-house · MasteryPrep · 2025',
    client: 'MasteryPrep',
    platform: 'Web · Student test player',
    tags: ['Accessibility', 'Accommodations', 'Product Design', 'Assessment', 'EdTech'],
    metrics: [
      { value: '3 tools', label: 'Masking · Strikethrough · Read Aloud' },
      { value: 'PLACEHOLDER', label: 'Students using accommodations' },
      { value: 'In-player', label: 'Built into the test experience' },
      { value: 'WCAG', label: 'Accessibility-first design' },
    ],
    problem:
      'Accommodations only count if a student can actually reach for them in the moment — under time, mid-question, without a manual. The test player needed answer masking, strikethrough, and read-aloud as built-in tools that feel native to the experience, work together, and don’t add friction for the students who depend on them most.',
    approach:
      'I designed each tool around the action it supports — masking to quiet a busy screen, strikethrough to reason by elimination, read-aloud to take in the question by ear — and made sure they coexist without clutter. They live in the player as a consistent, discoverable toolset, so turning one on is a single, obvious move rather than a detour out of the question.',
    sections: [
      {
        kind: 'text',
        label: 'Brief',
        heading: 'Accommodations as first-class tools.',
        body:
          'These aren’t extras bolted onto the test — for many students they’re how the test is taken. I designed masking, strikethrough, and read-aloud to feel native to the player and reachable in the moment, not buried in a menu.',
      },
      {
        kind: 'split',
        heading: 'Three tools, one consistent shelf.',
        left:
          'Answer Masking quiets the screen down to what the student is working on; Strikethrough lets them reason by elimination directly on the choices.',
        right:
          'Read Aloud gives the question by ear with clear controls. All three share one discoverable place in the player, so they never compete for attention.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/student-accessibility-tools-01/1800/900',
        caption: 'The accommodation toolset — masking, strikethrough, and read-aloud inside the player.',
      },
      {
        kind: 'text',
        label: 'Principle',
        heading: 'No friction for the students who need it most.',
        body:
          'Every interaction was checked against the reality of using it under time, with a keyboard, or with a screen reader — because for these students the tool is the test experience, and friction here is a fairness issue.',
      },
      {
        kind: 'quote',
        body:
          'An accommodation that’s hard to find isn’t really an accommodation. These had to be one move away, always.',
        caption: 'Student Accessibility Tools',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/student-accessibility-tools-g1/1400/1000',
      'https://picsum.photos/seed/student-accessibility-tools-g2/1400/1000',
      'https://picsum.photos/seed/student-accessibility-tools-g3/1400/1000',
    ],
  },
  {
    slug: 'flowscout-agent',
    title: 'FlowScout — Journey Mapping Agent',
    category: 'AI Agent · Product / Research Tooling',
    year: '2025',
    kind: 'In-house',
    summary:
      'An AI agent that maps a product’s end-to-end user journey and renders it as a FigJam flow and a Notion doc.',
    description:
      'Understanding how a product actually behaves — across roles, edge cases, and dead ends — usually means a human clicking through it for days. I built FlowScout, an agent that does that exploration: it navigates a live product (single account or multiple personas), or reasons a flow out from a written spec, then renders the result as a flow diagram in FigJam and a structured document in Notion.',
    cover: 'https://picsum.photos/seed/flowscout-agent-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/flowscout-agent-hero/1800/1100',
    role: 'Product Designer · Agent Builder',
    timeline: 'In-house · MasteryPrep · 2025',
    client: 'MasteryPrep',
    platform: 'AI Agent · FigJam + Notion',
    tags: ['AI Agent', 'User Journeys', 'FigJam', 'Notion', 'Product Research'],
    metrics: [
      { value: 'Multi-persona', label: 'Maps roles and where they diverge' },
      { value: 'PLACEHOLDER', label: 'Journeys mapped' },
      { value: 'PLACEHOLDER', label: 'Time saved vs. manual mapping' },
      { value: 'FigJam + Notion', label: 'Diagram + structured doc output' },
    ],
    problem:
      'A product’s real user journey is hard-won knowledge — it lives in someone’s head after days of clicking through every role and edge case, and it goes stale the moment the product ships again. Teams kept needing that map — for onboarding, for design, for comparing how teachers, students, and admins experience the same flow — and kept not having the time to make it.',
    approach:
      'I built FlowScout to do the exploration and the documentation in one pass. It can crawl a live product with one account or several personas, reconcile where roles overlap and diverge, or design a proposed flow straight from a spec when nothing’s built yet. Whatever the mode, it outputs the same two artifacts a team can actually use: a FigJam flow diagram and a structured Notion doc — not a transcript.',
    sections: [
      {
        kind: 'text',
        label: 'Brief',
        heading: 'Turn days of clicking into a map.',
        body:
          'The knowledge of how a product really flows is expensive to gather and quick to go stale. FlowScout was built to gather it autonomously and leave behind artifacts a team keeps using — a diagram and a doc, not a pile of screenshots.',
      },
      {
        kind: 'split',
        heading: 'Three ways to map a flow.',
        left:
          'Crawl a live product with a single account; or run several personas — teacher, student, admin — and reconcile where their journeys overlap and split.',
        right:
          'Or, when the product doesn’t exist yet, reason a proposed flow out from a written spec — so the map can lead the build instead of trailing it.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/flowscout-agent-01/1800/900',
        caption: 'FlowScout output — an end-to-end journey rendered as a FigJam flow.',
      },
      {
        kind: 'text',
        label: 'Output',
        heading: 'Artifacts, not a transcript.',
        body:
          'Every run ends in the same two places a team already works — a FigJam diagram to see the journey and a structured Notion doc to read it — so the output drops straight into how the team thinks, not into a folder no one opens.',
      },
      {
        kind: 'quote',
        body:
          'The map of how a product really works shouldn’t live in one person’s head. FlowScout draws it — and redraws it whenever you need.',
        caption: 'FlowScout — Journey Mapping Agent',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/flowscout-agent-g1/1400/1000',
      'https://picsum.photos/seed/flowscout-agent-g2/1400/1000',
      'https://picsum.photos/seed/flowscout-agent-g3/1400/1000',
    ],
  },
  {
    slug: 'raaya',
    title: 'Raaya — Living at Lohagad',
    category: 'Real Estate · Brand + Web',
    year: '2025',
    kind: 'Freelance',
    summary:
      'A brand and marketing site for Raaya — a collection of luxury homes in the foothills of Pawna, near Lohagad.',
    description:
      'Raaya is a boutique real-estate brand for a collection of luxury homes set in the foothills of Pawna, a short drive from Lohagad. I designed the identity and the full marketing site end-to-end — landing, homes, property detail, aesthetics, and about — and carried it across desktop, tablet, and mobile.',
    cover: '/raaya/hero.jpg',
    heroImage: '/raaya/interior.jpg',
    role: 'Brand + Product Designer',
    timeline: 'Freelance · 2025',
    client: 'Raaya (Real Estate)',
    platform: 'Web · Responsive marketing site',
    tags: ['Real Estate', 'Brand Identity', 'Web Design', 'Responsive', 'Art Direction'],
    metrics: [
      { value: 'End-to-end', label: 'Brand + site by one designer' },
      { value: '5 pages', label: 'Landing → property → about' },
      { value: '3 widths', label: 'Desktop · tablet · mobile' },
      { value: 'Brand → UI', label: 'Identity, type, and art direction' },
    ],
    problem:
      'A second home sells on feeling long before it sells on square footage. Raaya’s homes sit in a landscape most buyers have never stood in — the foothills of Pawna, under Lohagad. The site had to make that place felt: calm, rooted, and quietly premium, without slipping into the glossy sameness of most real-estate marketing.',
    approach:
      'I built the brand around the land itself — a sage-and-stone palette, a serif display voice, and full-bleed photography that lets the location speak. Every page leads with image and restraint: a quiet landing with a full-screen menu, a property page that pairs the story of Lohagad with hard specs, and an aesthetics page that walks through material and light. The same system flexes from a wide desktop canvas down to mobile.',
    sections: [
      {
        kind: 'text',
        label: 'Brief',
        heading: 'Sell the place, then the plan.',
        body:
          'Raaya isn’t a tower with a view — it’s a handful of homes in a specific landscape. The brief was to make a buyer feel the foothills of Pawna before they ever read a price. So the site opens slow: a quiet hero, a full-screen serif menu, and photography that does the persuading.',
      },
      {
        kind: 'image',
        image: '/raaya/property.jpg',
        caption:
          'The Raaya Lohagad property page — the story of the land above, the hard specs (2,456 sq.ft · 4BHK · 500 sq.m) below.',
      },
      {
        kind: 'split',
        heading: 'A brand drawn from the land.',
        left:
          'The identity leans on a sage-and-stone palette and a high-contrast serif — calm, grown-up, and rooted in place rather than trend. It reads as a retreat, not a real-estate listing.',
        right:
          'Photography carries most of the weight. Landscapes, light, and interiors are given room to breathe, with type and UI kept deliberately quiet so the place stays the subject.',
      },
      {
        kind: 'image',
        image: '/raaya/aesthetics.jpg',
        caption: 'Raaya Aesthetics — a walk through material, light, and the feel of living there.',
      },
      {
        kind: 'text',
        label: 'System',
        heading: 'One language, three widths.',
        body:
          'The whole site was designed across desktop, tablet, and mobile from a single system — type scale, spacing, and the photographic grid hold together at every breakpoint, so the brand stays intact whether it’s met on a laptop or a phone in the car park.',
      },
      {
        kind: 'quote',
        body:
          'Tucked in the peaceful foothills of Pawna — close enough to arrive without effort, far enough to feel away.',
        caption: 'Raaya — Property narrative',
      },
    ],
    gallery: ['/raaya/exterior.jpg', '/raaya/property.jpg', '/raaya/hero.jpg'],
  },
  {
    slug: 'founders-quarterly',
    title: 'Founders Quarterly',
    category: 'Editorial Design + Web',
    year: '2025',
    kind: 'Freelance',
    summary:
      'An editorial system and marketing site for a magazine covering founders and the businesses they build.',
    description:
      'Founders Quarterly is a print-and-web publication about founders, operators, and the long arc of building. I designed the editorial system — typography, grids, cover language — and the companion marketing website that lets readers subscribe and revisit past issues.',
    cover: 'https://picsum.photos/seed/founders-quarterly-cover/1200/900',
    heroImage: 'https://picsum.photos/seed/founders-quarterly-hero/1800/1100',
    role: 'Editorial Designer + Product Designer',
    timeline: 'Freelance · 2025',
    client: 'Founders Quarterly Magazine',
    platform: 'Print + Web · Editorial system + Marketing site',
    tags: ['Editorial', 'Typography', 'Branding', 'Web', 'Magazine'],
    metrics: [
      { value: 'Print + Web', label: 'One system across both surfaces' },
      { value: 'Quarterly', label: 'Designed to scale issue-over-issue' },
      { value: '0 → 1', label: 'Editorial identity built from scratch' },
    ],
    problem:
      'Founders Quarterly was launching with strong writing and no visual identity. The challenge was twofold — the editorial system had to carry long-form interviews and essays without fatiguing the reader, and the website had to convert curious visitors into subscribers without flattening the magazine’s point of view.',
    approach:
      'Lead with typography. A serif-anchored system for long-form copy, a sans companion for navigation and metadata, and a cover grid flexible enough to feature people, products, or pull-quotes. The web side reuses the same system at a different density — fewer columns, looser leading, but the same voice.',
    sections: [
      {
        kind: 'text',
        label: 'Type system',
        heading: 'Built for the long read.',
        body:
          'Long-form journalism lives or dies on type. I picked a body serif tuned for screen and print, paired with a neutral sans for chrome, and set a sizing scale that holds up across a 6,000-word feature and a single pull-quote.',
      },
      {
        kind: 'split',
        heading: 'A grid that flexes.',
        left:
          'The editorial grid is twelve columns at the underlying frame but reads as three, four, or six depending on the article. Sidebars, pull-quotes, and image plates all snap to it without feeling templated.',
        right:
          'The cover system uses the same grid — every issue can lead with a portrait, a product shot, or a typographic statement, and still read as the same magazine.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/founders-quarterly-grid/1800/900',
        caption: 'Editorial grid — twelve columns underneath, three to six on the page.',
      },
      {
        kind: 'text',
        label: 'Website',
        heading: 'A site that earns the subscription.',
        body:
          'The marketing site has one job: take a curious visitor and turn them into a subscriber. The home page leads with a current-issue feature, the archive lets readers browse past issues by topic, and the subscribe flow lives one tap from every page — contextual, never pushy.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/founders-quarterly-site/1800/900',
        caption: 'Marketing site — same type system, lower density, conversion-aware.',
      },
      {
        kind: 'text',
        label: 'Outcome',
        heading: 'One system, two surfaces.',
        body:
          'Founders Quarterly shipped its first issue and launched the site with a coherent identity across print and web. The team can lay out issue two without re-deciding the foundations.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/founders-quarterly-1/1600/1000',
      'https://picsum.photos/seed/founders-quarterly-2/1600/1000',
      'https://picsum.photos/seed/founders-quarterly-3/1600/1000',
    ],
  },
  {
    slug: 'mool-design-system',
    title: 'Mool Design System',
    category: 'Design System',
    year: '2024',
    kind: 'In-house',
    summary:
      'A design system built from the ground up for Mool — Traya\'s gut-health sub-brand.',
    description:
      'I defined the brand identity for Mool, established its visual language, and built the design system that powers every surface of the product. The system grew with the brand — evolving from a foundational set of tokens and components into a scalable library shaped by real user behaviour and pain points.',
    cover: 'https://picsum.photos/seed/mool-ds/1200/900',
    heroImage: 'https://picsum.photos/seed/mool-ds-hero/1800/1100',
    role: 'Lead Designer · Design System',
    timeline: 'Traya · 2024',
    client: 'Mool — a Traya sub-brand',
    platform: 'Web + Mobile · Cross-product foundations',
    tags: ['Design System', 'Tokens', 'Atomic Design', 'Brand Identity'],
    metrics: [
      { value: 'Brand 0 → 1', label: 'Identity built from scratch' },
      { value: 'Atomic', label: 'Atoms · Molecules · Organisms · Templates' },
      { value: 'Scalable', label: 'Token-driven foundations' },
    ],
    problem:
      'Mool was launching as a new gut-health brand under Traya, with no existing visual language and an audience spanning young users and adults. The product had to feel emotionally resonant and credible from day one — and the system had to support fast growth without splintering as new features shipped.',
    approach:
      'I treated identity and system as one job. Early research grounded the colour and typographic choices in the audience\'s emotional state. Secondary research on competitors — filtered through Jakob\'s Law — gave me a sense of the patterns users would already expect. From there, I built the system bottom-up: tokens first, then atoms, molecules, organisms, and templates.',
    sections: [
      {
        kind: 'text',
        label: 'Early research',
        heading: 'Start with the audience.',
        body:
          'I researched the target age groups and the emotional terrain around gut health — what users feel, fear, and trust. That research informed colour, type, and the overall warmth of the system. The goal was a brand that meets users where their concerns actually sit, not one that performs polish at them.',
      },
      {
        kind: 'text',
        label: 'Secondary research',
        heading: 'Familiarity is a feature.',
        body:
          'Studying competitors and applying Jakob\'s Law, I leaned into patterns users already expect from health and wellness products. Familiarity reduces cognitive load — the system uses convention where convention works, and earns its differences elsewhere.',
      },
      {
        kind: 'split',
        heading: 'Tokens first.',
        left:
          'I built Mool\'s colour system on colour theory — defining base values, then deriving surface layers and state colours from them. The result: a single source of truth for every shade the product would ever need.',
        right:
          'Type and sizing tokens were chosen to keep hierarchy honest at every scale, with sizing increments (2/4/8/12/16) tuned to grid and component spacing. Nothing in the system uses a magic number.',
      },
      {
        kind: 'text',
        label: 'Atomic structure',
        heading: 'Atoms → Molecules → Organisms → Templates.',
        body:
          'Atoms are buttons, fields, icons, and type styles — every one tied back to a token. Molecules combine them into search bars, labelled buttons, dropdowns. Organisms assemble those into nav bars, product cards, profile panels. Templates are the page layouts. Each layer earns its existence by serving the one above it.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/mool-ds-anatomy/1800/900',
        caption: 'Mool design system anatomy — tokens, atoms, molecules, organisms, templates.',
      },
      {
        kind: 'text',
        label: 'Outcome',
        heading: 'A foundation the brand can grow on.',
        body:
          'The system shipped as the visual backbone for Mool\'s product surfaces and continues to evolve with each feature. It set the standard for how Mool looks, behaves, and earns trust.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/mool-ds-1/1600/1000',
      'https://picsum.photos/seed/mool-ds-2/1600/1000',
      'https://picsum.photos/seed/mool-ds-3/1600/1000',
    ],
  },
  {
    slug: 'mool-web-app',
    title: 'Mool Web App',
    category: 'Web App',
    year: '2024',
    kind: 'In-house',
    summary:
      'A web app for the gut-health brand Mool, built on top of the Mool Design System.',
    description:
      'After establishing the Mool Design System, I designed Mool\'s web product end-to-end — using the system to ship a coherent, conversion-aware experience for users across age groups dealing with gut-health issues.',
    cover: 'https://picsum.photos/seed/mool-web/1200/900',
    heroImage: 'https://picsum.photos/seed/mool-web-hero/1800/1100',
    role: 'Product Designer',
    timeline: 'Traya · 2024',
    client: 'Mool — a Traya sub-brand',
    platform: 'Web · Marketing + Product',
    tags: ['Web', 'Health', 'Conversion', 'Personas', 'Usability Testing'],
    metrics: [
      { value: 'System-led', label: 'Built entirely on the Mool DS' },
      { value: 'Tested', label: 'Usability + A/B validated' },
      { value: 'Iterated', label: 'Continuously refined post-launch' },
    ],
    problem:
      'Mool needed a web presence that translated emotional connection into business conversion — credible to a wide audience (young users to adults) on a sensitive subject, while reflecting a brand still being defined in real time.',
    approach:
      'Use the design system as scaffolding. Lead with research — both early (users) and secondary (competitors) — to map the journey, build personas, and decide which complexities to simplify. Design templates from organisms, annotate everything for engineering, and ship into a tight loop of usability + A/B testing.',
    sections: [
      {
        kind: 'text',
        label: 'Research',
        heading: 'Understanding emotion before utility.',
        body:
          'Because Mool was new, I had no behavioural data to lean on. I started by understanding the users themselves — what they feel about gut health, what stops them from acting, what pulls them back. That work produced detailed personas the entire team could design against.',
      },
      {
        kind: 'split',
        heading: 'Competitors as a map.',
        left:
          'I studied how other gut-health products talked to users, where their journeys broke, and which UX patterns were doing real work versus performing concern. Each finding got filtered through Mool\'s specific point of view.',
        right:
          'That distillation defined which patterns Mool would adopt, which it would invert, and where it would simply do its own thing. I then aligned with stakeholders and content creators to build a hierarchy that simplifies the medical-adjacent content.',
      },
      {
        kind: 'text',
        label: 'Building',
        heading: 'Organisms first, then templates.',
        body:
          'I assembled the page layouts from organisms in the Mool DS, ensuring every section reflected a part of the user journey. Each component was annotated in Figma with engineering notes — interaction states, behaviour expectations, edge cases — so the build team could ship without guessing.',
      },
      {
        kind: 'text',
        label: 'Validation',
        heading: 'Usability + A/B testing in tandem.',
        body:
          'Usability tests caught friction points and missed expectations. A/B tests on CTAs, layouts, and visual treatment showed which variants drove engagement and conversion. Each round fed back into the design — iterations were targeted, not cosmetic.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/mool-web-flow/1800/900',
        caption: 'User journey across the Mool web experience — entry to conversion.',
      },
      {
        kind: 'text',
        label: 'Outcome',
        heading: 'A site that meets users where they are.',
        body:
          'The final web app reflects what the research found, what the system enables, and what the testing validated — a calm, credible, conversion-aware experience for a brand earning trust on a sensitive topic.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/mool-web-1/1600/1000',
      'https://picsum.photos/seed/mool-web-2/1600/1000',
    ],
  },
  {
    slug: 'traya-task-feature',
    title: 'Traya — Task Feature',
    category: 'Mobile · Feature Design',
    year: '2024',
    kind: 'In-house',
    summary:
      'Redesigning the Task component on Traya\'s home screen — the entry point for ~90% of daily user actions.',
    description:
      'The Task feature sits at the top of Traya\'s home screen and routes nearly every recurring action a user takes — logging meds, tracking diet, booking calls, reorders, feedback. The old design was cluttered, flat, and unintuitive. The redesign reframed it as a focused, hierarchical, and emotionally engaging surface.',
    cover: 'https://picsum.photos/seed/traya-task/1200/900',
    heroImage: 'https://picsum.photos/seed/traya-task-hero/1800/1100',
    role: 'UI/UX Designer',
    timeline: 'Traya · 2024',
    client: 'Traya (Mumbai)',
    platform: 'Mobile · iOS + Android',
    tags: ['Mobile', 'Feature Design', 'Hierarchy', 'Microcopy', 'Animation'],
    metrics: [
      { value: '~90%', label: 'Of daily user actions routed via Tasks' },
      { value: 'Above fold', label: 'First-fold home-screen placement' },
      { value: 'Old → New', label: 'Hierarchy, CTAs, and motion redesigned' },
    ],
    problem:
      'Users felt overwhelmed by the original Task design. Everything carried the same visual weight — there was no urgency, no clear next action, no emotional pull. Repeated CTAs ("Book a call now") created cognitive load instead of momentum, and the static layout made the entire feature feel inert despite being the most-used entry point in the app.',
    approach:
      'Reframe the Task surface as a daily checklist with strong hierarchy, calibrated microcopy, and motion that earns its place. Each task has a clear weight and tone; the most urgent surfaces with full visual emphasis, the rest queue calmly underneath. CTAs were rewritten to introduce gentle urgency without yelling.',
    sections: [
      {
        kind: 'text',
        label: 'Why it matters',
        heading: 'The most-used surface in the app.',
        body:
          'Tasks lives in the first fold of the home screen — visible without scrolling. Almost 90% of repeat user actions enter through it: logging medication, tracking diet, booking expert calls, reorders, feedback. Anything that improves Tasks improves the whole app.',
      },
      {
        kind: 'text',
        label: 'Old design',
        heading: 'Five problems compounding.',
        body:
          'The old surface had no visual hierarchy — every task looked the same, so nothing felt urgent. The UI was static and uninspiring. Repeated copy added cognitive load. CTAs lacked emphasis. Tasks felt generic instead of personal. Together, those five issues turned a high-leverage surface into background noise.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/traya-task-old/1800/900',
        caption: 'Old Task component — flat hierarchy, repeated CTAs, low emotional pull.',
      },
      {
        kind: 'split',
        heading: 'New design.',
        left:
          'A card-based layout introduces a clear primary task ("Get onboard your Traya hair journey") with bold, intentional weight. Microcopy like "ACT FAST" and "MAKE IT HAPPEN" creates urgency without nagging. CTAs ("Book Now" / "Maybe Later") give users a clean choice.',
        right:
          'Personalised headlines ("Today\'s checklist") make the surface feel addressed to the user, not at them. Generous spacing keeps the layout scannable. Loading, interaction, and completion animations turn what was a static block into a small daily ritual.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/traya-task-new/1800/900',
        caption: 'New Task component — hierarchy, microcopy, considered CTAs.',
      },
      {
        kind: 'text',
        label: 'Tracking',
        heading: 'How we measured the change.',
        body:
          'Three metrics: CTR per task, completion rate of task actions, and total clicks on the component. Each maps cleanly to the business goal — increasing post-purchase activity from the second order onwards and lifting interactivity across the home screen.',
      },
      {
        kind: 'text',
        label: 'Edge cases',
        heading: 'Designed for the awkward states too.',
        body:
          'Task load, refresh, completion, right-swipe, and left-swipe each have a defined visual and motion treatment. Animations cover loading, interaction, and completion — so the feature feels alive whether it\'s being used heavily or skimmed past.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/traya-task-1/1600/1000',
      'https://picsum.photos/seed/traya-task-2/1600/1000',
      'https://picsum.photos/seed/traya-task-3/1600/1000',
    ],
  },
  {
    slug: 'cargoconnect',
    title: 'CargoConnect',
    category: 'Logistics App',
    year: '2024',
    kind: 'Freelance',
    summary:
      'A three-panel logistics platform — User, Operator, and Carrier — for cross-border delivery across the USA.',
    description:
      'A complete app design for a logistics company moving freight across the US. Three audiences, one shared mental model, and a UI that stays uncluttered while every flow respects core UX principles.',
    cover: 'https://picsum.photos/seed/cargoconnect/1200/900',
    heroImage: 'https://picsum.photos/seed/cargoconnect-hero/1800/1100',
    role: 'Freelance Product Designer',
    timeline: 'Freelance · 2024',
    client: 'CargoConnect (USA / Mexico)',
    platform: 'Mobile · iOS + Android',
    tags: ['Mobile', 'Logistics', 'Multi-panel UX', 'Design System'],
    metrics: [
      { value: '3', label: 'User panels designed' },
      { value: 'End-to-end', label: 'Booking → tracking → delivery' },
      { value: '0 → 1', label: 'Built from scratch' },
    ],
    problem:
      'CargoConnect needed an app that served three very different jobs — a customer booking a load, an operator coordinating it, and a carrier moving it — without forcing each role to learn an entirely different product. Existing logistics apps either flattened the experience or fragmented it. The brief was uncommonly broad, and the data each role had to act on was uncommonly dense.',
    approach:
      'I started by mapping the full logistics process end-to-end: every handoff, every status, every place a delay could enter the system. From that map I extracted the few primitives shared across all three roles — load, route, status, document — and let each panel emphasise the ones its user actually controlled. The result is one design language with three calibrated information densities.',
    sections: [
      {
        kind: 'text',
        label: 'Discovery',
        heading: 'Three users. One reality.',
        body:
          'Before drawing screens I walked through the client\'s requirements and reverse-engineered the operational flow. Customers care about ETA and cost. Operators care about exceptions. Carriers care about the next stop. Each of those framings became a panel — and each panel hides the other two roles\' noise.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/cargoconnect-flow/1800/900',
        caption:
          'Process map of the cross-border logistics flow — every status the app has to surface.',
      },
      {
        kind: 'split',
        heading: 'A shared visual language.',
        left:
          'A single component library serves all three panels. Cards, chips, and timelines change density and emphasis but never identity, so a customer support agent can read all three views without translation.',
        right:
          'Status colour, document iconography, and address formatting are global tokens. Anything role-specific — exception controls for operators, GPS prompts for carriers — is layered on top of that shared base.',
      },
      {
        kind: 'text',
        label: 'Information density',
        heading: 'Calibrated for what each role actually does.',
        body:
          'The user panel is sparse and reassuring — book, see ETA, get a receipt. The operator panel is the opposite: a triage view that surfaces exceptions first and lets the user dive into any load with two taps. The carrier panel is a glanceable, hands-busy interface designed for mid-route use, with large touch targets and minimal text.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/cargoconnect-panels/1800/1100',
        caption: 'User, Operator, and Carrier — same primitives, three densities.',
      },
      {
        kind: 'text',
        label: 'Outcome',
        heading: 'Uncluttered at every density.',
        body:
          'The app shipped with all three panels live and a documentation set the dev team could lean on as new flows were added. The single most repeated piece of feedback from the founders: it doesn\'t feel like three apps stitched together.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/cargoconnect-1/1600/1000',
      'https://picsum.photos/seed/cargoconnect-2/1600/1000',
      'https://picsum.photos/seed/cargoconnect-3/1600/1000',
    ],
  },
  {
    slug: 'wadhwa-event',
    title: 'Wadhwa Event & Exhibits',
    category: 'Website & Brand',
    year: '2024',
    kind: 'Freelance',
    summary:
      'A modern marketing site and visual identity for an emerging event-management company in Pune.',
    description:
      'Wadhwa runs everything from corporate gatherings to social celebrations. They needed a website that signalled craft, kept conversion in mind, and gave them a coherent brand to grow into.',
    cover: 'https://picsum.photos/seed/wadhwa/1200/900',
    heroImage: 'https://picsum.photos/seed/wadhwa-hero/1800/1100',
    role: 'Freelance Product Designer',
    timeline: 'Freelance · 2024',
    client: 'Wadhwa Event & Exhibits (Pune, India)',
    platform: 'Web · Marketing + Lead Capture',
    tags: ['Web', 'Branding', 'Visual Identity', 'Conversion'],
    metrics: [
      { value: 'Brand', label: 'Visual identity established' },
      { value: 'Modern', label: 'Trendy interface, smooth flows' },
      { value: '↑', label: 'Conversion-focused IA' },
    ],
    problem:
      'Wadhwa was competing in a crowded event-management market with no consistent visual presence and a website that didn\'t do them justice. The site had to position the brand as premium and trustworthy, while still being a working lead-capture tool that fit a small team\'s ability to maintain it.',
    approach:
      'I treated the project as identity and product at once. Built a small, opinionated visual system — type, palette, photography direction — and then designed the site around the three things prospects actually need to feel: trust, range, and ease of contact. Every section earns its scroll.',
    sections: [
      {
        kind: 'text',
        label: 'Visual identity',
        heading: 'Premium, but warm.',
        body:
          'Event work is emotional. The brand had to feel premium without going cold. I anchored the system in confident type, generous spacing, and photography that put the people Wadhwa serves at the centre of the frame — not abstract decor.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/wadhwa-brand/1800/900',
        caption: 'Brand foundations — type, colour, and the rules that keep them honest.',
      },
      {
        kind: 'split',
        heading: 'Designed for the conversion path.',
        left:
          'The site is built around one path: see the work, trust the team, start a conversation. Every section either builds confidence or removes a tap from that path.',
        right:
          'The contact CTA is contextual — it changes copy based on the section it lives in, so a visitor on a corporate-events page sees a different ask than one browsing weddings.',
      },
      {
        kind: 'text',
        label: 'Outcome',
        heading: 'A presence the team can grow into.',
        body:
          'The handoff included a brand guide, the production-ready website, and a small library of patterns Wadhwa can reuse as they expand. The brief asked for a website; the result was a system the team can build a business on.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/wadhwa-1/1600/1000',
      'https://picsum.photos/seed/wadhwa-2/1600/1000',
    ],
  },
  {
    slug: 'groww-case-study',
    title: 'Groww — Portfolio Tab',
    category: 'Fintech · Concept',
    year: '2024',
    kind: 'Concept',
    summary:
      'A self-directed redesign exercise: a unified Portfolio tab in Groww that serves both active and passive traders.',
    description:
      'A concept case study exploring how Groww could consolidate portfolio insight into a single tab tailored to two very different user mindsets — the active trader chasing real-time signal, and the passive investor watching long-term health. One feature, two emotional registers.',
    cover: 'https://picsum.photos/seed/groww/1200/900',
    heroImage: 'https://picsum.photos/seed/groww-hero/1800/1100',
    role: 'Designer · Self-directed',
    timeline: '2024',
    client: 'Concept project · Groww',
    platform: 'Mobile · iOS + Android',
    tags: ['Fintech', 'Mobile', 'Personas', 'Data Viz', 'Concept'],
    metrics: [
      { value: '2 archetypes', label: 'Active + Passive trader needs mapped' },
      { value: 'Aggregated', label: 'One tab for total portfolio value & P/L' },
      { value: 'Decision-first', label: 'Designed for faster, informed action' },
    ],
    problem:
      'Groww users span a wide behavioural range — active traders refreshing positions during market hours, and passive investors checking in monthly. The existing structure made both audiences hunt for the data that mattered to them. The case study asked: can a single Portfolio surface serve both, without compromising either?',
    approach:
      'Define the two archetypes in detail, then design a Portfolio tab that adapts emphasis without forking the experience. Aggregated overview at the top for everyone; segmented sub-tabs (Dashboard, Stocks, Funds, ETFs) underneath. Visual treatment leans on colour-coded P/L, allocation pie charts, and growth lines — the data each archetype needs, each rendered in the format they read it best.',
    sections: [
      {
        kind: 'text',
        label: 'User types',
        heading: 'Active traders.',
        body:
          'Behaviour: short-term gains via frequent trades — intraday, F&O, bulk stock. They need real-time updates, granular data, and tools to act on risk in seconds. Psychology: emotionally driven by fluctuations — excitement on profit, anxiety on loss. Their portfolio surface has to surface signal fast.',
      },
      {
        kind: 'text',
        label: 'User types',
        heading: 'Passive traders.',
        body:
          'Behaviour: long-term, stability-seeking — mutual funds, ETFs, SIPs. Periodic check-ins, not constant. Psychology: prioritise peace of mind, trust in their strategy, sense of control. Their surface should reassure, not alert — focused on cumulative growth and allocation health.',
      },
      {
        kind: 'split',
        heading: 'Aggregated overview, for both.',
        left:
          'Total portfolio value and net profit/loss sit at the top — colour-coded green/red — so anyone gets the headline number in a glance.',
        right:
          'An allocation pie chart breaks down asset distribution (stocks, mutual funds, ETFs) so passive investors see balance and active ones see exposure.',
      },
      {
        kind: 'text',
        label: 'Key concept',
        heading: 'A new Portfolio tab.',
        body:
          'A dedicated Portfolio tab in the bottom navigation, with segmented top tabs for Dashboard, Stocks, Funds, and ETFs. Active traders dive into specific asset classes; passive investors stay on Dashboard. The architecture lets each audience use the same product their own way.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/groww-tab/1800/900',
        caption: 'Portfolio tab concept — aggregated headline, segmented sub-tabs.',
      },
      {
        kind: 'text',
        label: 'Design goals',
        heading: 'Navigation, data, and decisions.',
        body:
          'Three goals shaped the design. Clear, intuitive navigation — a dedicated tab and segmented sub-tabs reduce cognitive load. Data representation that earns its weight — distinct treatments for portfolio value, 1D returns, growth charts, and allocation pies. Decision support — every metric a user needs to act on lives in one place, with hints toward Tax & Capital Gains for the audience that cares.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/groww-1/1600/1000',
      'https://picsum.photos/seed/groww-2/1600/1000',
      'https://picsum.photos/seed/groww-3/1600/1000',
    ],
  },
  {
    slug: 'zebra-learn',
    title: 'Zebra Learn',
    category: 'EdTech App',
    year: '2024',
    kind: 'Freelance',
    summary:
      'A reading and library app for an EdTech brand making financial knowledge more accessible.',
    description:
      'Zebra Learn sells eBooks and hard copies focused on financial literacy. I designed an app that doubles as their digital library — buy, read, and keep track of progress in one place.',
    cover: 'https://picsum.photos/seed/zebra-learn/1200/900',
    heroImage: 'https://picsum.photos/seed/zebra-learn-hero/1800/1100',
    role: 'Freelance Product Designer',
    timeline: 'Freelance · 2024',
    client: 'Zebra Learn (India)',
    platform: 'Mobile · iOS + Android',
    tags: ['Mobile', 'EdTech', 'Reading', 'E-commerce'],
    metrics: [
      { value: 'Library', label: 'Buy + read in one app' },
      { value: 'Mobile-first', label: 'Designed for everyday reading' },
    ],
    problem:
      'Zebra Learn wanted to make financial knowledge frictionless. Their customers were buying books on one platform and reading them somewhere else — the moment of intent and the moment of action were splitting up. The app had to bring both back into a single, calm place.',
    approach:
      'A small surface area, intentionally. The app does three things — discover, buy, read — and resists adding a fourth. The reading experience prioritises long-form comfort, with progress, bookmarks, and notes as the only secondary affordances.',
    sections: [
      {
        kind: 'text',
        label: 'Reading first',
        heading: 'A library, not a store.',
        body:
          'The default surface is the user\'s own shelf. The store sits one tap away, but reading takes the centre. That single inversion changes the whole feel of the product.',
      },
      {
        kind: 'image',
        image: 'https://picsum.photos/seed/zebra-learn-shelf/1800/900',
        caption: 'Shelf-first home — your books, then everything else.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/zebra-learn-1/1600/1000',
      'https://picsum.photos/seed/zebra-learn-2/1600/1000',
    ],
  },
  {
    slug: 'smokie',
    title: 'Smokie',
    category: 'Web UI/UX',
    year: '2023',
    kind: 'Personal',
    summary:
      'A web project focused on tight visual storytelling and considered interaction.',
    description:
      'A self-directed web UI/UX project — a place to push craft on layout, motion, and the small decisions that make a site feel intentional rather than templated.',
    cover: 'https://picsum.photos/seed/smokie/1200/900',
    heroImage: 'https://picsum.photos/seed/smokie-hero/1800/1100',
    role: 'Designer',
    timeline: '2023',
    client: 'Personal project',
    platform: 'Web',
    tags: ['Web', 'Visual Design', 'Interaction'],
    metrics: [
      { value: 'Craft', label: 'Self-directed exploration' },
    ],
    problem:
      'A client brief gave me space to push on the visual side of the work — type, motion, restraint — without the usual constraints of a corporate brand system.',
    approach:
      'Treat every section as a single composition. Strong type, generous space, and motion that earns its place. The goal: a site that feels designed, not assembled.',
    sections: [
      {
        kind: 'text',
        label: 'Notes',
        heading: 'Considered, not decorated.',
        body:
          'Smokie was an exercise in restraint. Every interaction had to justify itself, every animation had to mean something. The result is a small site I still use as a reference for how much weight a single composition can carry.',
      },
    ],
    gallery: [
      'https://picsum.photos/seed/smokie-1/1600/1000',
      'https://picsum.photos/seed/smokie-2/1600/1000',
    ],
  },
]

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  if (i === -1) return projects[0]
  return projects[(i + 1) % projects.length]
}
