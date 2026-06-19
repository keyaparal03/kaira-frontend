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
      -----------------------------------
      SEARCH PRODUCTS
      -----------------------------------
      */

      setSearchTerm: (
        state,
        action
      ) => {
        state.searchTerm =
          action.payload;
      },

      /*
      CLEAR SEARCH
      */

      clearSearchTerm: (
        state
      ) => {
        state.searchTerm =
          "";
      }
    },

    extraReducers:
      (builder) => {

        builder

          /*
          -----------------------------------
          FETCH ALL PRODUCTS
          -----------------------------------
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

              state.error =
                null;
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
          -----------------------------------
          FETCH SINGLE PRODUCT
          -----------------------------------
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

              state.error =
                null;
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

/*
-----------------------------------
EXPORT ACTIONS
-----------------------------------
*/

export const {
  setSearchTerm,
  clearSearchTerm
} = productSlice.actions;

/*
-----------------------------------
EXPORT REDUCER
-----------------------------------
*/

export default
  productSlice.reducer;