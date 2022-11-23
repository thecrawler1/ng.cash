import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import User from "../interfaces/User";
import { getUser } from "../services/requests";

function MainLayout() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => setUser(await getUser()))();
  }, []);

  return (
    <>
      { user && (
        <>
          <Header username={user.username} />
          <Outlet context={user}/>
        </>
      )}
    </>
  );
}

export default MainLayout;
