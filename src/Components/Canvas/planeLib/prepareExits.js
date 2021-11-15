import { Mesh, MeshBasicMaterial, BoxGeometry, Vector3, Group } from "three";
import { CSG } from "three-csg-ts";
import {
  distX,
  distY,
  halfCoridor,
  NUM_ROWS,
  NUM_SEATS_IN_A_ROW,
} from "../../../CONFIG/config";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";
const prepareExits = () => {
  const exits = new Group();
  const size = 20;
  const points = [
    new Vector3(size, 2.5, -20),
    new Vector3(-size, 2.5, -20),
    new Vector3(0, 2.5, -20 - size),
    new Vector3(size, -2.5, -20),
    new Vector3(-size, -2.5, -20),
    new Vector3(0, -2.5, -20 - size),
  ];
  let arrow;
  const sideDist = (distX * NUM_SEATS_IN_A_ROW) / 2 + halfCoridor + distX + 10;
  const middle =
    halfCoridor + (-distY * NUM_ROWS) / 2 + (distY * NUM_ROWS) / 2.3;
  const yShift = (NUM_ROWS * distY) / 2;
  const createExit = (posx, posy, posz, color = "#9df781", rot = 0) => {
    const material = new MeshBasicMaterial({
      color: color,
      //   transparent: true,
      //   opacity: 0.5,
    });
    arrow = CSG.union(
      new Mesh(new BoxGeometry(15, 5, 40), material),
      new Mesh(new ConvexGeometry(points), material)
    );
    // arrow.updateMatrix();
    arrow.rotateY(Math.PI / 2 + rot * Math.PI);
    arrow.position.set(posx - distX * rot, posy, posz);
    exits.add(arrow);
  };
  createExit(-sideDist, 220, middle, "red");
  createExit(sideDist, 220, middle, "red", 1);
  createExit(-sideDist + 20, 220, -yShift - 40);
  createExit(-sideDist + 20, 220, yShift + 40);
  return exits;
};
export default prepareExits;
