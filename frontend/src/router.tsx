import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";

export default createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/new-account',
    element: <NewAccount />,
  },
]);
