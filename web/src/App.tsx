import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import * as THREE from 'three'

import Scene from './scene/Scene'
import NoiseOverlay from './ui/NoiseOverlay'
import Resume from './ui/Resume'
import Works from './ui/Works'
import Connect from './ui/Connect'
import LoadingScreen from './ui/LoadingScreen'
import { useStore } from './store'

function Backdrop() {
  const setActive = useStore((s) => s.setActive)

  return (
    <mesh
      position={[0, 0, -40]}
      onClick={() => setActive(null)}
    >
      <planeGeometry args={[600, 300]} />

      <meshBasicMaterial
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  )
}

type Lang = 'en' | 'zh'

const COPY = {
  en: {
    title: 'Eldho Paul Shajan',

    paragraphs: [
      'Mechanical Engineering student at Government Engineering College Wayanad, passionate about automotive engineering, technology, leadership and building things that create real impact.',

      'I explore the space between mechanical systems, student innovation, digital products and creative problem-solving — while preparing for a career in the automotive industry.',
    ],
  },

  zh: {
    title: 'Eldho Paul Shajan',

    paragraphs: [
      'Mechanical Engineering student at Government Engineering College Wayanad, passionate about automotive engineering, technology, leadership and building things that create real impact.',

      'I explore the space between mechanical systems, student innovation, digital products and creative problem-solving.',
    ],
  },
}

function Hero({
  lang,
  cueOpacity,
}: {
  lang: Lang
  cueOpacity: MotionValue<number>
}) {
  const { title, paragraphs } = COPY[lang]

  const aboutRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start 0.6', 'start start'],
  })

  const blur = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['blur(0px)', 'blur(16px)']
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5],
    [1, 0]
  )

  const titleY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -96]
  )

  const bodyY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -52]
  )

  const titleSpacing = useTransform(
    scrollYProgress,
    [0, 1],
    ['0.01em', '0.42em']
  )

  return (
    <section className="hero">
      <motion.div
        className="about"
        lang={lang}
        ref={aboutRef}
        style={{
          filter: blur,
          opacity,
        }}
      >
        <div className="about-intro">
          <motion.h1
            className="about-title"
            style={{
              y: titleY,
              letterSpacing: titleSpacing,
            }}
          >
            {title}
          </motion.h1>

          {paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="about-body"
              style={{
                y: bodyY,
              }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="scroll-cue"
        style={{
          opacity: cueOpacity,
        }}
        aria-hidden="true"
      >
        <span className="scroll-cue-label">
          SCROLL
        </span>

        <span className="scroll-cue-track">
          <span className="scroll-cue-dot" />
        </span>
      </motion.div>
    </section>
  )
}

function LangToggle({
  lang,
  onToggle,
}: {
  lang: Lang
  onToggle: () => void
}) {
  return (
    <button
      className="lang-toggle"
      onClick={onToggle}
      aria-label="Switch language"
    >
      {lang === 'en' ? '中文' : 'EN'}
    </button>
  )
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en')

  const { scrollY } = useScroll()

  const worksRef = useRef(null)

  const {
    scrollYProgress: worksProgress,
  } = useScroll({
    target: worksRef,
    offset: ['start end', 'start center'],
  })

  const fogBg = useTransform(
    worksProgress,
    [0, 1],
    [
      'rgba(8, 11, 18, 0)',
      'rgba(8, 11, 18, 0.41)',
    ]
  )

  const scrimOpacity = useTransform(
    scrollY,
    [0, 520],
    [0, 0.4]
  )

  const cueOpacity = useTransform(
    scrollY,
    [0, 160],
    [1, 0]
  )

  const vh =
    typeof window !== 'undefined'
      ? window.innerHeight
      : 800

  const railOpacity = useTransform(
    scrollY,
    [vh * 0.5, vh * 1.1],
    [0, 1]
  )

  const heroChromeOpacity = useTransform(
    scrollY,
    [0, 280],
    [1, 0]
  )

  return (
    <>
      <LoadingScreen />

      <div className="scene-bg">
        <Canvas
          shadows={{
            type: THREE.PCFShadowMap,
          }}
          dpr={[1, 1.5]}
          camera={{
            position: [0, 5, 19],
            fov: 39,
            near: 0.1,
            far: 500,
          }}
          gl={{
            antialias: false,
            stencil: false,
            depth: true,
            toneMapping:
              THREE.ACESFilmicToneMapping,
          }}
        >
          <color
            attach="background"
            args={['#0a0e16']}
          />

          <Suspense fallback={null}>
            <Backdrop />
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <motion.div
        className="scrim"
        style={{
          opacity: scrimOpacity,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="stage-fog"
        style={{
          background: fogBg,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="glass-rail"
        style={{
          opacity: railOpacity,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="hero-chrome"
        style={{
          opacity: heroChromeOpacity,
        }}
        aria-hidden="true"
      >
        <div className="hero-frame" />

        <span className="hero-mark tl">
          +
        </span>

        <span className="hero-mark tr">
          +
        </span>

        <span className="hero-mark bl">
          +
        </span>

        <span className="hero-mark br">
          +
        </span>

        <div className="hero-meta hm-tl">
          <span className="hm-name">
            Eldho Paul Shajan
          </span>

          <span>
            Mechanical Engineering
          </span>
        </div>

        {/* HERO SOCIAL LINKS */}
        <div className="hero-meta hm-tr hero-social-wrap">
          <span className="hero-portfolio-label">
            Portfolio — 2026
          </span>

          <div className="hero-socials">
            {/* GitHub */}
            <a
              href="https://github.com/eldhoyy"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.01c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.39-5.25 5.68.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/eldho-paul-shajan-758861313/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.47v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V8.99H3.56v11.46ZM22.22 0H1.77C.79 0 0 .78 0 1.75v20.5C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/eldhoyy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social"
              aria-label="Instagram"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1.2"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:eldhopaulshajan12@gmail.com"
              className="hero-social"
              aria-label="Email"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="2"
                  y="4"
                  width="20"
                  height="16"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="m3 6 9 7 9-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="hero-meta hm-bl">
          Mechanical · Automotive · Leadership
        </div>

        <div className="hero-meta hm-right">
          GEC Wayanad · Kerala
        </div>
      </motion.div>

      <NoiseOverlay />

      <main className="content">
        <Hero
          lang={lang}
          cueOpacity={cueOpacity}
        />

        <Resume lang={lang} />

        <Works
          lang={lang}
          innerRef={worksRef}
        />

        <Connect />
      </main>
    </>
  )
}
