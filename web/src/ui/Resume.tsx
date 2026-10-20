import { motion } from 'framer-motion'
import { FOCUS_POINTS } from '../data/focusPoints'

interface ResumeEntry {
  period: string
  place: string
  role?: string
  points?: string[]
}

const RESUME: ResumeEntry[] = [
  {
    period: '2025 – Present',
    place: 'Government Engineering College Wayanad',
    role: 'B.Tech Mechanical Engineering',
    points: [
      'Mechanical Engineering student with a strong interest in automotive engineering and the automobile industry.',
      'Building practical knowledge in mechanical systems, engineering design, technology and problem solving.',
      'Developing technical, leadership and project experience alongside academics.',
    ],
  },

  {
    period: '2025 – Present',
    place: 'SAE GEC Wayanad',
    role: 'Executive Committee Member',
    points: [
      'Active member of the SAE student chapter at GEC Wayanad.',
      'Contributed to automotive-focused technical activities and student initiatives.',
      'Mentored participants during the two-day Engine Overhauling Workshop.',
      'Delivered a practical introductory session on engine overhauling and engine components.',
      'Developing hands-on exposure to automotive engineering through SAE activities.',
    ],
  },

  {
    period: '2025 – Present',
    place: 'Student Leadership & Campus Activities',
    role: 'ExeCom Member · Coordinator · Volunteer',
    points: [
      'MESA ExeCom — Program Coordinator.',
      'IEDC ExeCom Member.',
      'Literature Club ExeCom Member.',
      'Music Club ExeCom — Technical Coordinator.',
      'HRD Cell Committee Member.',
      'NSS Volunteer.',
      'Campus Ambassador — E-Cell, IIT Bombay.',
      'Earlier served as School Chairman and coordinated multiple school-level programmes.',
    ],
  },

  {
    period: '2026',
    place: 'Kerala Water Authority',
    role: 'Engineering Intern',
    points: [
      'Completed a one-week engineering internship at Kerala Water Authority.',
      'Gained exposure to a professional engineering environment and practical engineering systems.',
      'Developed an understanding of workplace discipline and real-world engineering activities.',
    ],
  },

  {
    period: '2025 – Present',
    place: 'Projects & Technical Activities',
    role: 'Builder · Coordinator · Mentor',
    points: [
      'Program Coordinator for YANTRA, the Mechanical Department technical fest.',
      'Conducted and mentored participants during a two-day SAE Engine Overhauling Workshop.',
      'Building KTU Connect, a digital academic resource platform for KTU students.',
      'Exploring web development, programming and digital products alongside mechanical engineering.',
    ],
  },

  {
    period: '2024 – Present',
    place: 'Technical Skills & Programming',
    role: 'Programming · Web Development · Digital Tools',
    points: [
      'Programming Languages: Python, C++, Java, JavaScript, TypeScript and SQL.',
      'Web Technologies: HTML and CSS.',
      'Frameworks & Libraries: React, Three.js and Vite.',
      'Tools & Platforms: Git, GitHub and Vercel.',
      'Building and experimenting with websites, digital products and technical projects.',
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1]

const containerV = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
}

const itemV = {
  hidden: {
    opacity: 0,
    y: 26,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
}

function Entry({
  entry,
  index,
}: {
  entry: ResumeEntry
  index: number
}) {
  return (
    <motion.div
      className="tl-entry"
      data-point={FOCUS_POINTS[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        margin: '-12% 0px -12% 0px',
      }}
    >
      <motion.span
        className="tl-dot"
        variants={itemV}
        aria-hidden="true"
      />

      <div className="tl-body">
        <motion.div
          className="tl-period"
          variants={itemV}
        >
          {entry.period}
        </motion.div>

        <motion.div
          className="tl-head"
          variants={itemV}
        >
          <h3 className="tl-place">
            {entry.place}
          </h3>
        </motion.div>

        {entry.role && (
          <motion.div
            className="tl-role"
            variants={itemV}
          >
            {entry.role}
          </motion.div>
        )}

        {entry.points && (
          <motion.ul
            className="tl-points"
            variants={itemV}
          >
            {entry.points.map((point, i) => (
              <li key={i}>
                {point}
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  )
}

export default function Resume({
  lang,
}: {
  lang: 'en' | 'zh'
}) {
  return (
    <section className="resume" lang="en">
      <motion.h2
        className="resume-title"
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: '-10% 0px',
        }}
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
      >
        Experience
      </motion.h2>

      <div className="timeline">
        {RESUME.map((entry, index) => (
          <Entry
            key={index}
            entry={entry}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
