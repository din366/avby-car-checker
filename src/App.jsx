import {Outlet} from "react-router-dom";
import Header from "./elements/Header/Header.jsx";
import {ThemeProvider} from "./hooks/ThemeContext.jsx";

export const App = () => {
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