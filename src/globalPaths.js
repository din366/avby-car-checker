const MAIN_URL = 'http://localhost:3000/';

export const USER_CATEGORY = MAIN_URL + 'getcatalog/';
export const SINGLE_CAR_CATEGORY = (carId) => USER_CATEGORY + carId + '/';
export const LOGIN_URL = MAIN_URL + 'login'