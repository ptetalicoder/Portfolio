import { profile } from '../data/resume.js'
import Reveal from './Reveal.jsx'
import Section from './Section.jsx'
import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from './Icons.jsx'

export default function Contact() {
  const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumeFile}`

  const channels = [
    {
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: MailIcon,
    },
    {
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^0-9+]/g, '')}`,
      Icon: PhoneIcon,
    },
    {
      label: 'LinkedIn',
      value: '/in/pranavtetali',
      href: profile.linkedin,
      Icon: LinkedInIcon,
      external: true,
    },
    {
      label: 'GitHub',
      value: '@ptetalicoder',
      href: profile.github,
      Icon: GitHubIcon,
      external: true,
    },
  ]

  return (
    <Section
      id="contact"
      eyebrow="06 — Contact"
      title="Let's talk data"
      lead="I'm looking for data analyst and business intelligence roles starting May 2026. The fastest way to reach me is email."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {channels.map(({ label, value, href, Icon, external }, i) => (
          <Reveal key={label} delay={i * 70}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition hover:border-accent"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-accent transition group-hover:bg-accent group-hover:text-accent-fg">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {label}
                </span>
                <span className="block truncate text-sm font-medium">{value}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface-2 p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Prefer the one-page version?
            </h3>
            <p className="mt-1 text-sm text-muted">
              Full resume as a PDF, kept in sync with this site.
            </p>
          </div>
          <a
            href={resumeUrl}
            download
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-fg transition hover:opacity-90"
          >
            <DownloadIcon className="h-4 w-4" />
            Download resume
          </a>
        </div>
      </Reveal>
    </Section>
  )
}
