import { PerspectiveCamera } from "three";
import { distY, NUM_ROWS } from "../../../CONFIG/config";
const aspect = window.innerWidth / window.innerHeight;
const fov = 60;
const near = 1.0;
const far = 12000.0;
const camera = new PerspectiveCamera(fov, aspect, near, far);

export const updateCamPos = () => {
  camera.position.set(
    // -(distX - 10) * NUM_SEATS_IN_A_ROW,
    -20,
    Math.max(NUM_ROWS * 20 + 200, 800),
    -NUM_ROWS * distY * 1.3
  );
};

const myCam = () => {
  updateCamPos();
  return camera;
};

export default myCam;
