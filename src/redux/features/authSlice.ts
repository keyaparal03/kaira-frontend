import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser,
  getCurrentUser
} from "./authThunk";

import {
  getAccessToken,
  clearTokens
} from "../../utils/localStorage";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  success: string | null;
  isAuthenticated: boolean;
}

const token =
  getAccessToken();

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: null,
  isAuthenticated: !!token
};

const authSlice =
createSlice({
  name: "auth",
  initialState,

  reducers: {

    clearMessage: (
      state
    ) => {
      state.error = null;
      state.success = null;
    },

    logoutUser: (
      state
    ) => {

      clearTokens();

      state.user = null;

      state.isAuthenticated =
        false;

      state.error = null;

      state.success = null;
    }
  },

  extraReducers: (
    builder
  ) => {

    builder

    /*
    LOGIN
    */

    .addCase(
      loginUser.pending,

      (state) => {

        state.loading = true;
        state.error = null;
      }
    )

    .addCase(
      loginUser.fulfilled,

      (
        state,
        action
      ) => {

        state.loading = false;

        state.user =
          action.payload.user;

        state.isAuthenticated =
          true;

        state.success =
          "Login successful";

        state.error = null;
      }
    )

    .addCase(
      loginUser.rejected,

      (
        state,
        action: any
      ) => {

        state.loading = false;

        state.error =
          action.payload ||
          "Login failed";
      }
    )

    /*
    REGISTER
    */

    .addCase(
      registerUser.pending,

      (state) => {

        state.loading = true;
      }
    )

    .addCase(
      registerUser.fulfilled,

      (
        state
      ) => {

        state.loading = false;

        state.success =
          "Registration successful";
      }
    )

    .addCase(
      registerUser.rejected,

      (
        state,
        action: any
      ) => {

        state.loading = false;

        state.error =
          action.payload;
      }
    )

    /*
    RESTORE USER
    */

    .addCase(
      getCurrentUser.fulfilled,

      (
        state,
        action
      ) => {

        state.user =
          action.payload.user;

        state.isAuthenticated =
          true;
      }
    )

    .addCase(
      getCurrentUser.rejected,

      (
        state
      ) => {

        state.user = null;

        state.isAuthenticated =
          false;
      }
    );
  }
});

export const {
  clearMessage,
  logoutUser
} = authSlice.actions;

export default
authSlice.reducer;