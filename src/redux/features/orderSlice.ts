import {
  createSlice
} from "@reduxjs/toolkit";

import {
  createOrder
} from "./orderThunk";

interface OrderState {

  currentOrder: any;

  loading: boolean;

  error: string | null;
}

const initialState:
OrderState = {

  currentOrder: null,

  loading: false,

  error: null
};

const orderSlice =
  createSlice({

    name: "order",

    initialState,

    reducers: {},

    extraReducers:
      (builder) => {

        builder

        /*
        CREATE ORDER
        */

        .addCase(
          createOrder.pending,

          (state) => {

            state.loading =
              true;

            state.error =
              null;
          }
        )

        .addCase(
          createOrder.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.loading =
              false;

            state.currentOrder =
              action.payload
              ?.data;
          }
        )

        .addCase(
          createOrder.rejected,

          (
            state: any,
            action: any
          ) => {

            state.loading =
              false;

            state.error =
              action.payload ||
              "Order Failed";
          }
        );
      }
  });

export default
  orderSlice.reducer;