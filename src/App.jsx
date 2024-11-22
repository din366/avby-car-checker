import {Outlet} from "react-router-dom";
import Header from "./elements/Header/Header.jsx";
import {ThemeProvider} from "./hooks/ThemeContext.jsx";
import {useInitialization} from "./features/useInitialization.js";
import {useSocket} from "./hooks/useSocket.js";
import PopupWrapper from './elements/PopupWrapper/PopupWrapper.jsx';

export const App = () => {
  useInitialization();
  useSocket();

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