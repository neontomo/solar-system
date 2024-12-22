import * as THREE from "three";

const clampCameraPosition = (
  camera: THREE.PerspectiveCamera,
  min: number,
  max: number,
) => {
  if (camera.position.z < min) {
    camera.position.z = min;
  }
  if (camera.position.z > max) {
    camera.position.z = max;
  }
  if (camera.position.x < min) {
    camera.position.x = min;
  }
  if (camera.position.x > max) {
    camera.position.x = max;
  }
  if (camera.position.y < min) {
    camera.position.y = min;
  }
  if (camera.position.y > max) {
    camera.position.y = max;
  }
};

export const handleWheel = (
  event: WheelEvent,
  camera: THREE.PerspectiveCamera,
  setLookingAtPlanetIndex: (index: number | null) => void,
) => {
  camera.position.z += event.deltaY * 0.1;
  camera.position.x += event.deltaX * 0.1;
  setLookingAtPlanetIndex(null);
  clampCameraPosition(camera, -100, 100);
};

export const handleMouseMove = (
  event: MouseEvent,
  camera: THREE.PerspectiveCamera,
  setLookingAtPlanetIndex: (index: number | null) => void,
) => {
  // fps type camera movement
  if (event.buttons === 1) {
    camera.position.x -= event.movementX * 0.1;
    camera.position.y += event.movementY * 0.1;
  } else {
    // no click but moving mouse
    // player stays put, camera moves
    // camera.lookAt(0, 0, 0)
    camera.position.x -= event.movementX * 0.1;
    camera.position.y += event.movementY * 0.1;
  }

  setLookingAtPlanetIndex(null);
  clampCameraPosition(camera, -100, 100);
};

export const handleKeyDown = (
  event: KeyboardEvent,
  camera: THREE.PerspectiveCamera,
  setLookingAtPlanetIndex: (index: number | null) => void,
) => {
  const speed = 5;
  switch (event.key.toLowerCase()) {
    case "arrowup":
      setLookingAtPlanetIndex(null);
      camera.position.z -= speed;
      break;
    case "arrowdown":
      setLookingAtPlanetIndex(null);
      camera.position.z += speed;
      break;
    case "arrowleft":
      setLookingAtPlanetIndex(null);
      camera.position.x -= speed;
      break;
    case "arrowright":
      setLookingAtPlanetIndex(null);
      camera.position.x += speed;
      break;
    case "o":
      setLookingAtPlanetIndex(null);

      if (camera.position.y === 50) {
        camera.position.set(0, 0, 100);
        camera.lookAt(0, 0, 0);
      } else {
        camera.position.set(0, 50, 0);
        camera.lookAt(0, 0, 0);
      }
      break;
    case "r":
      setLookingAtPlanetIndex(null);
      camera.position.set(0, 10, 40);
      camera.lookAt(0, 0, 0);

      break;
    case "1":
      setLookingAtPlanetIndex(0);
      break;
    case "2":
      setLookingAtPlanetIndex(1);
      break;
    case "3":
      setLookingAtPlanetIndex(2);
      break;
    case "4":
      setLookingAtPlanetIndex(3);
      break;
    case "5":
      setLookingAtPlanetIndex(4);
      break;
    case "6":
      setLookingAtPlanetIndex(5);
      break;
    case "7":
      setLookingAtPlanetIndex(6);
      break;
    case "8":
      setLookingAtPlanetIndex(7);
      break;
    case "9":
      setLookingAtPlanetIndex(8);
      break;
    case "0":
      setLookingAtPlanetIndex(9);
      break;
  }
};
