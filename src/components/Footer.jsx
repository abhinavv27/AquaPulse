import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logoIcon}>
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10 2 4 7.5 4 12a6 6 0 0012 0c0-4.5-6-10-6-10z" fill="url(#fGrad)" />
                <defs>
                  <linearGradient id="fGrad" x1="4" y1="2" x2="16" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00c8ff" />
                    <stop offset="1" stopColor="#0077b6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className={styles.brandName}>AquaPulse</span>
          </div>
          <p className={styles.tagline}>Every drop, intelligently tracked.</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.copy}>© 2026 AquaPulse. Built with IoT + React + Firebase.</span>
          <div className={styles.techStack}>
            {['MQTT', 'Firebase', 'Three.js', 'React', 'Framer Motion'].map(t => (
              <span key={t} className={styles.techPill}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
