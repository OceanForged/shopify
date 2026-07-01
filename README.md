# Ocean Forged — Shopify Theme

An Online Store 2.0 theme built from the Ocean Forged site design. Every page is a
JSON template composed of editable sections, so content can be changed from the
Shopify theme editor without touching code.

## Design system
- **Fonts:** Montserrat (display) + League Spartan (body), loaded from Google Fonts.
- **Colors** (editable in *Theme settings → Colors*):
  - Primary dark `#15302f` · Darkest `#0f2423` · Accent `#E03F1A` · Light `#f2f5f4`

## Page map
| Page | Template | Key sections |
|------|----------|--------------|
| Home | `templates/index.json` | `hero`, `spec-ticker`, `feature-grid`, `image-text`, `cta-band` |
| Product | `templates/product.json` | `main-product` (buy form), `product-anatomy`, `product-specs`, `audience-grid`, `cta-band` |
| About | `templates/page.about.json` | `page-hero`, `story-text`, `founder` |
| Pre-Sale | `templates/page.pre-sale.json` | `presale-signup` (email capture), `numbered-points` |
| Blog ("The Log") | `templates/blog.json` → `main-blog` | featured + grid |
| Article | `templates/article.json` → `main-article` | |
| Collection | `templates/collection.json` → `main-collection` | product grid |
| Cart | `templates/cart.json` → `main-cart` | |
| Search | `templates/search.json` → `main-search` | |
| 404 | `templates/404.json` → `main-404` | |
| Password page | `layout/password.liquid` | |

Header and footer live in `sections/header.liquid` / `sections/footer.liquid` and are
rendered in `layout/theme.liquid`.

## Setup after install
1. **Menus** — *Navigation*: set a `main-menu` (Home, Product, About, The Log, Pre-Sale)
   and a `footer` menu. The header/footer pick these up automatically.
2. **Pages** — create two pages in *Pages*:
   - **About** → set *Theme template* = `page.about`
   - **Pre-Sale** (handle `pre-sale`) → *Theme template* = `page.pre-sale`
3. **Product** — create the *Radio Dry Bag* product. The product page shows a real
   Add-to-Cart form when the product is available, or a "Join the List" call-to-action
   (pre-sale mode) when it isn't purchasable.
4. **Blog** — the default `news` blog powers *The Log*.
5. **Images** — starter photos ship in `assets/`. Swap any image from the section
   settings in the theme editor.
6. **Email capture** — the Pre-Sale form adds subscribers to *Customers* with the tag
   `pre-sale` (change the tag in the section settings).

## Uploading

### Option A — GitHub (recommended)
1. Push this `theme/` folder as the **root** of a GitHub repo (so `layout/`,
   `sections/`, `templates/`, `config/`, `assets/`, `locales/` sit at the repo root).
2. In Shopify admin → *Online Store → Themes → Add theme → Connect from GitHub*.
3. Select the repo + branch. Shopify syncs both ways after that.

### Option B — Zip upload
Zip the **contents** of `theme/` (not the folder itself) and use
*Themes → Add theme → Upload zip file*.

## Folder structure
```
assets/      base.css, theme.js, images
config/      settings_schema.json, settings_data.json
layout/      theme.liquid, password.liquid
locales/     en.default.json
sections/    header, footer, hero, feature-grid, main-product, ... (one per block)
snippets/    meta-tags.liquid
templates/   index.json, product.json, page.*.json, blog.json, cart.json, customers/*
```
