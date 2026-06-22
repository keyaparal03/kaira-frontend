import {
  createSlice
} from "@reduxjs/toolkit";

import {
  createOrder,
  fetchOrders
} from "./orderThunk";

interface OrderState {

  currentOrder: any;

  orders: any[];

  loading: boolean;

  error: string | null;
}

const initialState:
OrderState = {

  currentOrder: null,

  orders: [],

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
        --------------------
        CREATE ORDER
        --------------------
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
        )

        /*
        --------------------
        FETCH ORDERS
        --------------------
        */

        .addCase(
          fetchOrders.pending,

          (state) => {

            state.loading =
              true;

            state.error =
              null;
          }
        )

        .addCase(
          fetchOrders.fulfilled,

          (
            state: any,
            action: any
          ) => {

            state.loading =
              false;

            /*
            backend returns:
            { success, count, data }
            */

            state.orders =
              action.payload
              ?.data || [];
          }
        )

        .addCase(
          fetchOrders.rejected,

          (
            state: any,
            action: any
          ) => {

            state.loading =
              false;

            state.error =
              action.payload ||
              "Failed to fetch orders";
          }
        );
      }
  });

export default
  orderSlice.reducer;