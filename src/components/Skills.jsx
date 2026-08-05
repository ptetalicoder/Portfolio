import { certifications, skillGroups } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="04 — Skills"
      title="Tools I reach for"
      lead="The stack I use to go from raw source systems to a dashboard an executive can read in thirty seconds."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.name} delay={i * 70}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {group.name}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm transition hover:border-accent hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140}>
        <div className="mt-4 rounded-2xl border border-line bg-surface p-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Certifications
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {certifications.map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-sm text-muted">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
