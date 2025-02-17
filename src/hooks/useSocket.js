import {io} from "socket.io-client";
import {useEffect, useRef} from "react";
import {
  clearActiveTask, clearUpdatingCount, getAllQueueLengthForAllUsers, setActiveTask,
  setUpdatingCount, updateQueue,
} from "../store/updateCarDataSlice.js";
import {setSocketId} from "../store/loginSlice.js";
import {useDispatch} from "react-redux";
import {getCategoryName} from "../store/userCategorySlice.js";
import {getUpdateStatusPopup} from "../store/popupSlice.js";

export const useSocket = (userName) => {
  const dispatch = useDispatch();

  const socketRef = useRef(); // ? for reconnect socketIo when userName is changed
  const globalSocketRef = useRef(); // ? socket for global messages

  const handleUpdateStatus = (updateStatus) => {
    if (updateStatus === null) {
      dispatch(clearActiveTask());
      return;
    }
    const {carId, status} = updateStatus;
    if (status === 'process') {
      console.log(555);
      dispatch(getUpdateStatusPopup({carId, delay: 5000}));
      dispatch(setActiveTask({carId, status}));
    } else if (status === 'success') {
      dispatch(getUpdateStatusPopup({carId, delay: 5000, isEnd: true}));
      dispatch(getCategoryName()); // ? update main category cards data after change server data
      dispatch(clearActiveTask());
    } else {
      dispatch(getUpdateStatusPopup({carId, delay: 5000, type: 'alert'}));
      dispatch(clearActiveTask());
    }
  };

  const handleCurrentQueue = ({currentUserQueue}) => {
    dispatch(updateQueue(currentUserQueue));
  }

  const handleUpdateCount = ({carId, countStatus, carsCount}) => {
    if (carId !== null) {
      dispatch(setUpdatingCount({carId, countStatus, carsCount}))
    } else {
      dispatch(clearUpdatingCount());
    }
  };

  const allQueueLength = ({allQueueLength}) => {
    dispatch(getAllQueueLengthForAllUsers(allQueueLength))
  }


  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    if (globalSocketRef.current) {
      globalSocketRef.current.disconnect();
    }


    if (userName && handleUpdateStatus && handleUpdateCount) {
      /*socketRef.current = io(`http://192.168.1.150:3001/${userName}`) // ? messages only current user (namespace)
      globalSocketRef.current = io(`http://192.168.1.150:3001`) // ? global messages*/

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