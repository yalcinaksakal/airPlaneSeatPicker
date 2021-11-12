import {
  CylinderBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  BoxGeometry,
  InstancedMesh,
} from "three";
import { CSG } from "three-csg-ts";
import { NUM_ROWS } from "../../../CONFIG/config";

const prepareWindows = scene => {
  const windowGgeometry = new CylinderBufferGeometry(10, 10, 200, 128);
  const windowMaterial = new MeshBasicMaterial({
    color: "black",
    transparent: true,
    opacity: 1,
  });
  const _window = new Mesh(windowGgeometry, windowMaterial);
  _window.rotateZ(Math.PI / 2);
  _window.position.set(-125, 260, 5);

  const boxGeometry = new BoxGeometry(2, 80, 50);
  const wallMaterial = new MeshBasicMaterial({
    color: "whitesmoke",
  });

  let wall = new Mesh(boxGeometry, wallMaterial);
  wall.position.set(-125, 252, 3);

  wall.updateMatrix();
  _window.updateMatrix();
  wall = CSG.subtract(wall, _window);
  wall.updateMatrix();
  const walls = new InstancedMesh(wall.geometry, wall.material, 2 * NUM_ROWS);
  const _windows = new InstancedMesh(
    _window.geometry,
    _window.material,
    2 * NUM_ROWS
  );
  scene.add(_windows);
  //   scene.add(wall);
};
export default prepareWindows;
