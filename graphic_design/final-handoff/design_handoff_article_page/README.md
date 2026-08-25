# Handoff: Статья (Article page) — «Русскій Паломникъ»

## Overview
Full editorial article page for the "Русскій Паломникъ" Orthodox journal/e-commerce portal:
hero image, headline block, author bylines, pull-quotes, an embedded "Library" (book) merch
module, an inline video teaser, share buttons, related-content grid, and footer. Three
responsive states (mobile / tablet / desktop) plus two overlay states (slide-in "Journal"
panel on desktop, full-screen nav overlay on tablet/mobile) are fully speced from real
production screenshots.

## About the Design Files
The files in this bundle (`reference/Статья.dc.html` and everything under `reference/`) are
**design references built as an HTML/React prototype** (a "Design Component" from Claude's
design tool) — they show the intended look, exact measurements, and behavior. They are **not**
production code to paste into the app. Your task is to **recreate this design in the target
codebase's existing environment** (React, Vue, Next.js, native, etc.) using its established
patterns, component library, and data layer — or, if no environment exists yet, pick the most
appropriate framework and implement the design there.

The prototype uses a tiny templating runtime (`support.js`, `<sc-if>`, `<sc-for>`, `{{ }}`
interpolation) that only exists inside the design tool. Don't try to run `support.js` in your
app — read the JS logic class inside `Статья.dc.html` as **pseudocode for the breakpoint /
state logic**, not as literal framework code.

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, and breakpoints below are pixel-measured
from production screenshots (`reference/` screenshots are not included in this bundle, but every
value below was taken from them) and cross-checked against the project's design-token files
(included in `reference/tokens/` and `Tokens Handoff.md`). Recreate pixel-perfectly using your
codebase's existing component library/styling system, substituting the token names below for
whatever your codebase's equivalent tokens are.

---

## Design Tokens

Full canonical token list: see **`Tokens Handoff.md`** in this bundle (semantic color roles,
type scale, spacing, radius, motion, breakpoints, plus a ready-to-paste Tailwind v4 `@theme`
block). Below is the subset actually used on this page.

### Colors
| Role | Hex | Used for |
|---|---|---|
| `--text-heading` (brown) | `#4d2b17` | Headings, nav links, author name labels, book titles |
| `--text-body` | `#565656` | Body paragraphs, date line, footer copy |
| `--text-muted` | `#939598` | Journal-panel list items, book author line, muted captions, related-card excerpt |
| `--link` / `--button-primary` (teal) | `#65c6cd` | Active links, primary buttons ("В корзину"), search icon, price, active nav underline logic |
| `--link-hover` / `--button-primary-hover` | `#55b3bb` | Hover state of the above |
| `--link-warm` / `--text-accent` (terracotta) | `#d4a187` | "МАГАЗИН КНИГИ" active nav item, "ЖУРНАЛ" eyebrow label, pull-quote « » marks, pull-quote body text, sidebar quote card text, "video review" icon+label |
| `--link-warm-hover` | `#c98d6d` | Hover of terracotta interactive elements (related-card title hover) |
| Divider (page rules) | `#e1e1e1` | Horizontal rules in "Library" module, footer top rule, header rule |
| Divider (article rules) | `#e5e5e5` | ⚠ **Not yet tokenized** — pull-quote hairlines, journal-panel item dividers, mobile-overlay dividers, sidebar quote-card border. See "Open questions" below. |
| Surface white | `#ffffff` | Page background, journal panel, sidebar quote card |
| Surface card | `#f1f1f1` | "Library" module background (both sidebar and inline variants) |
| Surface card alt | `#f7f7f7` | "Библиотека" label strip background |
| Danger/error (Facebook-like brand colors, NOT DS tokens) | `#3b5998` (FB), `#4a76a8` (VK), `#55acee` (Twitter) | Share buttons — these are third-party brand colors, keep as literal hex, not design tokens |

### Typography
- Font: **PT Sans** (400/700/italic) + **PT Sans Narrow** (bylines use Narrow-adjacent tight
  letter-spacing in some spots — verify against `Tokens Handoff.md` §2).
- H1 (article title): `clamp(20px, …, 24px)` desktop per tokens; **this page overrides to a flat
  22px on desktop, 19px tablet, 17px mobile** (not using the clamp — flag for design-system
  reconciliation, see Open Questions).
- Byline caption (author name): 11px, `letter-spacing: .18em`, uppercase, color `--text-muted`.
- Eyebrow label ("ЖУРНАЛ"): 11-12px, `letter-spacing: .14em`, bold, terracotta.
- Body paragraph: 16px / `line-height: 28px` (≈1.75 — richer than the DS default `--lh-body: 1.65`,
  used specifically for long-form article copy; flag for reconciliation).
