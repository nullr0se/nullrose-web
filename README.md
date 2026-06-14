# nullrose.com — deploy bundle & handoff

One-page portfolio for **Maciej Kwiatkowski** (`_nullrose`) — design / video / systems. Gdańsk.

This folder is the **production-ready static site**. It is not a mockup to re-implement —
it is the actual site. Deploy it as-is, or fold it into a host of your choice.

> Pure static: HTML + CSS + vanilla JS, one WebGL canvas, GSAP + fonts from CDN. **No build step.**

---

## TL;DR deploy (GitHub Pages)

1. Put the **contents of this folder** at the repo root (keep the structure below).
2. Push to `main`.
3. Repo **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`** → Save.
4. Live in ~1 min at `https://<you>.github.io/<repo>/`. `.nojekyll` is included so the
   folder is served verbatim.

Works the same on Netlify / Vercel / Cloudflare Pages / any static host — just point the
root at this folder. No environment variables, no server, no Node.

---

## File structure

```
index.html              ← English entry (lang="en")
pl/index.html           ← Polish entry  (lang="pl", assets via ../nullrose/)
.nojekyll               ← tells GitHub Pages to serve the folder as-is
README.md               ← this file
nullrose/
  nullrose.css          ← shell: layout, masthead, tile grid, motion chrome, type tokens
  detail.css            ← the full-screen case panels, galleries, lightbox, systems shelf
  entity.js             ← WebGL "entity" background canvas + window.__entity.fire()
  motion.js             ← register streams, barcode, hover-rev animations (GSAP)
  detail.js             ← THE APP: case data + all panel renderers + interactions
  i18n.js               ← EN⇄PL toggle (sets <html lang>, persists choice)
  quotes.js  ripple.js  archive-grid.js  image-slot.js   ← small decorative/util scripts
  img/
    hero-navi.png hero-derm.png hero-mit.png   ← masthead tile shots
    derm/  mit/  navi/   ← case-study deliverables (real client work)
    arch/                ← archive pieces (gig poster, autocross, armenia thumb)
    sys/derm|mit|navi|sheiq/  ← brand-book pages (01.jpg…), used by the SYSTEMS shelf
  vid/
    derm-intro.mp4 mit-intro.mp4   ← case intro films (autoplay, muted, loop)
    hyalu.mp4 aha.mp4              ← inline product clips in the Dermanium store
```

External runtime deps (loaded from CDN, no install): **GSAP 3.12.5**, **Google Fonts**
(Anton + Geist Mono). Everything else is local.

---

## How it works (so you can edit content)

It's a single page. The masthead + tile grid live in `index.html`. Clicking a tile opens
a full-screen **case panel** that is rendered in JS and FLIP-morphed into place.

**All case content is data in `nullrose/detail.js`:**

- `CAT` — the registry of every panel (`navishopper`, `dermanium`, `mit`, `archive`,
  `systems`, `showreel`, `about`, `contact`). Each entry has a `kind` that maps to a
  renderer in the `RENDER` map, plus header copy (`title`, `meta`, `desc`, `tags`).
- Section/asset lists per case: `DERM_SECTIONS`, `MIT_SECTIONS`, `NAVI_SECTIONS`,
  `ARCHIVE_ITEMS`, `SYSTEMS`. To add/replace work, drop a file into the matching
  `nullrose/img/...` folder and add a row to the relevant array.
- `COPY` — the long-form bilingual copy for the personal panels (About, Contact,
  Showreel). `PLT` + the `tx()` helper hold the EN→PL strings for case labels/sections.

**Bilingual.** `i18n.js` flips `<html lang>` between `en`/`pl` (the flag buttons, persisted
to `localStorage`). Open panels re-render in the new language automatically. The `/pl/`
route is a real second entry point for deep-links/SEO; `detail.js` detects the `/pl/`
path and prefixes asset URLs with `../` on its own. **If you move assets, the only
hard-coded paths are the 3 hero `<img>`s and the `<link>`/`<script>` tags in the HTML.**

**SYSTEMS shelf.** Each brand book is a stack of page images in `nullrose/img/sys/<book>/`.
The stack fans open to a grid of every page; each page opens full-res in the lightbox.
Page counts are set in the `SYSTEMS` array — keep them in sync if you add/remove pages.

---

## Things to know before you ship

- **The Tweaks panel is intentionally removed** from this build (it's an editor-only tool).
  The React/Babel CDN scripts that powered it are gone; nothing else depends on them.
- **Video weight.** The four `.mp4`s are the heaviest assets. They stream fine from static
  hosting, but if you want faster first paint, consider re-encoding to ~720p H.264/AAC or
  adding a poster + `preload="none"` (the inline clips already use `preload="none"`).
- **Motion respects the user.** DPR is capped for mid-range phones and animations avoid
  infinite decorative loops on content; safe for `prefers-reduced-motion`.
- **Contact form** is static-friendly: it composes a `mailto:` to `mk@nullrose.com`
  (no backend). LinkedIn is the only external link by design.
- **Custom domain:** add a `CNAME` file (one line: your domain) next to `index.html` and
  point DNS per your host's docs.

---

— purple is the verb. white is the noun.
