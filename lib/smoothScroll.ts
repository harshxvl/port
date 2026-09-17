'use client'

import { useEffect } from 'react'
import type Lenis from 'lenis'

/** Height of the sticky header — anchors land just below it. */
export const SCROLL_OFFSET = -80

export function getLenis(): Lenis | null {
  if (typeof window === 'undefined') return null
  return window.__lenis ?? null
}

/**
 * Scroll to an in-page target. Uses Lenis when smooth scrolling is active,
 * and falls back to native smooth scroll (or instant) otherwise so navigation
 * always works even if the animation layer failed to initialize.
 */
export function smoothScrollTo(hash: string, offset = SCROLL_OFFSET) {
  if (typeof window === 'undefined') return
  const lenis = getLenis()
  const target = hash === '#top' ? null : document.querySelector<HTMLElement>(hash)

  if (lenis) {
    lenis.scrollTo(hash === '#top' ? 0 : (target ?? 0), { offset })
    return
  }
  if (hash === '#top' || !target) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  target.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Lock page scrolling while a modal/drawer is open, then restore it.
 * Pauses Lenis and sets body overflow so both the smooth and native paths
 * are covered.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const lenis = getLenis()
    const previous = document.body.style.overflow
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
      lenis?.start()
    }
  }, [active])
}
