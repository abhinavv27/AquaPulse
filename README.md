# 💧 AquaPulse: Smart Water Usage Monitor

[![Deploy with Vercel](https://vercel.com/button)](https://aquapulse-hrk7jcpax-abhinavv27s-projects.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

> **Every drop, intelligently tracked.** A high-fidelity, futuristic IoT dashboard for real-time household water consumption monitoring.

---

## ✨ Live Experience

🚀 **Check it out here:** [AquaPulse Live Dashboard](https://aquapulse-hrk7jcpax-abhinavv27s-projects.vercel.app/)

---

## 📸 Check it Out

### 🌊 Cinematic Hero
![AquaPulse Hero Interface](./public/previews/hero.png)
*The interactive 3D water sphere serves as the heartbeat of your home monitoring.*

### 📊 Live Analytics Dashboard
![AquaPulse Monitor](./public/previews/monitor.png)
*Real-time SVG gauges and flow-rate charts powered by simulated MQTT streams.*

### 🛠️ Feature Timeline
![AquaPulse Features](./public/previews/features.png)
*Scroll-pinned feature cards explaining the core intelligence of AquaPulse.*

---

## 🚀 Key Features

### 🌌 Cinematic 3D Experience
- **Interactive Water Sphere:** A breathing, organic 3D model built with `React Three Fiber`.
- **Space-Glow Interaction:** Glassmorphic cards with mouse-tracking spotlights and "EcoPulse" green halos.
- **Dynamic Scanlines:** A subtle high-tech CRT scanline overlay providing cinematic depth to the entire UI.

### 📡 Real-Time IoT Intelligence
- **EcoPulse Monitoring:** A rhythmic background pulse that changes frequency based on usage efficiency.
- **ESP32 Ready:** Designed for seamless integration with physical sensor hardware via MQTT.
- **Live Gauges:** Custom SVG ring gauges for flow rate, pressure, and temperature.

### 🚨 Smart Alert System
- **Anomaly Detection:** AI-simulated logic to distinguish between normal usage and potential leaks.
- **Interactive Simulation:** A "Simulate Leak" button that triggers a critical red UI state and pulse notifications.

### 💨 High-End UX
- **Cinematic Scrolling:** Integrated with **Lenis** for buttery-smooth, inertia-based navigation.
- **Glassmorphism:** Premium UI components with ultra-blurred backgrounds and glowing borders.
- **Responsive Motion:** Powered by **Framer Motion** for staggered reveals and parallax effects.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **3D Engine:** Three.js / @react-three/fiber
- **Animations:** Framer Motion / GSAP / Lenis
- **Data Viz:** Recharts
- **Communication:** MQTT (Simulated via async ticks)
- **Deployment:** Vercel Global Edge

---

## 📦 Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/abhinavv27/AquaPulse.git
   cd AquaPulse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Launch the engine**
   ```bash
   npm run dev
   ```

---

## 🗺️ Project Structure

```text
src/
├── components/          # High-fidelity UI & 3D Components
│   ├── HeroCanvas.jsx   # Three.js Scene logic
│   ├── LiveMonitor.jsx  # IoT Gauge & Charting logic
│   ├── AlertSystem.jsx  # Smart notification system
│   └── ...
├── App.jsx              # Smooth scroll & Layout setup
└── index.css            # Global Design Tokens & Glassmorphism utilities
```

---

## 🌿 Future Roadmap

- [ ] **Phase 1:** Native Mobile App via React Native.
- [ ] **Phase 2:** Physical ESP32 Sensor Hardware Integration.
- [ ] **Phase 3:** Predictive Water Bill Forecasting using LSTMs.


