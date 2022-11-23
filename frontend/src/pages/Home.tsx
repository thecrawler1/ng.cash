import { useEffect, useState } from "react";
import User from "../interfaces/User";
import { getBalance, getUser } from "../services/requests";
import Loading from "./Loading";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [balance, setBalance] = useState(0);

  const getData = async () => {
    const user = await getUser();
    const balance = await getBalance();

    setUser(user);
    setBalance(balance);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading
    ? <Loading />
    : (
      <main>
        <section>
          <h1>NG.CASH</h1>
          <section>
            <span>Saldo</span>
            <h1>{`R$${balance.toFixed(2).replaceAll('.', ',')}`}</h1>
            <button>Nova transaferência</button>
          </section>
          <section>
            <h3>{user?.username}</h3>
            <button>Sair</button>
          </section>
        </section>
      </main>
    );
}

export default Home;
