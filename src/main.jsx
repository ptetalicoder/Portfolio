import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Only the production build's postbuild step (scripts/prerender.mjs)
// injects real markup into #root — npm run dev always serves it empty.
// hydrateRoot expects server-rendered content already there; pointed at
// an empty container it would log mismatch warnings for everything, so
// dev mode falls back to a plain client render exactly as before.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
