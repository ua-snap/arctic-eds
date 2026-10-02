// Alaska Albers equal-area conic (the shape of EPSG:3338: standard
// parallels 55°N and 65°N, origin 50°N 154°W), on a unit sphere. Good enough
// to place a dot on the small outline in app/data/alaskaOutline.js, which was
// drawn with this same function.
const rad = Math.PI / 180
const phi1 = 55 * rad
const phi2 = 65 * rad
const phi0 = 50 * rad
const lambda0 = -154 * rad

const n = (Math.sin(phi1) + Math.sin(phi2)) / 2
const C = Math.cos(phi1) ** 2 + 2 * n * Math.sin(phi1)
const rho0 = Math.sqrt(C - 2 * n * Math.sin(phi0)) / n

// Returns [x, y] with y increasing northward.
export function alaskaAlbers(lat, lng) {
  // The Aleutians cross the antimeridian; keep them west of Alaska.
  if (lng > 0) lng -= 360
  const rho = Math.sqrt(C - 2 * n * Math.sin(lat * rad)) / n
  const theta = n * (lng * rad - lambda0)
  return [rho * Math.sin(theta), rho0 - rho * Math.cos(theta)]
}
