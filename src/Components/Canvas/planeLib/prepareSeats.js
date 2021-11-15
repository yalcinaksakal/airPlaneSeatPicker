import { InstancedMesh, MeshBasicMaterial, Object3D } from "three";
import {
  distX,
  distY,
  halfCoridor,
  NUM_ROWS,
  NUM_SEATS_IN_A_ROW,
  seatParts,
} from "../../../CONFIG/config";

//'1', '2', '3', 'belt', 'head', 'back', 'seat'   InstancedMeshes
const prepareSeats = () => {
  //create InstancedMeshes and return them
  const instancedMeshes = {};
  const headMaterial = new MeshBasicMaterial({
    color: "#dddddd",
  });
  const numOfSeats = NUM_ROWS * NUM_SEATS_IN_A_ROW;
  seatParts.forEach(
    part =>
      (instancedMeshes[part.name] = new InstancedMesh(
        part.geometry,
        part.name === "head" ? headMaterial : part.material,
        numOfSeats
      ))
  );

  let x, y, positionHelper;
  const adujustBaseParts = (x, y) => {
    positionHelper.rotateZ(Math.PI / 2);
    positionHelper.rotateY(-Math.PI / 2);
    positionHelper.rotateX(Math.PI);
    positionHelper.position.set(x, 215, y - 54);
  };
  const adjustSeatParts = (x, y) => {
    positionHelper.rotateY(-Math.PI);
    positionHelper.rotateX(-Math.PI / 2);
    positionHelper.position.set(x, 215, y);
  };
  const yShift = (-distY * NUM_ROWS) / 2;

  const setPositions = (instancedMesh, name) => {
    for (let i = 0; i < numOfSeats; i++) {
      y = Math.floor(i / NUM_SEATS_IN_A_ROW);
      y = (y >= NUM_ROWS / 2.3 ? halfCoridor : 0) + y * distY + yShift;
      x = i % NUM_SEATS_IN_A_ROW;
      x =
        (x < NUM_SEATS_IN_A_ROW / 2 ? -1 : 1) *
        (Math.abs(NUM_SEATS_IN_A_ROW / 2 - x) * distX + halfCoridor);

      positionHelper = new Object3D();
      positionHelper.scale.set(0.05, 0.05, 0.05);
      if (["head", "back", "seat", "belt"].includes(name))
        adjustSeatParts(x, y);
      else adujustBaseParts(x, y);
      positionHelper.updateMatrix();
      instancedMesh.setMatrixAt(i, positionHelper.matrix);
      instancedMesh.instanceMatrix.needsUpdate = true;
    }
  };
  for (const [key, value] of Object.entries(instancedMeshes)) {
    setPositions(value, key);
  }

  return instancedMeshes;
};

export default prepareSeats;
