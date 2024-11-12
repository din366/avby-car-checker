import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {UPDATE_URL} from "../globalPaths.js";

const initialState = {
  updating: {},
  error: null,
}

const updateCarDataSlice = createSlice({
  name: "updateCarCategory",
  initialState,
  reducers: {
    startUpdating: (state, action) => {
      return {
        ...state,
        updating: {...state.updating, [action.payload]: true},
        error: null,
      };
    },
    updatingSuccessfully: (state, action) => {
      return {
        ...state,
        updating: {...state.updating, [action.payload]: false},
        error: null,
      };
    },
    updatingFailure: (state, action) => {
      return {
        ...state,
        updating: {...state.updating, [action.payload]: false},
        error: action.error,
      };
    }
  }
})

export const sendStartUpdatingRequest = createAsyncThunk(
  'updating/start',
  async (
    carId,
    {getState, rejectWithValue}
  ) => {
    const state = getState();
    const token = state.login.token;
    const socketId = state.login.socketId;

    const response = await axios.post(
      `${UPDATE_URL}${carId}`,
      {socketId},
      {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
      }
    )

    if (response.data.error) {
      return rejectWithValue(response.data.error);
    }
    console.log(response.data.payload);
    return response.data.payload;
  }
)

export const {
  startUpdating,
  updatingFailure,
  updatingSuccessfully
} = updateCarDataSlice.actions;

export const updateCarCategoryReducer = updateCarDataSlice.reducer;

export const currentUpdate = state => state.updateCarCategory.updating;