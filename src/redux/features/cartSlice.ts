import {
  createSlice
} from "@reduxjs/toolkit";

import {
  fetchCart,
  addProductToCart,
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

        /*
        ---------------------------
        FETCH CART
        ---------------------------
        */

        builder

          .addCase(
            fetchCart.pending,

            (state) => {
              state.loading =
                true;
            }
          )

          .addCase(
            fetchCart.fulfilled,

            (
              state,
              action
            ) => {

              state.loading =
                false;

              /*
              backend:
              {
                success:true,
                data:{
                  items:[]
                }
              }
              */

              state.cartItems =
                action.payload
                  ?.data
                  ?.items || [];
            }
          )

          .addCase(
            fetchCart.rejected,

            (
              state,
              action
            ) => {

              state.loading =
                false;

              state.error =
                action.payload as string;
            }
          )

          /*
          ---------------------------
          ADD TO CART
          ---------------------------
          */

          .addCase(
            addProductToCart.fulfilled,

            (
              state,
              action
            ) => {

              /*
              refresh cart from API
              */

              state.cartItems =
                action.payload
                  ?.data
                  ?.items || [];
            }
          )

          /*
          ---------------------------
          REMOVE CART
          ---------------------------
          */

          .addCase(
            removeCartItem.fulfilled,

            (
              state,
              action
            ) => {

              state.cartItems =
                state.cartItems.filter(
                  (item) =>
                    item._id !==
                    action.payload
                );
            }
          );
      }
  });

export default
  cartSlice.reducer;