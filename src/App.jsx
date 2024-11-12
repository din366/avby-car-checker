import {Outlet} from "react-router-dom";
import Header from "./elements/Header/Header.jsx";
import {ThemeProvider} from "./hooks/ThemeContext.jsx";
import {useInitialization} from "./features/useInitialization.js";
import {io} from "socket.io-client";
import {useEffect} from "react";
import {startUpdating, updatingFailure, updatingSuccessfully} from "./store/updateCarDataSlice.js";
import {useDispatch} from "react-redux";
import {setSocketId} from "./store/loginSlice.js";

export const socket = io('http://localhost:3001')

export const App = () => {
  const dispatch = useDispatch();
  useInitialization();

  useEffect(() => {
    socket.on('updateStatus', ({carId, status}) => {
      if (status === 'process') {
        dispatch(startUpdating(carId));
      } else if (status === 'success') {
        dispatch(updatingSuccessfully(carId));
      } else {
        dispatch(updatingFailure(carId));
      }
    })
    dispatch(setSocketId(socket.id));
  }, [dispatch]);

  return (
    <>
      <ThemeProvider>
        <Header />
        <MainWrapper/>
        {/*<Footer />*/}
        {/*<Popup />*/}
      </ThemeProvider>
    </>
  )
}

const MainWrapper = () => {
  return <Outlet />
}

export default App;