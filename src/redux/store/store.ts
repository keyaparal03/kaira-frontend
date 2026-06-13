import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/userSlice";
import themeReducer from "../features/themeSlice";
import productReducer from "../features/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    product: productReducer   // IMPORTANT
  }
});