import { createAsyncThunk } from "@reduxjs/toolkit";

import ProductService from "../../services/product.service";

/*
|--------------------------------------------------------------------------
| Fetch All Products
|--------------------------------------------------------------------------
*/

export const fetchProducts =
  createAsyncThunk(
    "product/fetchAll",

    async (_, thunkAPI) => {
      try {
        const response: any =
          await ProductService.getProducts();

        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );

/*
|--------------------------------------------------------------------------
| Fetch Single Product
|--------------------------------------------------------------------------
*/

export const fetchProductById =
  createAsyncThunk(
    "product/fetchById",

    async (
      id: string,
      thunkAPI
    ) => {
      try {
        const response: any =
          await ProductService.getProduct(
            id
          );

        console.log(
          "API RESPONSE",
          response
        );

        return response.data;

      } catch (error: any) {
        return thunkAPI.rejectWithValue(
          error.message
        );
      }
    }
  );