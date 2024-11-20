const MAIN_URL = 'http://localhost:3000/';

export const USER_CATEGORY = MAIN_URL + 'getcatalog/';
export const SINGLE_CAR_CATEGORY = (carId) => USER_CATEGORY + carId + '/';
export const SET_FAVORITE_OR_HIDDEN_CAR = (categoryId, carId, type) => MAIN_URL + 'setupcarparams/' + categoryId + '/' + carId + '/' + type;
export const LOGIN_URL = MAIN_URL + 'login';
export const UPDATE_URL = MAIN_URL + 'update/';
export const DELETE_URL = MAIN_URL + 'deletecar/';