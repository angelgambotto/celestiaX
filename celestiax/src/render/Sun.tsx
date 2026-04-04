// src/render/Sun.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTimeStore } from '@/stores/useTimeStore';
import { calculateSunPosition } from '@/astronomy/sun';
import * as THREE from 'three';

export function Sun() {
  const groupRef = useRef<THREE.Group>(null!);
  const coronaRef = useRef<THREE.Mesh>(null!);
  const { currentTime } = useTimeStore();

  // Actualizar posición según tiempo astronómico
  useEffect(() => {
    const sunPos = calculateSunPosition(currentTime);

    const raRad = (sunPos.ra * Math.PI) / 180;
    const decRad = (sunPos.dec * Math.PI) / 180;
    const radius = 98; // un poco más cerca que las estrellas

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  }, [currentTime]);

  // Rotación suave del Sol
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= delta * 0.08; // corona rota en sentido contrario
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sol principal (emisor de luz) */}
      <mesh>
        <sphereGeometry args={[1.8]} />
        <meshBasicMaterial 
          color="#FFEECC" 
          transparent 
          opacity={0.95}
        />
      </mesh>

      {/* Corona interna brillante */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.4]} />
        <meshBasicMaterial 
          color="#FFDD88" 
          transparent 
          opacity={0.35}
        />
      </mesh>

      {/* Halo externo suave */}
      <mesh>
        <sphereGeometry args={[3.8]} />
        <meshBasicMaterial 
          color="#FFBB66" 
          transparent 
          opacity={0.12}
        />
      </mesh>

      {/* Luz que ilumina la escena */}
      <pointLight
        color="#FFF8E1"
        intensity={3.5}
        distance={400}
        decay={2}
      />

      {/* Luz ambiental sutil del Sol */}
      <ambientLight 
        color="#FFF8E1" 
        intensity={0.15} 
      />
    </group>
  );
}