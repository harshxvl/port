'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

interface ParallaxElementProps {
  children: React.ReactNode
  className?: string
  /** Total vertical travel across the viewport pass, in px. Keep small. */
  distance?: number
  disabledOnMobile?: boolean
}

/**
 * Very small scroll-linked vertical offset. Transform-only, clamped, and
 * disabled on mobile / reduced motion. Never used on essential text.
 */
export function ParallaxElement({
  children,
  className,
  distance = 24,
  disabledOnMobile = true,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 768px)').matches
    setEnabled(!reduced && !(disabledOnMobile && mobile))
  }, [reduced, disabledOnMobile])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <div ref={ref} className={className}>
      <motion.div style={enabled ? { y } : undefined} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
