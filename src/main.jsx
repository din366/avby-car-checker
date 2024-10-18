import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import App from "./App";
import ErrorInfo from "./pages/ErrorInfo/ErrorInfo";
import Main from "./pages/Main/Main";
import AllUserCategories from "./pages/AllUserCategories/AllUserCategories";
import CarCategory from "./pages/CarCategory/CarCategory";
import SingleCar from "./pages/SingleCar/SingleCar";
import Login from "./pages/Login/Login";
import store from './store/store.js';

const router = createBrowserRouter([
  {
    element: <App/>,
    errorElement: <ErrorInfo />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "categories",
        element: <AllUserCategories />,
      },
      {
        path: "categories/:categoryId",
        element: <CarCategory />,
        loader: ({params}) => params,
      },
      {
        path: "categories/:categoryId/:carId",
        element: <SingleCar />,
        loader: ({params}) => params,
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <RouterProvider router={router}/>
  </Provider>
)