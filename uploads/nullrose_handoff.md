# nullrose.com — Build Handoff

Handoff for the build agent. The composition and intent are locked. Your job is execution: replace the placeholder-grade visuals and motion with the real thing. Two source files ship with this:

- `nullrose_layout.html` — the structure and spacing. Source of truth for layout. Carry it over.
- `nullrose_really_final.svg` — the master logo. Outlined paths, do not re-trace or re-type.

---

## 1. What this is

nullrose is a one-person design and motion studio (brand: nullrose, operator alias ACE). This is the portfolio site. Its job is to land clients and get the operator hired, so it has to be legible as a portfolio, not just a mood piece. The current HTML nails the composition but the gradient, the animation, and the logo motion in it are deliberately basic stand-ins. That is what you are upgrading.

## 2. The concept

The site behaves like the logo.

The logo is the null/empty-set mark: a clean O that gets struck through to become null. White at rest, purple only as the transient signal of the strike. The whole site runs the same behavior. A dark "entity" field that is alive but barely, content surfacing as thin-bordered boxes, everything on a slow shared heartbeat. Dormant and calm at rest, signal when something fires.

Register is cinematic, not gamer. Think A24 and risograph print, not Twitch overlay. The single discipline that protects the whole thing: purple is the verb, white is the noun. Purple is the act, the signal, the transient. White is the resting state. Purple never sits still and never floods unless something is actively happening. Slow, low, restrained.

## 3. Brand system

Palette:
- Void black `#0D0D0C` — base
- Carbon `#1A1917` — raised surfaces
- Purple `#8A4FB2` — primary accent
- Lilac `#B47EDE` — light accent / gradient top
- White `#FFFFFF` — type and the resting logo

Type: Geist and Geist Mono. Mono is the register (terminal UI). The mock uses a system mono stack as a stand-in. Load the real Geist Mono in the build.

Texture: film grain is part of the visual system. It sits over everything as a pass, never baked into assets.

Aesthetic reference: the SUMBUR / "tarot or not" poster the operator shared. Borrow the material, not the density: riso grain, purple-on-black duotone, thin-bordered contact-sheet panels, small technical ephemera (barcode, icon glyphs). The universe is cosmic, sci-fi, void, terminal. It is NOT occult or witchy. Pull the craft, keep the cold-sci-fi symbolic language.

## 4. The logo and its animation

Asset: `nullrose_really_final.svg`, `viewBox="0 0 676 832"`. Two targetable elements already named:
- `#wordmark` — the outlined NULLROSE letterforms (white)
- `#the_slash` — the slash rect through the O (white at rest)

The mock's logo motion is a fill-color flash at fixed keyframe percentages. It is bad and it is a placeholder. Replace it entirely. The real spec:

- Resting state: slash white, static.
- On load it enacts the name. The O starts clean, then the slash strikes through it. Draw the slash on as a stroke (stroke-dashoffset reveal or a clip wipe along the slash axis), with a purple-to-lilac signal travelling along it as it draws. Give the strike weight: fast in, slight overshoot, settle. Then cool the purple to white over roughly half a second and hold.
- Idle loop: on a long interval (12 to 20 seconds), the null re-fires. A brief purple pulse travels back through the slash and cools to white again. Rare and quiet, not a metronome.
- Easing: custom curves, not linear or plain ease-in-out. Strike eases in fast, cooldown eases out slow.
- Build it on a GSAP/Motion timeline, not CSS keyframes.

## 5. Composition (locked — carry over from the HTML)

Two layers of element, kept strictly separate:

- LOOSE branding, never inside a box: the logo, the system string (`ACE // _nullrose // gdańsk`), the icon row, the date `EST. 30.01.2026`, the barcode. These float in the negative space, intertwined with the boxes but unbordered.
- CONTENT boxes, thin purple borders only: ABOUT, NAVISHOPPER, DERMANIUM, MADE IN TURKIC, CONTACT, ARCHIVE, SYSTEMS, SHOWREEL. Boxes are for content. Nothing else goes in a box.

Grid: a masthead band (loose logo left, loose strip right) over a four-column interlocked body. Tall category boxes anchor it (NAVISHOPPER, DERMANIUM as the tallest center hero, MADE IN TURKIC), with the small boxes squished around them. Box heights are flex-grow values in the CSS (`g-navi`, `g-derm`, etc) that mirror a verified layout proof. The gutter is a single variable `--gap`; lower it to squish tighter.

Spacing and placement are done. Do not redesign the layout. If anything, the operator may want it tighter and rougher toward the poster (smaller gutter, harder tall-vs-tiny contrast, uneven column widths) — treat that as a dial, not a rebuild.

## 6. Build tasks

1. Gradient → WebGL fragment shader. Replace the two CSS radial blobs. Domain-warped fbm noise so the color field actually flows and folds, value/light moving through it, depth across purple, lilac, and void. Time-driven, slow. Expose speed, color, and contrast as uniforms.
2. Grain → integrate into the shader pass (per-pixel animated hash) rather than the flat SVG overlay, or keep it as a single cheap overlay if it reads better. Tunable density. It sits over everything.
3. Animation → GSAP or Motion. The box border pulse should be staggered and off-sync so the grid reads as a low collective heartbeat, not a synced blink. Add pointer-reactive hover on the boxes (lift, border brighten, faint purple bleed) and a subtle pointer-parallax on the entity.
4. Logo → the strike-and-cool spec in section 4. This is the priority motion piece.
5. Transitions → glitch / static cut is the established punctuation for navigation between views. Reserve it for cuts, do not run it ambiently.
6. Boxes are clickable category routes. Wire hover/active states; routing targets are the operator's to define.

## 7. Quality bar

- Restraint is the whole game. Slow, low, barely alive. If a motion reads as flashy, it is wrong.
- One accent color. Purple and its lilac. No second hue.
- Purple is transient, white is rest. Never leave the composition sitting in flooded purple.
- Legibility first: this is a portfolio, the content boxes and how to reach them must be obvious. Atmosphere never costs wayfinding.

## 8. Performance

Shader plus grain plus glitch gets GPU-heavy, and this will be judged on phones. A single well-written fragment shader is cheaper than stacking many animated CSS layers. Keep it smooth on a mid-range Android. Honor the mobile reflow already in the HTML (stacks under 820px).

## 9. Do not

- Do not put branding elements inside boxes. Boxes are content only.
- Do not invent marketing copy. Category names are real; everything else is the operator's to write. No em dashes in any copy.
- Do not bake grain into the logo or any asset.
- Do not drift occult or witchy. Cosmic, sci-fi, void, terminal.
- Do not redesign the layout. Execute on the locked composition.
- Do not re-trace or re-type the logo. Use the SVG as-is.

## 10. Open dials for the operator

- Gutter tightness (`--gap`) and how far toward the poster's squish to push.
- Real Geist Mono load and final type sizing.
- Grain density and entity speed, set by feel in the live loop.
- Final copy and routing.
