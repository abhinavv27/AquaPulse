import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import AetherConnect from './Web3/AetherConnect'
import styles from './Navbar.module.css'

const links = ['Dashboard', 'Monitor', 'Alerts', 'Analytics']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isAetherOpen, setIsAetherOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10 2 4 7.5 4 12a6 6 0 0012 0c0-4.5-6-10-6-10z" fill="url(#aquaGrad)" />
                <defs>
                  <linearGradient id="aquaGrad" x1="4" y1="2" x2="16" y2="18" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00c8ff" />
                    <stop offset="1" stopColor="#0077b6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className={styles.logoText}>AquaPulse</span>
          </div>

          {/* Desktop Links */}
          <ul className={styles.links}>
            {links.map(link => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className={styles.link}>{link}</a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className={styles.cta}>
            <button 
              className={`${styles.aetherTrigger} interactive-glow`}
              onClick={() => setIsAetherOpen(true)}
            >
              <Globe size={16} />
              <span>Aether</span>
            </button>
            <div className={`${styles.liveIndicator} interactive-glow`}>
              <span className={styles.liveDot} />
              <span>OPERATIONAL</span>
            </div>
          </div>
        </div>
      </motion.nav>

      <AetherConnect 
        isOpen={isAetherOpen} 
        onClose={() => setIsAetherOpen(false)} 
      />
    </>
  )
}
