'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Minimal editorial cursor companion (desktop, fine-pointer only).
 * A small accent dot that expands over interactive elements and can show a
 * short label (via data-cursor). Position is driven by motion values + a
 * spring — it never triggers React re-renders on mouse move. The native
 * cursor is intentionally left visible.
 */
export function CursorFollower() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 })
  const reduced = useReducedMotion()

  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState<{ active: boolean; label?: string }>({
    active: false,
  })

  useEffect(() => {
    setEnabled(!reduced && window.matchMedia('(pointer: fine)').matches)
  }, [reduced])

  useEffect(() => {
    if (!enabled) return

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [data-cursor], input, textarea',
      ) as HTMLElement | null
      if (el) {
        setState({ active: true, label: el.getAttribute('data-cursor') ?? undefined })
      } else {
        setState({ active: false })
      }
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = state.label ? 52 : state.active ? 20 : 9

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-accent/10 font-mono text-[0.55rem] uppercase tracking-widest text-accent backdrop-blur-[1px]"
        animate={{ width: size, height: size }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {state.label ?? ''}
      </motion.div>
    </motion.div>
  )
}
