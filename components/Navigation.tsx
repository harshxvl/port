'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { portfolio } from '@/data/portfolioData'
import { easeOut } from '@/lib/motion'
import { useScrollLock } from '@/lib/smoothScroll'
import { StatusIndicator } from './StatusIndicator'

export function Navigation() {
  const { profile, nav } = portfolio
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>(nav[0]?.id ?? '')
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Stronger background after a small scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section indicator via IntersectionObserver.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [nav])

  // Lock scroll (+ pause Lenis) while the drawer is open.
  useScrollLock(open)

  // Escape-to-close + focus the close button when the drawer opens.
  useEffect(() => {
    if (!open) return
    closeButtonRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const handleNavClick = useCallback(() => setOpen(false), [])

  return (
    <motion.header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOut }}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-6 md:px-8"
      >
        {/* Left — monogram / name */}
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label={`${profile.name} — home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded border border-border-strong bg-surface font-mono text-sm font-semibold text-accent transition-colors group-hover:border-accent">
            {profile.monogram}
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:inline">
            {profile.name}
          </span>
        </a>

        {/* Center — section links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className={cn(
                  'relative rounded px-3 py-2 text-sm transition-colors',
                  active === item.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    aria-hidden="true"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
              </a>
            </li>
          ))}
        </ul>

        {/* Right — status + mobile trigger */}
        <div className="flex items-center gap-3">
          <StatusIndicator label={profile.availability} className="hidden md:inline-flex" />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-foreground transition-colors hover:border-border-strong lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="absolute right-0 top-0 flex h-full w-[min(20rem,85vw)] flex-col border-l border-border bg-surface"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-6">
                <span className="label-mono">Navigation</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="inline-flex h-9 w-9 items-center justify-center rounded border border-border text-foreground transition-colors hover:border-border-strong"
                  aria-label="Close navigation menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <motion.ul
                className="flex flex-col px-3 py-4"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
                }}
              >
                {nav.map((item) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeOut } },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={handleNavClick}
                      className={cn(
                        'flex items-baseline gap-3 rounded px-3 py-3 transition-colors',
                        active === item.id
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                      aria-current={active === item.id ? 'true' : undefined}
                    >
                      <span className="label-mono text-accent">{item.index}</span>
                      <span className="text-base">{item.label}</span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto border-t border-border px-6 py-5">
                <StatusIndicator label={profile.availability} />
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
