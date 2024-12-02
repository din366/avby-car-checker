import {io} from "socket.io-client";
import {useEffect, useRef} from "react";
import {
  clearActiveTask, getAllQueueLengthForAllUsers, setActiveTask,
  setUpdatingCount, updateQueue,
} from "../store/updateCarDataSlice.js";
import {setSocketId} from "../store/loginSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {carIdAndName} from "../store/userCategorySlice.js";
import {getPopup} from "../store/popupSlice.js";

export const useSocket = (userName) => {
  const dispatch = useDispatch();
  const categoryNames = useSelector(carIdAndName);

  // ? create ref because there is no way to add categoryNames to the useEffect
  // ? dependency, otherwise there will be an additional reconnection to socket
  const categoryNamesRef = useRef(categoryNames);
  useEffect(() => {
    categoryNamesRef.current = categoryNames;
  }, [categoryNames]);
  // ? ------------------------------------------------------------------------------------

  const socketRef = useRef(); // ? for reconnect socketIo when userName is changed
  const globalSocketRef = useRef(); // ? socket for global messages

  const getPopupFunc = (carId, delay, isEnd) => {
    dispatch(
      getPopup(
        {
          text: `Обновление для ${(categoryNamesRef.current && categoryNamesRef.current[carId]) ? categoryNamesRef.current[carId] : 'авто'} ${isEnd ? 'завершено' : 'запущено'}`,
          delay
        }
      )
    )
  }
  const handleUpdateStatus = ({carId, status}) => {
    if (status === 'process') {
      getPopupFunc(carId, 5000);
      dispatch(setActiveTask({carId, status}));
    } else if (status === 'success') {
      getPopupFunc(carId, 5000, true);
      dispatch(clearActiveTask());
    } else {
      dispatch(getPopup({
        text: `Ошибка обновления для ${(categoryNamesRef.current && categoryNamesRef.current[carId]) ? categoryNamesRef.current[carId] : 'авто'}`,
        delay: 5000,
        type: 'alert'
      }))
      dispatch(clearActiveTask());
    }
  };

  const handleCurrentQueue = ({currentUserQueue}) => {
    dispatch(updateQueue(currentUserQueue));
  }

  const handleUpdateCount = ({carId, countStatus, carsCount}) => {
    dispatch(setUpdatingCount({carId, countStatus, carsCount}))
  };

  const allQueueLength = ({allQueueLength}) => {
    dispatch(getAllQueueLengthForAllUsers(allQueueLength))
  }


  useEffect(() => {
    if (socketRef.current && globalSocketRef.current) {
      socketRef.current.disconnect();
      globalSocketRef.current.disconnect();
    }


    if (userName && handleUpdateStatus && handleUpdateCount) {
      socketRef.current = io(`http://localhost:3001/${userName}`) // ? messages only current user (namespace)
      globalSocketRef.current = io(`http://localhost:3001`) // ? global messages

      const socket = socketRef.current;
      const globalSocket = globalSocketRef.current;

      socket.on('updateStatus', handleUpdateStatus);
      socket.on('currentUserQueue', handleCurrentQueue);
      socket.on('updateCount', handleUpdateCount);
      globalSocket.on('queueLengthForAllUsers', allQueueLength)
      dispatch(setSocketId(socket.id));

      return () => {
        socket.off('updateStatus', handleUpdateStatus);
        socket.off('currentUserQueue', handleCurrentQueue);
        socket.off('updateCount', handleUpdateCount);
        socket.off('queueLengthForAllUsers', allQueueLength);
        socket.disconnect();
        globalSocket.disconnect();
      };
    }

  }, [dispatch, userName]);
}