import { useNavigate } from "react-router";

function Header({ username }: { username: string }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem('token', '');

    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand"><strong>NG.CASH</strong></span>
        <div className="d-flex">
          <span className="navbar-brand">{ `Bem-vindo(a), ${username}!` }</span>
          <button className="btn btn-light" onClick={ logout }>Sair</button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
