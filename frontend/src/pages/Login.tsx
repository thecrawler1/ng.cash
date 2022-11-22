import { useState, useEffect, MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import * as authenticator from '../services/authenticator';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedTryLogin, setFailedTryLogin] = useState(false);

  const login: MouseEventHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const { success } = await authenticator.login(username, password);

    if (success) navigate('/');
    else setFailedTryLogin(true);

    setIsLoading(false);
  }

  useEffect(() => {
    setFailedTryLogin(false);
  }, [username, password]);

  return isLoading
    ? <Loading />
    : (
      <main>
        <section>
          <form>
            <h1>Faça seu login</h1>
            { failedTryLogin &&
              <p>Usuário ou senha incorretos</p>
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
