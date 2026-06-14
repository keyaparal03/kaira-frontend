import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import WishlistService
from "../../services/wishlist.service";

/*
FETCH
*/

export const fetchWishlist =
  createAsyncThunk(
    "wishlist/get",

    async (_, thunkAPI) => {
      try {

        const response: any =
          await WishlistService
          .getWishlist();

        return response;

      } catch (error: any) {

        return thunkAPI
          .rejectWithValue(
            error.message
          );
      }
    }
  );

/*
ADD
*/

export const addProductToWishlist =
  createAsyncThunk(
    "wishlist/add",

    async (
      data: {
        productId: string;
      },

      thunkAPI
    ) => {
      try {

        const response: any =
          await WishlistService
          .addToWishlist(
            data.productId
          );

        return response;

      } catch (error: any) {

        return thunkAPI
          .rejectWithValue(
            error.message
          );
      }
    }
  );

/*
REMOVE
*/

export const removeProductFromWishlist =
  createAsyncThunk(
    "wishlist/remove",

    async (
      productId: string,
      thunkAPI
    ) => {
      try {

        await WishlistService
          .removeWishlist(
            productId
          );

        return productId;

      } catch (error: any) {

        return thunkAPI
          .rejectWithValue(
            error.message
          );
      }
    }
  );