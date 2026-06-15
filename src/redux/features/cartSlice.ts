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
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null
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
        ==========================
        FETCH CART
        ==========================
        */

        .addCase(
          fetchCart.pending,

          (state) => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchCart.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            state.cartItems =
              action.payload
                ?.data
                ?.items || [];
          }
        )

        .addCase(
          fetchCart.rejected,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to load cart";
          }
        )

        /*
        ==========================
        ADD TO CART
        ==========================
        */

        .addCase(
          addProductToCart.pending,

          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          addProductToCart.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            state.cartItems =
              action.payload
                ?.data
                ?.items || [];
          }
        )

        .addCase(
          addProductToCart.rejected,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to add item";
          }
        )

        /*
        ==========================
        UPDATE QUANTITY
        ==========================
        */

        .addCase(
          updateCartItem.pending,

          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          updateCartItem.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            /*
            backend returns full updated cart
            */

            state.cartItems =
              action.payload
                ?.data
                ?.items || [];
          }
        )

        .addCase(
          updateCartItem.rejected,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to update cart";
          }
        )

        /*
        ==========================
        REMOVE ITEM
        ==========================
        */

        .addCase(
          removeCartItem.pending,

          (state) => {
            state.loading = true;
          }
        )

        .addCase(
          removeCartItem.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            /*
            backend returns updated cart
            */

            state.cartItems =
              action.payload
                ?.data
                ?.items || [];
          }
        )

        .addCase(
          removeCartItem.rejected,

          (
            state: any,
            action: any
          ) => {

            state.loading = false;

            state.error =
              action.payload ||
              "Failed to remove item";
          }
        );
      }
  });

export default
  cartSlice.reducer;