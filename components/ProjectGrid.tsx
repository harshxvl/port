import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ProjectCard } from './ProjectCard'
import { ScrollReveal, Stagger, StaggerItem } from './animations/ScrollReveal'
import { portfolio } from '@/data/portfolioData'

export function ProjectGrid() {
  const { projects } = portfolio

  return (
    <Section id="projects">
      <ScrollReveal>
        <SectionHeader
          index="03"
          label="Build Log"
          title="Selected projects"
          description="Things I have built to learn a layer of the stack. Each one is a small, focused experiment rather than a product."
        />
      </ScrollReveal>

      <Stagger className="mt-10 grid gap-x-12 md:grid-cols-2" amount={0.15}>
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
