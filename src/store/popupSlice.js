import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
  queue: []
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    pushPopupToQueue (state, action) {
      state.queue.push(action.payload);
    },
    deletePopupToQueue (state, action) {
      const newQueue = state.queue.filter(item => item.id !== action.payload);
      state.queue = newQueue.length === 0 ? [] : newQueue;
    },
    setVisiblePopupInQueue(state, action) {
      state.queue = state.queue.map(item => item.id === action.payload.id ? {...item, visible: action.payload.visible } : item);
    }
  }
});



export const getPopup = createAsyncThunk(
  'getPopup',
  ({text, delay, type = 'normal'}, {
    dispatch
  }) => {
    const timestamp = Date.now();
    dispatch(pushPopupToQueue({id: timestamp, text, type, visible: false}));

    setTimeout(() => {
      dispatch(setVisiblePopupInQueue({id: timestamp, visible: true}))
    }, 100);

    setTimeout(() => {
      dispatch(setVisiblePopupInQueue({id: timestamp, visible: false}))
    }, delay - 500);

    setTimeout(() => {
      dispatch(deletePopupToQueue(timestamp));
    }, delay)
  }
)

export const getUpdateStatusPopup = createAsyncThunk(
  'getUpdateStatusPopup',
  ({carId, delay, isEnd, type}, {getState, dispatch}) => {
    const state = getState();
    const categories = state.userCategory.categoriesData;
    const currentCarUpdate = state.updateCarCategory.updating;

    let categoryNames = null;
    if (categories) {
      categoryNames = categories.reduce((acc, category) => {
        acc[category.itemId] = category.name;
        return acc;
      }, {})
    }

    if (type !== 'alert' && currentCarUpdate?.carId !== carId) { // ? currentCarUpdate so that the popup does not appear again if the task is already active
      dispatch(
        getPopup(
          {
            text: `Обновление для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'} ${isEnd ? 'завершено' : 'запущено'}`,
            delay
          }
        )
      )
    }

    if (type === 'alert') {
      dispatch(getPopup({
        text: `Ошибка обновления для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'}`,
        delay,
        type
      }))
    }
  }
)

export const popupsQueue = state => state.popup.queue;

export const {
  pushPopupToQueue,
  deletePopupToQueue,
  setVisiblePopupInQueue
} = popupSlice.actions;
export const popupReducer = popupSlice.reducer;