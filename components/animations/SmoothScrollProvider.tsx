'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/animations'

/**
 * Centralized smooth-scroll layer.
 *
 * Lenis drives a single GSAP ticker RAF loop and keeps ScrollTrigger in sync
 * with the smoothed scroll position (Lenis -> ticker -> ScrollTrigger.update).
 * Under prefers-reduced-motion it stays out of the way entirely so native
 * scrolling (with CSS scroll-padding) remains intact.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    registerGSAP()

    const lenis = new Lenis({
      duration: 1.05,
      // expo-out: fast response, soft settle — weighted but never sluggish.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    window.__lenis = lenis

    const onLenisScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onLenisScroll)

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Smoothly resolve in-page anchor clicks with a sticky-header offset,
    // while preserving normal history semantics.
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return
      const anchor = (e.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const target = href === '#top' ? null : document.querySelector<HTMLElement>(href)
      if (href !== '#top' && !target) return
      e.preventDefault()
      lenis.scrollTo(href === '#top' ? 0 : (target ?? 0), { offset: -80 })
      history.pushState(null, '', href)
    }
    document.addEventListener('click', onClick)

    // Recompute trigger positions once fonts / images have settled.
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', onLoad)
      lenis.off('scroll', onLenisScroll)
      gsap.ticker.remove(update)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])

  return <>{children}</>
}
