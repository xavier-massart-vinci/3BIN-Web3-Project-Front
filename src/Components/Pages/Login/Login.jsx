import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import { login } from "../../../utlis/services";

function Login() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handlePseudoChange = (e) => setPseudo(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const loginRequest = async (e) => {
    e.preventDefault();

    try {
      await login(
        {
        pseudo : pseudo,
        password : password
      });
      navigate('/');
    } catch (e) {
      setError(e.message || "An error occurred during sign-in");
    }
  };

  return (
    <>
      <div className="login-header">
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
                value={pseudo}
                onChange={handlePseudoChange}
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
            
            <p className="error-message">{error}</p>

            <a onClick={handleRegisterClick} className="forgot-password-link">
              Create account?
            </a>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
