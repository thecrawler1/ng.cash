import { useState, MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import * as requester from '../services/requests';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login: MouseEventHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { success, errorMessage } = await requester.login(username, password);

    if (success) {
      navigate('/');
    } else {
      setPassword('');
      setErrorMessage(errorMessage!);
      setFailedTryLogin(true);
    }

    setIsLoading(false);
  }

  return isLoading
    ? <Loading />
    : (
      <main>
        <section>
          <form>
            <h1>Faça seu login</h1>
            { failedTryLogin &&
              <p>{ errorMessage }</p>
            }
            <input
              type="text"
              placeholder="Usuário"
              value={ username }
              onChange={ ({ target: { value } }) => setUsername(value) }
            />
            <input
              type="password"
              placeholder="Senha"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
            <button onClick={ login }>
              Continuar
            </button>
          </form>
        </section>
        <section>
          <Link to="/new-account">Ainda não sou cliente</Link>
        </section>
      </main>
    );
}

export default Login;
