// src/astronomy/planets/venus.ts

export interface PlanetPosition {
  ra: number;
  dec: number;
  distance: number;   // en UA
  magnitude: number;  // brillo aproximado
}

/**
 * Cálculo simplificado pero preciso de Venus
 */
export function calculateVenusPosition(timestamp: number = Date.now()): PlanetPosition {
  const jd = getJulianDate(timestamp);
  const t = (jd - 2451545.0) / 36525; // siglos desde J2000

  // Elementos orbitales de Venus (aprox)
  const L = (181.979 + 58519.0 * t) % 360;           // Mean longitude
  const M = (50.416 + 58517.8 * t) % 360;            // Mean anomaly

  // Ecuación del centro simplificada para Venus
  const C = 0.775 * Math.sin((M * Math.PI) / 180) + 
            0.034 * Math.sin((2 * M * Math.PI) / 180);

  const trueLongitude = (L + C) % 360;

  // RA y Dec aproximadas (para visualización es suficiente)
  const ra = (trueLongitude + 180) % 360;   // Venus está casi en el plano eclíptico
  const dec = 0.5 * Math.sin(((trueLongitude - 50) * Math.PI) / 180); // pequeña inclinación

  // Distancia al Sol en UA
  const distance = 0.723 + 0.006 * Math.cos((M * Math.PI) / 180);

  // Magnitud (brillo)
  const magnitude = -4.4 + 0.04 * Math.sin((M * Math.PI) / 180); // Venus es muy brillante

  return {
    ra: (ra + 360) % 360,
    dec: Math.max(Math.min(dec, 8), -8),
    distance,
    magnitude,
  };
}

/** Julian Date helper */
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