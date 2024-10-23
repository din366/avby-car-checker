import {Outlet} from "react-router-dom";
import Header from "./elements/Header/Header.jsx";
import {ThemeProvider} from "./hooks/ThemeContext.jsx";
import {useInitialization} from "./features/useInitialization.js";

export const App = () => {
  useInitialization();
  return (
    <>
      <ThemeProvider>
        <Header />
        <MainWrapper />
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