import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBalance } from "../services/requests";

function BalanceCard() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => {
      setBalance(await getBalance());
    })();
  });

  return (
    <div className="card">
      <div className="card-body">
        <h6 className="card-subtitle mb-2">Saldo</h6>
        <h2 className="text-center my-4">{`R$${balance.toFixed(2).replaceAll('.', ',')}`}</h2>
        <div className="d-grid">
          <button
            className="btn btn-dark"
            data-bs-toggle="modal"
            data-bs-target="#modal-make-transfer"
            onClick={ () => navigate('/new-transfer') }
          >
            Nova transferência
          </button>
        </div>
      </div>
    </div>
  );
}

export default BalanceCard;
