# nullrose.com

One-page portfolio for **Maciej Kwiatkowski** — design, motion, systems. Gdańsk.

Pure static site: HTML + CSS + vanilla JS, one WebGL canvas, GSAP from CDN. No build step.

## Deploy to GitHub Pages

1. Create a repo (e.g. `nullrose`) and copy these files into it (keep the structure):

   ```
   index.html
   nullrose/
     nullrose.css
     entity.js
     motion.js
     i18n.js
     image-slot.js
   ```

2. Push to `main`.
3. Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` / `/ (root)`, Save.
4. Live in ~1 min at `https://<you>.github.io/<repo>/` (or your custom domain).

`.nojekyll` is included so Pages serves the folder as-is.

## Notes

- **Fonts**: Anton + Geist Mono load from Google Fonts.
- **Project images**: NAVISHOPPER / DERMANIUM / MADE IN TURKIC are baked in
  (`nullrose/img/*.png`), auto-toned to brand lilac by CSS. To swap one, replace the
  `src` on its `<img>` in `index.html` (or drop a new file into `nullrose/img/`).
- **Tweaks panel** is intentionally omitted from this build — it is an editor-only tool.
- Honors `prefers-reduced-motion`-friendly defaults; DPR is capped for mid-range phones.

— purple is the verb. white is the noun.
