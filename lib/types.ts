export type SocialPlatform =
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'email'
  | 'discord'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  /** Full URL, or a placeholder value if not yet supplied. */
  href: string
  /** Short handle shown alongside the link, e.g. "@harshverma". */
  handle?: string
}

export interface DeveloperProfile {
  name: string
  monogram: string
  role: string
  tagline: string
  location: string
  institution: string
  degree: string
  year: string
  availability: string
  /** Short bio paragraphs, rendered in order. */
  bio: string[]
}

export type SkillLevel = 'exploring' | 'working' | 'proficient' | 'focus'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillGroup {
  id: string
  label: string
  skills: Skill[]
}

export type ProjectStatus = 'shipped' | 'active' | 'prototype' | 'archived'

export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  /** Short technical annotation, e.g. "Python · asyncio · WebSockets". */
  stack: string[]
  status: ProjectStatus
  year: string
  /** Optional external links. Use placeholder values until real URLs exist. */
  repo?: string
  demo?: string
  /** Longer-form build notes for the project detail page. */
  highlights: string[]
}

export interface ExperienceEntry {
  id: string
  role: string
  organization: string
  period: string
  summary: string
  points: string[]
}

export interface EducationEntry {
  id: string
  institution: string
  credential: string
  period: string
  detail: string
}

export interface OpenSourceRepo {
  name: string
  description: string
  language: string
  /** Full URL, or a placeholder value if not yet supplied. */
  href: string
  role: string
}

export interface ContactInfo {
  email: string
  blurb: string
  socials: SocialLink[]
}

export interface NavItem {
  id: string
  label: string
  /** In-page anchor, e.g. "#about". */
  href: string
  /** Section index shown in the UI, e.g. "01". */
  index: string
}

export interface PortfolioData {
  profile: DeveloperProfile
  nav: NavItem[]
  socials: SocialLink[]
  skills: SkillGroup[]
  projects: Project[]
  experience: ExperienceEntry[]
  education: EducationEntry[]
  openSource: OpenSourceRepo[]
  contact: ContactInfo
}
