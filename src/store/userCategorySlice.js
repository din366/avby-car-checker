import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {USER_CATEGORY} from "../globalPaths.js";

const initialState = {
  loading: false,
  categoriesData: null,
  error: null,
}

const userCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryName.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categoriesData = action.payload;
      })
      .addCase(getCategoryName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const getCategoryName = createAsyncThunk(
  'category/getCategoryName',
  async (_, {
    rejectWithValue, getState
  }) => {
    /*const token = state.login.token;*/
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.get(USER_CATEGORY, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data.payload;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

// * selectors

export const categoriesData = state => state.userCategory.categoriesData;

export const carIdAndName = createSelector( // ? for websocket and popup warnings
  [categoriesData],
  (categories) => {
    if (categories) {
      return categories.reduce((acc, category) => {
        acc[category.itemId] = category.name;
        return acc;
      }, {})
    }
    return null;
  }
)

export const userCategoryReducer = userCategorySlice.reducer;