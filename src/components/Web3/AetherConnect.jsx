import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ShieldCheck, Zap, Globe, Coins, X } from 'lucide-react'
import DAOProposals from './DAOProposals'
import styles from './AetherConnect.module.css'

export default function AetherConnect({ isOpen, onClose }) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [credits, setCredits] = useState(1240)

  const handleConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setWalletAddress('0xAqua...Pulse')
      setIsConnecting(false)
    }, 1500)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className={styles.modal}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <div className={styles.titleGroup}>
                <div className={styles.aetherIcon}>
                  <Globe size={20} className={styles.rotating} />
                </div>
                <div>
                  <h2 className={styles.title}>Aether Hub</h2>
                  <span className={styles.subtitle}>Web3 Sustainability Protocol</span>
                </div>
              </div>
              <button onClick={onClose} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.content}>
              {/* Wallet Section */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <Wallet size={18} />
                  <span>Wallet Connection</span>
                </div>
                {!walletAddress ? (
                  <button 
                    className={`${styles.connectBtn} ${isConnecting ? styles.loading : ''}`}
                    onClick={handleConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? 'Verifying Node...' : 'Connect Aether Wallet'}
                  </button>
                ) : (
                  <div className={styles.connectedState}>
                    <div className={styles.address}>{walletAddress}</div>
                    <div className={styles.statusBadge}>Connected</div>
                  </div>
                )}
              </div>

              {/* H2O Credits */}
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>
                    <Coins size={14} />
                    <span>H2O Credits</span>
                  </div>
                  <div className={styles.statValue}>{credits.toLocaleString()}</div>
                  <div className={styles.statDelta}>+12 oggi</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>
                    <Zap size={14} />
                    <span>Node Rank</span>
                  </div>
                  <div className={styles.statValue}>#24</div>
                  <div className={styles.statDelta}>Exosphere</div>
                </div>
              </div>

              {/* Governance Section */}
              <DAOProposals />
            </div>

            <div className={styles.footer}>
              <button className={styles.claimBtn}>Claim All Rewards</button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
