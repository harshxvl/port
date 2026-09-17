import { portfolio } from '@/data/portfolioData'

export function Footer() {
  const { profile, socials } = portfolio
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-12 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-border-strong bg-surface font-mono text-sm font-semibold text-accent">
              {profile.monogram}
            </span>
            <span className="text-sm font-medium">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {profile.role} · {profile.location}
          </p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  className="label-mono transition-colors hover:text-foreground"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="label-mono">
            © {year} {profile.name} · Built from scratch
          </p>
        </div>
      </div>
    </footer>
  )
}
