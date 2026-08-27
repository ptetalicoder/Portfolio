// Regenerates public/robots.txt and public/sitemap.xml from SITE_URL, so
// the deployed domain lives in one place (src/data/site.js). Runs
// automatically before every build via package.json's "prebuild" script.
//
// This is a single-page app — the sitemap lists only the root document.
// Hash routes (#about, #/case/<slug>) are not separate URLs to a crawler
// and must never appear here.

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE_URL } from '../src/data/site.js'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const today = new Date().toISOString().slice(0, 10)

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
`

writeFileSync(join(repoRoot, 'public', 'robots.txt'), robotsTxt)
writeFileSync(join(repoRoot, 'public', 'sitemap.xml'), sitemapXml)

console.log(`Wrote robots.txt and sitemap.xml for ${SITE_URL}`)
