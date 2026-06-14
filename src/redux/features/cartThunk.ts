import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import CartService
from "../../services/cart.service";

/*
GET CART
*/

export const fetchCart =
  createAsyncThunk(
    "cart/get",

    async (_, thunkAPI) => {
      try {

        const response: any =
          await CartService
          .getCart();

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
ADD TO CART
*/

export const addProductToCart =
  createAsyncThunk(
    "cart/add",

    async (
      data: {
        productId: string;
        quantity: number;
      },

      thunkAPI
    ) => {
      try {

        const response: any =
          await CartService
          .addToCart(
            data.productId,
            data.quantity
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
UPDATE CART
*/

export const updateCartItem =
  createAsyncThunk(
    "cart/update",

    async (
      data: {
        cartItemId: string;
        quantity: number;
      },

      thunkAPI
    ) => {
      try {

        const response: any =
          await CartService
          .updateCartItem(   // FIXED

            data.cartItemId,
            data.quantity

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
REMOVE ITEM
*/

export const removeCartItem =
  createAsyncThunk(
    "cart/remove",

    async (
      cartItemId: string,
      thunkAPI
    ) => {
      try {

        await CartService
          .removeCartItem(   // FIXED

            cartItemId

          );

        return cartItemId;

      } catch (error: any) {

        return thunkAPI
          .rejectWithValue(
            error.message
          );
      }
    }
  );