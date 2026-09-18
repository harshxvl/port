import { ArrowUpRight, GitBranch } from 'lucide-react'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ScrollReveal, Stagger, StaggerItem } from './animations/ScrollReveal'
import { portfolio } from '@/data/portfolioData'

export function OpenSource() {
  const { openSource } = portfolio

  return (
    <Section id="open-source">
      <ScrollReveal>
        <SectionHeader
          index="05"
          label="Open Source"
          title="Public repositories"
          description="Code I keep in the open — mostly small tools and learning experiments."
        />
      </ScrollReveal>

      <Stagger
        as="ul"
        className="mt-10 divide-y divide-border overflow-hidden rounded-lg border border-border"
      >
        {openSource.map((repo) => (
          <StaggerItem as="li" key={repo.name}>
            <a
              href={repo.href}
              className="group flex items-center justify-between gap-4 bg-surface/40 px-6 py-5 transition-colors hover:bg-surface"
              target={repo.href.startsWith('http') ? '_blank' : undefined}
              rel={repo.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-3.5 w-3.5 text-subtle" aria-hidden="true" />
                  <span className="font-mono text-sm font-medium text-foreground">
                    {repo.name}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-sm text-muted-foreground">
                  {repo.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="label-mono hidden sm:inline">{repo.language}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
