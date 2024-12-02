import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {UPDATE_URL} from "../globalPaths.js";

const initialState = {
  updating: null,
  updatingCount: '0',
  currentQueue: [],
  allUsersQueueLength: 0,
  error: null,
}

const updateCarDataSlice = createSlice({
  name: "updateCarCategory",
  initialState,
  reducers: {
    updateQueue: (state, action) => {
      return {
        ...state,
        currentQueue: action.payload,
      }
    },
    clearQueue: (state) => {
      return {
        ...state,
        currentQueue: [],
      }
    },
    getAllQueueLengthForAllUsers: (state, action) => {
      return {
        ...state,
        allUsersQueueLength: action.payload,
      }
    },
    setActiveTask: (state, action) => {
      return {
        ...state,
        updating: {
          carId: action.payload.carId,
          status: action.payload.status
        },
        error: null,
      };
    },
    clearActiveTask: (state) => {
      return {
        ...state,
        updating: null,
        error: null,
      }
    },
    setUpdatingCount: (state, action) => {
      return {
        ...state,
        updatingCount: action.payload,
      }
    },
    clearUpdatingCount: (state) => {
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
  setUpdatingCount,
  clearUpdatingCount,
  updateQueue,
  getAllQueueLengthForAllUsers,
  setActiveTask,
  clearActiveTask,
  clearQueue
} = updateCarDataSlice.actions;

export const updateCarCategoryReducer = updateCarDataSlice.reducer;

export const currentUpdate = state => state.updateCarCategory.updating;

export const currentQueue = state => state.updateCarCategory.currentQueue;
export const allUsersQueueLength = state => state.updateCarCategory.allUsersQueueLength;
export const getUpdatingCount = state => state.updateCarCategory.updatingCount;