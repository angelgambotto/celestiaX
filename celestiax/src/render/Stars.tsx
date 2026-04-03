'use client'

import { useMemo } from 'react'

const STAR_COUNT = 2000
const RADIUS = 90

export function Stars() {
  const positions = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      const x = RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = RADIUS * Math.sin(phi) * Math.sin(theta)
      const z = RADIUS * Math.cos(phi)

      positions.set([x, y, z], i * 3)
    }

    return positions
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.7}
        sizeAttenuation
        color="white"
      />
    </points>
  )
}