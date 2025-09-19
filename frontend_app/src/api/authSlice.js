import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: null,
};

const slice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
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

export const { logout, setUser } = slice.actions;

export const logoutAndReset = () => (dispatch) => {
  dispatch(logout());
  dispatch(authApi.util.resetApiState());
};

export default slice.reducer;
