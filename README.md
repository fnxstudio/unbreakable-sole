# Unbreakable Sole — book site

**Live:** https://fnxstudio.github.io/unbreakable-sole/home.html · **Repo:** https://github.com/fnxstudio/unbreakable-sole

(The bare URL `…/unbreakable-sole/` redirects to `home.html`.)


Static site for Missy Moss Wright's book **Unbreakable Sole: Finding Joy, Purpose,
and Strength in Life's Toughest Miles**. This is a self-contained, hand-hostable
copy of the live site (originally on HubSpot at unbreakablesole.com), with the
checkout re-pointed to Spiffy. It is a **separate repo from Darren Hardy**.

## Pages

| File              | Nav label       |
|-------------------|-----------------|
| `home.html`       | Home            |
| `index.html`      | → redirects to `home.html` |
| `about.html`      | About           |
| `sole-wall.html`  | Sole Wall       |
| `resources.html`  | Free Resources  |
| `sole-a-thon.html`| Sole-A-Thon     |
| `connect.html`    | Connect         |

The **Shop** nav item and all **BUY NOW / YES!! Let's Go!** buttons go to the
checkout (see below). The checkout itself lives on Spiffy and is **not** part of
this repo.

## Assets

All CSS, JS, images, video and fonts are localized under `assets/`. Nothing loads
from unbreakablesole.com anymore. Two font sources are still loaded from their CDNs
by design (Google Fonts "Pacifico" and Adobe Typekit) — these are the site's real
font providers and work as-is.

## Checkout → Spiffy

Every buy link (Shop nav item + all BUY NOW / "YES!! Let's Go!" buttons) points to
the Spiffy-backed checkout:

```
https://secure.darrenhardy.com/checkout/unbreakable-sole
```

To change it later, replace that URL across the HTML:

```sh
# from the repo root
sed -i '' 's#https://secure.darrenhardy.com/checkout/unbreakable-sole#https://NEW-URL#g' *.html
```

## Run locally

```sh
python3 -m http.server 8010 --directory .
# open http://localhost:8010/
```

## Image optimization

All PNG/JPEG photos were converted to **WebP** (quality 82, max dimension capped at
2000px). This cut the image payload from ~143 MB to ~11 MB (e.g. one 7820×5915,
35 MB PNG background is now a ~200 KB WebP). SVG, fonts, and video were left as-is.

## Video

Both `.mp4` videos were re-encoded (H.264, audio stripped, web-faststart) and set to
**autoplay, muted, looping**:

- Home hero background (`index.html`): 7.8 MB → **2.0 MB**.
- Sole-A-Thon (`sole-a-thon.html`): 71 MB → **21 MB** (dropped 60fps → 30fps).

The Vimeo "Website Ending" player embed on the home page was removed.

## Footer

A slim, scoped legal bar (`.us-site-footer`, ~52px tall) is injected before
`</body>` on all 6 pages — modeled on darrenhardy.com's bottom legal bar, in Missy's
brand (steel-blue `#43748f` + gold hairline). Copyright on the left, legal links on
the right; stacks to two centered lines on mobile. **Terms & Conditions** →
`dh.darrenhardy.com/terms-of-service/` and **Privacy Policy** → `dh.darrenhardy.com/privacy`,
both open in a new tab. Copyright reads "© 2026 Unbreakable Sole. All Rights
Reserved." — swap the entity name (e.g. to "Darren Hardy, LLC") if needed.

## Notes

- The Sole-A-Thon video is still ~21 MB (a 38s 1080p clip). Fine for that page, but
  raise the CRF or trim it if you want it lighter.
- Titles/meta are inherited from the original HubSpot pages and can be cleaned up.
