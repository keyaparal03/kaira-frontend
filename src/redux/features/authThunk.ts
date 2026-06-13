import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import AuthService from "../../services/AuthService";

export const loginUser =
  createAsyncThunk(
    "auth/login",

    async (
      payload: {
        email: string;
        password: string;
      }
    ) => {
      const response =
        await AuthService.login(
          payload
        );

      return response;
    }
  );