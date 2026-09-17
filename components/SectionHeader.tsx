import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  /** Section number, e.g. "01". */
  index: string
  /** Small monospace label, e.g. "CURRENT FOCUS". */
  label: string
  /** Human-readable heading. */
  title: string
  /** Optional supporting line rendered under the title. */
  description?: string
  className?: string
}

/**
 * Editorial section header: tiny numbered/labelled metadata row above a
 * strong title. Keeps typographic hierarchy consistent across every section.
 */
export function SectionHeader({
  index,
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <header className={cn('max-w-2xl', className)}>
      <div className="flex items-center gap-3">
        <span className="label-mono text-accent">{index}</span>
        <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
        <span className="label-mono">{label}</span>
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </header>
  )
}
