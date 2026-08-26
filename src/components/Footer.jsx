import { lazy, Suspense, useState } from 'react'
import { profile } from '../data/resume.js'
import { GitHubIcon, InvaderIcon, LinkedInIcon, MailIcon } from './Icons.jsx'

const AlienInvasionGame = lazy(() => import('./AlienInvasionGame.jsx'))

export default function Footer() {
  const [gameOpen, setGameOpen] = useState(false)

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-5 px-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. Built with React, Vite &amp;
          Tailwind.
        </p>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            <MailIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            <GitHubIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setGameOpen(true)}
            aria-label="Play Alien Invasion, a hidden mini-game"
            title="Bored? Play Alien Invasion"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition hover:border-accent hover:text-accent"
          >
            <InvaderIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {gameOpen && (
        <Suspense fallback={null}>
          <AlienInvasionGame onClose={() => setGameOpen(false)} />
        </Suspense>
      )}
    </footer>
  )
}
