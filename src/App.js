import { Fragment } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Params,
} from "react-router-dom";
import "./index.css";
import "./App.css";
import Loginform from "./auth/login";
import Signupform from "./auth/signup";
import HomePage from "./home/homePage";
import CraeteEventPage from "./create-event/create-event-page";

const router = createBrowserRouter([
  {path: '/login', element: <Loginform/>},
  {path: '/sign-up', element: <Signupform/>},
  {path: '/dashboard', element: <HomePage/>},
  {path: '/create-event', element: <CraeteEventPage/>},
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;