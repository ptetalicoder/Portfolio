import { useEffect, useState } from 'react'
import Reveal from './Reveal.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { ArrowIcon } from './Icons.jsx'

const eyebrow = 'font-mono text-xs uppercase tracking-[0.22em] text-accent'

function CaseStudyImage({ image }) {
  const [failed, setFailed] = useState(false)
  const src = image.src ? `${import.meta.env.BASE_URL}${image.src}` : null

  if (failed || !src) {
    return (
      <figure className="overflow-hidden rounded-2xl border border-dashed border-line-strong bg-surface-2">
        <div className="flex h-56 items-center justify-center p-6 text-center sm:h-72">
          <span className="text-sm font-medium text-muted">Screenshot coming soon</span>
        </div>
        <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
          {image.caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-line bg-surface-2">
      <img
        src={src}
        alt={image.caption}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full object-cover"
      />
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
        {image.caption}
      </figcaption>
    </figure>
  )
}

export default function CaseStudy({ project, theme, onToggleTheme }) {
  const cs = project.caseStudy

  // Coming from a scrolled position on the main page (or a fresh deep link),
  // always start a case study at the top rather than wherever the browser
  // happened to leave the scroll position.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [cs.slug])

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <header className="sticky top-0 z-50 border-b border-line bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-6">
          <a
            href="#top"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-fg"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            Back to portfolio
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="font-mono text-xs text-muted">{project.period}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{project.name}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-10 h-px w-full bg-line" />
        </Reveal>

        <div className="mt-12 space-y-14">
          <Reveal as="section">
            <h2 className={eyebrow}>The question</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{cs.question}</p>
          </Reveal>

          <Reveal as="section">
            <h2 className={eyebrow}>The data</h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
              <p>
                <span className="font-medium text-fg">Source: </span>
                {cs.data.source}
              </p>
              <p>
                <span className="font-medium text-fg">What was broken: </span>
                {cs.data.problem}
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className={eyebrow}>The build</h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
              <p>
                <span className="font-medium text-fg">Approach: </span>
                {cs.build.approach}
              </p>
              <p>
                <span className="font-medium text-fg">Architecture: </span>
                {cs.build.architecture}
              </p>
              <p>
                <span className="font-medium text-fg">Data model: </span>
                {cs.build.dataModel}
              </p>
            </div>
          </Reveal>

          <Reveal as="section">
            <h2 className={eyebrow}>Screenshots</h2>
            {cs.images.length > 0 ? (
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {cs.images.map((img) => (
                  <CaseStudyImage key={img.src || img.caption} image={img} />
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-line-strong bg-surface-2 p-8 text-center text-sm text-muted">
                Screenshots coming soon.
              </div>
            )}
          </Reveal>

          <Reveal as="section">
            <h2 className={eyebrow}>The outcome</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{cs.outcome}</p>
          </Reveal>
        </div>
      </main>
    </div>
  )
}
