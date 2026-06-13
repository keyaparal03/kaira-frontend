import {
  createSlice
} from "@reduxjs/toolkit";

import {
  fetchProducts,
  fetchProductById
} from "./productThunk";

interface ProductState {
  products: any[];

  product: any;

  loading: boolean;
}

const initialState: ProductState = {
  products: [],

  product: null,

  loading: false
};

const productSlice =
  createSlice({
    name: "product",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {
        builder

          /* ALL PRODUCTS */

          .addCase(
            fetchProducts.pending,

            (state) => {
              state.loading =
                true;
            }
          )

          .addCase(
            fetchProducts.fulfilled,

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.products =
                action.payload;
            }
          )

          /* SINGLE PRODUCT */

          .addCase(
            fetchProductById.pending,

            (state) => {
              state.loading =
                true;
            }
          )

          .addCase(
            fetchProductById.fulfilled,

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.product =
                action.payload;
            }
          )

          .addCase(
            fetchProductById.rejected,

            (state) => {
              state.loading =
                false;
            }
          );
      }
  });

export default
  productSlice.reducer;