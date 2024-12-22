import * as THREE from "three";

export type Planet = {
  name: string;
  color: string;
  distance: number;
  scale: number;
  orbitalPeriod: number;
  eccentricity: number; // Added eccentricity property
};

export const planets: Planet[] = [
  {
    name: "Sun",
    color: "#FFCC00",
    distance: 0,
    scale: 4,
    orbitalPeriod: 1,
    eccentricity: 0,
  },
  {
    name: "Mercury",
    color: "#B8B8B8",
    distance: 12,
    scale: 0.028,
    orbitalPeriod: 0.24,
    eccentricity: 0.206, // Most eccentric of the planets
  },
  {
    name: "Venus",
    color: "#FF6600",
    distance: 20,
    scale: 0.07,
    orbitalPeriod: 0.62,
    eccentricity: 0.007, // Nearly circular
  },
  {
    name: "Earth",
    color: "#1E90FF",
    distance: 28,
    scale: 0.073,
    orbitalPeriod: 1,
    eccentricity: 0.017, // Nearly circular
  },
  {
    name: "Mars",
    color: "#B22222",
    distance: 36,
    scale: 0.039,
    orbitalPeriod: 1.88,
    eccentricity: 0.093, // Noticeably elliptical
  },
  {
    name: "Jupiter",
    color: "#D2691E",
    distance: 50,
    scale: 0.803,
    orbitalPeriod: 11.86,
    eccentricity: 0.048,
  },
  {
    name: "Saturn",
    color: "#FFD700",
    distance: 68,
    scale: 0.669,
    orbitalPeriod: 29.46,
    eccentricity: 0.054,
  },
  {
    name: "Uranus",
    color: "#00CED1",
    distance: 86,
    scale: 0.291,
    orbitalPeriod: 84.01,
    eccentricity: 0.047,
  },
  {
    name: "Neptune",
    color: "#0000CD",
    distance: 104,
    scale: 0.283,
    orbitalPeriod: 164.8,
    eccentricity: 0.009, // Nearly circular
  },
  {
    name: "Pluto",
    color: "#8B4513",
    distance: 122,
    scale: 0.014,
    orbitalPeriod: 248.09,
    eccentricity: 0.248, // Highly eccentric
  },
];

export function createOrbit(distance: number) {
  const curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    distance,
    distance, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0, // aRotation
  );

  const points = curve.getPoints(100); // Increased point count for smoother curves
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: "#aaa" });

  const ellipse = new THREE.Line(geometry, material);
  ellipse.rotation.x = Math.PI / 2; // Rotate to make it horizontal

  return ellipse;
}