- Pull-quote: 22px desktop / 19px tablet / 18px mobile, `line-height: 1.55`, centered, terracotta.
- Nav links: 14px, bold, `letter-spacing: .18em` (`--tracking-nav`), uppercase.
- Related-card title: 16px desktop / 20px tablet / 17px mobile, bold, brown, `line-height: 1.3`.
- Related-card excerpt: 13px, `line-height: 1.5`, muted.

### Spacing / Radius / Shadows
- Radius: **3px** everywhere (buttons, cards, library module) — matches DS `--radius`.
- **No shadows anywhere** — flat surfaces only, separated by 1px rules or background tint, per DS.
- Container max-width: **1280px** (`--page-max`), centered.
- Desktop content grid: `1034px` article column + `270px` sidebar, `16px` gap.
- Sidebar width used here (`270px`) is **wider than the DS token `--sidebar-w: 218px`** — flag
  for reconciliation (this page's sidebar carries a quote card + banner + library + events feed,
  wider than the standard 218px rail).
- Byline rail column: `193px` desktop / `153px` tablet / stacked (block) on mobile.
- Desktop "Journal" slide-in panel width: `330px`.

### Breakpoints (per ADR-0004 §6 — do not change)
- `< 768px` → mobile
- `768–1024px` → tablet
- `≥ 1024px` → desktop
No breakpoints above `lg` (1024px) exist; desktop content is capped at 1280px, extra width
becomes side margin.

### Motion
- Panel slide-in/out: `transform` transition, **280ms** (`--dur-slow`), ease matches
  `--ease-out` per DS tokens.
- Hover color transitions on buttons/links: **150ms** (`--dur`), matches `--transition-colors`.
- Video play-button hover: background opacity + `scale(1.05)`, 200ms (not yet tokenized as
  a DS duration — closest is `--dur-slow`).

---

## Screens / Views

