import {
  createSlice
} from "@reduxjs/toolkit";

import { loginUser } from "./authThunk";

interface AuthState {
  user: any;
  loading: boolean;
  error: string;
}

const initialState: AuthState =
  {
    user: null,
    loading: false,
    error: ""
  };

const authSlice =
  createSlice({
    name: "auth",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {
        builder

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
              state
            ) => {
              state.loading =
                false;

              state.error =
                "Login Failed";
            }
          );
      }
  });

export default
  authSlice.reducer;