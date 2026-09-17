import type { Transition, Variants } from 'framer-motion'

/**
 * Framer Motion design tokens.
 * Springs are reserved for tactile interactions (buttons, drawers, palette,
 * pointer). Timed easing is used for entrances/reveals.
 */

/** Primary deceleration curve — precise, technical, soft settle. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const spring = {
  soft: { type: 'spring', stiffness: 260, damping: 30, mass: 0.6 },
  snappy: { type: 'spring', stiffness: 400, damping: 32, mass: 0.4 },
  pointer: { type: 'spring', stiffness: 200, damping: 18, mass: 0.4 },
} satisfies Record<string, Transition>

export const duration = {
  micro: 0.2,
  small: 0.4,
  medium: 0.6,
  large: 0.9,
} as const

/** Single element: subtle fade + upward settle. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: duration.medium, ease: easeOut } },
}

/** Parent that staggers its children into place. */
export const staggerContainer = (stagger = 0.08, delayChildren = 0.04): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: duration.small, ease: easeOut } },
}
