// src/astronomy/planets/jupiter.ts

export interface PlanetPosition {
  ra: number;
  dec: number;
  distance: number;      // en UA
  magnitude: number;     // brillo
}

/**
 * Posición aparente de Júpiter desde la Tierra
 */
export function calculateJupiterPosition(timestamp: number = Date.now()): PlanetPosition {
  const jd = getJulianDate(timestamp);
  const t = (jd - 2451545.0) / 36525;

  // Elementos orbitales de Júpiter
  const L = (34.351 + 3036.3 * t) % 360;           // Mean longitude
  const M = (19.650 + 3035.5 * t) % 360;           // Mean anomaly

  // Ecuación del centro (Júpiter tiene órbita bastante circular)
  const C = 5.20 * Math.sin((M * Math.PI) / 180) + 
            0.26 * Math.sin((2 * M * Math.PI) / 180);

  const trueLongitude = (L + C) % 360;

  // RA y Dec
  const ra = (trueLongitude + 180) % 360;
  const dec = 1.3 * Math.sin(((trueLongitude - 100) * Math.PI) / 180);

  // Distancia aproximada
  const distance = 5.20 + 0.4 * Math.cos((M * Math.PI) / 180);

  // Magnitud (Júpiter es muy brillante)
  const magnitude = -2.7 + 5 * Math.log10(distance);

  return {
    ra: (ra + 360) % 360,
    dec: Math.max(Math.min(dec, 22), -22),
    distance,
    magnitude: Math.max(Math.min(magnitude, 0), -3),
  };
}

/** Helper Julian Date */
function getJulianDate(timestamp: number): number {
  const date = new Date(timestamp);
  const a = Math.floor((14 - date.getUTCMonth() - 1) / 12);
  const y = date.getUTCFullYear() + 4800 - a;
  const m = date.getUTCMonth() + 1 + 12 * a - 3;

  let jd = date.getUTCDate() +
           Math.floor((153 * m + 2) / 5) +
           365 * y +
           Math.floor(y / 4) -
           Math.floor(y / 100) +
           Math.floor(y / 400) -
           32045;

  jd += (date.getUTCHours() - 12) / 24 +
        date.getUTCMinutes() / 1440 +
        date.getUTCSeconds() / 86400;

  return jd;
}