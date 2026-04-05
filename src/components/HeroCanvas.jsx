import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

function WaterDroplet() {
  const meshRef = useRef()
  const distortRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.18
    meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.08
    // Breathing scale
    const scale = 1 + Math.sin(t * 0.9) * 0.04
    meshRef.current.scale.setScalar(scale)
    // Dynamic distortion
    distortRef.current.distort = 0.28 + Math.sin(t * 0.7) * 0.12
  })

  return (
    <Sphere ref={meshRef} args={[1.8, 128, 128]}>
      <MeshDistortMaterial
        ref={distortRef}
        color="#0077b6"
        emissive="#00c8ff"
        emissiveIntensity={0.4}
        metalness={0.1}
        roughness={0.05}
        distort={0.3}
        speed={1.8}
        transparent
        opacity={0.92}
        envMapIntensity={1.2}
      />
    </Sphere>
  )
}

function AmbientParticles() {
  const points = useRef()
  const particleCount = 600
  
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    points.current.rotation.y = clock.getElapsedTime() * 0.03
    points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00c8ff" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

function RingOrbit() {
  const ring1 = useRef()
  const ring2 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ring1.current.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.3) * 0.1
    ring1.current.rotation.z = t * 0.12
    ring2.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.4) * 0.1
    ring2.current.rotation.z = -t * 0.09
  })

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.008, 8, 120]} />
        <meshBasicMaterial color="#00c8ff" transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.5, 0.005, 8, 120]} />
        <meshBasicMaterial color="#0077b6" transparent opacity={0.18} />
      </mesh>
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={3} color="#00c8ff" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#0077b6" />
      <pointLight position={[0, -4, -2]} intensity={1} color="#00e5ff" />
      
      <Stars radius={60} depth={30} count={1200} factor={3} saturation={0.5} fade speed={0.5} />
      <AmbientParticles />
      <WaterDroplet />
      <RingOrbit />
    </Canvas>
  )
}
