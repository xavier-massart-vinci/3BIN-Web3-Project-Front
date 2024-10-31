import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../utlis/services";

function Register() {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePseudoChange = (e) => setPseudo(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePassword2Change = (e) => setPassword2(e.target.value);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleForm = (event) => {
    event.preventDefault();

    if (password !== password2) {
      setError("Passwords do  not match");
    } else {
      setError("");
      // await
      return registerRequest();
    }
  };

  // async - await
  // set token given
  const registerRequest = async (e) => {
    e.preventDefault();
    await register({
      pseudo: pseudo,
      password: password,
    });
    navigate("/");
  };

  return (
    <>
      <div className="register-header">
        <h1 className="register-title">Echoes</h1>
      </div>
      <div className="register-container">
        <div className="register-form-wrapper">
          <form onSubmit={handleForm} className="register-form">
            <h2 className="form-title">Register</h2>

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

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Confirm Password
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
              Register
            </button>

            <p className="error-message">{error}</p>

            <a onClick={handleSignInClick} className="signIn-link">
              Sign In?
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;
