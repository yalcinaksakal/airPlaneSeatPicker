import { InstancedMesh, Object3D } from "three";
import { distY, halfCoridor, NUM_ROWS, wing } from "../../../CONFIG/config";

const prepareWings = scene => {
  const size = Math.max((NUM_ROWS * distY) / 3.5, 200);
  // console.log(size);

  const middle = -size / 2 + (-distY * NUM_ROWS) / 2 + (distY * NUM_ROWS) / 2.3;

  const wings = new InstancedMesh(wing.geometry, wing.material, 2);

  let positionHelper;

  const adjustPos = i => {
    positionHelper = new Object3D();
    positionHelper.scale.set(size, size, size);
    positionHelper.rotateY(-Math.PI / 2 + i * Math.PI);
    positionHelper.rotateZ((-Math.PI * i * 17) / 18);
    positionHelper.position.set(
      i ? halfCoridor : -halfCoridor,
      190 + (i ? -30 : -40),
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
