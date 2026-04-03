'use client'

import * as THREE from 'three'

export function SkyDome() {
  return (
    <mesh>
      <sphereGeometry args={[100, 64, 64]} />

      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        uniforms={{
          topColor: { value: new THREE.Color(0x000011) },
          bottomColor: { value: new THREE.Color(0x000000) },
        }}
        vertexShader={`
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;

          void main() {
            float h = normalize(vWorldPosition).y;
            float mixFactor = smoothstep(-0.2, 0.8, h);
            gl_FragColor = vec4(mix(bottomColor, topColor, mixFactor), 1.0);
          }
        `}
      />
    </mesh>
  )
}