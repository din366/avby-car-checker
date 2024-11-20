import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {DELETE_URL} from "../globalPaths.js";
import {getCategoryName} from "./userCategorySlice.js";
import {getPopup} from "./popupSlice.js";

const initialState = {
  isLoading: false,
  error: null,
}

const deleteCarSlice = createSlice({
  name: "deleteCar",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
})

export const deleteCar = createAsyncThunk(
  'deleteCarRequest',
  async (carId, {rejectWithValue, getState, dispatch}) => {
    const state = getState();
    const token = state.login.token;

    const response = await axios.get(
      `${DELETE_URL}${carId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    )

    if (response.data.error) {
      dispatch(getPopup({text: 'Возникла ошибка при удалении, попробуйте позже', delay: 3000}));
      return rejectWithValue(response.data.error);
    }
    dispatch(getCategoryName());
    dispatch(getPopup({text: 'Удаление выполнено успешно', delay: 3000}));
    return response.data.payload;
  }
)

export const deleteCarReducer = deleteCarSlice.reducer;