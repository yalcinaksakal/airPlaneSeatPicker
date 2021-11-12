import { PerspectiveCamera } from "three";
const aspect = window.innerWidth / window.innerHeight;
const fov = 60;
const near = 1.0;
const far = 5000.0;
const camera = new PerspectiveCamera(fov, aspect, near, far);

const myCam = pos => {
  camera.position.set(0, 500, -200);
  return camera;
};

export default myCam;
