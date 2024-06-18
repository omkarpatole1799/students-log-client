import { configureStore } from "@reduxjs/toolkit";
import ConfirmDialougeSlice from "./ConfirmDialougeSlice";

const globalStore = configureStore({
  reducer: {
    ConfirmDialougeSlice: ConfirmDialougeSlice,
  },
});

export default globalStore;
