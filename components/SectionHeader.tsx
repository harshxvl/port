'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { easeOut } from '@/lib/motion'
import { SplitTextReveal } from './animations/SplitTextReveal'

interface SectionHeaderProps {
  /** Section number, e.g. "01". */
  index: string
  /** Small monospace label, e.g. "CURRENT FOCUS". */
  label: string
  /** Human-readable heading. */
  title: string
  /** Optional supporting line rendered under the title. */
  description?: string
  className?: string
}

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

/**
 * Editorial section header: tiny numbered/labelled metadata row above a
 * strong title. The metadata row fades up, the hairline draws itself in and
 * the title reveals word by word as the header scrolls into view. Renders
 * statically under reduced motion.
 */
export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <header className={cn('max-w-2xl', className)}>
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">{index}</span>
          <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
          <span className="label-mono">{label}</span>
        </div>
        <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>
    )
  }

  return (
    <motion.header
      className={cn('max-w-2xl', className)}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      <div className="flex items-center gap-3">
        <motion.span variants={fadeUp} className="label-mono text-accent">
          {index}
        </motion.span>
        <motion.span
          className="h-px w-6 origin-left bg-border-strong"
          aria-hidden="true"
          variants={{
            hidden: { scaleX: 0 },
            show: { scaleX: 1, transition: { duration: 0.5, ease: easeOut } },
          }}
        />
        <motion.span variants={fadeUp} className="label-mono">
          {label}
        </motion.span>
      </div>
      <SplitTextReveal
        as="h2"
        text={title}
        trigger="inView"
        stagger={0.05}
        className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl"
      />
      {description ? (
        <motion.p
          variants={fadeUp}
          className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.header>
  )
}
