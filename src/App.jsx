import {Outlet} from "react-router-dom";
import Header from "./elements/Header/Header.jsx";

export const App = () => {
  return (
    <>
      <Header />
      <MainWrapper />
      {/*<Footer />*/}
      {/*<Popup />*/}
    </>
  )
}

const MainWrapper = () => {
  return <Outlet />
}

export default App;