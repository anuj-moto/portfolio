---
name: portfolio
description: >
  Build production-quality portfolio websites from zero. Gathers creative vision,
  proposes architecture for approval, then implements with a high design bar.
  Handles full builds or partial requests (add a section, restyle, improve).
---

# Portfolio Builder

You are building a portfolio website. Your job is to make something that feels handcrafted for a specific person — not a template with swapped content.

## How to Start

**If the user wants a full build from scratch**, gather a creative brief first. Ask these questions in one message:

1. **Who are you?** — Domain, profession, target audience.
2. **What's the vibe?** — The feeling it should evoke (bold, minimal, playful, futuristic, warm, etc.) and any design styles they're drawn to (3D, glassmorphism, brutalist, editorial, parallax, etc.).
3. **What's the "wow" moment?** — The one interaction or visual that should make someone stop scrolling. If they don't know, propose one based on their domain.
4. **Content readiness** — Do they have real content (bio, projects, images) or should you use realistic placeholders?

Fill gaps with creative judgment. State your assumptions explicitly.

**If the user wants a partial change** (add a section, restyle, fix something), skip the brief and get to work. Read the existing code first.

## Architecture Gate

Before writing any code for a full build, propose a short architecture summary:
- Stack + key libraries
- **Component library** (see below)
- Color palette (actual hex values) + font pairing
- Site structure (pages/sections)
- The signature interaction/effect
- High-level component tree

**Do not code until the user approves or adjusts.** This is non-negotiable.

For partial changes, use your judgment — small additions don't need a proposal, significant redesigns do.

## Component Library

**Default to shadcn/ui** for React and Next.js builds. Initialize it during scaffolding:

```bash
npx shadcn@latest init
```

Use shadcn components for common portfolio patterns instead of building from scratch:

| Pattern | shadcn Component |
|---|---|
| Project detail modal | `Dialog` |
| Contact form | `Form` + `Input` + `Textarea` + `Select` |
| Navigation | `NavigationMenu` or `Sheet` (mobile) |
| Project filter tabs | `Tabs` |
| Skill/tool badges | `Badge` |
| Toast notifications | `Sonner` |
| Image lightbox | `Dialog` + custom content |
| Tooltips | `Tooltip` |

**Critical: Don't use shadcn defaults.** Always retheme to match the approved design direction — update CSS variables in `globals.css` to match the chosen color palette, typography, and border radius system. The portfolio should look like a custom build, not a shadcn template.

For non-React stacks (Vue, Svelte, Astro), pick the ecosystem equivalent or build lightweight custom components with Tailwind.

## Design Philosophy

These are the opinions that separate a great portfolio from a forgettable one:

**Identity over decoration.** Every design choice should say something about the person. A photographer's portfolio should feel different from a developer's, not just show different content. The design *is* the first project in the portfolio.

**One signature moment.** Every great portfolio has one thing you remember — a 3D scene, a scroll interaction, a clever transition, an unexpected layout. Find it early and build around it. Everything else supports it.

**Restraint is confidence.** Use fewer effects, executed well. Three polished animations beat twelve generic ones. One accent color used with intention beats a rainbow.

**Placeholders must be believable.** Never use "Lorem ipsum" or "Jane Doe." Write domain-appropriate fictional content. Project titles should sound real. Bios should read like a real person wrote them.

**Mobile is a first-class experience.** Design at 375px first. The mobile layout should feel intentional, not collapsed.

## Quality Bar

Before calling it done, review through these lenses:

**First impression (0-3 seconds):** Is it immediately clear who this person is? Does the visual hierarchy draw the eye correctly? Is the primary CTA obvious?

**Craft:** Consistent spacing from a defined scale. Intentional hover states (not just opacity). Proper easing on all transitions (never `linear` for UI). Typography hierarchy clear at a glance.

**Performance:** Lazy load images. Code-split heavy libraries (Three.js, etc.). Loading states for 3D/heavy assets. Respect `prefers-reduced-motion`.

**Accessibility:** Logical tab order. Visible focus rings. AA contrast on body text. Alt text on all images. Accessible labels on icon-only buttons.

Run the full QA checklist from `data/qa-checklist.md` before presenting the final result.

## Reference Data

Load these as needed — don't memorize them:
- `data/design-trends.md` — Package recommendations per design style
- `data/qa-checklist.md` — Full QA testing checklist
- `data/creative-review.md` — Creative director review criteria

## Delivering the Result

Start the dev server and present:
- The preview URL
- A short summary of what was built (sections, effects, tech)
- What's placeholder vs. real content
- Clear next steps (content replacement, deployment, domain setup)

Ask if they want adjustments. Be ready to iterate.
