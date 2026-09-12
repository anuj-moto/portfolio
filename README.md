# Anuj Shukla — Product Designer Portfolio

A dark, editorial **split-panel portfolio**. The landing splits into five vertical
sections — **About · Work Experience · Case Studies · Skills & Hobbies · Contact** —
that expand on hover and transition into full section pages with a left→right
**line-wipe**. On mobile it becomes a scroll-driven accordion with a side-nav menu.

Built with **React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion**.

## Features

- **Split-panel landing** — five hover-expand panels (desktop) that wipe into routed section pages.
- **Mobile scroll-accordion** — the focused section expands with its image + "Click to view more"; the others collapse to rows; a header menu opens a side nav with the section links and contact.
- **Consistent section template** — back button, section title, and a persistent side rail across every section.
- **Case studies** — a horizontally-scrolling shelf plus per-project detail pages (`/work/:slug`).
- Dark, monochrome theme; all motion respects `prefers-reduced-motion`.

## Tech stack

| Area | Choice |
|---|---|
| Framework | React 19 + React Router 7 |
| Build | Vite |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) + shadcn/ui primitives |
| Motion | Framer Motion (+ GSAP on case-study pages) |
| Fonts | Geist / Geist Mono |

## Getting started

Prerequisites: **Node 20+** and npm.

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  pages/            # Landing + section pages + case-study detail
  components/
    landing/        # SplitPanel (desktop), MobileLanding (mobile accordion)
    transition/     # line-wipe route transition (TransitionProvider, WipeLink)
    …               # SectionShell, SideRail, Separator, CaseStudyScroller, …
  data/             # sections, experience, projects, skills, brands, process
  layouts/          # SectionLayout (navbar + side rail + <Outlet/>)
  routes/           # AppRoutes
  index.css         # Tailwind v4 theme tokens + global styles
public/             # section cut-out images, favicon, SPA _redirects
```

## Deploying (free)

This is a static single-page app with client-side routing, so any static host
works — it just needs an **SPA fallback** (serve `index.html` for unknown routes).
`public/_redirects` is included for Netlify/Cloudflare; Vercel handles it
automatically. For every option: build command `npm run build`, output dir `dist`.

- **Vercel** *(easiest)* — import the repo, framework preset **Vite**. SPA routing is handled automatically. Works with private repos.
- **Netlify** — new site from Git; the bundled `public/_redirects` handles routing.
- **Cloudflare Pages** — connect the repo; generous free tier.
- **Wasmer Edge** — already configured (`wasmer.toml`, `app.yaml`, `settings/config.toml`); run `wasmer deploy` after `wasmer login`.

Each builds directly from the GitHub repo on every push.
