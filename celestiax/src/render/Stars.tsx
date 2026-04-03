'use client'

import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const STAR_COUNT = 4000
const RADIUS = 95

export function Stars() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3)
    const colors = new Float32Array(STAR_COUNT * 3)
    const sizes = new Float32Array(STAR_COUNT)

    const color = new THREE.Color()

    for (let i = 0; i < STAR_COUNT; i++) {
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)

      const x = RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = RADIUS * Math.sin(phi) * Math.sin(theta)
      const z = RADIUS * Math.cos(phi)

      positions.set([x, y, z], i * 3)

      // color
      const r = Math.random()
      if (r < 0.7) color.setRGB(1, 1, 1)
      else if (r < 0.9) color.setRGB(0.6, 0.8, 1)
      else color.setRGB(1, 0.6, 0.4)

      colors.set([color.r, color.g, color.b], i * 3)

      sizes[i] = Math.random() * 2 + 0.5
    }

    return { positions, colors, sizes }
  }, [])

  // animación (twinkle)
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
    }
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>

      <shaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          uniform float uTime;

          void main() {
            vColor = color;

            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

            // ✨ TWINKLE
            float twinkle = sin(uTime * 2.0 + position.x * 10.0) * 0.5 + 0.5;

            gl_PointSize = size * (3.0 + twinkle * 3.0) * (300.0 / -mvPosition.z);

            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;

          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            
            // ✨ GLOW radial
            float intensity = 1.0 - smoothstep(0.0, 0.5, dist);

            gl_FragColor = vec4(vColor * intensity, intensity);
          }
        `}
      />
    </points>
  )
}