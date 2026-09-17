'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Search, CornerDownLeft, TerminalSquare } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { portfolio } from '@/data/portfolioData'
import { easeOut, spring } from '@/lib/motion'
import { lockScroll, unlockScroll } from '@/lib/smoothScroll'
import { InteractiveTerminal } from './InteractiveTerminal'
import { cn } from '@/lib/utils'

type Item = {
  id: string
  label: string
  hint: string
  href?: string
  external: boolean
  action?: 'terminal'
}

/**
 * ⌘K / Ctrl+K command palette for jumping between sections and launching the
 * interactive terminal. Framer handles enter/exit; Lenis is paused while open.
 */
export function CommandPalette() {
  const { nav, socials } = portfolio
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const items = useMemo<Item[]>(() => {
    const actionItems: Item[] = [
      {
        id: 'terminal',
        label: 'Open interactive terminal',
        hint: 'Shell',
        external: false,
        action: 'terminal',
      },
    ]
    const sectionItems: Item[] = nav.map((item) => ({
      id: item.id,
      label: item.label,
      hint: `Section ${item.index}`,
      href: item.href,
      external: false,
    }))
    const socialItems: Item[] = socials.map((social) => ({
      id: social.platform,
      label: social.label,
      hint: social.handle ?? 'Link',
      href: social.href,
      external: social.href.startsWith('http'),
    }))
    return [...actionItems, ...sectionItems, ...socialItems]
  }, [nav, socials])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((item) => item.label.toLowerCase().includes(q))
  }, [items, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
  }, [])

  const runItem = useCallback(
    (item: Item) => {
      close()
      if (item.action === 'terminal') {
        setTerminalOpen(true)
        return
      }
      if (item.external && item.href) {
        window.open(item.href, '_blank', 'noreferrer')
      } else if (item.href) {
        window.location.hash = item.href
      }
    },
    [close],
  )

  // Global ⌘K / Ctrl+K toggle.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [close])

  // Focus input + lock Lenis/scroll when open.
  useEffect(() => {
    if (!open) return
    lockScroll()
    inputRef.current?.focus()
    return () => unlockScroll()
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = results[activeIndex]
      if (item) runItem(item)
    }
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[15vh]">
            <motion.div
              className="absolute inset-0 bg-background/70 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl"
              onKeyDown={onListKeyDown}
              initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={spring.snappy}
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 text-subtle" aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section or run a command…"
                  className="w-full bg-transparent py-4 text-sm text-foreground placeholder:text-subtle focus:outline-none"
                  aria-label="Search sections and commands"
                />
                <kbd className="label-mono rounded border border-border px-1.5 py-0.5">esc</kbd>
              </div>

              <ul className="max-h-72 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No matches
                  </li>
                ) : (
                  results.map((item, i) => (
                    <li key={`${item.id}-${item.label}`}>
                      <button
                        type="button"
                        onClick={() => runItem(item)}
                        onMouseMove={() => setActiveIndex(i)}
                        className={cn(
                          'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors',
                          i === activeIndex
                            ? 'bg-accent-muted text-foreground'
                            : 'text-muted-foreground',
                        )}
                      >
                        <span className="flex items-center gap-2.5 text-foreground/90">
                          {item.action === 'terminal' ? (
                            <TerminalSquare className="h-4 w-4 text-accent" aria-hidden="true" />
                          ) : null}
                          {item.label}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="label-mono">{item.hint}</span>
                          {i === activeIndex ? (
                            <CornerDownLeft className="h-3.5 w-3.5 text-accent" />
                          ) : null}
                        </span>
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <InteractiveTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </>
  )
}
