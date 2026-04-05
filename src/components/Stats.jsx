import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import styles from './Stats.module.css'

const USAGE_DATA = [
  { day: 'Mon', liters: 142 },
  { day: 'Tue', liters: 198 },
  { day: 'Wed', liters: 167 },
  { day: 'Thu', liters: 220 },
  { day: 'Fri', liters: 154 },
  { day: 'Sat', liters: 81 },
  { day: 'Sun', liters: 95 },
]

const TODAY = 'Thu'

const CustomBarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(6,13,20,0.95)',
      border: '1px solid rgba(0,200,255,0.2)',
      borderRadius: 10,
      padding: '8px 14px',
      fontSize: 13,
      color: '#00c8ff',
    }}>
      {payload[0]?.value}L used
    </div>
  )
}

const BIG_STATS = [
  { val: '1,247', unit: 'L', label: 'Total This Month', delta: '↓18% vs last' },
  { val: '0', unit: 'leaks', label: 'Active Leaks', delta: 'All clear 🟢' },
  { val: '$12.40', unit: '', label: 'Monthly Cost Est.', delta: '↓$4.20 saved' },
  { val: '94', unit: '%', label: 'Eco Score', delta: 'Excellent 🌿' },
]

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgX = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section id="analytics" ref={ref} className={styles.section}>
      {/* Parallax tinted bg band */}
      <motion.div className={styles.bgBand} style={{ x: bgX }} />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.tag}>Analytics</div>
          <h2 className={styles.title}>
            Your Water Story,<br />
            <span className={styles.gradient}>Week by Week.</span>
          </h2>
        </motion.div>

        {/* Big Stats Grid */}
        <div className={styles.bigStats}>
          {BIG_STATS.map(({ val, unit, label, delta }, i) => (
            <motion.div
              key={label}
              className={`${styles.bigStatCard} ${label.includes('Eco') ? styles.ecoPulseCard : ''} interactive-glow`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--x', `${x}px`);
                e.currentTarget.style.setProperty('--y', `${y}px`);
              }}
            >
              <div className={styles.bigStatValue}>
                {val}<span className={styles.bigStatUnit}>{unit}</span>
              </div>
              <div className={styles.bigStatLabel}>{label}</div>
              <div className={styles.bigStatDelta} style={{ color: label.includes('Eco') ? '#00ff87' : '' }}>
                {delta}
              </div>
              {label.includes('Eco') && <div className={styles.pulseRing}></div>}
            </motion.div>
          ))}
        </div>

        {/* Bar Chart */}
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Daily Usage — This Week</h3>
            <span className={styles.chartMeta}>Liters consumed per day</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={USAGE_DATA} barSize={32} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="liters" radius={[8, 8, 0, 0]}>
                {USAGE_DATA.map(({ day }) => (
                  <Cell
                    key={day}
                    fill={day === TODAY
                      ? 'url(#barGrad)'
                      : 'rgba(0,200,255,0.15)'
                    }
                  />
                ))}
              </Bar>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00c8ff" />
                  <stop offset="100%" stopColor="#0077b6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  )
}
