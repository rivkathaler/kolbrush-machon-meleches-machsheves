# Machon Meleches Machsheves — website

Publishing services for the Torah world (typing, editing, typesetting, graphics,
printing for seforim). Based in Yerushalayim, American owned and operated.
Static marketing site, English, LTR.

Owner/designer: Rivka Thaler. Design source of truth: the Figma file "tilyon".

---

## Stack — read this before suggesting anything

Plain static HTML + CSS + vanilla JS. **No build step, no npm, no framework, no
package.json, no bundler.** The machine this runs on has no Node toolchain.

- Do not add React, Tailwind, Vite, Sass, PostCSS, or a package manager.
- Do not create a `package.json` or `node_modules`.
- If a library is needed, hand-port it into `assets/js/` as vanilla JS
  (see `drift-wall.js` for the existing precedent and how to document it).
- Serve locally on `http://localhost:3000`. Pages are opened as
  `/index.html`, `/our-work.html`, `/services.html`, `/downloads.html`,
  `/beit-hasefer.html`.

## Files

```
index.html          Home — hero, about, services, Word add-on, our work, testimonials, CTA
our-work.html       Gallery (DriftWall)
services.html       Kollel band, service detail rail, samples carousels, FAQ, CTA
downloads.html      Downloads hero, Word add-on, downloads grid, useful links, testimonials
beit-hasefer.html   Beit HaSefer — hero, class grid, newsletter signup
assets/css/styles.css   ~1800 lines, ALL styles. Single file on purpose.
assets/js/main.js       header, mobile nav, testimonials, forms, carousels, svc rail, book hover
assets/js/drift-wall.js hand-ported DriftWall gallery animation
assets/fonts/           LINE Seed JP (Thin 200 / Regular 400 / Bold 700 / ExtraBold 800)
assets/img|work|covers|books|gallery|samples|testimonials/
```

---

## THE EXACT-UNIT SYSTEM — the single most important rule

The root font size is tied to the viewport so that `1rem = viewport / 120`, and
`--px: 0.0625rem` (1/16rem). Therefore **one `var(--px)` equals exactly one
Figma pixel at any width ≥ 1024px.**

So every measurement above 1024px is written as:

```css
right: calc(158 * var(--px));   /* the number IS the Figma number */
```

Rules that follow from this:

- **Never write a raw `px` value inside the ≥1024px styles.** Always
  `calc(N * var(--px))`. A raw px there breaks scaling on every screen that
  isn't exactly 1920 wide.
- Raw `px` is correct and expected **only** inside `@media (max-width: 1023px)`
  and `@media (max-width: 560px)`, where `--px` is redefined to `1px` and the
  canvas is abandoned.
- Exceptions that stay raw everywhere: `1px` hairline borders, `0`, percentages,
  `vw`/`vh`, and `html { font-size }` itself.
- Breakpoints: `1024px` (canvas on/off), `2304px` (caps root at 19.2px so the
  design stops growing), `560px` (small-phone tweaks).

## Design tokens

```css
--cream #e2d8ce   --cream-light #fff5ea   --maroon #5c1d15   --navy #22455a
--taupe #64544b   --grey #d9d9d9          --offwhite #f5f5f5 --ink #101010
```

Use the variables. Do not introduce new hex values without asking — if a new
color is genuinely needed, add it to `:root` as a named token first.

Type: `'LINE Seed JP'` everywhere, loaded from local `.ttf`. Body 18, section
titles 45/700 uppercase maroon, eyebrow 18 with 9 letter-spacing uppercase.

Shared components already exist — reuse, don't re-invent:
`.shell` (1722-wide canvas container), `.pill` / `.pill--ghost` / `.pill--outline`
(height 55, radius 100, 44 knob), `.eyebrow`, `.section-title`, `.icon-dot`,
`.site-header` / `.site-header--light`, `.carousel`, `.page-hero`.

Icons are inline `<symbol>` sprites in a hidden `<svg>` at the top of each page,
referenced with `<use href="#i-name">`. 24×24 grid, stroke-only, round caps.

---

## Conventions that must be preserved

1. **Bump the CSS cache-buster.** Every page links
   `assets/css/styles.css?v=NN`. After any CSS change, increment `NN` in **all
   five** HTML files (currently `v=39`). Forgetting this is why a change "doesn't
   show up."
2. **Keep the section banner comments** in `styles.css` (`/* ===== Home — hero
   (canvas 0..1058) ===== */`). They record the Figma coordinates and are how
   anyone navigates an 1800-line file. New sections get one in the same style.
3. **Keep the "why" comments.** Several lines exist because of a specific bug
   (e.g. the `button { padding: 0 }` reset). Don't tidy them away.
4. Styles for a page live under that page's banner section. Don't scatter.
5. Forms are `mailto:` only — they open the user's mail client and send to
   `printyoursefer@gmail.com` via `wireForm()`. There is no backend. Don't add a
   fetch/POST or a form service without asking.
6. Respect `prefers-reduced-motion` — every animated block already has a
   reduce branch. New animation needs one too.
7. Every page must still work below 1024px. After changing a desktop section,
   check whether the reflow block needs a matching rule.

---

## How to work on this project (please follow — it saves real time)

- **Change the smallest thing.** Edit the specific rule. Never rewrite or
  reformat `styles.css` wholesale, and never reorder its sections.
- **Don't screenshot-loop for alignment.** For "move X under Y" work, measure
  once with `getBoundingClientRect()` in the browser console, compute the
  Figma-unit delta, apply it, and report the number. One measurement pass, not
  three. Screenshots are the most expensive thing in a session — take one at the
  end to confirm, not after every nudge.
- **Prefer a real alignment mechanism over a tuned offset.** If two things must
  line up, share a container, a grid column, or a variable — reach for a magic
  offset only when there's genuinely no structural way.
- **Batch.** Expect several tweaks in one message; do them all, then report once.
- **Report changes as a short list** — file, selector, old value → new value.
  No long prose recaps.
- Ask before: restructuring the CSS, changing the `--px` system, altering the
  nav or footer (they're duplicated across all five pages — change all five or
  none), or replacing an image asset.

## Known state / open items

- **Not a git repo yet.** Worth running `git init` and committing before any
  large change; there is currently no undo.
- The gallery, covers, books and work image sets contain some duplicates
  (e.g. `g-1` and `g-11`) — intentional for the drifting wall, don't "fix."
