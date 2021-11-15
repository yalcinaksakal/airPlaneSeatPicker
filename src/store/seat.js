import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hovered: null,
  selected: null,
  hx: null,
  hy: null,
};

const seatSelect = createSlice({
  name: "seatSelect",
  initialState,
  reducers: {
    setHovered(state, action) {
      // console.log(action.payload);
      state.hovered = action.payload.hovered;
      state.hx = action.payload.hx;
      state.hy = action.payload.hy;
    },
    setSelected(state, action) {
      state.selected = action.payload;
    },
  },
});

export const seatActions = seatSelect.actions;
export default seatSelect.reducer;
