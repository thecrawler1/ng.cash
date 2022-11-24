import User from "../interfaces/User";
import TransactionsTable from "../components/TransactionsTable";
import BalanceCard from "../components/BalanceCard";
import { useOutletContext } from "react-router-dom";

function Home() {
  const user = useOutletContext<User>();

  return (
    <main className="container">
      <div className="row">
        <section className="col-lg-3 col-12 mt-4">
          <BalanceCard />
        </section>
        <section className="col-lg-9 col-12 mt-4">
          <TransactionsTable accountId={user.accountId} />
        </section>
      </div>
    </main>
  );
}

export default Home;
