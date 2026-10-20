import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const SOCIALS = [
  {
    label: 'Email',
    value: 'eldhopaulshajan12@gmail.com',
    href: 'mailto:eldhopaulshajan12@gmail.com',
  },
  {
    label: 'GitHub',
    value: '@eldhoyy',
    href: 'https://github.com/eldhoyy',
  },
  {
    label: 'LinkedIn',
    value: 'Eldho Paul Shajan',
    href: 'https://www.linkedin.com/in/eldho-paul-shajan-758861313/',
  },
  {
    label: 'Instagram',
    value: '@eldhoyy',
    href: 'https://www.instagram.com/eldhoyy/',
  },
]

export default function Connect() {
  return (
    <section className="connect-section">
      <motion.div
        className="connect-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{
          duration: 0.8,
          ease: EASE,
        }}
      >
        <div className="connect-heading">
          <span className="connect-kicker">
            LET'S CONNECT
          </span>

          <h2>
            Build something
            <br />
            meaningful.
          </h2>

          <p>
            Open to opportunities, collaborations,
            technical projects and conversations around
            mechanical and automotive engineering.
          </p>
        </div>

        <div className="connect-links">
          {SOCIALS.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={
                social.label === 'Email'
                  ? undefined
                  : '_blank'
              }
              rel={
                social.label === 'Email'
                  ? undefined
                  : 'noopener noreferrer'
              }
              className="connect-card"
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
                margin: '-5% 0px',
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: EASE,
              }}
              whileHover={{
                y: -5,
              }}
            >
              <span className="connect-label">
                {social.label}
              </span>

              <span className="connect-value">
                {social.value}
              </span>

              <span className="connect-arrow">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
