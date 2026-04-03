'use client'

import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

export function Galaxy() {
  const texture = useLoader(TextureLoader, '/textures/milkyway.jpg')

  return (
    <mesh>
      <sphereGeometry args={[98, 64, 64]} />

      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}