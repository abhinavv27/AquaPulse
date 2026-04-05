import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import styles from './FeatureScroll.module.css'

const FEATURES = [
  {
    icon: '💧',
    title: 'MQTT Real-Time Feed',
    desc: 'Sub-second sensor data delivery via MQTT broker. Zero-latency readings from every tap, shower and appliance in your home.',
    glow: 'rgba(0, 200, 255, 0.3)',
    stat: '< 50ms',
    statLabel: 'Latency',
  },
  {
    icon: '🔴',
    title: 'AI Leak Detection',
    desc: 'Machine-learned abnormal flow patterns catch leaks before they become disasters. 98.4% accuracy with Firebase real-time alerts.',
    glow: 'rgba(255, 59, 59, 0.3)',
    stat: '98.4%',
    statLabel: 'Accuracy',
  },
  {
    icon: '📊',
    title: 'Cinematic Analytics',
    desc: 'Gorgeous area charts, bar breakdowns by room and device. Know exactly where every liter went — daily, weekly, monthly.',
    glow: 'rgba(0, 229, 255, 0.3)',
    stat: '360°',
    statLabel: 'Coverage',
  },
  {
    icon: '🌿',
    title: 'Eco Savings Score',
    desc: 'Gamified conservation goals and neighborhood benchmarks. See your water footprint shrink in real time.',
    glow: 'rgba(0, 255, 135, 0.3)',
    stat: '↓34%',
    statLabel: 'Avg. Savings',
  },
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={styles.featureCard}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ '--glow': feature.glow }}
    >
      <div className={styles.cardInner}>
        <div className={styles.iconWrap}>
          <span className={styles.icon}>{feature.icon}</span>
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.featureTitle}>{feature.title}</h3>
          <p className={styles.featureDesc}>{feature.desc}</p>
          <div className={styles.featureStat}>
            <span className={styles.statNum}>{feature.stat}</span>
            <span className={styles.statLbl}>{feature.statLabel}</span>
          </div>
        </div>
      </div>
      {/* Hover glow */}
      <div className={styles.hoverGlow} />
    </motion.div>
  )
}

export default function FeatureScroll() {
  const containerRef = useRef(null)
  const headRef = useRef(null)
  const headInView = useInView(headRef, { once: true })

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          ref={headRef}
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.tag}>Features</div>
          <h2 className={styles.title}>
            Built for the<br />
            <span className={styles.gradient}>Conscious Home.</span>
          </h2>
          <p className={styles.sub}>
            Every feature was designed to make water intelligence feel natural, not technical.
          </p>
        </motion.div>

        {/* Timeline line */}
        <div className={styles.timelineWrap}>
          <div className={styles.timelineTrack}>
            <motion.div className={styles.timelineLine} style={{ height: lineHeight }} />
          </div>

          {/* Feature Cards */}
          <div className={styles.cards}>
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
