'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '@/lib/animations'
import { cn } from '@/lib/utils'

type BootKind = 'cmd' | 'out' | 'ok'

interface BootLine {
  text: string
  kind: BootKind
}

/**
 * Systems-flavored startup sequence for the hero. Lines are revealed one by
 * one with GSAP to feel like a program booting. Under reduced motion every
 * line is shown immediately.
 */
const lines: BootLine[] = [
  { text: 'gcc main.c -o assistant', kind: 'cmd' },
  { text: './assistant', kind: 'cmd' },
  { text: 'initializing voice pipeline...', kind: 'out' },
  { text: 'loading Google Gen AI SDK...', kind: 'out' },
  { text: 'checking inference provider...', kind: 'out' },
  { text: 'Cerebras provider ready', kind: 'ok' },
  { text: 'audio input initialized', kind: 'out' },
  { text: 'streaming audio buffers...', kind: 'out' },
  { text: 'assistant online', kind: 'ok' },
]

export function BootTerminal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>('.boot-line')
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 })
        gsap.set('.boot-caret', { opacity: 1 })
        return
      }
      gsap.set(items, { opacity: 0, y: 6 })
      const tl = gsap.timeline({ delay: 0.95 })
      tl.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.26,
      })
      tl.fromTo(
        '.boot-caret',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'steps(1)',
        },
        '>-0.1',
      )
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-surface shadow-[0_1px_0_0_hsl(var(--border-strong)/0.25)]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
        </span>
        <span className="ml-2 font-mono text-xs text-subtle">
          assistant — build &amp; run
        </span>
      </div>
      <div className="space-y-1.5 p-4 font-mono text-[0.8125rem] leading-relaxed">
        {lines.map((line, i) => {
          if (line.kind === 'cmd') {
            return (
              <p key={i} className="boot-line flex gap-2">
                <span className="select-none text-accent">$</span>
                <span className="text-foreground">{line.text}</span>
              </p>
            )
          }
          return (
            <p
              key={i}
              className={cn(
                'boot-line pl-4',
                line.kind === 'ok' ? 'text-accent' : 'text-muted-foreground',
              )}
            >
              {line.kind === 'ok' ? '✓ ' : ''}
              {line.text}
            </p>
          )
        })}
        <p className="boot-line flex gap-2 pt-0.5">
          <span className="select-none text-accent">$</span>
          <span
            className="boot-caret inline-block h-[1.1em] w-[0.5em] translate-y-[0.15em] bg-accent"
            aria-hidden="true"
          />
        </p>
      </div>
    </div>
  )
}
