import {
  createSlice
} from "@reduxjs/toolkit";

import {
  fetchCart,
  addProductToCart,
  updateCartItem,
  removeCartItem
} from "./cartThunk";

interface CartState {
  cartItems: any[];
  loading: boolean;
}

const initialState:
CartState = {

  cartItems: [],

  loading: false
};

const cartSlice =
  createSlice({

    name: "cart",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {

        builder

        /*
        FETCH
        */

        .addCase(
          fetchCart.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.cartItems =
              action.payload
              ?.data
              ?.items || [];
          }
        )

        /*
        ADD
        */

        .addCase(
          addProductToCart
          .fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.cartItems =
              action.payload
              ?.data
              ?.items || [];
          }
        )

        /*
        UPDATE
        */

        .addCase(
          updateCartItem
          .fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.cartItems =
              action.payload
              ?.data
              ?.items || [];
          }
        )

        /*
        REMOVE
        */

        .addCase(
          removeCartItem
          .fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.cartItems =
              state.cartItems
              .filter(
                (
                  item: any
                ) =>

                item._id !==
                action.payload
              );
          }
        );
      }
  });

export default
  cartSlice.reducer;