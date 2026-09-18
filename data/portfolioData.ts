import type { PortfolioData } from '@/lib/types'

/**
 * Single source of truth for the portfolio.
 * Update copy, links, projects and metadata here — components read from this.
 * Links that have not been supplied use the "#" placeholder; no URLs are invented.
 */
export const portfolio: PortfolioData = {
  profile: {
    name: 'Harsh Verma',
    monogram: 'HV',
    role: 'Python & Systems Developer',
    tagline:
      'Building Python tooling, AI assistants and low-latency systems from first principles.',
    location: 'Delhi, India',
    institution: 'DPG Degree College, Gurugram',
    degree: 'Bachelor of Computer Applications (BCA)',
    availability: 'Open for Internships & Collaborations',
    bio: [
      'I am a BCA student teaching myself the layers beneath the applications most people use — from Python automation down to C and systems programming.',
      'My current work orbits AI/ML fundamentals, audio and voice systems, and low-latency API architecture. I like understanding how things actually run, not just how to call them.',
    ],
  },

  nav: [
    { id: 'about', label: 'About', href: '#about', index: '01' },
    { id: 'skills', label: 'Skills', href: '#skills', index: '02' },
    { id: 'projects', label: 'Projects', href: '#projects', index: '03' },
    { id: 'experience', label: 'Experience', href: '#experience', index: '04' },
    { id: 'open-source', label: 'Open Source', href: '#open-source', index: '05' },
    { id: 'contact', label: 'Contact', href: '#contact', index: '06' },
  ],

  socials: [
    { platform: 'github', label: 'GitHub', href: '#', handle: '@harshverma' },
    { platform: 'twitter', label: 'X', href: '#', handle: '@harshverma' },
    { platform: 'linkedin', label: 'LinkedIn', href: '#', handle: 'in/harshverma' },
    { platform: 'email', label: 'Email', href: 'mailto:hello@harshverma.dev' },
  ],

  skills: [
    {
      id: 'languages',
      label: 'Languages',
      skills: [
        { name: 'Python', level: 'focus' },
        { name: 'C', level: 'working' },
        { name: 'TypeScript', level: 'working' },
        { name: 'SQL', level: 'exploring' },
        { name: 'Bash', level: 'working' },
      ],
    },
    {
      id: 'ai-ml',
      label: 'AI / ML',
      skills: [
        { name: 'ML Fundamentals', level: 'focus' },
        { name: 'NumPy', level: 'working' },
        { name: 'PyTorch', level: 'exploring' },
        { name: 'Speech & Voice', level: 'focus' },
      ],
    },
    {
      id: 'systems',
      label: 'Systems & Tooling',
      skills: [
        { name: 'Systems Programming', level: 'focus' },
        { name: 'Low-latency APIs', level: 'working' },
        { name: 'Developer Automation', level: 'proficient' },
        { name: 'Linux', level: 'working' },
        { name: 'Git', level: 'proficient' },
      ],
    },
  ],

  projects: [
    {
      slug: 'voice-assistant',
      title: 'Low-latency Voice Assistant',
      summary: 'A local-first voice assistant tuned for fast turn-taking.',
      description:
        'A voice assistant experiment focused on minimizing round-trip latency between speech input and spoken response.',
      stack: ['Python', 'asyncio', 'Speech-to-Text', 'WebSockets'],
      status: 'active',
      year: '2025',
      repo: '#',
      demo: '#',
      highlights: [
        'Streaming audio pipeline to shave perceived response latency.',
        'Modular intent layer so new commands are drop-in.',
      ],
    },
    {
      slug: 'discord-automation-bot',
      title: 'Discord Automation Bot',
      summary: 'A utility bot automating repetitive server workflows.',
      description:
        'A Discord bot that handles moderation helpers, scheduled tasks and small developer-automation commands.',
      stack: ['Python', 'discord.py', 'SQLite'],
      status: 'shipped',
      year: '2025',
      repo: '#',
      highlights: [
        'Command framework with per-guild configuration.',
        'Background scheduler for recurring jobs.',
      ],
    },
    {
      slug: 'systems-toolkit',
      title: 'Low-level Systems Toolkit',
      summary: 'Small C utilities exploring memory and process internals.',
      description:
        'A growing set of C programs written to understand systems concepts hands-on — memory, files and processes.',
      stack: ['C', 'POSIX', 'Make'],
      status: 'prototype',
      year: '2025',
      repo: '#',
      highlights: [
        'Written from scratch to learn manual memory management.',
        'Documented as an engineering-notebook style build log.',
      ],
    },
  ],

  experience: [
    {
      id: 'self-directed',
      role: 'Self-directed Developer',
      organization: 'Independent',
      period: '2024 — Present',
      summary:
        'Building projects across Python, AI/ML and systems programming while studying.',
      points: [
        'Ship small, focused tools and document the process as a build log.',
        'Study systems and ML fundamentals through hands-on implementation.',
      ],
    },
  ],

  education: [
    {
      id: 'bca',
      institution: 'DPG Degree College, Gurugram',
      credential: 'Bachelor of Computer Applications (BCA)',
      period: '2026 — 2029',
      detail: 'Computer Applications',
    },
    {
      id: 'Schooling',
      institution: 'The Shri Ram School Moulsari',
      credential: 'ISC',
      period: '2024-2025',
      detail: 'Commerce with Maths',
    },
  ],

  openSource: [
    {
      name: 'voice-assistant',
      description: 'Local-first, low-latency voice assistant experiments.',
      language: 'Python',
      href: '#',
      role: 'Author',
    },
    {
      name: 'systems-toolkit',
      description: 'Small C utilities exploring systems internals.',
      language: 'C',
      href: '#',
      role: 'Author',
    },
  ],

  contact: {
    email: 'hello@harshverma.dev',
    blurb:
      'I am open for internships and collaborations. If you are working on something at the systems, AI or tooling layer, I would love to hear about it.',
    socials: [
      { platform: 'github', label: 'GitHub', href: '#', handle: '@harshverma' },
      { platform: 'twitter', label: 'X', href: '#', handle: '@harshverma' },
      { platform: 'linkedin', label: 'LinkedIn', href: '#', handle: 'in/harshverma' },
      { platform: 'email', label: 'Email', href: 'mailto:hello@harshverma.dev' },
    ],
  },
}
