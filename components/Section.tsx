import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Anchor id used by in-page navigation. */
  id: string
  children: React.ReactNode
  className?: string
}

/**
 * Reusable section wrapper.
 * Centered content container (~1200px), consistent vertical rhythm and a
 * hairline top border that ties the page together as an engineering document.
 */
export function Section({ id, children, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 border-t border-border', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        {children}
      </div>
    </section>
  )
}
