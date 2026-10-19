export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Projects',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Highlights',
    visitLabel: 'View project',
    detailPlaceholder: 'Project details',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Open',
    countLabel: (n) => `${n} projects`,
    sections: [],
  },

  en: {
    title: 'Projects',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Highlights',
    visitLabel: 'View project',
    detailPlaceholder: 'Project details',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Open',
    countLabel: (n) => `${n} projects`,

    sections: [
      {
        id: 'automotive',
        no: '01',
        title: 'Automotive',
        tagline: 'SAE · Mechanical Engineering',
        items: [
          {
            name: 'Engine Overhauling Workshop',
            meta: '2-day hands-on technical workshop',
            tags: [
              'SAE',
              'Engine',
              'Mentoring',
              'Mechanical',
            ],
            slug: 'engine-overhauling',
          },
          {
            name: 'Automotive Engineering Activities',
            meta: 'SAE GEC Wayanad',
            tags: [
              'Automotive',
              'Technical Activities',
            ],
            slug: 'automotive-activities',
          },
        ],
        footer:
          'Hands-on learning · Engine systems · Technical mentoring · Automotive engineering',
      },

      {
        id: 'leadership',
        no: '02',
        title: 'Leadership',
        tagline: 'Coordination · Events · Student Innovation',
        items: [
          {
            name: 'YANTRA',
            meta: 'Mechanical Department Technical Fest',
            tags: [
              'Program Coordinator',
              'MESA',
              'Event Management',
            ],
            slug: 'yantra',
          },
          {
            name: 'Student Leadership',
            meta: 'Campus organisations & technical communities',
            tags: [
              'SAE',
              'MESA',
              'IEDC',
              'HRD Cell',
            ],
            slug: 'student-leadership',
          },
        ],
        footer:
          'Program coordination · Teamwork · Event execution · Student leadership',
      },

      {
        id: 'technology',
        no: '03',
        title: 'Technology',
        tagline: 'Digital Products · Web Development',
        items: [
          {
            name: 'KTU Connect',
            meta: 'Academic resource platform for KTU students',
            tags: [
              'Web Development',
              'Education',
              'Digital Product',
            ],
            slug: 'ktu-connect',
          },
          {
            name: 'Creative Technology',
            meta: 'Exploring engineering through digital tools',
            tags: [
              'Technology',
              'Problem Solving',
            ],
            slug: 'creative-technology',
          },
        ],
      },

      {
        id: 'experience',
        no: '04',
        title: 'Experience',
        tagline: 'Industry Exposure · Engineering',
        items: [
          {
            name: 'Kerala Water Authority Internship',
            meta: '1-week engineering internship',
            tags: [
              'Internship',
              'Engineering',
              'Industry Exposure',
            ],
            slug: 'kerala-water-authority',
          },
          {
            name: 'E-Cell IIT Bombay',
            meta: 'Campus Ambassador',
            tags: [
              'Entrepreneurship',
              'Innovation',
              'Campus Ambassador',
            ],
            slug: 'ecell-iitb',
          },
        ],
        footer:
          'Industry exposure · Innovation · Entrepreneurship · Continuous learning',
      },
    ],
  },
}

export const SECTION_COVERS: Record<string, string> = {
  automotive: `${import.meta.env.BASE_URL}works/covers/automotive.jpg`,
  leadership: `${import.meta.env.BASE_URL}works/covers/leadership.jpg`,
  technology: `${import.meta.env.BASE_URL}works/covers/technology.jpg`,
  experience: `${import.meta.env.BASE_URL}works/covers/experience.jpg`,
}

export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length

  if (section.groups) {
    return section.groups.reduce(
      (n, g) => n + g.items.length,
      0
    )
  }

  return 0
}
