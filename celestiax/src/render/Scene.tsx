// src/render/Scene.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Camera } from './Camera';
import { SkyDome } from './SkyDome';
import { Stars } from './Stars';
import { Galaxy } from './Galaxy';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: '#000000' }}
      gl={{ antialias: true, alpha: false }}
    >
      <Camera />
      <SkyDome />
      <Galaxy />
      <Stars />

      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.5}
        minDistance={3}
        maxDistance={50}
        enablePan={false}
      />
    </Canvas>
  );
}