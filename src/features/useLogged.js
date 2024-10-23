import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {getToken} from "./../store/loginSlice.js";

export const useLogged = (goToUserCategory = false) => {
  const navigate = useNavigate();
  const token = useSelector(getToken);
    useEffect(() => {
      if (goToUserCategory && localStorage.getItem('token') && localStorage.getItem('token') !== null) {
        navigate('/categories');
      } else if (localStorage.getItem('token') && localStorage.getItem('token') !== null) {
      } else {
        navigate('/login');
      }
    }, [token]);
}