import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE_URL } from './src/data/site.js'
import { profile, education } from './src/data/resume.js'

// Fills in index.html placeholders at build (and dev) time so the deployed
// URL and the Person structured data both come from the same source of
// truth (src/data/site.js and src/data/resume.js) instead of being
// hand-typed in the HTML.
function htmlDataPlugin() {
  const personJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.summary,
    url: `${SITE_URL}/`,
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.school })),
    sameAs: [profile.linkedin, profile.github],
  })

  return {
    name: 'html-data',
    transformIndexHtml(html) {
      return html
        // Every placeholder that fills an href/content Vite's dev server
        // might treat as an asset reference (canonical's href, and the
        // og:image/twitter:image it specifically resolves relative image
        // paths for) must already look like an absolute URL — otherwise
        // dev mode prefixes `base` onto it before any plugin hook runs.
        .replaceAll('https://__SITE_HOST_AND_PATH__', SITE_URL)
        .replaceAll('__PERSON_JSONLD__', personJsonLd)
    },
  }
}

// Served from the custom domain (pranavtetali.com, see public/CNAME) at
// the root, not the /Portfolio/ subpath — base is '/' to match.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), htmlDataPlugin()],
})
