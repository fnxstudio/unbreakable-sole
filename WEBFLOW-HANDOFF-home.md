# Home page → Webflow: what already exists, what has to be built

Source of truth: `home-draft.html`. Live reference for style: `unbreakable-sole.webflow.io/about`.

The draft loads the real site stylesheet, so anything it does **not** define locally is
already in Webflow and must be reused, not recreated.

---

## 1. Reuse as-is — already in the Webflow stylesheet

Do not create new classes for these. They are styled by the site sheet and the draft
inherits them:

| Class | Where the draft uses it |
|---|---|
| `.vid-btn` | every primary yellow button |
| `.vid-secondary` | every underlined secondary link |
| `.res-band` `.res-band-inner` `.res-band-photo` `.res-band-quote` | Missy photo + pull-quote band |
| `.rq-card` `.rq-body` `.rq-name` | rolling testimonial cards |

`.rq-face` and `.rq-role` also exist in the sheet; the draft only adds a mobile size
override and the monogram variant (below).

## 2. Variables — map to existing Webflow swatches

Every solid brand colour in the draft is a `var()` reference, so it maps 1:1:

`--dark-blue #00325c` · `--medium-blue #337690` · `--light-blue #c0e7fa` ·
`--sky-tint #e8f5fd` · `--cta-yellow #ffdd60` · `--gold #d79f36` ·
`--ink #22303a` · `--muted #65757f` · `--container-max 1120px` · `--gutter 26px` ·
`--brand-display "Archivo Black"` · `--brand-sans Figtree`

Shadow tints are still literal `#00325cXX` — those are alpha values, set them
numerically in the Designer.

**Palette rules this page follows, taken from the live pages:**
- Large block areas are white, `--sky-tint`, or `--light-blue`. **Never `--dark-blue`.**
  Navy is text only. (`.abt-thesis` is the precedent.)
- Yellow is the accent: buttons, number discs, the play button, and the inline
  emphasis block. `--gold` stays where the live site keeps it — footer headings only.
- Burnt orange / red clay are unused on this page.

## 3. Section rhythm

`.hm-s` = `96px 26px 104px`, hero = `132px 26px 104px`, container `1120px`.
Matches `/about` (`96–100 / 26 / 100–104`, hero `156/104`).

Background order down the page — keep this alternation if sections move:

1. Hero — `--sky-tint` + cloud image, settling into `--light-blue` at the bottom
2. Video — `--light-blue`
3. The Book (8 Things) — white
4. Missy band — `--sky-tint`
5. Featured endorsements — white
6. Rolling testimonials — `--sky-tint`
7. Podcasts & press — white
8. Speaking — `--sky-tint`
9. Community — white
10. Final CTA — `--sky-tint`

## 4. New classes to build

Grouped by section. All values are in the `<style>` block of `home-draft.html`.

- **Hero** — `.hm-hero` `.hm-hero-grid` `.hm-book-wrap` `.hm-book` `.hm-eyebrow`
  `.hm-h1` `.hm-lede` `.hm-cta-row` `.hm-buy` `.hm-fine`
- **Accolade marquee** — `.hm-acc` `.hm-acc-track` `.hm-acc-i`
- **Generic section** — `.hm-s` (+ `.tint`, `.blue`) `.hm-in` `.hm-kick` `.hm-h2` `.hm-p`
- **Video** — `.hm-vid` `.hm-vid-btn` `.hm-play`
- **The Book** — `.tb-wrap` `.tb-lead` `.tb-h` `.tb-sub` `.tb-list` `.tb-item` `.tb-num` `.tb-t`
- **Featured** — `.hm-feat` `.hm-fq` (+ `.big`) `.hm-fq-q` `.hm-fq-n` `.hm-fq-r`
  `.hm-fq-who` `.hm-fq-face` `.hm-fq-hero` `.hm-fq-inner`
- **Rolling** — `.hm-roll` `.rq-mono` (monogram tile for readers with no headshot)
- **Press** — `.pr-grid` `.pr-card` `.pr-media` (+ `.badge`) `.pr-badge` `.pr-play`
  `.pr-b` `.pr-src` `.pr-t` `.pr-meta` `.pr-go`
- **Speaking** — `.sp-shot` `.sp-lab` `.sp-topics`
- **Band quote** — `.rb-q`
- **Final CTA** — `.cta-two` `.cta-two-art` `.cta-two-copy`
- **Shared two-up** — `.hm-two` `.hm-card` `.hm-card-b` `.hm-card-h` `.hm-card-p`

## 5. Needs custom code — the Designer cannot express these

1. **Yellow inline emphasis.** `<mark>` inside a heading or quote, with
   `box-decoration-break: clone` so a highlight that wraps across lines keeps its
   padding and radius on both lines. Used on the 8 Things headline, Missy's band
   quote, Darren's quote, and every rolling testimonial.
   **The live site already has this exact treatment as `.abt-thesis-em`** — copy that
   class's styling rather than inventing a second one.
2. **Three keyframe animations** — `hm-roll` (accolade marquee, 68s),
   `hm-up` (rolling testimonials, 120s), `hm-pulse` (play button ring, 2.4s).
   All three are wrapped in `prefers-reduced-motion` guards. Webflow Interactions
   can do the two marquees; the pulse is a box-shadow animation and is easier as code.
3. **Rolling track duplication.** `#rqtrack` scrolls to `-50%`, so its children must
   be cloned once for a seamless loop. The draft does this in JS at the bottom of the
   page. In Webflow, either keep the script or place the run twice in the Designer and
   mark the second copy `aria-hidden`.
4. **Video play/hide.** `.hm-vid-btn` hides itself and calls `video.play()`.
5. **`.tb-list` column order.** `grid-auto-flow: column` with 4 rows, so the list reads
   1–4 down the first column and 5–8 down the second. In the Designer this needs
   manual grid placement, not auto-flow.
6. **Hero background.** Two layers — a gradient over `assets/bg-clouds.webp`. Webflow
   supports stacked background layers natively, so this one is fine in the Designer.

## 6. Assets

- `assets/dh-missy.webp` — Darren Hardy with Missy, cropped for the featured card.
  Not yet uploaded to Webflow.
- `assets/bg-clouds.webp` — already used on the audiobook page.
- Endorser headshots — `assets/<hash>_<hash>.webp`, from the archived home page.
- Everything else already sits on the Webflow CDN and is referenced by its live URL.

## 7. Open questions before this ships

- The nine Sole-A-Thon reader testimonials come from the private testimonials sheet.
  Two are trimmed excerpts. Missy should approve the names and wording.
- The eight "things this book will teach you" are mapped from chapter titles and
  reader comments, not from reading the book. Missy should confirm each one.
- `/press` and `/community` links point at pages that do not exist yet.
