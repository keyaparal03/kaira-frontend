import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import UserService
from "../../services/user.service";

export const fetchProfile =
  createAsyncThunk(

    "user/profile",

    async (
      _,
      thunkAPI
    ) => {

      try {

        const response =
          await UserService
          .getProfile();

        return response;

      } catch (
        error: any
      ) {

        return thunkAPI
        .rejectWithValue(
          error.message
        );
      }
    }
  );