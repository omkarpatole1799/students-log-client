import { configureStore } from "@reduxjs/toolkit";
import ConfirmDialougeSlice from "./ConfirmDialougeSlice";
import authSlice from "./authSlice";

const globalStore = configureStore({
  reducer: {
    ConfirmDialougeSlice: ConfirmDialougeSlice,
    authSlice: authSlice
  },
});

export default globalStore;
