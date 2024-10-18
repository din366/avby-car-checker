import {configureStore} from "@reduxjs/toolkit";
import {userCategoryReducer} from "./userCategorySlice.js";
import {carCategoryReducer} from "./carCategorySlice.js";

const store = configureStore({
  reducer: {
    userCategory: userCategoryReducer,
    userCarCategory: carCategoryReducer,
  },
  /*middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),*/
});

export default store;

/*
const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};
*/