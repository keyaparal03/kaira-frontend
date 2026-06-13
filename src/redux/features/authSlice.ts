import {
  createSlice
} from "@reduxjs/toolkit";

import {
  loginUser,
  registerUser
} from "./authThunk";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState =
  {
    user: null,
    loading: false,
    error: null
  };

const authSlice =
  createSlice({
    name: "auth",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {
        builder

          /* LOGIN */

          .addCase(
            loginUser.pending,
            (state) => {
              state.loading =
                true;
            }
          )

          .addCase(
            loginUser.fulfilled,

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.user =
                action.payload;
            }
          )

          .addCase(
            loginUser.rejected,

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload as string;
            }
          )

          /* REGISTER */

          .addCase(
            registerUser.pending,
            (state) => {
              state.loading =
                true;
            }
          )

          .addCase(
            registerUser.fulfilled,

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.user =
                action.payload;
            }
          )

          .addCase(
            registerUser.rejected,

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload as string;
            }
          );
      }
  });

export default
  authSlice.reducer;