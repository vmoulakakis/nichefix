# NicheFix

NicheFix is a problem-first affiliate discovery site built from the uploaded `linkwise_ai_rank_top5_niches_100_products_greece_aug2026.xlsx` research workbook.

## Site architecture
- `index.html` — homepage, Fix Finder and all 100 product opportunities
- `niches/*.html` — five niche landing pages, 20 products each
- `blog/index.html` — editorial hub
- `blog/guides/*.html` — five original seed buying guides
- `blog/article-generator.html` — client-side article draft builder with contextual affiliate links
- `assets/data/products.js` — all 100 products and scoring data
- `assets/css/styles.css` — shared responsive design
- `assets/js/` — finder, site utilities and article generator
- `assets/img/*.svg` — original lightweight niche graphics/fallbacks
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `vercel.json` — publishing/SEO files

## Product imagery
Product cards use live merchant-page visual previews through Thum.io screenshots, with local SVG fallbacks when a merchant blocks capture. This avoids copying low-resolution catalog assets and ensures every card has visual content. For the strongest production SEO, replace high-traffic product screenshots with merchant-approved product-feed images when available.

## SEO / affiliate rules
- All affiliate links use `rel="sponsored nofollow noopener"`.
- The site adds original problem-solving tools, comparison logic and buying guides to avoid thin affiliation.
- The Article Builder creates **drafts**, not auto-published pages. Review and add original analysis/visual evidence before indexing.
- Product prices are research snapshots from Aug 2026 and must be revalidated.
- Some workbook entries are category/family candidates; upgrade them to exact product deep links before paid promotion.

## Before production
1. Connect the repo to Vercel.
2. If your final domain is not `nichefix.gr`, replace that domain in `robots.txt` and `sitemap.xml`.
3. Add the site to Google Search Console and submit `/sitemap.xml`.
4. Validate important pages in Rich Results Test and PageSpeed Insights.
5. Replace screenshot previews for highest-traffic products with official feed images whenever possible.
