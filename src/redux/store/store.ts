import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";
import themeReducer from "../features/themeSlice";
import userReducer from "../features/userSlice";

export const store =
  configureStore({
    reducer: {
      auth: authReducer,        // IMPORTANT
      product: productReducer,
      theme: themeReducer,
      user: userReducer
    }
  });