import { InstancedMesh, Object3D } from "three";
import {
  distX,
  distY,
  halfCoridor,
  NUM_ROWS,
  NUM_SEATS_IN_A_ROW,
  wing,
} from "../../../CONFIG/config";

const prepareWings = scene => {
  const size = Math.max((NUM_ROWS * distY) / 4, 200);
  // console.log(size);
  const sideDist = (distX * NUM_SEATS_IN_A_ROW) / 2 + halfCoridor + distX - 20;
  const middle = -size / 2 + (-distY * NUM_ROWS) / 2 + (distY * NUM_ROWS) / 2.3;
  const wings = new InstancedMesh(wing.geometry, wing.material, 2);

  let positionHelper;

  const adjustPos = i => {
    positionHelper = new Object3D();
    positionHelper.scale.set(size, size, size);
    positionHelper.rotateY(-Math.PI / 2 + i * Math.PI);
    positionHelper.rotateZ((-Math.PI * i * 17) / 18);
    positionHelper.position.set(
      i ? 2 * halfCoridor : -2 * halfCoridor,
      190 + (i ? 0 : -10),
      middle
    );
    positionHelper.updateMatrix();
    wings.setMatrixAt(i, positionHelper.matrix);
    wings.instanceMatrix.needsUpdate = true;
  };
  adjustPos(0);
  adjustPos(1);
  return wings;
};

export default prepareWings;
