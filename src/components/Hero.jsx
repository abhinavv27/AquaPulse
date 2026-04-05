import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroCanvas from './HeroCanvas'
import styles from './Hero.module.css'

const STAT_ITEMS = [
  { value: '2.4L', label: 'Used Today' },
  { value: '0', label: 'Leaks Detected' },
  { value: '↓12%', label: 'vs Last Week' },
]

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })

  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <section id="dashboard" ref={containerRef} className={styles.hero}>
      {/* Radial glow background */}
      <div className={styles.glowBg} />
      <div className={styles.glowBg2} />

      {/* 3D Canvas */}
      <motion.div
        className={styles.canvas}
        style={{ opacity: canvasOpacity, scale: canvasScale }}
      >
        <HeroCanvas />
      </motion.div>

      {/* Hero Content */}
      <motion.div className={styles.content} style={{ y: textY }}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <span className={styles.badgeDot} />
          Real-time IoT Water Intelligence
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Every Drop
          <br />
          <span className={styles.gradientText}>Accounted.</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Track household water consumption in real time with MQTT sensors,
          <br />AI-powered leak detection & cinematic analytics.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          <button className={styles.btnPrimary}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" />
              <path d="M6 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Connect Dashboard
          </button>
          <button className={styles.btnSecondary}>View Live Demo →</button>
        </motion.div>

        {/* Mini Stats Bar */}
        <motion.div
          className={styles.statsBar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {STAT_ITEMS.map(({ value, label }, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.statValue}>{value}</span>
              <span className={styles.statLabel}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <div className={styles.scrollLine} />
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}
