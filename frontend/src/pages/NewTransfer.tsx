import { useState, MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as requester from '../services/requests';
import formatCurrency from '../utils/formatCurrency';

function NewTransfer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [failedTryTransfer, setFailedTryTransfer] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    (async () => setBalance(await requester.getBalance()))();
  }, []);

  const makeTransfer: MouseEventHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { success, errorMessage } = await requester.makeTransfer(username, amount);

    if (success) {
      navigate('/');
    } else {
      setUsername('');
      setErrorMessage(errorMessage!);
      setFailedTryTransfer(true);
    }

    setIsLoading(false);
  };

  const cancelTransfer: MouseEventHandler = async (event) => {
    event.preventDefault();

    navigate('/');
  }

  return (
    <main className="container">
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div style={{width: '350px'}} className="mb-2">
          <div className="card mb-5">
            <div className="card-body">
              <h4 className="card-title mb-3">Fazer transferência</h4>
              <h6 className="card-subtitle mb-4">Saldo: {formatCurrency(balance)}</h6>
              <section>
                <form>
                  {failedTryTransfer && <div className="alert alert-danger">{ errorMessage }</div>}
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Usuário"
                    value={ username }
                    onChange={ ({ target: { value } }) => setUsername(value) }
                  />
                  <div className="input-group mb-4">
                    <span className="input-group-text">R$</span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Valor"
                      value={ amount }
                      onChange={ ({ target: { value } }) => setAmount(parseFloat(value) || 0) }
                    />
                    <span className="input-group-text">,00</span>
                  </div>
                  <div className="d-grid mb-2">
                    { isLoading ? (
                        <button className="btn btn-dark" disabled>
                          <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                          Carregando...
                        </button>
                      ) : (
                        <button className="btn btn-dark" onClick={ makeTransfer }>Continuar</button>
                      )
                    }
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-outline-secondary" onClick={ cancelTransfer } disabled={ isLoading }>Cancelar</button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NewTransfer;
