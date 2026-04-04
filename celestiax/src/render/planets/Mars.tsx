// src/render/planets/Mars.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTimeStore } from '@/stores/useTimeStore';
import { calculateMarsPosition } from '@/astronomy/planets/mars';
import * as THREE from 'three';

export function Mars() {
  const groupRef = useRef<THREE.Group>(null!);
  const { currentTime } = useTimeStore();

  useEffect(() => {
    const pos = calculateMarsPosition(currentTime);

    const raRad = (pos.ra * Math.PI) / 180;
    const decRad = (pos.dec * Math.PI) / 180;
    const radius = 90; // un poco más cerca que Venus

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  }, [currentTime]);

  // Rotación
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Marte principal (color rojizo característico) */}
      <mesh>
        <sphereGeometry args={[0.85]} />
        <meshPhongMaterial
          color="#CD5C5C"
          shininess={5}
          specular="#222222"
          emissive="#331100"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Atmósfera tenue rojiza */}
      <mesh>
        <sphereGeometry args={[0.98]} />
        <meshPhongMaterial
          color="#FF7755"
          transparent
          opacity={0.18}
          shininess={10}
        />
      </mesh>

      {/* Glow sutil */}
      <mesh>
        <sphereGeometry args={[1.18]} />
        <meshBasicMaterial
          color="#FF9966"
          transparent
          opacity={0.06}
        />
      </mesh>

      <pointLight color="#FFAA77" intensity={0.9} distance={110} decay={2} />
    </group>
  );
}