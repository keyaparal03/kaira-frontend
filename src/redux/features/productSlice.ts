import { createSlice } from "@reduxjs/toolkit";

import { fetchProducts } from "./productThunk";

interface ProductState {
  products: any[];
  loading: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products =
            action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state) => {
          state.loading = false;
        }
      );
  }
});

export default productSlice.reducer;