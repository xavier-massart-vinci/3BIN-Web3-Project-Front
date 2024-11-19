import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../../utils/services";
import errorMapping from "../../../utils/mapError";
import  logo  from "../../../assets/logo.png"

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

    if (password !== password2) {
      setError("Passwords do  not match");
    } else {
      setError("");
      try {
        await registerRequest();
        navigate("/")
      } catch (e) {
        setError(errorMapping(e.status))
      }
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
          <img src={logo} alt="Logo" className="logo"/>
          <h1 className="login-title">Echoes</h1>
        </div>
        <div className="register-container">
          <div className="register-form-wrapper">
            <form onSubmit={handleForm} className="register-form">
              <h2 className="form-title">Register</h2>

              <div className="form-group">
                <label htmlFor="Username" className="form-label">
                Username
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

              <p className="error-message-register">{error}</p>

              <a onClick={handleSignInClick} className="signIn-link">
                Sign In?
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
