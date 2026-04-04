// src/astronomy/sun.ts

export interface SunPosition {
  ra: number;      // Right Ascension en grados (0-360)
  dec: number;     // Declination en grados (-90 a +90)
  distance: number;
}

/**
 * Julian Date desde timestamp
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
 * Calcula posición del Sol (mejorada y corregida)
 */
export function calculateSunPosition(timestamp: number = Date.now()): SunPosition {
  const jd = getJulianDate(timestamp);
  const n = jd - 2451545.0;                    // días desde J2000
  const t = n / 36525;                         // siglos julianos

  // Mean longitude (L)
  let L = (280.46646 + 36000.76983 * t) % 360;

  // Mean anomaly (M)
  const M = (357.52911 + 35999.05029 * t) % 360;
  const M_rad = (M * Math.PI) / 180;

  // Equation of the center (C)
  const C = 1.914602 - 0.004817 * t - 0.000014 * t * t;
  const C_deg = C * Math.sin(M_rad) + 0.019993 * Math.sin(2 * M_rad);

  // True ecliptic longitude
  L = (L + C_deg) % 360;

  // Obliquity of the ecliptic
  const epsilon = 23.439 - 0.0000004 * n;

  const L_rad = (L * Math.PI) / 180;
  const eps_rad = (epsilon * Math.PI) / 180;

  // RA y Dec
  const ra = Math.atan2(
    Math.cos(eps_rad) * Math.sin(L_rad),
    Math.cos(L_rad)
  ) * (180 / Math.PI);

  const dec = Math.asin(
    Math.sin(eps_rad) * Math.sin(L_rad)
  ) * (180 / Math.PI);

  return {
    ra: (ra + 360) % 360,
    dec,
    distance: 1.000001,
  };
}