import { projects } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import { ExternalIcon } from './Icons.jsx'

export default function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="03 — Projects"
      title="Selected projects"
      lead="Graduate work where I owned the data model, the pipeline, and the dashboard end to end."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 100}>
            <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition hover:border-accent sm:p-7">
              <header>
                <p className="font-mono text-xs text-muted">{p.period}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                  {p.name}
                </h3>
              </header>

              <p className="mt-3 text-sm leading-relaxed text-muted">{p.blurb}</p>

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
                <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
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
        ))}
      </div>
    </Section>
  )
}
