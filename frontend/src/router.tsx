import { createBrowserRouter, redirect } from "react-router-dom";
import User from "./interfaces/User";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewAccount from "./pages/NewAccount";
import NotFound from "./pages/NotFound";
import { getUser } from "./services/requests";

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
    path: '*',
    loader: async () => {
      const user: User | null = await getUser();

      if (!user) throw redirect('/login');

      return user;
    },
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '*',
        element: <NotFound />
      },
    ],
  },
]);
