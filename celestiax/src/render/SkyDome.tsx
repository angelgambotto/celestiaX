'use client'

import * as THREE from 'three'

export function SkyDome() {
  return (
    <mesh>
      {/* esfera gigante */}
      <sphereGeometry args={[100, 64, 64]} />

      {/* material invertido (clave) */}
      <meshBasicMaterial
        color="black"
        side={THREE.BackSide}
      />
    </mesh>
  )
}