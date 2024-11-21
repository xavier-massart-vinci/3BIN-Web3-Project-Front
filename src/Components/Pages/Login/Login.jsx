import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import errorMapping from "../../../utils/mapError";
import { login } from "../../../utils/services";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const loginRequest = async (e) => {
    e.preventDefault();

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (username.length < 3 || username.length > 15) {
      setError("Le pseudo doit contenir entre 3 et 15 caractères.");
      return;
    }
    if (!alphanumericRegex.test(username)) {
      setError("Le pseudo doit contenir uniquement des lettres et des chiffres.");
      return;
    }

    setError("");
    try {
      await login({
        username: username,
        password: password,
      });
      navigate("/");
    } catch (e) {
      setError(errorMapping(e.status));
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="login-title">Echoes</h1>
        </div>
        <div className="login-container">
          <div className="login-form-wrapper">
            <form onSubmit={loginRequest} className="login-form">
              <h2 className="form-title">S&apos;identifier</h2>

              <div className="form-group">
                <label htmlFor="pseudo" className="form-label">
                  Pseudo
                </label>
                <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  className="form-input"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <button type="submit" className="form-button">
                Connexion
              </button>
              
              <p className="error-message-login">{error}</p>

              <a onClick={handleRegisterClick} className="register-link">
                Créer un compte?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
