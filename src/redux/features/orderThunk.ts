import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import OrderService
from "../../services/order.service";

/*
-----------------------------------
CREATE ORDER
-----------------------------------
*/

export const createOrder =
  createAsyncThunk(

    "order/create",

    async (
      data: any,
      thunkAPI
    ) => {

      try {

        const response =
          await OrderService
          .createOrder(
            data
          );

        return response;

      } catch (
        error: any
      ) {

        return thunkAPI
        .rejectWithValue(
          error.message
        );
      }
    }
  );

/*
-----------------------------------
FETCH MY ORDERS
-----------------------------------
*/

export const fetchOrders =
  createAsyncThunk(

    "order/fetch",

    async (
      _,
      thunkAPI
    ) => {

      try {

        const response =
          await OrderService
          .fetchOrders();

        return response;

      } catch (
        error: any
      ) {

        return thunkAPI
        .rejectWithValue(
          error.message
        );
      }
    }
  );