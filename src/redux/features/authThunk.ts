import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

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

        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
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

        return response;   // IMPORTANT

      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );