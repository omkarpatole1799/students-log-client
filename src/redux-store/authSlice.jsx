import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    tId: localStorage.getItem("tId") ?? null,
    tName: localStorage.getItem("tName") ?? null,
    tEmail: localStorage.getItem("tEmail") ?? null,
    token: localStorage.getItem("token") ?? null,
    tokenExpiry: localStorage.getItem("tokenExpiry") ?? null,
  },

  reducers: {
    setUser(state, action) {
      let token = action.payload;
      const { userId, name, email, exp, ...rest } = jwtDecode(token);
      console.log(rest, "==rest==");

      state.tId = userId;
      state.tName = name;
      state.tEmail = email;
      state.token = token;
      state.tokenExpiry = exp * 1000; // multiply by 1000 becuse to convert into miliseconds since epoch

      localStorage.setItem("tId", userId);
      localStorage.setItem("tName", name);
      localStorage.setItem("tEmail", email);
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiry", exp * 1000);
    },
    logout(state, action) {},
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
