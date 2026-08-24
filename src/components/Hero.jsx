import { profile, stats } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  PinIcon,
} from './Icons.jsx'

export default function Hero() {
  const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Backdrop: faint grid plus two soft color washes. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-backdrop absolute inset-0 opacity-70" />
        <div
          className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'var(--glow-a)' }}
        />
        <div
          className="absolute -top-16 right-0 h-[24rem] w-[24rem] rounded-full blur-3xl"
          style={{ background: 'var(--glow-b)' }}
        />
      </div>

      <div className="mx-auto w-full max-w-5xl px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Open to data analyst &amp; BI roles — May 2026
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-5 text-xl font-medium sm:text-2xl">
            {profile.title}
            <span className="mx-2.5 text-line-strong">/</span>
            <span className="text-accent">{profile.subtitle}</span>
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.summary}
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition hover:opacity-90"
            >
              View my work
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-semibold transition hover:border-accent hover:text-accent"
            >
              <DownloadIcon className="h-4 w-4" />
              Download resume
            </a>
            <div className="flex items-center gap-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted transition hover:border-accent hover:text-accent"
              >
                <LinkedInIcon className="h-4.5 w-4.5" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-muted transition hover:border-accent hover:text-accent"
              >
                <GitHubIcon className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted">
            <PinIcon className="h-4 w-4" />
            {profile.location}
          </p>
        </Reveal>

        <Reveal delay={380}>
          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-surface px-5 py-6">
                <dt className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1.5 text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
