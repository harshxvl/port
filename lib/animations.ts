import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * GSAP timing + easing tokens and one-time plugin registration.
 * GSAP is used only for genuinely scroll-linked / timeline work
 * (terminal boot, timeline line-draw, featured-project parallax).
 */

export const GSAP_DURATION = {
  micro: 0.2,
  small: 0.4,
  medium: 0.65,
  large: 1.0,
} as const

export const GSAP_EASE = {
  out: 'power3.out',
  inOut: 'power2.inOut',
  expo: 'expo.out',
} as const

let registered = false

/** Register ScrollTrigger exactly once, on the client. */
export function registerGSAP() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

/** True when the user has asked for reduced motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export { gsap, ScrollTrigger }
