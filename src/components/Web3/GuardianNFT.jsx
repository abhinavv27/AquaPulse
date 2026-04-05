import { motion } from 'framer-motion'
import { Shield, Droplets, Waves, Sparkles } from 'lucide-react'
import styles from './GuardianNFT.module.css'

export default function GuardianNFT({ ecoScore = 94 }) {
  // Evolve color based on score
  const isLegendary = ecoScore >= 95
  const color = isLegendary ? '#ffb800' : '#00f2ff'
  const glow = isLegendary ? 'rgba(255, 184, 0, 0.4)' : 'rgba(0, 242, 255, 0.4)'

  return (
    <div className={styles.container}>
      <div className={styles.nftBox}>
        {/* Generative Guardian SVG */}
        <motion.div 
          className={styles.guardianWrapper}
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            {/* Core Orb */}
            <circle cx="100" cy="100" r="40" fill={color} fillOpacity="0.15" />
            <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="1.5" strokeDasharray="10 5" className={styles.rotating} />
            
            {/* Water Wings */}
            <path d="M60 100C30 80 30 120 60 100Z" fill={color} fillOpacity="0.4" />
            <path d="M140 100C170 80 170 120 140 100Z" fill={color} fillOpacity="0.4" />
            
            {/* Central Symbol */}
            <circle cx="100" cy="100" r="10" fill={color} />
          </svg>
          
          <div className={styles.floatingParticles}>
            {[...Array(4)].map((_, i) => (
              <motion.div 
                key={i}
                className={styles.particle}
                animate={{ 
                  y: [-20, 20],
                  x: [Math.random() * 20, Math.random() * -20],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </motion.div>

        {/* NFT Metadata */}
        <div className={styles.info}>
          <div className={styles.levelBadge}>
            {isLegendary ? 'LEGENDARY GUARDIAN' : 'WATER PROTECTOR V.1'}
          </div>
          <h3 className={styles.name}>AquaPulse #0247</h3>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <Droplets size={12} />
              <span>Minted on Base</span>
            </div>
            <div className={styles.stat}>
              <Shield size={12} />
              <span>Eco: {ecoScore}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mint Notification Concept */}
      <motion.div 
        className={styles.mintBar}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.mintProgress}>
          <div className={styles.progressBar} style={{ width: '80%', backgroundColor: color }} />
        </div>
        <span>Next Evolution: {ecoScore + 1}/100</span>
      </motion.div>
    </div>
  )
}
