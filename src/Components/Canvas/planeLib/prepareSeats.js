import { InstancedMesh, Object3D } from "three";
import {
  NUM_ROWS,
  NUM_SEATS_IN_A_ROW,
  seatParts,
} from "../../../CONFIG/config";

const distX = 30,
  distY = 60;

//'1', '2', '3', 'belt', 'head', 'back', 'seat'   InstancedMeshes
const prepareSeats = () => {
  //create InstancedMeshes and return them
  const instancedMeshes = {};
  const numOfSeats = NUM_ROWS * NUM_SEATS_IN_A_ROW;
  seatParts.forEach(
    part =>
      (instancedMeshes[part.name] = new InstancedMesh(
        part.geometry,
        part.material,
        numOfSeats
      ))
  );

  const positionHelper = new Object3D();

  let x, y;
  const setPositions = (instancedMesh, z = 0) => {
    for (let i = 0; i < numOfSeats; i++) {
      y = Math.floor(i / NUM_SEATS_IN_A_ROW);
      x = i % NUM_SEATS_IN_A_ROW;

      positionHelper.position.set(x * distX, y * distY, z);
      positionHelper.scale.set(0.05, 0.05, 0.05);
      positionHelper.updateMatrix();

      instancedMesh.setMatrixAt(i, positionHelper.matrix);
      instancedMesh.instanceMatrix.needsUpdate = true;
    }
  };
  Object.values(instancedMeshes).forEach(iM => setPositions(iM));

  return instancedMeshes;
};

export default prepareSeats;
