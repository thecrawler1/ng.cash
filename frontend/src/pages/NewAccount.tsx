import { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
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

  return isLoading 
    ? <Loading />
    : (
      <main>
        <section>
          <form>
            <h1>Crie sua conta</h1>
            { failedTryCreateAccount && <p>{ errorMessage }</p> }
            <input
              type="text"
              placeholder="Usuário"
              value={ username }
              onChange={ ({ target: { value} }) => setUsername(value) }
              />
            <input
              type="password"
              placeholder="Senha"
              value={ password }
              onChange={ ({ target: { value} }) => setPassword(value) }
              />
            <input
              type="password"
              placeholder="Confirme sua senha"
              value={ confirmPassword }
              onChange={ ({ target: { value} }) => setConfirmPassword(value) }
              />
            <button onClick={ newAccount }>
              Continuar
            </button>
          </form>
        </section>
        <section>
          <Link to="/login">Já sou cliente</Link>
        </section>
      </main>
    );
}

export default NewAccount;
