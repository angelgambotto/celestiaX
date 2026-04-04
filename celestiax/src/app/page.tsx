// src/app/page.tsx
'use client';

import { Scene } from '@/render/Scene';
import { TimeControls } from '@/ui/TimeControls';

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Render 3D */}
      <Scene />

      {/* Controles de UI (overlay) */}
      <TimeControls />

      {/* Futuros overlays irán acá también (búsqueda, info, etc.) */}
    </main>
  );
}