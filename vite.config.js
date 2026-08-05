import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Repo is ptetalicoder/Portfolio, so Pages serves it from /Portfolio/.
// If you ever rename the repo to ptetalicoder.github.io, change base to '/'.
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react(), tailwindcss()],
})
