import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_ROUTES } from "../app modules/apiRoutes";
import "./auth.css";
import { FaEye, FaEyeSlash, FaLock, FaGlobe } from "react-icons/fa";

const Loginform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  const login = () => {
    setError(""); // Clear any previous errors
    Axios.post(API_ROUTES.login, {
      email: email,
      password: password,
    }).then((response) => {
      if (!response.data.auth) {
        setError(response.data.message || "An error occurred"); // Display the error message from the server, or a generic error message
      } else {
        navigate("/dashboard");
        localStorage.setItem("token", response.data.token);
      }
    }).catch((error) => {
      setError("An error occurred while logging in"); // Display generic error message for network or other errors
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
        <h2>Welcome back, you've been missed!</h2>
        <div className="input-group">
          <FaGlobe className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
        </div>
        <Link to="/sign-up" className="signup-link">Don't have an account? Sign up</Link>
      </form>
    </div>
  );
};

export default Loginform;