import {
  createSlice
} from "@reduxjs/toolkit";

import {
  fetchProfile
} from "./userThunk";

const userSlice =
createSlice({

  name: "user",

  initialState: {

    profile: null,

    loading: false
  },

  reducers: {},

  extraReducers:
    (builder) => {

      builder

      .addCase(
        fetchProfile.pending,

        (state: any) => {

          state.loading =
            true;
        }
      )

      .addCase(
        fetchProfile.fulfilled,

        (
          state: any,
          action: any
        ) => {

          state.loading =
            false;

          state.profile =
            action.payload
            ?.data;
        }
      )

      .addCase(
        fetchProfile.rejected,

        (state: any) => {

          state.loading =
            false;
        }
      );
    }
});

export default
userSlice.reducer;