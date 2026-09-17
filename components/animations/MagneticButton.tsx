'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  /** Maximum pointer-follow travel in px. */
  strength?: number
}

/**
 * Decorative wrapper that nudges its child toward the pointer with spring
 * physics. The child stays the real interactive element (button/link), so
 * semantics and focus behavior are untouched. Disabled on touch and under
 * reduced motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 8,
}: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, spring.pointer)
  const sy = useSpring(y, spring.pointer)
  const reduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(!reduced && window.matchMedia('(pointer: fine)').matches)
  }, [reduced])

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const clamp = (v: number) => Math.max(-strength, Math.min(strength, v))
    x.set(clamp(dx * 0.4))
    y.set(clamp(dy * 0.4))
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      className={cn('inline-flex', className)}
      style={enabled ? { x: sx, y: sy } : undefined}
      onMouseMove={enabled ? handleMove : undefined}
      onMouseLeave={enabled ? reset : undefined}
    >
      {children}
    </motion.span>
  )
}
