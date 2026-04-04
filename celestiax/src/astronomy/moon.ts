// src/astronomy/moon.ts

export interface MoonPosition {
  ra: number;      // Right Ascension en grados
  dec: number;     // Declination en grados
  distance: number; // km (aprox)
  phase: number;   // 0 a 1 (0 = Luna Nueva, 0.5 = Luna Llena)
}

/**
 * Julian Date
 */
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

/**
 * Cálculo simplificado pero bastante preciso de la Luna
 */
export function calculateMoonPosition(timestamp: number = Date.now()): MoonPosition {
  const jd = getJulianDate(timestamp);
  const t = (jd - 2451545.0) / 36525; // siglos desde J2000

  // Mean elements
  const L = (218.316 + 481267.8813 * t) % 360;           // Mean longitude
  const M = (134.963 + 477198.867 * t) % 360;            // Mean anomaly
  const F = (93.272 + 483202.018 * t) % 360;             // Mean distance from node

  // Simplified perturbations
  const longitude = L + 6.289 * Math.sin((M * Math.PI) / 180) +
                         1.274 * Math.sin((2 * (L - M) * Math.PI) / 180) +
                         0.658 * Math.sin((2 * L * Math.PI) / 180);

  const latitude = 5.128 * Math.sin((F * Math.PI) / 180) +
                   0.280 * Math.sin((2 * (F - M) * Math.PI) / 180);

  // Distance (km)
  const distance = 385000 - 21000 * Math.cos((M * Math.PI) / 180);

  // Phase (0 = new moon, 0.5 = full moon)
  const phase = ((longitude - L + 180) % 360) / 360;

  // RA / Dec aproximado
  const ra = (longitude + 180) % 360;   // simplificación aceptable para visual
  const dec = latitude;

  return {
    ra: (ra + 360) % 360,
    dec: Math.max(Math.min(dec, 28), -28), // clamp realista
    distance,
    phase: (phase + 1) % 1,
  };
}