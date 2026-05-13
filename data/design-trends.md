# Design Trend — Package Reference

Quick reference for key packages per design style. Use as a starting point, not a rigid prescription.

| Design Style | Key Packages |
|---|---|
| **3D / WebGL** | `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `leva`, `shadcn/ui` |
| **Illustrative / Animated** | `lottie-react`, `framer-motion`, `react-spring`, `@rive-app/react-canvas`, `shadcn/ui` |
| **Interactive / Physics** | `gsap`, `framer-motion`, `react-use-gesture`, `matter-js`, `shadcn/ui` |
| **Glassmorphism** | Pure CSS + `tailwindcss`, `clsx`, `framer-motion`, `shadcn/ui` |
| **Brutalist** | Custom CSS, `tailwindcss`, heavy slab fonts via Google Fonts, `shadcn/ui` |
| **Editorial / Magazine** | `tailwindcss`, `@fontsource/*`, custom grid CSS, `shadcn/ui` |
| **Parallax / Scroll** | `react-scroll-parallax`, `gsap` ScrollTrigger, `lenis`, `shadcn/ui` |
| **Particle / Generative** | `tsparticles`, `react-particles`, `canvas-confetti`, `shadcn/ui` |
| **Dark Sci-Fi / Neon** | `gsap`, `three`, custom GLSL shaders, `shadcn/ui` |
| **Minimalist / Typographic** | `tailwindcss`, `framer-motion`, clean font stack, `shadcn/ui` |

> **Note:** `shadcn/ui` applies to React/Next.js builds. For Vue use `shadcn-vue`, for Svelte use `shadcn-svelte`.

## Backend (if contact form sends real email)

| Stack | Packages |
|---|---|
| **Node/Express** | `express`, `cors`, `nodemailer`, `dotenv` |
| **Next.js API** | Built-in API routes + `nodemailer` or `resend` |
| **Python/FastAPI** | `fastapi`, `uvicorn`, `python-multipart` |
