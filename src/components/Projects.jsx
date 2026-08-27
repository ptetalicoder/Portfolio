import { useEffect, useState } from 'react'
import { projects } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { ArrowIcon, CloseIcon, ExternalIcon } from './Icons.jsx'

// Phone screenshots are tall and portrait — fix the height, let width follow
// the natural aspect ratio, and lay several out as a horizontally scrolling
// strip so nothing blows out the card. Images open larger in a lightbox,
// with arrows to step through the rest of the project's images; video
// already has its own controls, so it isn't clickable-to-enlarge.
function ProjectMedia({ item, onOpen }) {
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${item.src}`

  if (failed) {
    return (
      <div className="flex h-96 w-52 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-surface-2 p-3 text-center">
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
        className="h-96 w-auto shrink-0 rounded-xl border border-line bg-surface-2 object-contain"
        playsInline
        controls
        preload="metadata"
        aria-label={item.caption}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${item.caption}`}
      className="group/media shrink-0 cursor-zoom-in"
    >
      <img
        src={src}
        alt={item.caption}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-96 w-auto rounded-xl border border-line bg-surface-2 object-contain transition group-hover/media:border-accent"
      />
    </button>
  )
}

function MediaLightbox({ items, index, onNext, onPrev, onClose }) {
  const item = items[index]
  const hasMultiple = items.length > 1
  const src = `${import.meta.env.BASE_URL}${item.src}`

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (hasMultiple && e.key === 'ArrowRight') onNext()
      if (hasMultiple && e.key === 'ArrowLeft') onPrev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onNext, onPrev, hasMultiple])

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex max-h-full w-full max-w-3xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.caption}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 z-10 grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface text-muted shadow-lg transition hover:border-accent hover:text-accent"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        {hasMultiple && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-fg shadow-lg transition hover:border-accent hover:text-accent"
          >
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
        )}

        <img
          src={src}
          alt={item.caption}
          className="max-h-[80vh] max-w-full rounded-2xl border border-line object-contain"
        />

        {hasMultiple && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-fg shadow-lg transition hover:border-accent hover:text-accent"
          >
            <ArrowIcon className="h-5 w-5" />
          </button>
        )}

        <p className="mt-3 text-sm text-muted">{item.caption}</p>
        {hasMultiple && (
          <p className="mt-1 font-mono text-xs text-muted">
            {index + 1} / {items.length}
          </p>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
  // { items, index } for the currently open lightbox, or null when closed.
  // items is just the image entries from one project's media (video excluded,
  // since it isn't clickable-to-enlarge) so arrows step through siblings only.
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <Section
        id="projects"
        eyebrow="03 — Projects"
        title="Selected projects"
        lead="A mix of graduate coursework and self-directed builds where I owned the data model, the pipeline, and what ships to a user."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((p, i) => {
            // A case study takes priority as the card's primary destination;
            // otherwise the first link does. The title stretches an overlay
            // across the card so the whole thing is clickable. Cards with
            // neither stay static.
            const caseHref = p.caseStudy ? `#/case/${p.caseStudy.slug}` : null
            const primary = caseHref ? { href: caseHref, external: false } : p.links?.[0]
            const imageItems = p.media?.filter((m) => m.type !== 'video') ?? []

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
                          {...(primary.external === false ? {} : { target: '_blank', rel: 'noreferrer' })}
                          className="transition after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:text-accent"
                        >
                          {p.name}
                          {primary.external !== false && (
                            <ExternalIcon className="ml-1.5 inline h-4 w-4 -translate-y-0.5 opacity-0 transition group-hover:opacity-100" />
                          )}
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
                        <ProjectMedia
                          key={m.src}
                          item={m}
                          onOpen={() => setLightbox({ items: imageItems, index: imageItems.indexOf(m) })}
                        />
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

      {lightbox && (
        <MediaLightbox
          items={lightbox.items}
          index={lightbox.index}
          onNext={() => setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lb.items.length }))}
          onPrev={() => setLightbox((lb) => ({ ...lb, index: (lb.index - 1 + lb.items.length) % lb.items.length }))}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
