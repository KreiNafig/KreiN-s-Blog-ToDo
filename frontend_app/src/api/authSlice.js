import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
      }
    );

    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
        localStorage.setItem("token", payload.token);
      }
    );

    builder.addMatcher(
      authApi.endpoints.authMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
