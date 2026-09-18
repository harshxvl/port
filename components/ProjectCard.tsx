'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project, ProjectStatus } from '@/lib/types'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  active: 'text-accent',
  shipped: 'text-foreground/80',
  prototype: 'text-muted-foreground',
  archived: 'text-subtle',
}

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      whileHover={reduced ? undefined : { y: -3 }}
      transition={spring.snappy}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col justify-between gap-6 border-t border-border py-8 transition-colors hover:border-border-strong"
      >
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="label-mono">{project.year}</span>
            <span
              className={cn(
                'label-mono flex items-center gap-1.5',
                statusStyles[project.status],
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
              {project.status}
            </span>
          </div>

          <h3 className="mt-4 flex items-start gap-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
            {project.title}
            <ArrowUpRight className="h-4 w-4 shrink-0 translate-y-1 text-muted-foreground transition-all duration-200 group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:text-accent" />
          </h3>

          <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
            {project.summary}
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {project.stack.map((tech) => (
            <li key={tech} className="font-mono text-xs text-subtle transition-colors group-hover:text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>
      </Link>
    </motion.div>
  )
}
