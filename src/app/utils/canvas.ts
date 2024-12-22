import * as THREE from "three";
import { Planet, createOrbit } from "@/app/constants/planets";

export const setupCanvas = (
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  mountNode: React.MutableRefObject<HTMLDivElement | null>,
  planetMeshes: {
    mesh: THREE.Mesh;
    distance: number;
    orbitalPeriod: number;
  }[],
  planets: Planet[],
) => {
  camera.position.set(0, 10, 40);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  mountNode.current?.appendChild(renderer.domElement);

  planets.forEach((planet, index) => {
    scene.add(planetMeshes[index].mesh);
    scene.add(createOrbit(planet.distance));
  });

  return renderer;
};
