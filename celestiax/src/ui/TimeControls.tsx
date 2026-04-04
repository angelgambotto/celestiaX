// src/ui/TimeControls.tsx
'use client';

import { useTimeStore } from '@/stores/useTimeStore';
import { useState, useEffect } from 'react';

export const TimeControls = () => {
  const { currentTime, setCurrentTime, resetToNow } = useTimeStore();

  const [localValue, setLocalValue] = useState(() =>
    new Date(currentTime).toISOString().slice(0, 16)
  );

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
    const newTime = Date.now() + daysOffset * 24 * 60 * 60 * 1000;
    setCurrentTime(newTime);
  };

  const currentDate = new Date(currentTime);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-6 py-3.5 rounded-2xl flex items-center gap-5 shadow-2xl border border-white/10 z-50">
      {/* Botón Ahora */}
      <button
        onClick={resetToNow}
        className="px-4 py-2 bg-white text-black font-medium rounded-xl hover:bg-white/90 transition-colors whitespace-nowrap"
      >
        Ahora
      </button>

      {/* Input preciso */}
      <input
        type="datetime-local"
        value={localValue}
        onChange={handleDateChange}
        className="bg-transparent border border-white/30 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-white/70 w-48"
      />

      {/* Slider */}
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

      {/* Fecha y hora en una sola línea estable */}
      <div className="text-right font-mono text-sm min-w-[140px] whitespace-nowrap">
        {currentDate.toLocaleDateString('es-AR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })}{' '}
        <span className="text-white/70 text-xs">
          {currentDate.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </div>
  );
};