'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Camera } from './Camera'
import { SkyDome } from './SkyDome'
import { Stars } from './Stars'

export function Scene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      {/* Cámara */}
      <Camera />

      {/* Luces */}
      <ambientLight intensity={0.2} />

      {/* Cielo */}
      <SkyDome />

      {/* Estrellas */}
      <Stars />

      {/* Controles */}
      <OrbitControls
        enableDamping
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}