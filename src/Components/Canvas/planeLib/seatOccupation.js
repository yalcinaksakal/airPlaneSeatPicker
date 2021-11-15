import { Color } from "three";

const occupateSeats = (meshes, seats, occupied) => {
  const red = new Color("red"),
    empty = new Color("white");
  let color;
  for (let i = 0; i < seats.length; i++) {
    color = i < occupied ? red : empty;
    meshes.head.setColorAt(seats[i], color);
    meshes.seat.setColorAt(seats[i], color);
    meshes.back.setColorAt(seats[i], color);
  }
  meshes.head.instanceColor.needsUpdate = true;
  meshes.back.instanceColor.needsUpdate = true;
  meshes.seat.instanceColor.needsUpdate = true;
};
export default occupateSeats;
