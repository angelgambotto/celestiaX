// src/astronomy/planets/mars.ts

export interface PlanetPosition {
  ra: number;
  dec: number;
  distance: number;     // en UA
  magnitude: number;    // brillo aproximado
}

/**
 * Cálculo de posición aparente de Marte desde la Tierra
 */
export function calculateMarsPosition(timestamp: number = Date.now()): PlanetPosition {
  const jd = getJulianDate(timestamp);
  const t = (jd - 2451545.0) / 36525;

  // Elementos orbitales medios de Marte
  const L = (355.453 + 19141.0 * t) % 360;           // Mean longitude
  const M = (19.390 + 19139.8 * t) % 360;            // Mean anomaly

  // Ecuación del centro (Marte tiene órbita más excéntrica)
  const C = 1.850 * Math.sin((M * Math.PI) / 180) +
            0.111 * Math.sin((2 * M * Math.PI) / 180) -
            0.015 * Math.sin((3 * M * Math.PI) / 180);

  const trueLongitude = (L + C) % 360;

  // RA y Dec (aproximación válida para visualización)
  const ra = (trueLongitude + 180) % 360;
  const dec = 1.5 * Math.sin(((trueLongitude - 80) * Math.PI) / 180); // inclinación

  // Distancia Tierra-Marte en UA
  const distance = 1.52 + 0.8 * Math.cos((M * Math.PI) / 180); // varía bastante

  // Magnitud (Marte varía mucho de brillo)
  const magnitude = -1.5 + 5 * Math.log10(distance);

  return {
    ra: (ra + 360) % 360,
    dec: Math.max(Math.min(dec, 25), -25),
    distance: Math.max(distance, 0.4),
    magnitude: Math.max(Math.min(magnitude, 2.5), -2.5),
  };
}

/** Helper: Julian Date */
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