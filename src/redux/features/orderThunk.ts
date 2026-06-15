import {
  createAsyncThunk
} from "@reduxjs/toolkit";

import OrderService
from "../../services/order.service";

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