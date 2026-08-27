import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used only at build time by scripts/prerender.mjs (via a separate
// `vite build --ssr` pass) to bake real content into dist/index.html.
// The browser never loads this file.
export function render() {
  return renderToString(<App />)
}
