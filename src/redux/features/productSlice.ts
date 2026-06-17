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

  searchTerm: string;
}

const initialState: ProductState = {
  products: [],

  product: null,

  loading: false,

  error: null,

  searchTerm: ""
};

const productSlice =
  createSlice({
    name: "product",

    initialState,

    reducers: {

      /*
      SEARCH
      */

      setSearchTerm: (
        state,
        action
      ) => {
        state.searchTerm =
          action.payload;
      }
    },

    extraReducers:
      (builder) => {

        builder

          /*
          FETCH PRODUCTS
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
          SINGLE PRODUCT
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

export const {
  setSearchTerm
} = productSlice.actions;

export default
productSlice.reducer;