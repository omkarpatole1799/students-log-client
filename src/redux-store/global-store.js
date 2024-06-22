import { configureStore } from "@reduxjs/toolkit";
import ConfirmDialougeSlice from "./ConfirmDialougeSlice";
import authSlice from "./authSlice";
import  modalSlice from "./modalSlice";

const globalStore = configureStore({
  reducer: {
    ConfirmDialougeSlice: ConfirmDialougeSlice,
    authSlice: authSlice,
    modalSlice: modalSlice
  },
});

export default globalStore;
