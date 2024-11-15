import {io} from "socket.io-client";
import {useEffect} from "react";
import {
  clearUpdatingCount, deleteCarLoadingWhileWaiting,
  setUpdatingCount,
  startUpdating,
  updatingFailure,
  updatingSuccessfully
} from "../store/updateCarDataSlice.js";
import {setSocketId} from "../store/loginSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {carIdAndName} from "../store/userCategorySlice.js";
import {getPopup} from "../store/popupSlice.js";

const socket = io('http://localhost:3001')
export const useSocket = () => {
  const dispatch = useDispatch();
  const categoryNames = useSelector(carIdAndName);
  useEffect(() => {
    socket.on('updateStatus', ({carId, status}) => {
      if (status === 'process') {
        dispatch(getPopup({text: `Обновление для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'} запущено`, delay: 3000}))
        dispatch(startUpdating(carId));
      } else if (status === 'success') {
        dispatch(getPopup({text: `Обновление для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'} завершено`, delay: 3000}))
        dispatch(updatingSuccessfully(carId));
        setTimeout(() => {
          dispatch(clearUpdatingCount());
        }, 2000);
      } else {
        dispatch(getPopup({text: `Ошибка обновления для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'}`, delay: 3000, type: 'alert'}))
        dispatch(updatingFailure(carId));
        setTimeout(() => {
          dispatch(clearUpdatingCount());
        }, 2000);
      }
      dispatch(deleteCarLoadingWhileWaiting(carId));
    })

    socket.on('updateCount', ({carId, countStatus, carsCount}) => {
      dispatch(setUpdatingCount({carId, countStatus, carsCount}))
    })
    dispatch(setSocketId(socket.id));
  }, [dispatch, categoryNames]);
}