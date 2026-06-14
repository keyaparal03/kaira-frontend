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

  error: string | null;
}

const initialState: ProductState = {
  products: [],

  product: null,

  loading: false,

  error: null
};

const productSlice =
  createSlice({
    name: "product",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {
        builder

          /*
          |--------------------------------------------------------------------------
          | FETCH ALL PRODUCTS
          |--------------------------------------------------------------------------
          */

          .addCase(
            fetchProducts.pending,

            (state) => {
              state.loading =
                true;

              state.error =
                null;
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

          .addCase(
            fetchProducts.rejected,

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
          |--------------------------------------------------------------------------
          | FETCH SINGLE PRODUCT
          |--------------------------------------------------------------------------
          */

          .addCase(
            fetchProductById.pending,

            (state) => {
              state.loading =
                true;

              state.error =
                null;
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

            (
              state,
              action
            ) => {
              state.loading =
                false;

              state.error =
                action.payload as string;
            }
          );
      }
  });

export default
  productSlice.reducer;