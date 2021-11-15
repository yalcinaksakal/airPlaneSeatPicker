export let NUM_ROWS = 27,
  NUM_SEATS_IN_A_ROW = 6,
  OCCUPIED = 40,
  changed = false;

export const distX = 29,
  halfCoridor = 30,
  distY = 50;
export let seatParts, wing; //meshes from gltf models

export let sceneController;
export const setSceneController = func => (sceneController = func);

export const setSeatParts = parts => (seatParts = parts);
export const setWing = w => (wing = w);
export const setRows = val => (NUM_ROWS = val);
export const setSeats = val => (NUM_SEATS_IN_A_ROW = val);
export const setOccupied = val => (OCCUPIED = val);
export const setChanged = val => (changed = val);
