// src/render/Moon.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTimeStore } from '@/stores/useTimeStore';
import { calculateMoonPosition } from '@/astronomy/moon';
import * as THREE from 'three';

export function Moon() {
  const groupRef = useRef<THREE.Group>(null!);
  const moonMeshRef = useRef<THREE.Mesh>(null!);
  const { currentTime } = useTimeStore();

  // Actualizar posición y fase
  useEffect(() => {
    const moonPos = calculateMoonPosition(currentTime);

    const raRad = (moonPos.ra * Math.PI) / 180;
    const decRad = (moonPos.dec * Math.PI) / 180;
    const radius = 94;

    const x = radius * Math.cos(decRad) * Math.cos(raRad);
    const y = radius * Math.sin(decRad);
    const z = radius * Math.cos(decRad) * Math.sin(raRad);

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }

    // Aplicar fase visual
    if (moonMeshRef.current) {
      const material = moonMeshRef.current.material as THREE.MeshPhongMaterial;
      
      // Intensidad del lado iluminado según fase
      const illuminated = Math.max(0.15, Math.sin(moonPos.phase * Math.PI * 2) * 0.85 + 0.15);
      
      material.emissiveIntensity = illuminated * 0.2;
      material.shininess = 6;
    }
  }, [currentTime]);

  // Rotación lenta
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Luna principal con material que responde a fases */}
      <mesh ref={moonMeshRef}>
        <sphereGeometry args={[1.18]} />
        <meshPhongMaterial
          color="#e8e8e8"
          shininess={6}
          specular="#444444"
          emissive="#222222"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Cráteres (se mantienen visibles en la parte iluminada) */}
      <mesh position={[0.45, 0.35, 0.55]}>
        <sphereGeometry args={[0.23]} />
        <meshPhongMaterial color="#c8c8c8" shininess={2} />
      </mesh>
      <mesh position={[-0.55, -0.2, 0.65]}>
        <sphereGeometry args={[0.29]} />
        <meshPhongMaterial color="#bbbbbb" shininess={2} />
      </mesh>
      <mesh position={[0.15, -0.5, -0.75]}>
        <sphereGeometry args={[0.19]} />
        <meshPhongMaterial color="#d0d0d0" shininess={2} />
      </mesh>

      {/* Halo suave */}
      <mesh>
        <sphereGeometry args={[1.6]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.07}
        />
      </mesh>

      {/* Luz suave emitida por la Luna */}
      <pointLight
        color="#bbbbbb"
        intensity={0.7}
        distance={90}
        decay={2}
      />
    </group>
  );
}