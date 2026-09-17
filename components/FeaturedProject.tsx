'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, registerGSAP, prefersReducedMotion } from '@/lib/animations'
import type { Project, ProjectStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  active: 'text-accent',
  shipped: 'text-foreground/80',
  prototype: 'text-muted-foreground',
  archived: 'text-subtle',
}

/**
 * Hero project. As it scrolls into view, the visual panel un-clips and settles
 * to full scale (GSAP + ScrollTrigger, scrubbed), while the text column rises
 * in. Everything is transform/clip only and disabled under reduced motion.
 */
export function FeaturedProject({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      registerGSAP()
      if (prefersReducedMotion() || !ScrollTrigger) return

      gsap.fromTo(
        '.fp-visual',
        { clipPath: 'inset(12% 6% 12% 6% round 12px)', scale: 0.94 },
        {
          clipPath: 'inset(0% 0% 0% 0% round 12px)',
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 82%',
            end: 'top 32%',
            scrub: true,
          },
        },
      )

      gsap.from('.fp-text > *', {
        y: 22,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: { trigger: ref.current, start: 'top 78%' },
      })

      gsap.to('.fp-cursor', {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: 'steps(1)',
      })
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className="grid gap-10 border-t border-border py-10 lg:grid-cols-2 lg:items-center lg:gap-14"
    >
      <div className="fp-text order-2 lg:order-1">
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">Featured</span>
          <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
          <span
            className={cn('label-mono flex items-center gap-1.5', statusStyles[project.status])}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
            {project.status}
          </span>
        </div>

        <h3 className="mt-5 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
          {project.title}
        </h3>

        <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.highlights?.length ? (
          <ul className="mt-6 space-y-2.5">
            {project.highlights.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-foreground/85">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((tech) => (
            <li key={tech} className="font-mono text-xs text-subtle">
              {tech}
            </li>
          ))}
        </ul>

        <Link
          href={`/projects/${project.slug}`}
          data-cursor="open"
          className="group mt-8 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-border-strong"
        >
          View case study
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </Link>
      </div>

      {/* Visual — code motif tied to the project, no fabricated screenshot. */}
      <div className="order-1 lg:order-2">
        <div className="fp-visual overflow-hidden rounded-xl border border-border bg-surface">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
            </span>
            <span className="ml-2 truncate font-mono text-xs text-subtle">
              {project.slug}.py
            </span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-muted-foreground">
            <code>
              <span className="text-subtle">{'# '}{project.summary}</span>
              {'\n'}
              <span className="text-accent">async def</span>{' '}
              <span className="text-foreground">main</span>():{'\n'}
              {'    '}pipeline = <span className="text-foreground">Assistant</span>({'\n'}
              {project.stack.map((tech, i) => (
                <span key={tech}>
                  {'        '}
                  <span className="text-foreground/80">{tech.toLowerCase().replace(/[^a-z0-9]/g, '_')}</span>
                  =<span className="text-accent">True</span>
                  {i < project.stack.length - 1 ? ',' : ''}
                  {'\n'}
                </span>
              ))}
              {'    '}){'\n'}
              {'    '}<span className="text-accent">await</span> pipeline.run()
              <span className="fp-cursor ml-1 inline-block h-[1em] w-[0.5em] translate-y-[0.15em] bg-accent align-middle" />
            </code>
          </pre>
        </div>
      </div>
    </div>
  )
}
