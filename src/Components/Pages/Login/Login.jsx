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
              <h2 className="form-title">Sign In</h2>

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
                  Password
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
                Sign In
              </button>
              
              <p className="error-message-login">{error}</p>

              <a onClick={handleRegisterClick} className="register-link">
                Create account?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
