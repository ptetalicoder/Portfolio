import { experience } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 — Experience"
      title="Where I've done the work"
      lead="Consulting, product analytics, and data quality roles across retail brokerage, staffing, and IT services."
    >
      <ol className="relative">
        {/* Timeline rail */}
        <span
          className="absolute left-[7px] top-2 bottom-2 w-px bg-line sm:left-[7px]"
          aria-hidden
        />

        {experience.map((job, i) => (
          <li key={job.company} className="relative pl-8 pb-10 last:pb-0 sm:pl-10">
            <span
              className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-canvas"
              aria-hidden
            />
            <Reveal delay={i * 80}>
              <article className="rounded-2xl border border-line bg-surface p-6 transition hover:border-line-strong sm:p-7">
                <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {job.role}
                  </h3>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </header>

                <p className="mt-1 text-sm">
                  <span className="font-medium text-accent">{job.company}</span>
                  <span className="mx-2 text-line-strong">·</span>
                  <span className="text-muted">{job.location}</span>
                </p>

                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
