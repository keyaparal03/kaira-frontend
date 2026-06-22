import { createAsyncThunk }
from "@reduxjs/toolkit";

import AuthService
from "../../services/auth.service";

import {
  setAccessToken
}
from "../../utils/localStorage";

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export const loginUser =
  createAsyncThunk(
    "auth/login",

    async (
      userData: {
        email: string;
        password: string;
      },

      thunkAPI
    ) => {
      try {

        const response: any =
          await AuthService.login(
            userData
          );

        /*
        SAVE TOKEN HERE
        */

        if (
          response.accessToken
        ) {
          setAccessToken(
            response.accessToken
          );
        }

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

/*
|--------------------------------------------------------------------------
| REGISTER
|--------------------------------------------------------------------------
*/

export const registerUser =
  createAsyncThunk(
    "auth/register",

    async (
      userData: {
        name: string;
        email: string;
        password: string;
      },

      thunkAPI
    ) => {
      try {

        const response: any =
          await AuthService.register(
            userData
          );

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

export const getCurrentUser =
createAsyncThunk(

  "auth/getMe",

  async (
    _,
    thunkAPI
  ) => {

    try {

      const response: any =
        await AuthService
        .getCurrentUser();

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