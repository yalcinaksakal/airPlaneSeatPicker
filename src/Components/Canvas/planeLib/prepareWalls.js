import {
  CylinderBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  InstancedMesh,
  Object3D,
} from "three";
import { CSG } from "three-csg-ts";
import {
  distX,
  distY,
  halfCoridor,
  NUM_ROWS,
  NUM_SEATS_IN_A_ROW,
} from "../../../CONFIG/config";

const prepareWalls = () => {
  //window
  const windowGgeometry = new CylinderBufferGeometry(10, 10, 2, 128);
  const windowMaterial = new MeshBasicMaterial({
    color: "blue",
    transparent: true,
    opacity: 0.1,
  });
  const _window = new Mesh(windowGgeometry, windowMaterial);
  _window.rotateZ(Math.PI / 2);
  _window.position.set(-125, 260, 5);

  //wall
  const boxGeometry = new BoxGeometry(2, 80, 50);
  const wallMaterial = new MeshBasicMaterial({
    color: "whitesmoke",
  });

  let wall = new Mesh(boxGeometry, wallMaterial);
  wall.position.set(-125, 252, 3);
  //subtract window from wall
  wall.updateMatrix();
  _window.updateMatrix();
  wall = CSG.subtract(wall, _window);
  wall.updateMatrix();

  //create lots of walls and windows as InstancedMeshes
  const walls = new InstancedMesh(wall.geometry, wall.material, 2 * NUM_ROWS);
  const _windows = new InstancedMesh(
    _window.geometry,
    _window.material,
    2 * NUM_ROWS
  );
  //position items in instancedmeshes
  let positionHelper, x, y;
  const sideDist = (distX * NUM_SEATS_IN_A_ROW) / 2 + halfCoridor;
  const yShift = (NUM_ROWS * distY) / 2;
  const positionHandler = (instancedMesh, wS = 0, wSZ = 0) => {
    for (let i = 0; i < 2 * NUM_ROWS; i++) {
      x = i % 2 ? -1 : 1;
      x = x * sideDist - distX / 2;
      y = Math.floor(i / 2) * 50 - yShift + distY / 2;
      positionHelper = new Object3D();
      positionHelper.position.set(x, 252 + wS, y + wSZ);
      if (wS) positionHelper.rotateZ(Math.PI / 2);
      positionHelper.updateMatrix();
      instancedMesh.setMatrixAt(i, positionHelper.matrix);
      instancedMesh.instanceMatrix.needsUpdate = true;
    }
  };
  positionHandler(walls);
  positionHandler(_windows, 8, 2);

  //floor
  return [walls, _windows];
};
export default prepareWalls;
