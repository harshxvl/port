import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { portfolio } from '@/data/portfolioData'

export function Timeline() {
  const { experience, education } = portfolio

  return (
    <Section id="experience">
      <SectionHeader
        index="04"
        label="Track Record"
        title="Experience & education"
        description="Early, but intentional. A record of where I have been building and studying."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="label-mono mb-6">Experience</h3>
          <ol className="space-y-8">
            {experience.map((entry) => (
              <li
                key={entry.id}
                className="relative border-l border-border pl-6"
              >
                <span
                  className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="label-mono text-subtle">{entry.period}</p>
                <h4 className="mt-1.5 text-base font-semibold">
                  {entry.role}
                  <span className="font-normal text-muted-foreground">
                    {' · '}
                    {entry.organization}
                  </span>
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {entry.summary}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {entry.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-foreground/80"
                    >
                      <span className="mt-2 h-px w-3 shrink-0 bg-border-strong" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="label-mono mb-6">Education</h3>
          <ol className="space-y-8">
            {education.map((entry) => (
              <li
                key={entry.id}
                className="relative border-l border-border pl-6"
              >
                <span
                  className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <p className="label-mono text-subtle">{entry.period}</p>
                <h4 className="mt-1.5 text-base font-semibold">
                  {entry.institution}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {entry.credential}
                </p>
                <p className="mt-1 text-sm text-foreground/70">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
