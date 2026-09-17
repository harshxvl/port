import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ProjectCard } from './ProjectCard'
import { FeaturedProject } from './FeaturedProject'
import { portfolio } from '@/data/portfolioData'

export function ProjectGrid() {
  const { projects } = portfolio
  const [featured, ...rest] = projects

  return (
    <Section id="projects">
      <SectionHeader
        index="03"
        label="Build Log"
        title="Selected projects"
        description="Things I have built to learn a layer of the stack. Each one is a small, focused experiment rather than a product."
      />

      <div className="mt-10">
        {featured ? <FeaturedProject project={featured} /> : null}

        {rest.length ? (
          <div className="grid gap-x-12 border-b border-border md:grid-cols-2">
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  )
}
