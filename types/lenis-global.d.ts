import type Lenis from 'lenis'

declare global {
  interface Window {
    /** Shared Lenis instance, set by SmoothScrollProvider. */
    __lenis?: Lenis
  }
}

export {}
