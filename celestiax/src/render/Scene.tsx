'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Camera } from './Camera'

export function Scene() {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true }}
    >
      {/* Cámara */}
      <Camera />

      {/* Luces */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1} />

      {/* Objeto de prueba (cubo) */}
      <mesh>
        {/* <boxGeometry args={[1, 2, 1]} /> */}
        <sphereGeometry args={[2]}/>
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Controles */}
      <OrbitControls enableDamping />
    </Canvas>
  )
}