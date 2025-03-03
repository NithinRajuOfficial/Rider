import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage/index";

const initialState = {
  user: null, // Stores user info
  token: null, // Authentication token
  isAuthenticated: false,
};

const authSliceCaptain = createSlice({
  name: "authCaptain",
  initialState,
  reducers: {
    setCaptain: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      storage.removeItem("persist:root");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCaptain, logout } = authSliceCaptain.actions;
export default authSliceCaptain.reducer;
