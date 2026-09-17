import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { portfolio } from '@/data/portfolioData'
import { TerminalWidget, type TerminalLine } from './TerminalWidget'

const terminalLines: TerminalLine[] = [
  { type: 'comment', text: 'current focus' },
  { type: 'input', text: 'whoami' },
  { type: 'output', text: 'python · systems · ai/ml' },
  { type: 'input', text: 'cat focus.txt' },
  { type: 'output', text: 'low-level tooling, audio/voice, low-latency apis' },
  { type: 'input', text: '' },
]

export function Hero() {
  const { profile } = portfolio

  return (
    <div
      id="top"
      className="relative overflow-hidden border-b border-border pt-16"
    >
      {/* Restrained grid texture, faded near the top only. */}
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-[0.4]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12">
          {/* Left — editorial intro */}
          <div className="animate-reveal">
            <div className="flex items-center gap-3">
              <span className="label-mono text-accent">00</span>
              <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
              <span className="label-mono">{profile.location}</span>
            </div>

            <h1 className="mt-6 text-pretty text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 font-mono text-sm text-accent md:text-base">
              {profile.role}
            </p>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="label-mono">Institution</dt>
                <dd className="mt-1 text-sm text-foreground/90">
                  {profile.institution}
                </dd>
              </div>
              <div>
                <dt className="label-mono">Program</dt>
                <dd className="mt-1 text-sm text-foreground/90">
                  {profile.degree} · {profile.year}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
              >
                Get in touch
              </a>
            </div>
          </div>

          {/* Right — terminal instrumentation */}
          <div className="animate-reveal lg:pl-4" style={{ animationDelay: '80ms' }}>
            <TerminalWidget lines={terminalLines} />
          </div>
        </div>

        <a
          href="#about"
          className="mt-16 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="label-mono">Scroll</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}
