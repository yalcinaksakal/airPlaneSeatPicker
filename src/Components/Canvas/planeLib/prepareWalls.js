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
  //window---------
  const windowGgeometry = new CylinderBufferGeometry(10, 10, 2, 128);
  const windowMaterial = new MeshBasicMaterial({
    color: "black",
    transparent: true,
    opacity: 0.3,
  });
  const _window = new Mesh(windowGgeometry, windowMaterial);
  _window.rotateZ(Math.PI / 2);
  _window.position.set(-125, 275, 5);

  //wall----------
  const boxGeometry = new BoxGeometry(2, 80, 50);
  const wallMaterial = new MeshBasicMaterial({
    color: "whitesmoke",
  });

  const fWall = new Mesh(boxGeometry, wallMaterial);
  const lWall = new Mesh(boxGeometry, wallMaterial);

  let wall = new Mesh(boxGeometry, wallMaterial);
  wall.position.set(-125, 252, 3);
  //subtract window from wall
  wall.updateMatrix();
  _window.updateMatrix();
  wall = CSG.subtract(wall, _window);
  wall.updateMatrix();

  //create lots of walls and windows as InstancedMeshes---------
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
      positionHelper.position.set(x, 250 + wS, y + wSZ);
      if (wS) positionHelper.rotateZ(Math.PI / 2);
      positionHelper.updateMatrix();
      instancedMesh.setMatrixAt(i, positionHelper.matrix);
      instancedMesh.instanceMatrix.needsUpdate = true;
    }
  };
  positionHandler(walls);
  x = sideDist - distX / 2;
  fWall.position.set(x, 250, -yShift - distY / 2);
  lWall.position.set(x, 250, yShift + distY / 2);
  positionHandler(_windows, 23, 2);

  //floor  wall thickness=3 -----------------
  x = NUM_SEATS_IN_A_ROW * distX + 2 * halfCoridor + 2;
  //emergency exits=halfCoridor + 150 for front and end exits
  y = NUM_ROWS * distY + halfCoridor + 70;

  const floorGeometry = new BoxGeometry(x - 6, 20, y + 80);

  const floorMaterial = new MeshBasicMaterial({
    color: "#57636f",
  });
  const floor = new Mesh(floorGeometry, floorMaterial);
  floor.position.set(-distX / 2, 210, 0);
  const height = NUM_ROWS > 60 ? 210 : 150;
  const base = new Mesh(
    new BoxGeometry(x, height, y),
    new MeshBasicMaterial({
      color: "dodgerblue",
    })
  );

  base.position.set(-distX / 2, 210 - height / 2, 0);

  return [walls, _windows, floor, fWall, lWall, base];
};
export default prepareWalls;
