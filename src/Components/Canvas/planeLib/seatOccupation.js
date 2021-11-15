import { Color } from "three";

const occupateSeats = (head, seats, occupied) => {
  const red = new Color("#f28b88"),
    empty = new Color("#dddddd");
  for (let i = 0; i < seats.length; i++)
    head.setColorAt(seats[i], i < occupied ? red : empty);
  head.instanceColor.needsUpdate = true;
};
export default occupateSeats;
