import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunk";

interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  success: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
    }
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Login successful";
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.success = null;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = "Registration successful";
        state.error = null;
      })

      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.success = null;
      });
  }
});

export const { clearMessage } = authSlice.actions;
export default authSlice.reducer;