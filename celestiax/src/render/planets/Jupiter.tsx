// src/render/planets/Jupiter.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTimeStore } from '@/stores/useTimeStore';
import { calculateJupiterPosition } from '@/astronomy/planets/jupiter';
import * as THREE from 'three';

export function Jupiter() {
  const groupRef = useRef<THREE.Group>(null!);
  const { currentTime } = useTimeStore();

  useEffect(() => {
    const pos = calculateJupiterPosition(currentTime);

    const raRad = (pos.ra * Math.PI) / 180;
    const decRad = (pos.dec * Math.PI) / 180;
    const radius = 85; // más lejos que los planetas interiores

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  }, [currentTime]);

  // Rotación rápida (Júpiter rota en ~10 horas)
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Júpiter principal */}
      <mesh>
        <sphereGeometry args={[1.65]} />
        <meshPhongMaterial
          color="#D8C9A8"
          shininess={8}
          specular="#666666"
          emissive="#221100"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Bandas atmosféricas simuladas */}
      <mesh>
        <sphereGeometry args={[1.72]} />
        <meshPhongMaterial
          color="#B8A37A"
          transparent
          opacity={0.35}
          shininess={5}
        />
      </mesh>

      {/* Glow suave */}
      <mesh>
        <sphereGeometry args={[1.95]} />
        <meshBasicMaterial
          color="#E0D0B0"
          transparent
          opacity={0.07}
        />
      </mesh>

      <pointLight color="#E8D8B0" intensity={1.1} distance={140} decay={2} />
    </group>
  );
}