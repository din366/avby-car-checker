import {io} from "socket.io-client";
import {useCallback, useEffect} from "react";
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

  const getPopupFunc = (carId, delay, isEnd) => {
    dispatch(
      getPopup(
        {
          text: `Обновление для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'} ${isEnd ? 'завершено' : 'запущено'}`,
          delay
        }
      )
    )
  }
  const handleUpdateStatus = useCallback(({carId, status, tokenOnlySymbols}) => {
    if (status === 'process') {
      getPopupFunc(carId, 5000);
      dispatch(startUpdating({carId, tokenOnlySymbols}));
    } else if (status === 'success') {
      getPopupFunc(carId, 5000, true);
      dispatch(updatingSuccessfully({carId, tokenOnlySymbols}));
      setTimeout(() => {
        dispatch(clearUpdatingCount());
      }, 2000);
    } else {
      dispatch(getPopup({text: `Ошибка обновления для ${(categoryNames && categoryNames[carId]) ? categoryNames[carId] : 'авто'}`, delay: 5000, type: 'alert'}))
      dispatch(updatingFailure({carId, tokenOnlySymbols}));
      setTimeout(() => {
        dispatch(clearUpdatingCount());
      }, 2000);
    }
    dispatch(deleteCarLoadingWhileWaiting(carId));
  });

  const handleUpdateCount = useCallback(({carId, countStatus, carsCount}) => {
    dispatch(setUpdatingCount({carId, countStatus, carsCount}))
  })

  useEffect(() => {
    socket.on('updateStatus', handleUpdateStatus);
    socket.on('updateCount', handleUpdateCount)
    dispatch(setSocketId(socket.id));

    return () => { socket.off('updateStatus', handleUpdateStatus); socket.off('updateCount', handleUpdateCount); };
  }, [dispatch, handleUpdateStatus, handleUpdateCount]);
}