import { configureStore } from "@reduxjs/toolkit";
import { playersData } from "../features/getdataSlice";

export const store = configureStore({
  reducer: {
    players: playersData.reducer, // Correct reducer name
  },
});
