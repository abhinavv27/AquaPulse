import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import styles from './LiveMonitor.module.css'

// Simulated real-time data
const generateData = () => Array.from({ length: 20 }, (_, i) => ({
  time: `${i}:00`,
  flow: Math.round(Math.random() * 6 + 1),
  pressure: Math.round(Math.random() * 15 + 50),
}))

function GaugeRing({ value, max, color, label, unit }) {
  const pct = value / max
  const r = 52
  const circ = 2 * Math.PI * r
  const dash = circ * pct * 0.75  // 75% arc
  const gap  = circ - dash

  return (
    <div className={styles.gauge}>
      <svg width="130" height="130" viewBox="0 0 130 130">
        {/* Track */}
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
        />
        {/* Value arc */}
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ * 0.125}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'stroke-dasharray 0.6s ease' }}
        />
        {/* Center text */}
        <text x="65" y="60" textAnchor="middle" fill="#fff" fontFamily="Syne" fontSize="20" fontWeight="700">
          {value}
        </text>
        <text x="65" y="76" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="Space Grotesk" fontSize="10">
          {unit}
        </text>
      </svg>
      <span className={styles.gaugeLabel}>{label}</span>
    </div>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(6,13,20,0.95)',
      border: '1px solid rgba(0,200,255,0.2)',
      borderRadius: 12,
      padding: '10px 14px',
      fontSize: 13,
      color: '#00c8ff',
    }}>
      <div>{payload[0]?.value} L/min</div>
    </div>
  )
}

export default function LiveMonitor() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [data, setData] = useState(generateData)
  const [flowRate, setFlowRate] = useState(3.2)
  const [pressure, setPressure] = useState(58)
  const [temp, setTemp] = useState(22)

  // Simulate live MQTT ticks
  useEffect(() => {
    const id = setInterval(() => {
      setFlowRate(+(Math.random() * 5 + 0.5).toFixed(1))
      setPressure(Math.round(Math.random() * 20 + 48))
      setTemp(Math.round(Math.random() * 8 + 18))
      setData(prev => [
        ...prev.slice(1),
        { time: 'now', flow: +(Math.random() * 6 + 1).toFixed(1), pressure: Math.round(Math.random() * 15 + 50) }
      ])
    }, 2000)
    return () => clearInterval(id)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
  }

  return (
    <section id="monitor" ref={ref} className={styles.section}>
      {/* Section glow */}
      <div className={styles.sectionGlow} />

      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.tag}>Live Monitor</div>
          <h2 className={styles.sectionTitle}>
            Your Household<br /><span className={styles.gradientText}>Pulse, Live.</span>
          </h2>
          <p className={styles.sectionSub}>
            Real-time data streaming from your IoT sensors via MQTT protocol.
          </p>
        </motion.div>

        {/* Gauges Row */}
        <div className={styles.gaugesRow}>
          {[
            { value: flowRate, max: 10, color: '#00c8ff', label: 'Flow Rate', unit: 'L/min', i: 0 },
            { value: pressure, max: 100, color: '#00e5ff', label: 'Water Pressure', unit: 'psi', i: 1 },
            { value: temp, max: 50, color: '#00b4d8', label: 'Temperature', unit: '°C', i: 2 },
          ].map(({ value, max, color, label, unit, i }) => (
            <motion.div
              key={label}
              className={styles.gaugeCard}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i}
            >
              <GaugeRing value={value} max={max} color={color} label={label} unit={unit} />
              <div className={styles.gaugeMeta}>
                <span className={styles.gaugeStatus}>
                  <span className={styles.statusDot} style={{ background: '#00ff87' }} />
                  Streaming
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Card */}
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className={styles.chartHeader}>
            <div>
              <h3 className={styles.chartTitle}>Flow Rate History</h3>
              <p className={styles.chartSub}>Last 20 readings · Updated every 2s</p>
            </div>
            <span className={styles.liveTag}>
              <span className={styles.liveDot} />LIVE
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="flowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00c8ff" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#00c8ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="flow"
                stroke="#00c8ff"
                strokeWidth={2}
                fill="url(#flowGrad)"
                dot={false}
                animationDuration={400}
                style={{ filter: 'drop-shadow(0 0 4px rgba(0,200,255,0.5))' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </section>
  )
}
