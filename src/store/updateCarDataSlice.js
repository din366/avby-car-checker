import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {UPDATE_URL} from "../globalPaths.js";

const initialState = {
  updating: {},
  updatingCount: '0',
  loadingWhileWaiting: [],
  error: null,
}

const updateCarDataSlice = createSlice({
  name: "updateCarCategory",
  initialState,
  reducers: {
    startUpdating: (state, action) => {
      if (action.payload !== 'all') {
        return {
          ...state,
          updating: {...state.updating, [action.payload]: true},
          error: null,
        };
      }
      return state;
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
    },
    pushingCarLoadingWhileWaiting: (state, action) => {
      return {
        ...state,
        loadingWhileWaiting: [
          ...state.loadingWhileWaiting, action.payload
        ]
      }
    },
    deleteCarLoadingWhileWaiting: (state, action) => {
      return {
        ...state,
        loadingWhileWaiting: [
          ...state.loadingWhileWaiting.filter(item => item !== action.payload)
        ]
      }
    },
    setUpdatingCount: (state, action) => {
      return {
        ...state,
        updatingCount: action.payload,
      }
    },
    clearUpdatingCount: (state, action) => {
      return {
        ...state,
        updatingCount: '0',
      }
    }
  }
})

export const sendStartUpdatingRequest = createAsyncThunk(
  'updating/start',
  async (
    {carId, carName},
    {getState, rejectWithValue, dispatch}
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
    return response.data.payload;
  }
)

export const {
  startUpdating,
  updatingFailure,
  updatingSuccessfully,
  pushingCarLoadingWhileWaiting,
  deleteCarLoadingWhileWaiting,
  setUpdatingCount,
  clearUpdatingCount
} = updateCarDataSlice.actions;

export const updateCarCategoryReducer = updateCarDataSlice.reducer;

export const currentUpdate = state => state.updateCarCategory.updating;
export const loadingWhileWaiting = state => state.updateCarCategory.loadingWhileWaiting;
export const getUpdatingCount = state => state.updateCarCategory.updatingCount;