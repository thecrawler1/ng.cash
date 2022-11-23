import { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as requester from "../services/requests";

function NewAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [failedTryCreateAccount, setFailedTryCreateAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const newAccount: MouseEventHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { success, errorMessage } = await requester.newAccount(username, password, confirmPassword);

    if (success) {
      navigate('/');
    } else {
      setPassword('');
      setConfirmPassword('');
      setErrorMessage(errorMessage!);
      setFailedTryCreateAccount(true);
    }

    setIsLoading(false);
  };

  return (
    <main className="container">
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div style={{width: '350px'}}>
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">Crie sua conta</h4>
              <section>
                <form>
                  {failedTryCreateAccount && <div className="alert alert-danger">{ errorMessage }</div>}
                  <input
                    className="form-control mb-3"
                    type="text"
                    placeholder="Usuário"
                    value={ username }
                    onChange={ ({ target: { value} }) => setUsername(value) }
                  />
                  <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="Senha"
                    value={ password }
                    onChange={ ({ target: { value} }) => setPassword(value) }
                  />
                  <input
                    className="form-control mb-4"
                    type="password"
                    placeholder="Confirme sua senha"
                    value={ confirmPassword }
                    onChange={ ({ target: { value} }) => setConfirmPassword(value) }
                  />
                  <div className="d-grid mb-3">
                    { isLoading ? (
                        <button className="btn btn-dark" disabled>
                          <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                          Carregando...
                        </button>
                      ) : (
                        <button className="btn btn-dark" onClick={ newAccount }>Continuar</button>
                      )
                    }
                  </div>
                </form>
              </section>
              <section className="text-center">
                <Link to="/login">Já sou cliente</Link>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NewAccount;
