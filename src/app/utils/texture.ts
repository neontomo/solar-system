import * as THREE from "three";
import { Planet } from "@/app/constants/planets";
import { createNoise3D } from "simplex-noise";

const randomDecBetween = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const createPerlinBasedTextureWithColor = (
  type: string,
  size: number,
  color: THREE.Color,
) => {
  const noise3D = createNoise3D();
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not get 2d context");
  }

  const imageData = context.createImageData(size, size);
  const data = imageData.data;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i * size + j) * 4;
      const value = noise3D(i / size, j / size, 0.5);
      const brightness = Math.floor((value + 1) * 128);

      if (type === "Sun") {
        data[index] = 255 * brightness * randomDecBetween(2, 5);
        data[index + 1] = color.g * brightness * randomDecBetween(2, 5);
        data[index + 2] = color.b * brightness * randomDecBetween(2, 5);
        data[index + 3] = brightness * randomDecBetween(2, 5);
      } else {
        data[index] = color.r * brightness;
        data[index + 1] = color.g * brightness;
        data[index + 2] = color.b * brightness;
        data[index + 3] = 255;
      }
    }
  }

  context.putImageData(imageData, 0, 0);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
};

export const createPlanetMeshes = (planets: Planet[]) => {
  return planets.map((planet) => {
    const geometry = new THREE.SphereGeometry(1, 32, 32);

    const texture = createPerlinBasedTextureWithColor(
      planet.name,
      32,
      new THREE.Color(planet.color),
    );

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(planet.scale * 2, planet.scale * 2, planet.scale * 2);

    if (planet.name === "Saturn") {
      const ringGeometry = new THREE.RingGeometry(1.2, 2, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xd3d3d3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 5 - 0.1;
      mesh.add(ringMesh);
    }

    const sphere = new THREE.Mesh(geometry, material);
    sphere.scale.set(planet.scale * 2, planet.scale * 2, planet.scale * 2);

    return {
      mesh: planet.name === "Saturn" ? mesh : sphere,
      distance: planet.distance,
      orbitalPeriod: planet.orbitalPeriod,
    };
  });
};
