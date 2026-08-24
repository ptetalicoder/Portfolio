import { useEffect, useState } from 'react'
import { profile, sections } from '../data/resume.js'
import { useScrollSpy } from '../hooks/useScrollSpy.js'
import ThemeToggle from './ThemeToggle.jsx'
import { DownloadIcon } from './Icons.jsx'

const sectionIds = sections.map((s) => s.id)

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useScrollSpy(sectionIds)
  const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep the page from scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-line bg-canvas/80 backdrop-blur-xl'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#top" className="group flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-mono text-sm font-bold text-accent-fg">
              PT
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:inline">
              {profile.name}
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active === s.id
                    ? 'text-accent'
                    : 'text-muted hover:text-fg'
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={resumeUrl}
              download
              className="hidden items-center gap-2 rounded-lg border border-line bg-surface px-3.5 py-2 text-sm font-medium transition hover:border-accent hover:text-accent sm:inline-flex"
            >
              <DownloadIcon className="h-4 w-4" />
              Resume
            </a>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface md:hidden"
            >
              <span className="relative block h-4 w-4">
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                    menuOpen ? 'top-2 rotate-45' : 'top-1'
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 block h-px w-4 bg-current transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-4 bg-current transition-all duration-300 ${
                    menuOpen ? 'top-2 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-1 px-8">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${i * 45}ms` : '0ms' }}
              className={`border-b border-line py-4 text-2xl font-semibold tracking-tight transition-all duration-300 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              <span className="mr-3 font-mono text-sm text-accent">
                0{i + 1}
              </span>
              {s.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            download
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-medium text-accent-fg"
          >
            <DownloadIcon className="h-4 w-4" />
            Download resume
          </a>
        </div>
      </div>
    </>
  )
}
