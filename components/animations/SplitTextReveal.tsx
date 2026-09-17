'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { easeOut } from '@/lib/motion'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface SplitTextRevealProps {
  text: string
  className?: string
  as?: Tag
  /** "mount" animates immediately (hero); "inView" waits for scroll. */
  trigger?: 'mount' | 'inView'
  delay?: number
  stagger?: number
  once?: boolean
}

/**
 * Word-by-word clip-mask reveal. Each word rides up from behind an
 * overflow-hidden edge, staggered. The visible text is exposed to assistive
 * tech via aria-label; the animated word spans are aria-hidden. Renders as
 * plain static text under reduced motion.
 */
export function SplitTextReveal({
  text,
  className,
  as = 'h2',
  trigger = 'inView',
  delay = 0,
  stagger = 0.07,
  once = true,
}: SplitTextRevealProps) {
  const reduced = useReducedMotion()
  const words = text.split(' ')

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{text}</Tag>
  }

  const MotionTag = motion[as] as typeof motion.h2

  const animateProps =
    trigger === 'mount'
      ? { initial: 'hidden' as const, animate: 'show' as const }
      : {
          initial: 'hidden' as const,
          whileInView: 'show' as const,
          viewport: { once, amount: 0.6 },
        }

  return (
    <MotionTag
      className={className}
      aria-label={text}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...animateProps}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em' }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: '115%' },
              show: { y: '0%', transition: { duration: 0.7, ease: easeOut } },
            }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
