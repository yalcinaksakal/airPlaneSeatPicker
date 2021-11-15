import { NUM_ROWS, NUM_SEATS_IN_A_ROW } from "../../../CONFIG/config";

function createArray() {
  const length = NUM_ROWS * NUM_SEATS_IN_A_ROW;
  const array = Array.from(Array(length).keys());
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
export default createArray;
