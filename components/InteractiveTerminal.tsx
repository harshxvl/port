'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { portfolio } from '@/data/portfolioData'
import { easeOut, spring } from '@/lib/motion'
import { lockScroll, unlockScroll } from '@/lib/smoothScroll'
import { cn } from '@/lib/utils'

interface Line {
  kind: 'input' | 'output' | 'error' | 'comment'
  text: string
}

const BANNER: Line[] = [
  { kind: 'comment', text: `${portfolio.profile.name} — interactive shell` },
  { kind: 'comment', text: "type 'help' to list commands · 'exit' to close" },
]

/**
 * A tiny in-browser shell. Real commands read from the portfolio data so
 * nothing is fabricated. Runs a fixed command set; unknown input errors out
 * like a real shell would.
 */
export function InteractiveTerminal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const reduced = useReducedMotion()
  const [history, setHistory] = useState<Line[]>(BANNER)
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    lockScroll()
    const id = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => {
      window.clearTimeout(id)
      unlockScroll()
    }
  }, [open])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const run = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    const next: Line[] = [{ kind: 'input', text: cmd }]
    const [name, ...args] = cmd.toLowerCase().split(/\s+/)

    switch (name) {
      case 'help':
        next.push(
          { kind: 'output', text: 'available commands:' },
          { kind: 'output', text: '  whoami    — who is this' },
          { kind: 'output', text: '  skills    — current stack & focus' },
          { kind: 'output', text: '  projects  — selected build log' },
          { kind: 'output', text: '  contact   — how to reach me' },
          { kind: 'output', text: '  social    — links' },
          { kind: 'output', text: '  clear     — reset the screen' },
          { kind: 'output', text: '  exit      — close terminal' },
        )
        break
      case 'whoami':
        next.push(
          { kind: 'output', text: `${portfolio.profile.name} · ${portfolio.profile.role}` },
          { kind: 'output', text: `${portfolio.profile.degree} · ${portfolio.profile.year} · ${portfolio.profile.location}` },
          { kind: 'output', text: portfolio.profile.tagline },
        )
        break
      case 'skills':
        portfolio.skills.forEach((group) => {
          next.push({
            kind: 'output',
            text: `${group.label.padEnd(18)} ${group.skills.map((s) => s.name).join(', ')}`,
          })
        })
        break
      case 'projects':
        portfolio.projects.forEach((p) => {
          next.push({ kind: 'output', text: `[${p.status}] ${p.title}` })
          next.push({ kind: 'output', text: `        ${p.summary}` })
        })
        break
      case 'contact':
        next.push({ kind: 'output', text: portfolio.contact.email })
        next.push({ kind: 'output', text: portfolio.contact.blurb })
        break
      case 'social':
        portfolio.socials.forEach((s) => {
          next.push({ kind: 'output', text: `${s.label.padEnd(10)} ${s.handle ?? s.href}` })
        })
        break
      case 'clear':
        setHistory([])
        setValue('')
        return
      case 'exit':
        onClose()
        return
      default:
        next.push({ kind: 'error', text: `command not found: ${name}. try 'help'.` })
        if (args.length) {
          /* args unused otherwise; keeps lint quiet */
        }
    }

    setHistory((h) => [...h, ...next])
    setValue('')
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[65] flex items-start justify-center px-4 pt-[12vh]">
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive terminal"
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl"
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
            transition={spring.snappy}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
                <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
              </span>
              <span className="ml-2 font-mono text-xs text-subtle">harsh@dev — interactive</span>
              <button
                type="button"
                onClick={onClose}
                className="label-mono ml-auto rounded border border-border px-1.5 py-0.5 transition-colors hover:text-foreground"
              >
                esc
              </button>
            </div>

            <div
              ref={scrollRef}
              className="max-h-[52vh] min-h-[16rem] space-y-1 overflow-y-auto p-4 font-mono text-[0.8125rem] leading-relaxed"
            >
              {history.map((line, i) => (
                <p
                  key={i}
                  className={cn(
                    line.kind === 'input' && 'flex gap-2 text-foreground',
                    line.kind === 'output' && 'whitespace-pre-wrap pl-4 text-muted-foreground',
                    line.kind === 'error' && 'pl-4 text-accent',
                    line.kind === 'comment' && 'text-subtle',
                  )}
                >
                  {line.kind === 'input' ? (
                    <>
                      <span className="select-none text-accent">$</span>
                      <span>{line.text}</span>
                    </>
                  ) : line.kind === 'comment' ? (
                    <>
                      <span className="select-none">{'# '}</span>
                      {line.text}
                    </>
                  ) : (
                    line.text
                  )}
                </p>
              ))}

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  run(value)
                }}
                className="flex gap-2"
              >
                <span className="select-none text-accent">$</span>
                <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                  className="w-full bg-transparent text-foreground caret-accent focus:outline-none"
                />
              </form>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
