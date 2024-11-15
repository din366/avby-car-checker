import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  text: '',
  isShow: false,
  delay: 1000,
  type: 'normal'
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup: (state, action) => {
      state.text = action.payload.text;
      state.isShow = true;
      state.delay = action.payload.delay;
      state.type = action.payload.type;
    },
    hidePopup: (state) => {
      state.isShow = false;
      state.delay = 1000;
      state.type = 'normal';
    },
    clearInfoText: (state) => {
      state.text = '';
    }
  }
});

export const getPopup = createAsyncThunk(
  'getPopup',
  ({text, delay, type = 'normal'}, {
    dispatch
  }) => {
    dispatch(showPopup({text, delay, type}));
    setTimeout(() => {
      dispatch(hidePopup());
    }, delay);
    setTimeout(() => {
      dispatch(clearInfoText())
    }, delay + 500)
  }
)

export const popupText = state => state.popup.text;
export const popupIsShow = state => state.popup.isShow;
export const popupType = state => state.popup.type;

export const {
  showPopup,
  hidePopup,
  clearInfoText
} = popupSlice.actions;
export const popupReducer = popupSlice.reducer;