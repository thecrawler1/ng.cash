import { Navigate } from "react-router-dom";
import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import NewTransfer from "./pages/NewTransfer";
import { getIsLoggedIn } from "./services/requests";

export default createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/new-account',
    element: <NewAccount />,
  },
  {
    path: '/',
    element: <MainLayout />,
    loader: async () => {
      const isLoggedIn: boolean = await getIsLoggedIn();

      if (!isLoggedIn) throw redirect('/login');
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'new-transfer',
        element: <NewTransfer />,
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
]);
