import { configureStore } from "@reduxjs/toolkit";

import seatReducer from "./seat";

const store = configureStore({
  reducer: {
    seat: seatReducer,
  },
});

export default store;
