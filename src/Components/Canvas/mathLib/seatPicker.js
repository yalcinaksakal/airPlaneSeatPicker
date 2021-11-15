import { Raycaster } from "three";

function checkIntersectingSeat(mouse, camera, meshes, old) {
  const raycaster = new Raycaster();

  raycaster.setFromCamera(mouse, camera);
  for (const mesh of [meshes.head, meshes.back, meshes.seat]) {
    const intersection = raycaster.intersectObject(mesh);
    if (intersection.length > 0) return intersection[0].instanceId;
  }
  return null;
}
export default checkIntersectingSeat;
