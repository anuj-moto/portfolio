# QA Checklist

Run through every item before presenting the final portfolio. Fix all failures.

## Functionality
- [ ] All navigation links work (scroll or route correctly)
- [ ] Contact form validates required fields and email format
- [ ] Contact form shows success/error states on submission
- [ ] External links open in new tab with `rel="noopener noreferrer"`
- [ ] 404 / fallback route exists and looks intentional

## Responsive
- [ ] 320px — no horizontal overflow, no broken layout
- [ ] 375px — standard mobile baseline
- [ ] 768px — tablet grid/layout shift handled
- [ ] 1280px — laptop desktop baseline
- [ ] 1920px — max-width container prevents content stretching

## Performance
- [ ] No console errors
- [ ] No framework warnings (React, Vue, etc.)
- [ ] Heavy assets (3D, video) have loading states
- [ ] Images lazy loaded with proper dimensions/aspect ratios
- [ ] Heavy libraries code-split (Three.js, Pixi, etc.)

## Accessibility
- [ ] Tab order matches visual reading order
- [ ] Focus rings visible on all interactive elements
- [ ] Body text passes WCAG AA contrast (4.5:1)
- [ ] All images have descriptive alt text
- [ ] Icon-only buttons have aria-labels
- [ ] Form inputs have associated labels

## Animation
- [ ] No janky repaints (transform/opacity only for animations)
- [ ] `prefers-reduced-motion` respected — animations disabled or simplified
- [ ] Scroll-triggered animations don't flash on initial load
- [ ] All UI transitions 150-400ms with proper easing (no `linear`)

## Cross-browser
- [ ] Works in Chrome, Firefox, Safari
- [ ] OS dark mode doesn't break layout (if not explicitly supported)
