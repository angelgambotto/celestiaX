'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Camera } from './Camera'
import { SkyDome } from './SkyDome'
import { Stars } from './Stars'
import { Galaxy } from './Galaxy'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
      <Camera />

      <SkyDome />
      <Galaxy />
      <Stars />

      <OrbitControls
        enableDamping
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={30}
      />
    </Canvas>
  )
}