### 1. Desktop (≥ 1024px, reference render: 1600px wide)
**Layout**: Fixed max-width 1280px container, centered.
- **Header**: 3-column grid (`1fr auto 1fr`) — date (left, 13px, `--text-body`, padding-top 42px)
  · centered logo (106px tall, `assets/logo-full.png`, white background patch) · right-aligned
  "О нас" / "Контакты" links + "Вход / Регистрация" pill button (teal bg, white text, 12px,
  radius 2px, padding `7px 13px`).
  - A **1px horizontal rule** (`#e1e1e1`) spans full viewport width (`100vw`, centered via
    `translateX(-50vw)`), positioned at `top: 101px` from the header container — this aligns
    with the thin rule inside the logo art itself (between "РУССКІЙ ПАЛОМНИКЪ" and "ИЗДАТЕЛЬСКІЙ
    ДОМЪ"), so it reads as one continuous line broken only by the logo's white background patch.
  - Below that: a centered nav row (44px tall, 36px gaps) — burger icon (see Assets) pinned
    absolute-left, then 6 nav links ("ЖУРНАЛ", "СОБЫТИЯ", "МАГАЗИН КНИГИ" [active, terracotta],
    "ИМЕНИНЫ", "ПАЛОМНИЧЕСТВО", "ЖИТИЯ СВЯТЫХ"), then a search icon pinned absolute-right.
- **Main grid** (`margin-top: 20px`): `1034px` article column + `16px` gap + `270px` sidebar.
- **Article column** (top to bottom):
  1. Hero image, full width, no border-radius.
  2. Centered head block: eyebrow "ЖУРНАЛ" (terracotta, 11px) → H1 (22px, brown, 700) →
     multi-line dateline/subtitle (19px, terracotta, 700, `line-height:1.5`).
  3. Hairline rule with centered « glyph (terracotta, 30px) floating on white background patch.
  4. Byline block: 193px avatar column (103px circular photo + 2-line uppercase name caption,
     11px, `letter-spacing:.18em`, muted) + flexible text column (3 paragraphs, 16px/28px).
  5. Hairline rule with » glyph → centered pull-quote (max-width 900px, 22px/1.55, muted-brown
     `#565656` — NOT terracotta on this particular quote) → hairline rule with « glyph.
  6. Full-width text block (padding-left 193px to align under byline column) — 3 paragraphs.
  7. Photo 2, full width.
  8. Another full-width text block (3 paragraphs).
  9. Hairline rule with « glyph → second byline block (second author, same layout as #4).
  10. **Desktop-only continuation**: another » quote pair → text block → embedded video frame
      (width 841px, left-aligned under the byline column, with a centered circular translucent
      play button that scales+brightens on hover) → final text block.
  11. Share-button row (Like/Facebook Share/VK Share/Tweet — brand-colored pill buttons with
      a count badge), left-aligned under the byline column (`margin-left:193px`).
- **Sidebar column** (top to bottom):
  1. White bordered quote card (1px `#e5e5e5`, radius 2px, padding `16px 18px`): large terracotta
     "”" glyph (44px) → terracotta quote text (15px/1.5) → right-aligned italic attribution (13px).
  2. Optional banner image (toggleable — see Interactions), radius 4px, `margin-top:16px`.
  3. "Библиотека" label strip (`#f7f7f7` bg, 1px `#e8e8e8` border, radius 3px, 15px text).
  4. Library module: `#f1f1f1` background, radius 3px, padding `18px 14px` — **4 stacked product
     rows**, each: 64×92px cover image + author line (11px muted) + title (15px bold brown,
     up to 3 lines) + video/review meta icons row + price (20px teal) + "В корзину" button
     (teal, white text, radius 2px, `padding:7px 32px`) right-aligned on its own row. Rows
     separated by 1px `#e1e1e1` rules.
  5. "СОБЫТИЯ" eyebrow label (terracotta, 12px).
  6. 7 event rows: date (13px teal) + text (15px/1.5 body), each with bottom border `#e8e8e8`.

**Overlay — "Journal" slide-in panel** (desktop only, triggered by burger icon):
- Fixed position, `left:0`, full height, width **330px**, white background, right border 1px
  `#ececec`, padding `24px 36px 30px 44px`, `z-index:60`.
- Slides in/out via `transform: translateX()`, 280ms.
- Close (×) icon top-right, teal stroke.
- Eyebrow "ЖУРНАЛ" (terracotta) → "Жития Святых" static first item (15px, `#565656`) → 11 more
  items from a data list (15px, muted, each row bottom-bordered `#ececec`, hover → brown).
- Pressing **Escape** closes the panel (global keydown listener).

### 2. Tablet (768–1024px, reference render: 768px wide)
**Layout**: Single column (`display:block`), horizontal padding 22px, no sidebar — everything
below the byline text collapses to one flowing column.
- **Header**: date (11px) + hamburger icon (top row) → centered logo (108px tall) with a 1px
  `#e1e1e1` rule directly beneath it (`top:50%` of the logo block, full-bleed).
- Title block: H1 19px (flat, not the desktop 22px) → dateline 19px **brown** (not terracotta —
  tablet-specific override, confirm intentional).
- Byline rail narrows to 153px column, avatar grows to 100px.
- **Only the first byline + first pull-quote + first text block render** — the entire "second
  quote / second body / video / third body" desktop-only sequence is **suppressed** on
  tablet+mobile (see `ov.hideMid`). After the first text block, the flow goes straight to the
  second byline (second author), skipping the divider before it.
- Second byline: shows "ОТЕЦ ДМИТРИЙ" (same avatar/name as author 1, not "ЕЛЕНА КУЗНЕЦОВА") and
  the "Послушница" role caption is **hidden** on tablet. *(This looks like a content bug carried
  over from the prototype's fallback logic — verify against the real design source before
  shipping; see Open Questions.)*
- **Inline "Library" module** appears after the first text block (not in the sidebar, since
  there's no sidebar): label strip, then **3-column grid** of compact product cards (56×80px
  cover + author/title/meta stacked, price+button per card) — no "show more", all 3 always visible.
- Share buttons: 4 buttons stretched evenly (`flex:1`, `justify-content:space-between` on the
  three icon-only ones, `justify-content:center` on Tweet).
- Related-content grid: 3 columns, 216px tall images, 20px titles.
- Footer: `1fr auto` grid (text + error-report line side by side, same as desktop).

### 3. Mobile (< 768px, reference render: 320px wide)
**Layout**: Single column, padding 15px, header rule hidden.
- Header: date + 3-line hamburger icon (simple bars, not the desktop SVG burger) stacked above
  a smaller logo (62px tall), no rule under the logo on mobile.
- H1 17px, dateline 15px.
- Byline block **stacks** (avatar centered above text, `railGrid: display:block`), text gets
  `margin-top:18px` to separate from the avatar.
- Same "hide middle desktop-only block" behavior as tablet.
- Second byline shows "ЕЛЕНА КУЗНЕЦОВА" / role caption visible (unlike tablet).
- **Inline "Library" module — FINAL approved variant is the horizontal-scroll carousel**
  (confirmed by product: `Biblioteka_320-2.jpg` is the source of truth, not the stacked-list
  variant `Biblioteka_320_1.jpg`, which is now removed from the build). Layout: `#f1f1f1`
  background, `overflow-x:auto` flex row, each card `min-width:212px`, cover image (126px tall,
  object-fit contain, centered) → price (20px teal) → author (11px) → title (15px bold, 2 lines)
  → video/review meta row → full-width "В корзину" button. 3 cards in the reference data.
- A short italic caption appears **under the second photo only** on mobile ("Календарь
  «Целебник»…", 13px italic muted, centered) — this caption does not appear on tablet/desktop.
- Related-content grid: **1 column**, 200px tall images, 17px titles, 26px gap between cards.
- Footer: single column (text stacked above the error-report line, left-aligned).

**Overlay — Full-screen nav menu** (tablet + mobile, triggered by hamburger):
- Fixed, `inset:0`, white, `z-index:70`, scrollable, padding `22px 20px 40px`.
- Close (×) icon top-right, brown stroke, 22px.
- Content starts at `padding-top:64px`: an expandable "ЖУРНАЛ" accordion row (17px, bold,
  `letter-spacing:.18em`, brown, with a chevron that rotates 180° when open) — expanding reveals
  4 static sub-items (15px, muted) + one long two-line article summary in a "before dividers"
  style (line-height 1.65, letter-spacing .06em — a distinct look from the rest of the menu).
  Below the accordion: 5 more top-level nav rows (СОБЫТИЯ, МАГАЗИН КНИГИ [terracotta, "active"],
  ИМЕНИНЫ, ПАЛОМНИЧЕСТВО, ЖИТИЯ СВЯТЫХ), a 1px `#e5e5e5` divider, then 3 utility rows (О НАС,
  КОНТАКТЫ, ВХОД / РЕГИСТРАЦИЯ).

---

## Interactions & Behavior

- **Breakpoint detection**: `window.innerWidth` read on mount + `resize` listener. Thresholds:
  `< 768` mobile, `< 1024` tablet, else desktop. (A `viewport` prop/flag can force a specific
  breakpoint for QA/Storybook-style preview — implement as a dev-only override, not user-facing.)
- **Desktop burger** → toggles the slide-in Journal panel (`transform: translateX(0)` open /
  `translateX(-104%)` closed, 280ms). Panel's own × button and **Escape key** both close it.
- **Tablet/mobile hamburger** → toggles the full-screen nav overlay (simple show/hide, no
  transition specified beyond default; consider matching the 280ms slide/fade convention from
  the desktop panel for consistency — currently a hard cut in the reference).
- **Journal accordion (mobile/tablet overlay only)** → click toggles `journalOpen`; chevron
  rotates 180° via `transform`, 200ms.
- **All buttons/links**: color-only hover transitions, 150ms (e.g. primary teal buttons darken
  to `#55b3bb`; nav links go brown→terracotta on hover; related-card titles go brown→
  `#c98d6d` on hover).
- **Video teaser** (desktop only): circular play button at 62% white opacity; on hover, opacity
  rises to 80% and the button scales to 1.05× (200ms, both `background` and `transform`
  transitioning). No actual video playback wired in the reference — it's a static frame + play
  affordance only; wire up your video player / lightbox here.
- **"Show more" pattern**: an earlier iteration of the mobile Library module had a "Показать
  больше товаров" reveal-more strip and a plain stacked-list layout. **Both have been removed**
  — the approved final mobile behavior is the horizontal carousel with all cards visible via
  scroll, no progressive disclosure. Don't reintroduce the "show more" affordance unless product
  asks for it again.
- **Sidebar banner** is optionally hidden via a boolean flag (`showBanner`) — treat as a CMS/admin
  toggle, not user-facing.

## State Management
Minimal local UI state, no server data modeled in this prototype (all article/product/event
content is hardcoded placeholder copy — replace with real CMS/API data):
- `viewportWidth` (derived breakpoint: mobile/tablet/desktop)
- `isMenuOpen` (bool) — controls both the desktop slide-panel and the mobile/tablet overlay
- `isJournalAccordionOpen` (bool, mobile/tablet overlay only)
- Content collections needed from your data layer: article body (rich text/paragraphs), 2×
  author bylines (photo, name, optional role), 1× pull-quote pair (there are actually 2 quotes
  on desktop, 1 shown on tablet/mobile), hero + secondary photo + video-frame image, sidebar
  quote-card content, product list (Library module — image, author, title, price, review count,
  has-video flag) with **4 items on desktop, 3 on tablet/mobile**, "Другие материалы по теме"
  related-article cards (image, title, excerpt) — **7 cards per row-group on desktop, 3 on
  tablet, 3 on mobile** (2 row-groups total: "по теме" and "события"), events feed (date + text,
  7 items, sidebar only / desktop only).

---

## Assets
All images below are **cropped/placeholder stand-ins extracted from the original production
screenshots** — replace with real, full-resolution source assets before shipping:
- `assets/logo-full.png`, `assets/logo-mark.png` — raster logo lockup (pre-reform Russian
  orthography "Русскій Паломникъ"). **A vector original should be requested from the client** —
  these are low-res raster extracts.
- `assets/article/hero.jpg`, `photo-2.jpg`, `video-frame.jpg` — article photography (placeholders).
- `assets/article/avatar-1.jpg`, `avatar-2.jpg` — author circular photos (placeholders).
- `assets/article/book-1.png` … `book-4.png` — product cover placeholders.
- `assets/article/banner.jpg` — sidebar promo banner placeholder.
- `assets/article/rel-1.jpg` … `rel-14.jpg` — related-article thumbnail placeholders.
- `assets/icons/burger.svg` — the desktop nav's 3-line hamburger icon (brown stroke, no arrow/
  cursor glyph — a simpler version replaced an earlier draft that had a hand-cursor doodle).
- Inline SVGs (not separate files, embedded in the markup): search icon (teal), close ×
  (teal on desktop panel / brown on mobile overlay), accordion chevron, video-review icon
  (terracotta outline), review-count/speech-bubble icon (teal outline), video play triangle.
  Facebook/VK/Twitter icons in the share row use literal brand SVG paths + brand hex colors —
  do not restyle these with DS tokens.

---

## Files
- `reference/Статья.dc.html` — the full prototype (template + breakpoint/state logic in one
  file). Read the `<script data-dc-script>` block at the bottom for the exact breakpoint
  thresholds, per-breakpoint style overrides (search for the `ov` object), and content data
  (`journalItems`, `allCards1/2`, `events`).
- `reference/styles.css` + `reference/tokens/*.css` — the design system's token source
  (colors, typography, spacing, motion) that this page's hardcoded hex/px values should
  ultimately be reconciled against.
- `Tokens Handoff.md` — canonical, developer-facing token reference (semantic color roles,
  type scale, spacing/radius, motion, breakpoints) plus a ready-to-paste Tailwind v4 `@theme`
  block.
- `assets/` — all images/icons referenced above.

---

## Open Questions / Reconciliation Needed
These are real discrepancies between this page's hardcoded values and the design system's
canonical tokens — flagging rather than silently resolving:

1. **Two divider grays coexist**: DS token `--border-divider` is `#e1e1e1`, but this article's
   pull-quote hairlines, journal-panel dividers, and sidebar quote-card border all use `#e5e5e5`
   (not tokenized). Decide whether `#e5e5e5` becomes a new token or gets normalized to `#e1e1e1`.
2. **H1 sizing**: the DS defines H1 as a fluid `clamp()` (20→24px). This page instead hardcodes
   flat per-breakpoint values (22 desktop / 19 tablet / 17 mobile) that don't match the clamp
   curve. Reconcile which is authoritative.
3. **Body line-height**: DS `--lh-body` is 1.65; this article's paragraphs use 16px/28px
   (≈1.75). Confirm whether long-form article copy intentionally gets a looser line-height than
   the system default, or whether this should be tightened to 1.65.
4. **Sidebar width**: DS `--sidebar-w` is 218px; this page's sidebar column is 270px. Confirm
   whether the article sidebar is an intentional wider exception (it carries more modules than
   a standard rail) or should be narrowed.
5. **Second byline content mismatch by breakpoint**: on tablet the second author block shows
   "ОТЕЦ ДМИТРИЙ" (same as the first author) with the role caption hidden; on mobile/desktop it
   shows "ЕЛЕНА КУЗНЕЦОВА" with role "Послушница" visible. This looks like an unintentional
   fallback in the prototype rather than a deliberate content decision — confirm the correct
   second-author identity for tablet before implementing.
6. **Tablet dateline color**: terracotta on desktop/mobile, brown on tablet — confirm intentional.
7. **Video-frame play-button motion (200ms)** and **journal-accordion chevron (200ms)** aren't
   yet mapped to a named DS motion token (closest existing tokens are `--dur` 150ms and
   `--dur-slow` 280ms) — pick one or introduce a 200ms token if this pattern recurs elsewhere.
8. **Original webfont files**: PT Sans / PT Sans Narrow are loaded from Google Fonts in the
   prototype; production should self-host the licensed woff2 files per ADR-0004.
