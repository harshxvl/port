'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { Project, ProjectStatus } from '@/lib/types'
import { easeOut, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

const statusStyles: Record<ProjectStatus, string> = {
  active: 'text-accent',
  shipped: 'text-foreground/80',
  prototype: 'text-muted-foreground',
  archived: 'text-subtle',
}

const arrow: Variants = {
  rest: { x: 0, y: 4, color: 'hsl(var(--muted-foreground))' },
  hover: { x: 2, y: 0, color: 'hsl(var(--accent))' },
}

export function ProjectCard({ project }: { project: Project }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial="rest"
      animate="rest"
      whileHover={reduced ? undefined : 'hover'}
      whileFocus={reduced ? undefined : 'hover'}
      className="border-t border-border"
    >
      <motion.div
        variants={reduced ? undefined : { rest: { y: 0 }, hover: { y: -4 } }}
        transition={spring.snappy}
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group flex h-full flex-col justify-between gap-6 py-8"
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

            <h3 className="mt-4 flex items-start gap-2 text-xl font-semibold tracking-tight">
              {project.title}
              <motion.span variants={reduced ? undefined : arrow} transition={{ duration: 0.2, ease: easeOut }}>
                <ArrowUpRight className="h-4 w-4 shrink-0" />
              </motion.span>
            </h3>

            <p className="mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {project.stack.map((tech) => (
              <li key={tech} className="font-mono text-xs text-subtle">
                {tech}
              </li>
            ))}
          </ul>
        </Link>
      </motion.div>
    </motion.div>
  )
}
