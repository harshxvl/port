'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { portfolio } from '@/data/portfolioData'
import { easeOut, spring } from '@/lib/motion'
import { SplitTextReveal } from './animations/SplitTextReveal'
import { MagneticButton } from './animations/MagneticButton'
import { BootTerminal } from './BootTerminal'

/** Roles cycled in the hero — all derived from the real profile. */
const roles = [
  'Python & Systems Developer',
  'BCA Student · DPG College',
  'AI Voice Assistant Builder',
  'Discord Bot Developer',
]

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
}

function RotatingRole() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(
      () => setIndex((v) => (v + 1) % roles.length),
      2800,
    )
    return () => window.clearInterval(id)
  }, [reduced])

  if (reduced) {
    return <span className="text-accent">{roles[0]}</span>
  }

  return (
    <span className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="text-accent"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  const { profile } = portfolio

  return (
    <div id="top" className="relative overflow-hidden border-b border-border pt-16">
      {/* Restrained grid texture, faded near the top only. */}
      <div
        aria-hidden="true"
        className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-[0.4]"
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-12">
          {/* Left — editorial intro */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="label-mono text-accent">00</span>
              <span className="h-px w-6 bg-border-strong" aria-hidden="true" />
              <span className="label-mono">{profile.location}</span>
            </motion.div>

            <SplitTextReveal
              as="h1"
              text={profile.name}
              trigger="mount"
              delay={0.32}
              className="mt-6 text-pretty text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
            />

            <motion.p
              variants={item}
              className="mt-4 font-mono text-sm md:text-base"
            >
              <RotatingRole />
            </motion.p>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
            >
              {profile.tagline}
            </motion.p>

            <motion.dl variants={item} className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="label-mono">Institution</dt>
                <dd className="mt-1 text-sm text-foreground/90">{profile.institution}</dd>
              </div>
              <div>
                <dt className="label-mono">Program</dt>
                <dd className="mt-1 text-sm text-foreground/90">
                  {profile.degree} · {profile.year}
                </dd>
              </div>
            </motion.dl>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <MagneticButton>
                <motion.a
                  href="#projects"
                  data-cursor="view"
                  className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring.snappy}
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </MagneticButton>
              <MagneticButton>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={spring.snappy}
                >
                  Get in touch
                </motion.a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right — terminal boot sequence */}
          <motion.div
            className="lg:pl-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.8 }}
          >
            <BootTerminal />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          className="mt-16 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 1.3 }}
        >
          <span className="label-mono">Scroll</span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      </div>
    </div>
  )
}
