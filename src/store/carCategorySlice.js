import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {SINGLE_CAR_CATEGORY} from "../globalPaths.js";

const initialState = {
  isLoading: false,
  isError: null,
  data: null,
}

const carCategorySlice = createSlice({
  name: 'carCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCarCategory.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getCarCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
        state.data = null;
      })
      .addCase(getCarCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.data = action.payload;
      })
  }
})

export const getCarCategory = createAsyncThunk(
  'getCarCategory',
  async (_, {rejectWithValue}) => {
    const token = 'QXF24GFxcJSnhTSmaxRsKa08';

    try {
      const response = await axios.get(SINGLE_CAR_CATEGORY, {
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

export const getCarCategoryData = (state) => state.userCarCategory.data;
export const carCategoryLoading = (state) => state.userCarCategory.isLoading;
export const carCategoryError = (state) => state.userCarCategory.isError;

export const carCategoryReducer = carCategorySlice.reducer;