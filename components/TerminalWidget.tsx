import { cn } from '@/lib/utils'

export interface TerminalLine {
  /** "input" renders a prompt + command; "output" renders muted result text. */
  type: 'input' | 'output' | 'comment'
  text: string
}

interface TerminalWidgetProps {
  title?: string
  lines: TerminalLine[]
  /** Show a blinking cursor after the final line. */
  cursor?: boolean
  className?: string
}

/**
 * Small terminal / systems-instrumentation panel.
 * Static by default — data-driven so it can be reused across sections.
 */
export function TerminalWidget({
  title = 'harsh@dev — zsh',
  lines,
  cursor = true,
  className,
}: TerminalWidgetProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-surface',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
          <span className="h-2.5 w-2.5 rounded-full border border-border-strong" />
        </span>
        <span className="ml-2 font-mono text-xs text-subtle">{title}</span>
      </div>
      <div className="space-y-1.5 p-4 font-mono text-[0.8125rem] leading-relaxed">
        {lines.map((line, i) => {
          const isLast = i === lines.length - 1
          if (line.type === 'input') {
            return (
              <p key={i} className="flex gap-2">
                <span className="select-none text-accent">$</span>
                <span
                  className={cn(
                    'text-foreground',
                    cursor && isLast && 'terminal-cursor',
                  )}
                >
                  {line.text}
                </span>
              </p>
            )
          }
          if (line.type === 'comment') {
            return (
              <p key={i} className="text-subtle">
                <span className="select-none">{'# '}</span>
                {line.text}
              </p>
            )
          }
          return (
            <p key={i} className="pl-4 text-muted-foreground">
              {line.text}
            </p>
          )
        })}
      </div>
    </div>
  )
}
