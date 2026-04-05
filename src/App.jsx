import './index.css'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LiveMonitor from './components/LiveMonitor'
import FeatureScroll from './components/FeatureScroll'
import AlertSystem from './components/AlertSystem'
import Stats from './components/Stats'
import Footer from './components/Footer'

function App() {
  const lenisRef = useRef(null)

  useEffect(() => {
    // Smooth cinematic scroll via Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <div className="app-root">
      <Navbar />
      <Hero />
      <LiveMonitor />
      <FeatureScroll />
      <AlertSystem />
      <Stats />
      <Footer />
    </div>
  )
}

export default App
