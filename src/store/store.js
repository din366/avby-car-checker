import {configureStore} from "@reduxjs/toolkit";
import {userCategoryReducer} from "./userCategorySlice.js";
import {carCategoryReducer} from "./carCategorySlice.js";
import {loginReducer} from "./loginSlice.js";
import {updateCarCategoryReducer} from "./updateCarDataSlice.js";
import {popupReducer} from "./popupSlice.js";
import {addNewCarReducer} from "./addNewCarSlice.js";
import {deleteCarReducer} from "./deleteCarSlice.js";

/*const loggerMiddleware = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};*/

const store = configureStore({
  reducer: {
    userCategory: userCategoryReducer,
    userCarCategory: carCategoryReducer,
    login: loginReducer,
    updateCarCategory: updateCarCategoryReducer,
    popup: popupReducer,
    addNewCar: addNewCarReducer,
    deleteCar: deleteCarReducer,
  },
  /*middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),*/
});

export default store;


