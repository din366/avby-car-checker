import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {SINGLE_CAR_CATEGORY} from "../globalPaths.js";

const initialState = {
  isLoading: false,
  isError: null,
  showCategory: 'current',
  data: null,
}

const carCategorySlice = createSlice({
  name: 'carCategory',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.showCategory = action.payload;
    }
  },
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
  async (carId, {rejectWithValue, getState}) => {
    const state = getState();
    const token = state.login.token;

    try {
      const response = await axios.get(SINGLE_CAR_CATEGORY(carId), {
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
export const getCarCategoryDataActive = (state, category) => {
  if (state.userCarCategory.data) {
    if (category === 'new') {
      return state.userCarCategory.data.newCars;
    }
    if (category === 'sold') { // get unique cars in sold array
      const seen = new Set();
      return [...state.userCarCategory.data.soldCars].reverse().filter(item => {
        const duplicate = seen.has(item.vin);
        seen.add(item.vin);
        return !duplicate;
      })}
    return state.userCarCategory.data.currentCars;
  }
    return null;
}


const getRawCategoryData = (state) => state.userCarCategory.data; // for getCarCategoryPriceDynamics selector
const sortingDate = (priceArray, color, id) => { // for getCarCategoryPriceDynamics selector
  const filledArray = priceArray.map(item => ({
    x: item[0],
    y: item[1]
  }));
  filledArray.sort((a, b) => {
    const [dayA, monthA, yearA] = a.x.split('.');
    const [dayB, monthB, yearB] = b.x.split('.');
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    if (isNaN(dateA) || isNaN(dateB)) {
      console.error(`Invalid date found: ${a.x} or ${b.x}`);
    }
    return dateA - dateB;
  });

  return {
    id,
    color,
    data: filledArray.splice(-15)
  };
};

export const getCarCategoryPriceDynamics = createSelector(
  [getRawCategoryData],
  (data) => {
    if (!data) return [];
    return {
      maxPrice: sortingDate(data.maxPrice, "hsl(0,57%,55%)", "Максимальная цена"),
      minPrice: sortingDate(data.minPrice, "hsl(106,58%,59%)", "Минимальная цена"),
      middlePrice: sortingDate(data.middlePrice, "hsl(234, 70%, 50%)", "Средняя цена")
    };
  }
);

export const carCategoryLoading = (state) => state.userCarCategory.isLoading;
export const carCategoryError = (state) => state.userCarCategory.isError;
export const showCategory = (state) => state.userCarCategory.showCategory;

export const {
  changeCategory
} = carCategorySlice.actions;

export const carCategoryReducer = carCategorySlice.reducer;