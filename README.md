# Pranav Tetali — Portfolio

Personal portfolio site. Data analyst / business intelligence, MSBA candidate at SMU Cox.

**Live:** https://ptetalicoder.github.io/Portfolio/

Built with React 19, Vite, and Tailwind CSS v4. Light/dark theme with a toggle that
remembers your choice and otherwise follows your OS setting.

## Running locally

```bash
npm install
npm run dev      # http://localhost:5173/Portfolio/
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Editing the content

Everything on the page comes from [`src/data/resume.js`](src/data/resume.js) — profile,
stats, experience, projects, skills, education, interests, and the nav sections. Edit
that file and the components pick it up; you should rarely need to touch JSX.

To add a link to a project card, fill in its `links` array:

```js
links: [
  { label: 'Source', href: 'https://github.com/ptetalicoder/mlb-scouting' },
  { label: 'Live demo', href: 'https://…' },
]
```

The card grows a link row automatically when `links` is non-empty.

To swap the resume PDF, replace `public/Pranav_Tetali_Resume.pdf` (keep the filename, or
update `profile.resumeFile`).

## Theming

Colors are semantic CSS custom properties defined in
[`src/index.css`](src/index.css) — `--canvas`, `--surface`, `--line`, `--fg`, `--muted`,
`--accent`, and a few more. They are declared twice: once on `:root` (light) and once on
`.dark`. Tailwind exposes them as utilities (`bg-canvas`, `text-muted`, `border-line`,
`bg-accent`, …) via `@theme inline`, so changing the accent color is a two-line edit.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment** and set
**Source** to **GitHub Actions**.

`vite.config.js` sets `base: '/Portfolio/'` because the site is served from a project
subpath. If you ever rename the repo to `ptetalicoder.github.io`, change `base` to `'/'`
and update the favicon path in `index.html`.
