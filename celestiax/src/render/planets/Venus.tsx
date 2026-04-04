// src/render/planets/Venus.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTimeStore } from '@/stores/useTimeStore';
import { calculateVenusPosition } from '@/astronomy/planets/venus';
import * as THREE from 'three';

export function Venus() {
  const groupRef = useRef<THREE.Group>(null!);
  const { currentTime } = useTimeStore();

  useEffect(() => {
    const pos = calculateVenusPosition(currentTime);

    const raRad = (pos.ra * Math.PI) / 180;
    const decRad = (pos.dec * Math.PI) / 180;
    const radius = 92; // más cerca que la Luna

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  }, [currentTime]);

  // Rotación lenta de Venus
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Venus principal */}
      <mesh>
        <sphereGeometry args={[0.95]} />
        <meshPhongMaterial
          color="#E0C090"
          shininess={12}
          specular="#ffffff"
          emissive="#332211"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Atmósfera brillante */}
      <mesh>
        <sphereGeometry args={[1.12]} />
        <meshPhongMaterial
          color="#F0D0A0"
          transparent
          opacity={0.25}
          shininess={30}
        />
      </mesh>

      {/* Glow externo */}
      <mesh>
        <sphereGeometry args={[1.35]} />
        <meshBasicMaterial
          color="#FFE0B0"
          transparent
          opacity={0.08}
        />
      </mesh>

      <pointLight color="#FFE0B0" intensity={1.2} distance={120} decay={2} />
    </group>
  );
}