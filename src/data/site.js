// Single source of truth for the site's absolute deployed URL.
// Everything that needs the full origin — index.html's canonical/OG/JSON-LD
// tags (via the Vite plugin in vite.config.js) plus robots.txt and
// sitemap.xml (via scripts/generate-seo-files.mjs) — reads from here.
// No trailing slash.
export const SITE_URL = 'https://pranavtetali.com'
