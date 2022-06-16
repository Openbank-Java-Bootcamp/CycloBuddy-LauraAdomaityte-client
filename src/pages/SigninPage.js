import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/api/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      
              <form onSubmit={handleSignupSubmit} className="login-form">
                <label className="label">Email:</label>
                <input
                className="input-container"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                />

                <label className="label">Password:</label>
                <input
                className="input-container"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                />

                <label className="label">Name:</label>
                <input
                className="input-container"
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleName}
                />

                <button id="login-btn" type="submit">Sign Up</button>
              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p className="notuser-text">Already have account?</p>
              <button id="login-btn">
                <Link to={"/login"} className="login-link"> Login</Link>
              </button>
     
      </div>
  
  );
}

export default SignupPage;
