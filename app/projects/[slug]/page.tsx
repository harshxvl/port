import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { portfolio } from '@/data/portfolioData'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return portfolio.projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = portfolio.projects.find((p) => p.slug === slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = portfolio.projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <>
      <Navigation />
      <main className="mx-auto w-full max-w-[820px] px-6 pb-24 pt-32 md:px-8">
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
          Back to projects
        </Link>

        <div className="mt-10 flex items-center gap-3">
          <span className="label-mono text-accent">{project.year}</span>
          <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
          <span className="label-mono">{project.status}</span>
        </div>

        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.repo ? (
            <a
              href={project.repo}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-border-strong"
              target={project.repo.startsWith('http') ? '_blank' : undefined}
              rel={project.repo.startsWith('http') ? 'noreferrer' : undefined}
            >
              Repository <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-border-strong"
              target={project.demo.startsWith('http') ? '_blank' : undefined}
              rel={project.demo.startsWith('http') ? 'noreferrer' : undefined}
            >
              Demo <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <h2 className="label-mono">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-surface/40 px-3 py-1.5 font-mono text-sm text-foreground/80"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="label-mono">Build notes</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((point, i) => (
              <li key={i} className="flex gap-3 text-foreground/90">
                <span className="mt-3 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}
