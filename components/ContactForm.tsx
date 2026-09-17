'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { ScrollReveal, Stagger, StaggerItem } from './animations/ScrollReveal'
import { easeOut, spring } from '@/lib/motion'
import { portfolio } from '@/data/portfolioData'

export function ContactForm() {
  const { contact } = portfolio
  const [submitted, setSubmitted] = useState(false)
  const reduced = useReducedMotion()

  // Foundation-only: wire this to a Server Action / route handler in a later step.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:gap-16">
        <div>
          <SectionHeader index="06" label="Contact" title="Let's build something" />
          <ScrollReveal as="p" delay={0.1} className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {contact.blurb}
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <a
              href={`mailto:${contact.email}`}
              className="group mt-8 inline-flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-accent"
            >
              {contact.email}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </ScrollReveal>

          <Stagger as="ul" className="mt-8 flex flex-wrap gap-x-6 gap-y-2" stagger={0.06}>
            {contact.socials.map((social) => (
              <StaggerItem as="li" key={social.platform}>
                <a
                  href={social.href}
                  className="label-mono transition-colors hover:text-foreground"
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {social.label}
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <ScrollReveal delay={0.1} className="rounded-lg border border-border bg-surface/40 p-6 md:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="done"
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="flex h-full min-h-56 flex-col items-start justify-center"
              >
                <motion.span
                  initial={reduced ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={spring.snappy}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/50 text-accent"
                >
                  <Check className="h-4 w-4" />
                </motion.span>
                <p className="mt-4 text-lg font-medium">Message noted.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  This form is a foundation shell — connect it to email delivery in a later step.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Name" placeholder="Your name" required />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="you@domain.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label-mono">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="What are you working on?"
                    className="mt-2 w-full resize-none rounded-md border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-accent/60 focus:outline-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={reduced ? undefined : { y: -2 }}
                  whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
                  transition={spring.snappy}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
                >
                  Send message
                  <ArrowUpRight className="h-4 w-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </Section>
  )
}

function Field({
  id,
  label,
  type = 'text',
  placeholder,
  required,
}: {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="label-mono">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-border bg-background/60 px-3.5 py-2.5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-accent/60 focus:outline-none"
      />
    </div>
  )
}
