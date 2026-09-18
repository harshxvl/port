'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, registerGSAP, prefersReducedMotion } from '@/lib/animations'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { portfolio } from '@/data/portfolioData'

export function Timeline() {
  const { experience, education } = portfolio
  const root = useRef<HTMLDivElement>(null)

  // As each column enters view, the connector line draws down, nodes pop in
  // and entries reveal in sequence.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      registerGSAP()
      const cols = gsap.utils.toArray<HTMLElement>('[data-timeline-col]', root.current)
      cols.forEach((col) => {
        const start = 'top 82%'
        const line = col.querySelector('[data-timeline-line]')
        if (line) {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: 'top',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: col, start },
          })
        }
        gsap.from(col.querySelectorAll('[data-timeline-node]'), {
          scale: 0,
          duration: 0.4,
          ease: 'back.out(2)',
          stagger: 0.14,
          scrollTrigger: { trigger: col, start },
        })
        gsap.from(col.querySelectorAll('[data-timeline-entry]'), {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.14,
          scrollTrigger: { trigger: col, start },
        })
      })
    },
    { scope: root },
  )

  return (
    <Section id="experience">
      <SectionHeader
        index="04"
        label="Track Record"
        title="Experience & education"
        description="Early, but intentional. A record of where I have been building and studying."
      />

      <div ref={root} className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-timeline-col>
          <h3 className="label-mono mb-6">Experience</h3>
          <ol className="relative space-y-8">
            <span
              data-timeline-line
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-[calc(100%-0.375rem)] w-px bg-border"
            />
            {experience.map((entry) => (
              <li key={entry.id} className="relative pl-6" data-timeline-entry>
                <span
                  data-timeline-node
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

        <div data-timeline-col>
          <h3 className="label-mono mb-6">Education</h3>
          <ol className="relative space-y-8">
            <span
              data-timeline-line
              aria-hidden="true"
              className="absolute left-0 top-1.5 h-[calc(100%-0.375rem)] w-px bg-border"
            />
            {education.map((entry) => (
              <li key={entry.id} className="relative pl-6" data-timeline-entry>
                <span
                  data-timeline-node
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
