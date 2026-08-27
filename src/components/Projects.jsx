import { useState } from 'react'
import { projects } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { ExternalIcon } from './Icons.jsx'

// Phone screenshots are tall and portrait — fix the height, let width follow
// the natural aspect ratio, and lay several out as a horizontally scrolling
// strip so nothing blows out the card.
function ProjectMedia({ item }) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${item.src}`

  if (failed) {
    return (
      <div className="flex h-64 w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-surface-2 p-3 text-center">
        <span className="text-xs font-medium text-muted">Preview coming soon</span>
        <span className="text-[11px] leading-snug text-muted/80">{item.caption}</span>
      </div>
    )
  }

  if (item.type === 'video') {
    // Long-form (not a quick loop): a real video with controls, not a
    // silent autoplay background clip.
    return (
      <video
        src={src}
        className="h-64 w-auto shrink-0 rounded-xl border border-line bg-surface-2 object-contain"
        playsInline
        controls
        preload="metadata"
        aria-label={item.caption}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <img
      src={src}
      alt={item.caption}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-64 w-auto shrink-0 rounded-xl border border-line bg-surface-2 object-contain"
    />
  )
}

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 — Projects"
      title="Selected projects"
      lead="A mix of graduate coursework and self-directed builds where I owned the data model, the pipeline, and what ships to a user."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => {
          // The first link is the card's primary destination; the title
          // stretches an overlay across the card so the whole thing is
          // clickable. Cards without links stay static.
          const primary = p.links?.[0]

          return (
            <Reveal key={p.name} delay={i * 100}>
              <article
                className={`group relative flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition duration-300 sm:p-7 ${
                  primary
                    ? 'hover:-translate-y-0.5 hover:border-accent hover:shadow-xl hover:shadow-black/5'
                    : 'hover:border-line-strong'
                }`}
              >
                <header>
                  <p className="font-mono text-xs text-muted">{p.period}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                    {primary ? (
                      <a
                        href={primary.href}
                        target="_blank"
                        rel="noreferrer"
                        className="transition after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-accent"
                      >
                        {p.name}
                        <ExternalIcon className="ml-1.5 inline h-4 w-4 -translate-y-0.5 opacity-0 transition group-hover:opacity-100" />
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                </header>

                <p className="mt-3 text-sm leading-relaxed text-muted">{p.blurb}</p>

                {p.media?.length > 0 && (
                  <div className="relative z-10 mt-5 flex gap-4 overflow-x-auto pb-1">
                    {p.media.map((m) => (
                      <ProjectMedia key={m.src} item={m} />
                    ))}
                  </div>
                )}

                <ul className="mt-5 space-y-3">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {p.links?.length > 0 && (
                  // z-10 keeps these above the title's stretched overlay so
                  // secondary links stay independently clickable.
                  <div className="relative z-10 mt-auto flex flex-wrap gap-4 border-t border-line pt-5">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        {l.label}
                        <ExternalIcon className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
