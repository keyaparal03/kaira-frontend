import { createAsyncThunk } from "@reduxjs/toolkit";

import ProductService from "../../services/product.service";

export const fetchProducts =
  createAsyncThunk(
    "product/fetchProducts",

    async () => {
      const response:any =
        await ProductService.getProducts();

      return response.data;
    }
  );