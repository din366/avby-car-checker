import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {UPDATE_URL} from "../globalPaths.js";

const initialState = {
  isLoading: false,
  error: null,
}

const addNewCarSlice = createSlice({
  name: "addNewCar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendRequestForCreateNewCar.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendRequestForCreateNewCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendRequestForCreateNewCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
  }
});

export const sendRequestForCreateNewCar = createAsyncThunk(
  'addNewCar/createNewCarRequest',
  async(newCarUrl, {rejectWithValue, dispatch, getState}) => {
    const state = getState();
    const token = state.login.token;
    const socketId = state.login.socketId;

    const response = await axios.post(
      `${UPDATE_URL}add`,
      {socketId},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'newCarUrl': newCarUrl,
        }
      }
    )

    if (response.data.error) {
      return rejectWithValue(response.data.error);
    }
    return response.data.payload;
  }
);

export const addNewCarReducer = addNewCarSlice.reducer;

export const addNewCarIsLoading = state => state.addNewCar.isLoading;
export const addNewCarError = state => state.addNewCar.error;