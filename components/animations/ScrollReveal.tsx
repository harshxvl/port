'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Tag = 'div' | 'section' | 'li' | 'span' | 'ul' | 'p'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  as?: Tag
  delay?: number
  duration?: number
  /** Upward travel distance in px. */
  distance?: number
  once?: boolean
  /** Portion of the element that must be visible to trigger. */
  amount?: number
}

/**
 * Single-element scroll reveal (fade + subtle upward settle).
 * IntersectionObserver-based (via Framer whileInView) so it works regardless
 * of the smooth-scroll layer and cleans itself up automatically.
 * Renders statically under reduced motion.
 */
export function ScrollReveal({
  children,
  className,
  as = 'div',
  delay = 0,
  duration = 0.6,
  distance = 14,
  once = true,
  amount = 0.3,
}: ScrollRevealProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: easeOut, delay }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: React.ReactNode
  className?: string
  as?: Tag
  stagger?: number
  delayChildren?: number
  once?: boolean
  amount?: number
}

/** Parent that reveals its <StaggerItem> children in sequence. */
export function Stagger({
  children,
  className,
  as = 'div',
  stagger = 0.08,
  delayChildren = 0.04,
  once = true,
  amount = 0.25,
}: StaggerProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerItemProps {
  children: React.ReactNode
  className?: string
  as?: Tag
  distance?: number
}

export function StaggerItem({
  children,
  className,
  as = 'div',
  distance = 12,
}: StaggerItemProps) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: distance },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
      }}
    >
      {children}
    </MotionTag>
  )
}
