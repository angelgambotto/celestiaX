'use client'

import { PerspectiveCamera } from '@react-three/drei'

export function Camera() {
  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0, 5]}
      fov={60}
      near={0.1}
      far={1000}
    />
  )
}