import {Outlet} from "react-router-dom";
import Header from "./elements/Header/Header.jsx";
import {ThemeProvider} from "./hooks/ThemeContext.jsx";
import {useInitialization} from "./features/useInitialization.js";
import {useSocket} from "./hooks/useSocket.js";
import PopupWrapper from './elements/PopupWrapper/PopupWrapper.jsx';
import {useSelector} from "react-redux";
import {getUserName} from "./store/loginSlice.js";

export const App = () => {
  let currentUserName = useSelector(getUserName);

  useInitialization();
  useSocket(currentUserName);

  return (
    <>
      <ThemeProvider>
        <Header />
        <MainWrapper/>
        {/*<Footer />*/}
        <PopupWrapper />
      </ThemeProvider>
    </>
  )
}

const MainWrapper = () => {
  return <Outlet />
}

export default App;