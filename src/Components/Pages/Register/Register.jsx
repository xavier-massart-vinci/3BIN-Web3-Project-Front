import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import errorMapping from "../../../utils/mapError";
import { register } from "../../../utils/services";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleForm = async (event) => {
    event.preventDefault();

    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    if (username.length < 3 || username.length > 15) {
      setError("Le pseudo doit contenir entre 3 et 15 caractères.");
      return;
    }
    if (!alphanumericRegex.test(username)) {
      setError("Le pseudo doit contenir uniquement des lettres et des chiffres.");
      return;
    }
    
    if (password !== password2) {
      setError("Les mots de passes ne sont pas identiques");
      return;
    }

    setError("");
    try {
      await registerRequest();
      navigate("/");
    } catch (e) {
      setError(errorMapping(e.status));
    }
  };

  const registerRequest = async () => {
    await register({
      username: username,
      password: password,
    });
    return navigate("/");
  };

  return (
    <>
      <div className="register-page">
        <div className="register-header">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="login-title">Echoes</h1>
        </div>
        <div className="register-container">
          <div className="register-form-wrapper">
            <form onSubmit={handleForm} className="register-form">
              <h2 className="form-title">S&apos;inscrire</h2>

              <div className="form-group">
                <label htmlFor="Username" className="form-label">
                  Pseudo
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Le mot de passe
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

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  className="form-input"
                  value={password2}
                  onChange={handlePassword2Change}
                  required
                />
              </div>

              <button type="submit" className="form-button">
                S&apos;inscrire
              </button>

              <p className="error-message-register">{error}</p>

              <a onClick={handleSignInClick} className="signIn-link">
                Se connecter?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
