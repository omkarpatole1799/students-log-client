import { createSlice } from "@reduxjs/toolkit";

const ConfirmDialougeSlice = createSlice({
  name: "ConfirmDialougeSlice",
  initialState: {
    deleteId: null,
    isConfirm: false,
  },
  reducers: {
    setConfirmDetails(state, action) {
      console.log(action.payload, "payload");
      state.deleteId = action.payload;
    },

    confirmTrueHandler(state) {
      state.isConfirm = true;
    },

    confirmFalseHandler(state) {
      state.deleteId = null;
      state.isConfirm = false;
    },

    resetDeleteModal(state, action) {
      state.deleteId = null;
      state.isConfirm = false;
    },
  },
});

export const ConfirmDialougeAction = ConfirmDialougeSlice.actions;

export default ConfirmDialougeSlice.reducer;
