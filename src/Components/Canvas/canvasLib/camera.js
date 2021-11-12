import { PerspectiveCamera } from "three";
import {
  distX,
  distY,
  NUM_ROWS,
  NUM_SEATS_IN_A_ROW,
} from "../../../CONFIG/config";
const aspect = window.innerWidth / window.innerHeight;
const fov = 60;
const near = 1.0;
const far = 5000.0;
const camera = new PerspectiveCamera(fov, aspect, near, far);

// export const updateCamPos = () => {
//   camera.position.set(-newPos / 4, newPos * 1.5, -newPos);
// };

const myCam = pos => {
  camera.position.set(
    -distX * NUM_SEATS_IN_A_ROW,
    NUM_ROWS * 20,
    (-NUM_ROWS * distY) / 1.3
  );
  return camera;
};

export default myCam;
