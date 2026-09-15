# Machon Meleches Machsheves — website

Publishing services for the Torah world (typing, editing, typesetting, graphics,
printing for seforim). Based in Yerushalayim, American owned and operated.
Marketing site + a hidden admin preview, English, LTR.

Owner/designer: Rivka Thaler. Design source of truth: the Figma file "tilyon".

---

## Stack

**Vite + React + TypeScript + Tailwind + shadcn/ui** — Lovable's native stack,
so this project can be imported into Lovable via GitHub and picked up natively.
Single root `package.json`, no monorepo, no custom webpack config.

- `@/` path alias → `./src` (set in both `tsconfig.app.json` and `vite.config.ts`).
- `tailwind.config.ts` and `components.json` (shadcn config) live at the root.
- Local dev: `npm install`, then `npm run dev` — serves on `http://localhost:3000`.
- `npm run build` → `tsc -b && vite build`. Always run this before considering
  a change done; it's the fastest way to catch a broken port.
- This machine had no Node/npm originally — a local Node was installed under
  `~/.local/node-v22` and symlinked into `~/bin`. If a fresh shell can't find
  `node`/`npm`, that PATH export is why: `export PATH="$HOME/bin:$PATH"`.

### Migrated from a static site

This project started as plain static HTML/CSS/JS (no build step) and was
converted wholesale to this stack in one pass. The conversion preserved
behavior and pixel fidelity deliberately rather than "modernizing" the
layout system — see below.

## Files

```
index.html                 Vite entry (root div + script tag only)
src/
  main.tsx                 React root, imports index.css + styles/site.css
  App.tsx                  React Router routes
  index.css                Tailwind directives + HSL design tokens (:root)
  styles/site.css           the ORIGINAL pixel-perfect stylesheet, ported
                            almost verbatim (see "exact-unit system" below)
  components/
    Layout.tsx              header + <Outlet/> + footer, reveal-on-scroll,
                            per-route header variant / body class
    SiteHeader.tsx / SiteFooter.tsx
    IconSprite.tsx          every <symbol> icon, rendered once
    Testimonials.tsx        shared between Home and Downloads (separate data)
    CtaSection.tsx          shared "What's with your sefer?" block
    Carousel.tsx            typesetting-sample carousels (Services page)
    DriftWall.tsx           wraps src/lib/driftWall.ts (see below)
    ui/                     shadcn/ui primitives (button, input, textarea,
                            card, label) — used by the admin panel only
  pages/
    Home.tsx / OurWork.tsx / Services.tsx / Downloads.tsx / BeitHaSefer.tsx
    admin/AdminLogin.tsx / AdminDashboard.tsx
  data/                     faq.ts, testimonials.ts, downloads.ts — content
                            arrays shared between the public pages and the
                            admin preview (single source of truth)
  hooks/                    useReveal, useHeaderScroll, useMailtoForm,
                            useDocumentHead
  lib/
    driftWall.ts            hand-ported DriftWall gallery animation (see
                            assets/js/drift-wall.js's original header comment
                            for provenance) — now returns a cleanup fn since
                            React can unmount it, unlike the old static page
    cssVars.ts               typed helper for inline --x/--y/--w custom props
    utils.ts                 shadcn's cn() helper
public/
  fonts/                    LINE Seed JP (Thin 200 / Regular 400 / Bold 700 /
                            ExtraBold 800)
  img|work|covers|books|gallery|samples|testimonials/
                            static assets, referenced by absolute path (/img/…)
```

---

## THE EXACT-UNIT SYSTEM — still the single most important rule

`src/styles/site.css` is the ported original stylesheet and follows the exact
same system it always did. The root font size is tied to the viewport so that
`1rem = viewport / 120`, and `--px: 0.0625rem` (1/16rem). Therefore **one
`var(--px)` equals exactly one Figma pixel at any width ≥ 1024px.**

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
- This file is edited directly for any pixel-fidelity change to the public
  pages. Don't rewrite sections into Tailwind utilities — the exact-unit
  system and Tailwind's spacing scale don't compose, and rewriting risks
  losing precision that was tuned via real browser measurement.

## Design tokens

Defined once, as **HSL channel strings**, in `src/index.css` `:root` (shadcn
convention — `hsl(var(--token))` at every use site):

