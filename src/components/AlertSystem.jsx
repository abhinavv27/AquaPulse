import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import styles from './AlertSystem.module.css'

const INITIAL_ALERTS = [
  { id: 1, type: 'warning', icon: '⚠️', title: 'Unusual Flow Detected', desc: 'Bathroom tap — 3.8x above baseline for 4 minutes', time: '2 min ago', read: false },
  { id: 2, type: 'ok', icon: '✅', title: 'Leak Check Passed', desc: 'All 6 sensors nominal. No anomalies found.', time: '14 min ago', read: false },
  { id: 3, type: 'critical', icon: '🚨', title: 'Potential Pipe Burst', desc: 'Kitchen — 12x baseline surge for > 90 seconds', time: '1 hr ago', read: true },
  { id: 4, type: 'info', icon: '💡', title: 'Weekly Goal Reached', desc: 'You saved 38L vs last week. 🎉', time: '3 hr ago', read: true },
]

const COLOR_MAP = {
  critical: '#ff3b3b',
  warning:  '#ffb830',
  ok:       '#00ff87',
  info:     '#00c8ff',
}

export default function AlertSystem() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [alerts, setAlerts] = useState(INITIAL_ALERTS)
  const [leakSimActive, setLeakSimActive] = useState(false)

  // Simulate a new critical alert on demand
  const triggerLeak = () => {
    setLeakSimActive(true)
    const newAlert = {
      id: Date.now(),
      type: 'critical',
      icon: '🚨',
      title: 'LIVE LEAK ALERT',
      desc: 'Garden hose — 18x baseline. Auto shutoff triggered.',
      time: 'Just now',
      read: false,
    }
    setAlerts(prev => [newAlert, ...prev])
    setTimeout(() => setLeakSimActive(false), 4000)
  }

  const dismiss = (id) => setAlerts(prev => prev.filter(a => a.id !== id))

  return (
    <section id="alerts" ref={ref} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left: Content */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.tag}>Alert System</div>
            <h2 className={styles.title}>
              Nothing Slips<br />
              <span className={styles.gradient}>Through.</span>
            </h2>
            <p className={styles.desc}>
              MQTT-triggered alerts notify you the instant an anomaly is detected.
              Our AI distinguishes a long shower from a leaking pipe.
            </p>

            {/* Leak Sim Button */}
            <button
              className={`${styles.simBtn} ${leakSimActive ? styles.simActive : ''}`}
              onClick={triggerLeak}
            >
              <span className={styles.simDot} />
              {leakSimActive ? 'Alert Fired! 🚨' : 'Simulate Leak Alert'}
            </button>

            {/* Detection stats */}
            <div className={styles.detectionStats}>
              {[
                { label: 'Response Time', value: '< 1s' },
                { label: 'False Positive Rate', value: '0.8%' },
                { label: 'Sensors Online', value: '6 / 6' },
              ].map(({ label, value }) => (
                <div key={label} className={styles.dStat}>
                  <span className={styles.dStatValue}>{value}</span>
                  <span className={styles.dStatLabel}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Alert Feed */}
          <motion.div
            className={styles.alertFeed}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pulsing critical glow when active */}
            {leakSimActive && <div className={styles.criticalGlow} />}

            <div className={styles.feedHeader}>
              <span className={styles.feedTitle}>Live Feed</span>
              <span className={styles.unread}>{alerts.filter(a => !a.read).length} new</span>
            </div>

            <div className={styles.alertList}>
              <AnimatePresence>
                {alerts.slice(0, 4).map((alert) => (
                  <motion.div
                    key={alert.id}
                    className={`${styles.alertItem} ${!alert.read ? styles.unreadItem : ''}`}
                    initial={{ opacity: 0, x: 30, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -30, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    style={{ '--color': COLOR_MAP[alert.type] }}
                  >
                    <div className={styles.alertAccent} />
                    <div className={styles.alertIcon}>{alert.icon}</div>
                    <div className={styles.alertContent}>
                      <div className={styles.alertTop}>
                        <span className={styles.alertTitle}>{alert.title}</span>
                        <span className={styles.alertTime}>{alert.time}</span>
                      </div>
                      <p className={styles.alertDesc}>{alert.desc}</p>
                    </div>
                    <button className={styles.dismissBtn} onClick={() => dismiss(alert.id)}>×</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
