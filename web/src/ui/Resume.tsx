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
      'Mechanical Engineering student with a strong interest in automotive engineering.',
      'Focused on developing practical technical skills alongside academics.',
      'Interested in engineering design, automotive systems, technology and innovation.',
    ],
  },

  {
    period: '2025 – Present',
    place: 'SAE GEC Wayanad',
    role: 'Executive Committee Member',
    points: [
      'Active member of the SAE student chapter at GEC Wayanad.',
      'Contributed to automotive-focused technical activities and student initiatives.',
      'Mentored participants during the Engine Overhauling Workshop.',
      'Delivered a practical introductory session on engine overhauling.',
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
    ],
  },

  {
    period: '2026',
    place: 'Kerala Water Authority',
    role: 'Engineering Intern',
    points: [
      'Completed a one-week internship at Kerala Water Authority.',
      'Gained exposure to a professional engineering environment and practical systems.',
    ],
  },

  {
    period: '2025 – Present',
    place: 'Projects & Technical Activities',
    role: 'Builder · Coordinator · Mentor',
    points: [
      'Program Coordinator for YANTRA, the Mechanical Department technical fest.',
      'Conducted a two-day SAE Engine Overhauling Workshop.',
      'Building KTU Connect, an academic resource platform for KTU students.',
      'Interested in combining mechanical engineering with technology and digital products.',
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
