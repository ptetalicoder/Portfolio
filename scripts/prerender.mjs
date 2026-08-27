// Injects the SSR-rendered app markup into dist/index.html's empty
// #root div. Run after both `vite build` (client) and
// `vite build --ssr src/entry-server.jsx --outDir dist-ssr` have produced
// their output — see package.json's "postbuild" script.

import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const { render } = await import('../dist-ssr/entry-server.js')

const appHtml = render()

const indexPath = join(repoRoot, 'dist', 'index.html')
const html = readFileSync(indexPath, 'utf8')

if (!html.includes('<div id="root"></div>')) {
  throw new Error('prerender.mjs: could not find the empty #root div to inject into')
}

writeFileSync(indexPath, html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))

// dist-ssr is a build-time-only artifact — nothing in it ships.
rmSync(join(repoRoot, 'dist-ssr'), { recursive: true, force: true })

console.log('Prerendered dist/index.html')
