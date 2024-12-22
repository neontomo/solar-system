import * as THREE from "three";

export function addLabelToPlanet(
  planetMesh: THREE.Mesh,
  labelText: string,
  planetScale: number,
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not get 2D context");
  }
  context.font = "18px Arial";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(labelText, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(planetScale * 2, planetScale, planetScale);
  planetMesh.add(sprite);

  sprite.position.y = 2;
  sprite.position.x = 1;
  sprite.position.z = 1;

  return sprite;
}
