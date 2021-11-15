export let NUM_ROWS = 25,
  NUM_SEATS_IN_A_ROW = 8;

export const distX = 29,
  halfCoridor = 30,
  distY = 50;
export let seatParts, wing; //meshes form gltf models
export const setSeatParts = parts => (seatParts = parts);
export const setWing = w => (wing = w);
