import { cn } from '@/lib/utils'

interface StatusIndicatorProps {
  label: string
  className?: string
}

/**
 * Compact availability pill with a soft pulsing accent dot.
 * Motion is disabled under prefers-reduced-motion (see globals.css).
 */
export function StatusIndicator({ label, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5',
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="label-mono text-[0.625rem] text-foreground/80">
        {label}
      </span>
    </span>
  )
}
