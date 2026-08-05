import Reveal from './Reveal.jsx'

/** Section shell: consistent width, heading treatment, and eyebrow numbering. */
export default function Section({ id, eyebrow, title, lead, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {lead && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{lead}</p>
          )}
          <div className="mt-8 h-px w-full bg-line" />
        </Reveal>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
