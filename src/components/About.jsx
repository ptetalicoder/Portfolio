import { interests, profile } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'

const focus = [
  {
    title: 'Data quality first',
    body: 'Audits, validation rules, and reconciliation across source systems — because a dashboard is only as trustworthy as the rows behind it.',
  },
  {
    title: 'Pipelines that hold up',
    body: 'Python and Alteryx ETL that turns messy PDFs, exports, and legacy tables into clean star schemas ready for modeling.',
  },
  {
    title: 'Decisions, not just charts',
    body: 'Power BI and Tableau built around the question a stakeholder is actually trying to answer, with the measures to back it.',
  },
]

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="01 — About"
      title="Turning messy data into decisions people act on"
      lead={profile.summary}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {focus.map((f, i) => (
          <Reveal key={f.title} delay={i * 90}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 transition hover:border-line-strong">
              <span className="font-mono text-xs text-accent">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-6">
          <h3 className="text-sm font-semibold">Outside of work</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {interests.map((item) => (
              <li
                key={item}
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}
