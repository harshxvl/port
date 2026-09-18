import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ScrollReveal, Stagger, StaggerItem } from './animations/ScrollReveal'
import { portfolio } from '@/data/portfolioData'

export function About() {
  const { profile } = portfolio

  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-16">
        <ScrollReveal>
          <SectionHeader index="01" label="About" title="Notes on how I work" />
        </ScrollReveal>

        <Stagger className="max-w-2xl space-y-6">
          {profile.bio.map((paragraph, i) => (
            <StaggerItem
              as="p"
              key={i}
              className="text-pretty text-lg leading-relaxed text-foreground/90"
            >
              {paragraph}
            </StaggerItem>
          ))}

          <StaggerItem
            as="dl"
            className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-3"
          >
            <div>
              <dt className="label-mono">Based in</dt>
              <dd className="mt-1 text-sm">{profile.location}</dd>
            </div>
            <div>
              <dt className="label-mono">Studying</dt>
              <dd className="mt-1 text-sm">BCA · {profile.year}</dd>
            </div>
            <div>
              <dt className="label-mono">Status</dt>
              <dd className="mt-1 text-sm text-accent">Available</dd>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </Section>
  )
}
