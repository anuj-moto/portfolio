# Portfolio Skill

A Claude Code **Skill** that turns Claude into a focused portfolio-website partner. It doesn't just generate code — it gathers your creative vision, proposes an architecture for approval, and then implements with a high design bar so the final site feels handcrafted, not templated.

> Built by [@anuj-moto](https://github.com/anuj-moto). Designed for product designers, developers, photographers, and creatives who want a portfolio that actually represents them — not another shadcn starter with the colors changed.

---

## Why use this skill?

Most AI coding assistants jump straight to code the moment you ask for a portfolio. You end up with:

- A generic hero, three project cards, and a contact form.
- shadcn/ui defaults shipped untouched.
- "Lorem ipsum" or "Jane Doe" placeholder content.
- One color, one font, zero personality.
- No signature moment — nothing memorable.

This skill fixes that by forcing the workflow a real designer would follow:

1. **Creative brief first.** It asks who you are, what vibe you want, and what the *one* "wow" moment should be — before writing a line of code.
2. **Architecture gate.** It proposes stack + palette + fonts + signature interaction *and waits for your approval*. No surprise builds.
3. **Identity over decoration.** Every section is justified by what it says about *you*, not what looks cool in isolation.
4. **Restraint as a quality signal.** Three polished animations beat twelve generic ones. One intentional accent color beats a rainbow.
5. **Believable placeholders.** Domain-appropriate fictional names, real-sounding project titles, bios that read like a human wrote them.
6. **Mobile-first by default.** Designed at 375px first, then scaled up — not collapsed.
7. **QA checklist before delivery.** A real reviewer pass for craft, performance, and accessibility.

If you want a portfolio that looks like it was *made for you*, this skill is the difference between "a website" and "your website."

---

## What's inside

```
portfolio/
├── SKILL.md                     # The skill brain — workflow, gates, design philosophy
└── data/
    ├── design-trends.md         # Package recommendations per design style
    │                            # (3D, glassmorphism, brutalist, editorial, parallax, etc.)
    ├── creative-review.md       # Creative director review criteria
    └── qa-checklist.md          # Full pre-delivery QA checklist
```

`SKILL.md` loads automatically when the skill is triggered. The `data/` files are loaded **on demand** — only when relevant — to keep the context window lean.

---

## Installation

This is a **Claude Code skill**, not a runnable app. To use it, drop the folder into your Claude Code skills directory.

### Option 1 — Per-user (recommended)

```bash
git clone https://github.com/anuj-moto/portfolio.git ~/.claude/skills/portfolio
```

### Option 2 — Per-project

```bash
mkdir -p .claude/skills
git clone https://github.com/anuj-moto/portfolio.git .claude/skills/portfolio
```

That's it. Restart your Claude Code session and the skill becomes available.

---

## How to trigger it

Once installed, just ask Claude Code for portfolio work in natural language:

- "Build me a portfolio website."
- "I want a portfolio for my photography work."
- "Add a projects section to my portfolio."
- "Restyle the hero on my portfolio."

The skill auto-activates for portfolio-related tasks. For a full build, expect Claude to:

1. Ask you the creative brief (who / vibe / wow moment / content readiness).
2. Propose an architecture and **wait** for your approval.
3. Scaffold the project (default: Next.js + Tailwind + shadcn/ui, retheme'd — never default-looking).
4. Build section by section with the signature interaction you picked.
5. Run the QA checklist.
6. Hand back a dev URL and a clear list of what's real vs. placeholder.

For partial changes (add a section, fix a bug, retheme), the skill skips the brief and gets straight to work after reading your existing code.

---

## Design philosophy (the opinions baked in)

- **Identity over decoration.** A photographer's portfolio should feel different from a developer's — not just show different content.
- **One signature moment.** Every great portfolio has one thing you remember. Find it early, build around it.
- **Restraint is confidence.** Fewer effects, executed well.
- **Placeholders must be believable.** No "Lorem ipsum," ever.
- **Mobile is first-class.** 375px first, not as an afterthought.
- **shadcn is a starting point, not a destination.** Always retheme tokens — color, radius, typography — so it never looks like a default install.

---

## Compatible with

- **Claude Code** (CLI, desktop, web, IDE extensions) — primary target
- **Claude API / Agent SDK** — usable as a system-prompt fragment if you're building your own agent
- **Any stack** — defaults to React/Next.js + Tailwind + shadcn/ui, but adapts to Vue (Nuxt + shadcn-vue), Svelte (SvelteKit + shadcn-svelte), or Astro

---

## When *not* to use this

- You want a 5-minute throwaway page → use a template.
- You don't care about design craft → any LLM will do.
- You're building a SaaS dashboard, marketing site, or e-commerce app → see the companion [`website-builder`](https://github.com/anuj-moto/website-builder) skill, which handles full-stack builds with database, server, and deployment.

---

## License

MIT — fork, remix, ship. Attribution appreciated but not required.

---

## Feedback

Found a sharp edge? Open an issue. Built a portfolio with it? I'd love to see it — tag [@anuj-moto](https://github.com/anuj-moto).
