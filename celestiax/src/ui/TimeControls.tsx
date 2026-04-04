// src/ui/TimeControls.tsx
'use client';

import { useTimeStore } from '@/stores/useTimeStore';
import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const speedOptions = [
  { label: '1x',   value: 1 },
  { label: '60x',  value: 60 },
  { label: '1h/s', value: 3600 },
  { label: '1d/s', value: 86400 },
  { label: '7d/s', value: 604800 },
  { label: '30d/s',value: 2592000 },
];

export const TimeControls = () => {
  const { 
    currentTime, 
    isPlaying, 
    speed,
    setCurrentTime, 
    resetToNow, 
    togglePlay,
    setSpeed 
  } = useTimeStore();

  const [localValue, setLocalValue] = useState(() =>
    new Date(currentTime).toISOString().slice(0, 16)
  );

  const lastUpdateRef = useRef(Date.now());

  // Simulación de tiempo
  useEffect(() => {
    let rafId: number;

    const tick = () => {
      if (!isPlaying) return;

      const now = Date.now();
      const deltaMs = now - lastUpdateRef.current;
      lastUpdateRef.current = now;

      const simulatedDelta = deltaMs * speed;
      setCurrentTime(currentTime + simulatedDelta);

      rafId = requestAnimationFrame(tick);
    };

    if (isPlaying) {
      lastUpdateRef.current = Date.now();
      rafId = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, speed, currentTime, setCurrentTime]);

  // Sincronizar input
  useEffect(() => {
    setLocalValue(new Date(currentTime).toISOString().slice(0, 16));
  }, [currentTime]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setCurrentTime(newDate.getTime());
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const daysOffset = Number(e.target.value);
    setCurrentTime(Date.now() + daysOffset * 24 * 60 * 60 * 1000);
  };

  const currentDate = new Date(currentTime);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl border border-white/10 z-50">
      
      {/* Play / Pause */}
      <button
        onClick={togglePlay}
        className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
      >
        {isPlaying ? <Pause size={22} /> : <Play size={22} fill="white" />}
      </button>

      {/* Reset */}
      <button
        onClick={resetToNow}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-2 transition-colors"
      >
        <RotateCcw size={18} />
        Ahora
      </button>

      {/* Velocidades */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1">
        {speedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSpeed(option.value)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              speed === option.value 
                ? 'bg-white text-black' 
                : 'hover:bg-white/10'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Input fecha/hora */}
      <input
        type="datetime-local"
        value={localValue}
        onChange={handleDateChange}
        className="bg-transparent border border-white/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-white/70 w-48"
      />

      {/* Slider de días */}
      <div className="flex items-center gap-3 w-64">
        <span className="text-xs text-white/50 tabular-nums">−10y</span>
        <input
          type="range"
          min="-3650"
          max="3650"
          value={Math.round((currentTime - Date.now()) / (24 * 60 * 60 * 1000))}
          onChange={handleSliderChange}
          className="flex-1 accent-white cursor-pointer"
        />
        <span className="text-xs text-white/50 tabular-nums">+10y</span>
      </div>

      {/* Fecha y hora */}
      <div className="text-right font-mono text-sm min-w-[145px] whitespace-nowrap">
        {currentDate.toLocaleDateString('es-AR', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        })}{' '}
        <span className="text-white/70 text-xs">
          {currentDate.toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};