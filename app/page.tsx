import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { SkillsCloud } from '@/components/SkillsCloud'
import { ProjectGrid } from '@/components/ProjectGrid'
import { Timeline } from '@/components/Timeline'
import { OpenSource } from '@/components/OpenSource'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'
import { CommandPalette } from '@/components/CommandPalette'

export default function HomePage() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Navigation />
      <CommandPalette />
      <main>
        <Hero />
        <About />
        <SkillsCloud />
        <ProjectGrid />
        <Timeline />
        <OpenSource />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
