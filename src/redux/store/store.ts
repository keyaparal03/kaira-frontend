import { configureStore }
from "@reduxjs/toolkit";

import authReducer
from "../features/authSlice";

import productReducer
from "../features/productSlice";

import themeReducer
from "../features/themeSlice";

import userReducer
from "../features/userSlice";

import cartReducer
from "../features/cartSlice";

import wishlistReducer
from "../features/wishlistSlice";

import orderReducer
from "../features/orderSlice";

import categoryReducer
from "../features/categorySlice";   

export const store =
  configureStore({

    reducer: {

      auth: authReducer,

      product: productReducer,

      category: categoryReducer,  

      theme: themeReducer,

      user: userReducer,

      cart: cartReducer,

      wishlist: wishlistReducer,

      order: orderReducer
    }
  });