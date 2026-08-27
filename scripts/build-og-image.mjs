// Regenerates public/og-image.png from the current profile/stats in resume.js.
// Re-run this any time those change: node scripts/build-og-image.mjs
//
// Renders an HTML string with the site's dark-theme tokens hardcoded (kept in
// sync with src/index.css by hand — there are only four colors), then
// rasterizes it with a locally installed Chromium-based browser in headless
// mode, navigating via a data: URL (avoids file:// timing flakiness with
// headless Chromium on Windows). No image library is added to package.json.

import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { profile, stats } from '../src/data/resume.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const outputPath = join(repoRoot, 'public', 'og-image.png')

const TOKENS = {
  canvas: '#060b18',
  fg: '#e8eefc',
  accent: '#38bdf8',
  muted: '#90a3c4',
}

const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: 1200px;
    height: 630px;
    background: ${TOKENS.canvas};
    font-family: -apple-system, 'Segoe UI', Inter, ui-sans-serif, system-ui, sans-serif;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    border-radius: 9999px;
    filter: blur(90px);
    opacity: 0.5;
  }
  .wrap {
    position: relative;
    width: 1200px;
    height: 630px;
    padding: 76px 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .name {
    font-size: 66px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: ${TOKENS.fg};
  }
  .title {
    margin-top: 18px;
    font-size: 30px;
    font-weight: 500;
    color: ${TOKENS.fg};
  }
  .title .accent { color: ${TOKENS.accent}; }
  .stats {
    display: flex;
    gap: 1px;
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(232, 238, 252, 0.12);
    background: rgba(232, 238, 252, 0.12);
  }
  .stat {
    flex: 1;
    background: #0b1220;
    padding: 22px 24px;
  }
  .stat .value {
    font-size: 32px;
    font-weight: 600;
    color: ${TOKENS.accent};
  }
  .stat .label {
    margin-top: 6px;
    font-size: 15px;
    color: ${TOKENS.muted};
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="glow" style="top:-140px; left:-100px; width:420px; height:420px; background:rgba(56,189,248,0.16);"></div>
    <div class="glow" style="top:-60px; right:-60px; width:360px; height:360px; background:rgba(129,140,248,0.14);"></div>
    <div>
      <div class="name">${profile.name}</div>
      <div class="title">${profile.title} <span class="accent">/ ${profile.subtitle}</span></div>
    </div>
    <div class="stats">
      ${stats
        .map(
          (s) => `<div class="stat"><div class="value">${s.value}</div><div class="label">${s.label}</div></div>`,
        )
        .join('')}
    </div>
  </div>
</body>
</html>`

const EDGE_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
]
const browser = EDGE_CANDIDATES.find((p) => existsSync(p))
if (!browser) {
  console.error('No local Edge/Chrome install found to rasterize the OG image.')
  process.exit(1)
}

const dataUrl = `data:text/html;base64,${Buffer.from(html, 'utf8').toString('base64')}`
const profileDir = mkdtempSync(join(tmpdir(), 'og-image-profile-'))

execFileSync(browser, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  `--user-data-dir=${profileDir}`,
  '--no-first-run',
  `--screenshot=${outputPath}`,
  '--window-size=1200,630',
  dataUrl,
])

rmSync(profileDir, { recursive: true, force: true })

console.log(`Wrote ${outputPath}`)
