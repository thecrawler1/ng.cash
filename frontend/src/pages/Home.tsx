import User from "../interfaces/User";
import TransactionsTable from "../components/TransactionsTable";
import BalanceCard from "../components/BalanceCard";
import { useOutletContext } from "react-router-dom";

function Home() {
  const user = useOutletContext<User>();

  return (
    <main className="container mt-4">
      <div className="row">
        <section className="col-3">
          <BalanceCard />
        </section>
        <section className="col-9">
          <TransactionsTable accountId={user.accountId} />
        </section>
      </div>
    </main>
  );
}

export default Home;
