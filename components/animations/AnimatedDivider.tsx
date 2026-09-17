'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface AnimatedDividerProps {
  className?: string
  vertical?: boolean
  duration?: number
  delay?: number
}

/**
 * Hairline that draws itself in (scaleX / scaleY from 0) when it enters view.
 * Static under reduced motion.
 */
export function AnimatedDivider({
  className,
  vertical = false,
  duration = 0.7,
  delay = 0,
}: AnimatedDividerProps) {
  const reduced = useReducedMotion()
  const base = cn('block bg-border-strong', vertical ? 'w-px' : 'h-px', className)

  if (reduced) return <span aria-hidden="true" className={base} />

  return (
    <motion.span
      aria-hidden="true"
      className={base}
      style={{ transformOrigin: vertical ? 'top' : 'left' }}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration, ease: easeOut, delay }}
    />
  )
}
