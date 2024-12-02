import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {LOGIN_URL} from "../globalPaths.js";
import {clearCategoriesDataBeforeLogout} from "./userCategorySlice.js";

const initialState = {
  token: null,
  userName: null,
  loading: false,
  error: null,
  socketId: null,
}

const loginSlice = createSlice({
  name: "login/login",
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSocketId: (state, action) => {
      state.socketId = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    clearUserName: (state) => {
      state.userName = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(sendLoginRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.token = action.payload?.token;
        state.userName = action.payload?.username;
      })
  }
})


export const sendLoginRequest = createAsyncThunk(
  'login/send-requet',
  ({login, password}, { rejectWithValue }) => {
    return axios.post(LOGIN_URL, {
      login, password
    }).then(response => {
      if(response.data.error) {
        return rejectWithValue(response.data.error);
      }
      localStorage.setItem('token', response.data.payload.token); // ? set token to localStorage
      localStorage.setItem('username', response.data.payload.username); // ? set username for websocket rooms
      return response.data.payload
    }).catch(error => rejectWithValue(error.message));
  }
)

export const logout = createAsyncThunk('login/logout', (payload, { dispatch }) => {
  dispatch(clearToken());
  dispatch(clearUserName());
  dispatch(clearCategoriesDataBeforeLogout());
  localStorage.removeItem('token');
  localStorage.removeItem('username');
})

export const getLoading = (state) => state.login.loading;
export const getErrorData = (state) => state.login.error;
export const getToken = (state) => state.login.token;
export const getSocketId = (state) => state.login.socketId;
export const getUserName = (state) => state.login.userName;

export const {
  clearToken,
  setToken,
  setSocketId,
  setUserName,
  clearUserName
} = loginSlice.actions;

export const loginReducer = loginSlice.reducer;