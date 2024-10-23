import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setToken} from "./../store/loginSlice.js";

export const useInitialization = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(setToken(localStorage.getItem("token")));
    }
  }, []);
}