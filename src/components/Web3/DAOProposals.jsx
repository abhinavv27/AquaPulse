import { motion } from 'framer-motion'
import { CheckCircle2, Circle, TrendingUp, Users } from 'lucide-react'
import styles from './DAOProposals.module.css'

const PROPOSALS = [
  {
    id: 'AP-01',
    title: 'Rainwater Harvesting Subsidy',
    votes: 1420,
    needed: 2000,
    ends: '2d 4h',
    status: 'ACTIVE',
    impact: 'High'
  },
  {
    id: 'AP-02',
    title: 'Smart Leak Detection Node upgrade',
    votes: 890,
    needed: 1000,
    ends: '12h 15m',
    status: 'URGENT',
    impact: 'Critical'
  }
]

export default function DAOProposals() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.topInfo}>
          <div className={styles.iconBox}>
            <TrendingUp size={16} color="#00f2ff" />
          </div>
          <div className={styles.statsRow}>
            <span className={styles.stat}><Users size={12} /> 1.2k Voters</span>
            <span className={styles.stat}><CheckCircle2 size={12} /> 4 Passed</span>
          </div>
        </div>
        <h3 className={styles.title}>Governance Hub</h3>
        <p className={styles.desc}>Vote on initiatives with your H2O Credits.</p>
      </div>

      <div className={styles.proposalList}>
        {PROPOSALS.map((prop) => (
          <motion.div 
            key={prop.id} 
            className={styles.proposalCard}
            whileHover={{ x: 4 }}
          >
            <div className={styles.cardHeader}>
              <span className={prop.status === 'URGENT' ? styles.urgentTag : styles.activeTag}>
                {prop.status}
              </span>
              <span className={styles.impact}>Impact: {prop.impact}</span>
            </div>
            
            <h4 className={styles.propTitle}>{prop.title}</h4>
            
            <div className={styles.voteSection}>
              <div className={styles.voteLabels}>
                <span>{prop.votes} / {prop.needed} H2O</span>
                <span>{prop.ends} left</span>
              </div>
              <div className={styles.voteTrack}>
                <motion.div 
                  className={styles.voteProgress} 
                  initial={{ width: 0 }}
                  animate={{ width: `${(prop.votes / prop.needed) * 100}%` }}
                />
              </div>
            </div>

            <button className={styles.voteBtn}>
              <Circle size={14} className={styles.btnIcon} />
              Cast Vote
            </button>
          </motion.div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.viewAll}>View History →</button>
      </div>
    </div>
  )
}
