import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ProjectCard } from './ProjectCard'
import { portfolio } from '@/data/portfolioData'

export function ProjectGrid() {
  const { projects } = portfolio

  return (
    <Section id="projects">
      <SectionHeader
        index="03"
        label="Build Log"
        title="Selected projects"
        description="Things I have built to learn a layer of the stack. Each one is a small, focused experiment rather than a product."
      />

      <div className="mt-10 grid gap-x-12 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Section>
  )
}
