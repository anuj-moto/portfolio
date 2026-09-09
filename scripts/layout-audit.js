/**
 * Responsive layout audit — overlap + viewport-bleed detection.
 *
 * Renders the site in an off-screen same-origin iframe at a set of widths and
 * heights (media queries respond to iframe size, so this works without resizing
 * the real browser window) and asserts:
 *
 *   - no text element visually overlaps another
 *   - nothing bleeds past the viewport edge (html/body use `overflow-x: clip`,
 *     so bleed is silently *clipped* rather than producing a scrollbar)
 *   - no horizontal scroll
 *   - hero CTA clears the scroll cue
 *   - navbar brand clears the nav menu
 *   - the Work hover-preview card stays inside the viewport at both ends of
 *     every shelf row
 *
 * Usage: paste into the devtools console on http://localhost:5173, then
 *   await runLayoutAudit()
 * Returns { pass, failures }. Exit-code style: failures.length === 0 is green.
 */

const ORIGIN = 'http://localhost:5173'

const PAGES = ['/', '/work', '/work/student-experience-foundations']
const WIDTHS = [320, 375, 430, 640, 768, 800, 850, 1040, 1300, 1512]
const HERO_SIZES = [
  [1300, 800], [1300, 1000], [1040, 640], [900, 650],
  [784, 700], [784, 600], [375, 667], [375, 600], [320, 568], [850, 420],
]

// Minimum acceptable gap between two elements that must not read as touching.
const MIN_GAP = 24
// Fraction of the smaller box that must intersect to count as an overlap.
const OVERLAP_THRESHOLD = 0.25

function mount(w, h, url) {
  return new Promise((resolve) => {
    const old = document.getElementById('__audit_probe')
    if (old) old.remove()
    const f = document.createElement('iframe')
    f.id = '__audit_probe'
    f.style.cssText =
      `position:fixed;left:-99999px;top:0;width:${w}px;height:${h}px;border:0;`
    f.src = ORIGIN + url
    f.onload = () => setTimeout(() => resolve(f), 2200)
    document.body.appendChild(f)
  })
}

/** Force GSAP/framer enter-animations to their end state so we measure the
 *  settled layout rather than mid-flight opacity-0 elements. */
function settle(doc) {
  doc.querySelectorAll('body *').forEach((el) => {
    const s = el.style
    if (s.opacity !== '' && parseFloat(s.opacity) < 0.99) s.opacity = '1'
    if (
      s.transform &&
      /matrix\(1, 0, 0, 1,|translateY|translate3d/.test(s.transform) &&
      !el.hasAttribute('aria-hidden')
    ) {
      s.transform = 'none'
    }
  })
}

const hidden = (el, cs) =>
  cs.display === 'none' ||
  cs.visibility === 'hidden' ||
  parseFloat(cs.opacity) < 0.05 ||
  el.closest('[aria-hidden="true"]')

function sel(el, doc) {
  const p = []
  let n = el
  while (n && n !== doc.body && p.length < 3) {
    let s = n.tagName.toLowerCase()
    const c = (n.className || '').toString().split(/\s+/).filter(Boolean).slice(0, 2).join('.')
    if (c) s += '.' + c
    p.unshift(s)
    n = n.parentElement
  }
  return p.join('>')
}

function scanStatic(doc, win) {
  settle(doc)
  const vw = doc.documentElement.clientWidth
  const leaves = []
  doc.querySelectorAll('body *').forEach((el) => {
    const cs = win.getComputedStyle(el)
    if (hidden(el, cs)) return
    const own = Array.from(el.childNodes)
      .filter((n) => n.nodeType === 3 && n.textContent.trim().length > 1)
      .map((n) => n.textContent.trim())
      .join(' ')
    if (!own) return
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) return
    leaves.push({ el, r, text: own.slice(0, 40) })
  })

  const area = (r) => r.width * r.height
  const inter = (a, b) => {
    const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
    const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
    return x * y
  }

  const overlaps = []
  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      const A = leaves[i], B = leaves[j]
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue
      const o = inter(A.r, B.r)
      if (o <= 0) continue
      const frac = o / Math.min(area(A.r), area(B.r))
      if (frac < OVERLAP_THRESHOLD) continue
      overlaps.push({ pct: Math.round(frac * 100), a: A.text, b: B.text, aSel: sel(A.el, doc) })
    }
  }

  const bleed = []
  doc.querySelectorAll('body *').forEach((el) => {
    const cs = win.getComputedStyle(el)
    if (hidden(el, cs)) return
    if (el.closest('.animate-marquee')) return // intentional, mask-faded
    if (cs.position === 'fixed') return
    const r = el.getBoundingClientRect()
    if (r.width < 4 || r.height < 4) return
    const L = -r.left, R = r.right - vw
    if (L > 2 || R > 2) {
      bleed.push({ L: Math.round(L), R: Math.round(R), sel: sel(el, doc),
                   txt: (el.textContent || '').trim().slice(0, 30) })
    }
  })

  return { vw, scrollW: doc.documentElement.scrollWidth, overlaps, bleed }
}

