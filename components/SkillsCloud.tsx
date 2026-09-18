import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ScrollReveal, Stagger, StaggerItem } from './animations/ScrollReveal'
import { portfolio } from '@/data/portfolioData'
import type { SkillLevel } from '@/lib/types'
import { cn } from '@/lib/utils'

const levelStyles: Record<SkillLevel, string> = {
  focus: 'border-accent/50 text-accent',
  proficient: 'border-border-strong text-foreground',
  working: 'border-border text-foreground/80',
  exploring: 'border-border text-muted-foreground',
}

export function SkillsCloud() {
  const { skills } = portfolio

  return (
    <Section id="skills">
      <ScrollReveal>
        <SectionHeader
          index="02"
          label="Current Focus"
          title="Tools & disciplines"
          description="A working map of what I use and where my attention is right now — grouped by layer rather than by logo wall."
        />
      </ScrollReveal>

      <Stagger className="mt-12 space-y-px overflow-hidden rounded-lg border border-border">
        {skills.map((group) => (
          <StaggerItem
            key={group.id}
            className="grid gap-4 bg-surface/40 p-6 transition-colors hover:bg-surface/70 md:grid-cols-[minmax(0,12rem)_1fr] md:items-baseline md:gap-8"
          >
            <div className="flex items-center gap-3">
              <span className="label-mono text-foreground/70">{group.label}</span>
            </div>
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border bg-background/40 px-3 py-1.5 font-mono text-sm transition-[transform,border-color,color] duration-200 hover:-translate-y-0.5 hover:border-accent/50',
                    levelStyles[skill.level],
                  )}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </StaggerItem>
        ))}
      </Stagger>

      <p className="mt-4 label-mono">
        legend · <span className="text-accent">focus</span> — actively deep ·
        proficient · working · exploring
      </p>
    </Section>
  )
}
