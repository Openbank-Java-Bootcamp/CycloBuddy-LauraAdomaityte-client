// src/pages/LoginPage.js

import { useContext, useState } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import pic from "../images/pic2.jpg";



const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/api/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/"); // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="Loginpage">
      
        
            <form onSubmit={handleLoginSubmit} className="login-form" >
                <label className="label">Email:</label>
                <input className="input-container"
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

                <button type="submit" id="login-btn">Login</button>

                
              </form>
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p className="notuser-text">Don't have an account yet?</p>
              <button id="login-btn">
                <Link to={"/signup"} className="login-link"> Sign Up</Link>
              </button>
              
              
      
    </div>
  );
}

export default LoginPage;