function scanHero(doc, win) {
  settle(doc)
  const sec = doc.querySelector('section')
  const cta = sec?.querySelector('a[href="#work"]')?.parentElement
  const cue = [...sec.querySelectorAll('div')].find(
    (e) => /Scroll/.test(e.textContent) && e.className.includes('absolute')
  )
  if (!cta) return { err: 'hero cta not found' }
  if (!cue || win.getComputedStyle(cue).display === 'none') {
    return { cueHidden: true } // hidden below lg by design
  }
  const c = cta.getBoundingClientRect(), s = cue.getBoundingClientRect()
  const xOverlap = Math.max(0, Math.min(c.right, s.right) - Math.max(c.left, s.left))
  const yOverlap = Math.max(0, Math.min(c.bottom, s.bottom) - Math.max(c.top, s.top))
  return {
    xOverlap: Math.round(xOverlap),
    yOverlap: Math.round(yOverlap),
    gap: Math.round(s.top - c.bottom),
    collides: xOverlap > 0 && yOverlap > 0,
  }
}

function scanNav(doc, win) {
  const brand = doc.querySelector('nav a[href="/"]')
  // `.lg\:flex` is the desktop link row. Don't use a bare `.hidden` here — the
  // brand's own ` / Designer` span is `hidden xl:inline` and matches first.
  const menu = doc.querySelector('nav .lg\\:flex')
  if (!menu || win.getComputedStyle(menu).display === 'none') return { menuHidden: true }
  const b = brand.getBoundingClientRect(), m = menu.getBoundingClientRect()
  return { gap: Math.round(m.left - b.right) }
}

async function scanHoverCards(doc, win) {
  const vw = doc.documentElement.clientWidth
  const rows = [...doc.querySelectorAll('.work-shelf .flex.items-end')]
    .filter((r) => r.getBoundingClientRect().width > 0)
  const out = []
  for (const row of rows) {
    const boxes = [...row.querySelectorAll('[data-work-item]')]
    if (!boxes.length) continue
    for (const idx of [0, boxes.length - 1]) {
      const b = boxes[idx]
      b.dispatchEvent(new win.MouseEvent('mouseover', { bubbles: true, relatedTarget: null }))
      await new Promise((r) => setTimeout(r, 400))
      const card = b.querySelector('.rounded-2xl')
      if (card) {
        const r = card.getBoundingClientRect()
        out.push({
          idx,
          clipL: Math.round(Math.max(0, -r.left)),
          clipR: Math.round(Math.max(0, r.right - vw)),
        })
      } else {
        out.push({ idx, err: 'card did not open' })
      }
      b.dispatchEvent(new win.MouseEvent('mouseout', { bubbles: true, relatedTarget: doc.body }))
      await new Promise((r) => setTimeout(r, 250))
    }
  }
  return out
}

export async function runLayoutAudit() {
  const failures = []
  const log = (m) => console.log(m)

  for (const page of PAGES) {
    for (const w of WIDTHS) {
      const f = await mount(w, 900, page)
      const d = f.contentDocument, win = f.contentWindow
      const r = scanStatic(d, win)
      const at = `${page} @${r.vw}w`

      r.overlaps.forEach((o) =>
        failures.push(`OVERLAP ${at}: "${o.a}" ∩ "${o.b}" (${o.pct}%) — ${o.aSel}`))
      r.bleed.forEach((b) =>
        failures.push(`BLEED ${at}: ${b.sel} "${b.txt}" L:${b.L} R:${b.R}`))
      if (r.scrollW > r.vw + 1)
        failures.push(`HSCROLL ${at}: scrollWidth ${r.scrollW} > ${r.vw}`)

      const nav = scanNav(d, win)
      if (!nav.menuHidden && nav.gap < MIN_GAP)
        failures.push(`NAV ${at}: brand→menu gap ${nav.gap}px (min ${MIN_GAP})`)

      if (page !== '/work/student-experience-foundations') {
        const cards = await scanHoverCards(d, win)
        cards.forEach((c) => {
          if (c.err) failures.push(`HOVER ${at} box${c.idx}: ${c.err}`)
          else if (c.clipL || c.clipR)
            failures.push(`HOVER ${at} box${c.idx}: clipped L:${c.clipL} R:${c.clipR}`)
        })
      }
      log(`  scanned ${at}`)
    }
  }

  for (const [w, h] of HERO_SIZES) {
    const f = await mount(w, h, '/')
    const hero = scanHero(f.contentDocument, f.contentWindow)
    const at = `hero @${w}x${h}`
    if (hero.err) failures.push(`HERO ${at}: ${hero.err}`)
    else if (!hero.cueHidden) {
      if (hero.collides)
        failures.push(`HERO ${at}: CTA overlaps scroll cue (${hero.xOverlap}x${hero.yOverlap}px)`)
      else if (hero.gap >= 0 && hero.gap < MIN_GAP && hero.xOverlap > 0)
        failures.push(`HERO ${at}: CTA→cue gap ${hero.gap}px in shared column (min ${MIN_GAP})`)
    }
    log(`  scanned ${at}`)
  }

  const probe = document.getElementById('__audit_probe')
  if (probe) probe.remove()

  console.log(failures.length ? `✗ ${failures.length} failure(s)` : '✓ all checks passed')
  failures.forEach((f) => console.log('   ' + f))
  return { pass: failures.length === 0, failures }
}

if (typeof window !== 'undefined') window.runLayoutAudit = runLayoutAudit
