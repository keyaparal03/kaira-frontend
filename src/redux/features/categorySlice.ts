import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import CategoryService
from "../../services/category.service";

/*
|--------------------------------------------------------------------------
| FETCH CATEGORIES
|--------------------------------------------------------------------------
*/

export const fetchCategories =
createAsyncThunk(

  "category/fetch",

  async () => {

    const response: any =
      await CategoryService
      .getCategories();

    return response.data;
  }
);

interface CategoryState {

  categories: any[];

  loading: boolean;

  error: string | null;
}

const initialState:
CategoryState = {

  categories: [],

  loading: false,

  error: null
};

const categorySlice =
createSlice({

  name: "category",

  initialState,

  reducers: {},

  extraReducers:
  (builder) => {

    builder

    .addCase(
      fetchCategories.pending,

      (state) => {

        state.loading = true;
      }
    )

    .addCase(
      fetchCategories.fulfilled,

      (
        state,
        action: any
      ) => {

        state.loading = false;

        state.categories =
          action.payload;
      }
    )

    .addCase(
      fetchCategories.rejected,

      (
        state,
        action: any
      ) => {

        state.loading = false;

        state.error =
          action.error.message;
      }
    );
  }
});

export default
categorySlice.reducer;