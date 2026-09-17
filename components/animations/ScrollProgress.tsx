'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * 1px scroll-position line pinned to the top of the viewport.
 * Quiet by design — communicates "where am I in the page?" without noise.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.3,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[65] h-px origin-left bg-accent/70"
    />
  )
}