```css
--cream: 30 26% 85%;      --cream-light: 31 100% 96%;  --maroon: 7 63% 22%;
--navy: 203 45% 24%;      --taupe: 22 14% 34%;         --grey: 0 0% 85%;
--offwhite: 0 0% 96%;     --ink: 0 0% 6%;              --white: 0 0% 100%;
```

`tailwind.config.ts` maps these to Tailwind color utilities (`bg-maroon`,
`text-cream-light`, …) for anything written in Tailwind (the admin panel).
`src/styles/site.css` references the same variables wrapped in `hsl()` for the
public pages' pixel-perfect rules. Don't introduce a new hex color directly —
add it as an HSL token in `src/index.css` first, the same way the rest do.

Type: `'LINE Seed JP'` everywhere, loaded from `/fonts/*.ttf` in `src/index.css`.
Body 18, section titles 45/700 uppercase maroon, eyebrow 18 with 9
letter-spacing uppercase.

Shared components already exist — reuse, don't re-invent:
`.shell` (1722-wide canvas container), `.pill` / `.pill--ghost` / `.pill--outline`
(height 55, radius 100, 44 knob), `.eyebrow`, `.section-title`, `.icon-dot`,
`.site-header` / `.site-header--light`, `.carousel`, `.page-hero`.

Icons are inline `<symbol>` sprites, all defined once in
`src/components/IconSprite.tsx` and rendered by `Layout`, referenced with
`<use href="#i-name">`. 24×24 grid, stroke-only, round caps.

---

## Admin panel (`/admin`)

Login-gated preview at `/admin/login` → `/admin/dashboard`, not linked from
the public nav or footer. Built in Tailwind + shadcn/ui (not the site's custom
pixel-perfect CSS — it's not pixel-audited, so plain shadcn components are the
right fit here per Lovable convention).

- **Demo login only** — hardcoded `admin` / `admin123` in `AdminLogin.tsx`,
  gated by a `sessionStorage` flag. Not secure. Real auth is meant to be wired
  up once this project is imported into Lovable (which has native auth).
- **Preview-only editing** — the four editable areas (FAQ answers, Home/
  Downloads testimonials — two separate lists, the Word add-on file, and the
  Downloads grid images/files) let you add/remove/upload and see it reflected
  live, but nothing persists past a page reload. A banner says so on every
  panel. Real saving/storage is a Lovable follow-up, not implemented here.
- Everything else on the site (headings, section copy, layout) is
  intentionally **not** editable — this was a deliberate scope decision, not
  an oversight.

## Conventions that must be preserved

1. **Forms are `mailto:` only** — `useMailtoForm()` opens the user's mail
   client addressed to `printyoursefer@gmail.com`. There is no backend. Don't
   add a fetch/POST or a form service without asking.
2. Respect `prefers-reduced-motion` — every animated block in `site.css`
   already has a reduce branch (DriftWall, the services rail fill, the book
   tilt, `.reveal`). New animation needs one too.
3. Every page must still work below 1024px — check the matching block in the
   `@media (max-width: 1023px)` section of `site.css` after changing a
   desktop section.
4. `.reveal` + `translateX(-50%)` gotcha: `.reveal.is-visible` sets
   `transform: none`, which wipes any centering transform set on the same
   element the instant it scrolls into view. Fixed instances
   (`.services__title`, `.dl-hero__title`) restate the transform in both
   `.reveal` and `.reveal.is-visible`. Watch for this on any new centered +
   reveal element.
5. No secrets exist in this project (forms are mailto-only, admin login is a
   placeholder). If one is ever introduced, it goes in Vite env vars
   (`VITE_`-prefixed only if it's meant to reach the client bundle — never a
   real secret) or, preferably, directly in Lovable's own env var settings.
   See `.env.example`.

## How to work on this project (please follow — it saves real time)

- **Change the smallest thing.** Edit the specific rule/component. Don't
  reformat `site.css` wholesale or reorder its sections.
- **Don't screenshot-loop for alignment.** For "move X under Y" work, measure
  once with `getBoundingClientRect()` in the browser console, compute the
  Figma-unit delta, apply it, and report the number.
- Ask before: restructuring `site.css`'s exact-unit system, changing routing,
  or replacing an image asset.

## Known state / open items

- The gallery, covers, books and work image sets contain some duplicates
  (e.g. `g-1` and `g-11`) — intentional for the DriftWall drift, don't "fix."
- `_to_delete/` at the repo root predates this conversion and is still
  pending the user's own manual review — not part of the app, don't wire it
  into anything.
