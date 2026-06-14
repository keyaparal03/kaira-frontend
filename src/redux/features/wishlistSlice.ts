import {
  createSlice
} from "@reduxjs/toolkit";

import {
  fetchWishlist,
  addProductToWishlist,
  removeProductFromWishlist
} from "./wishlistThunk";

const wishlistSlice =
  createSlice({

    name: "wishlist",

    initialState: {

      wishlistItems: [],

      loading: false
    },

    reducers: {},

    extraReducers:
      (builder) => {

        builder

        .addCase(
          fetchWishlist.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.wishlistItems =
              action.payload
              ?.data
              ?.products || [];
          }
        )

        .addCase(
          addProductToWishlist
          .fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.wishlistItems =
              action.payload
              ?.data
              ?.products || [];
          }
        )

        .addCase(
          removeProductFromWishlist
          .fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.wishlistItems =
              state.wishlistItems
              .filter(
                (item: any) =>
                  item._id !==
                  action.payload
              );
          }
        );
      }
  });

export default
  wishlistSlice.reducer;