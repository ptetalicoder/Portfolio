import { education } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Education() {
  return (
    <Section id="education" eyebrow="05 — Education" title="Education">
      <div className="grid gap-4">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={i * 90}>
            <article className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
              <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-tight">{e.school}</h3>
                <p className="font-mono text-xs text-muted">{e.period}</p>
              </header>
              <p className="mt-1.5 text-sm text-accent">{e.degree}</p>
              <p className="mt-0.5 text-sm text-muted">{e.location}</p>
              {e.note && (
                <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                  {e.note}
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
