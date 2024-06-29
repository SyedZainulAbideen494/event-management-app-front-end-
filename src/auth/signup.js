import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_ROUTES } from "../app modules/apiRoutes";
import "./auth.css";
import { FaEye, FaEyeSlash, FaLock, FaGlobe, FaUser } from "react-icons/fa";

const Signupform = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    signup();
  };

  const signup = () => {
    setError(""); // Clear any previous errors
    Axios.post(API_ROUTES.signup, {
      email: email,
      password: password,
      user_name: user_name
    }).then((response) => {
      if (response.data.error) {
        setError(response.data.message || "An error occurred"); // Display the error message from the server, or a generic error message
      } else {
        navigate("/login");
      }
    }).catch((error) => {
      setError("An error occurred while signing up"); // Display generic error message for network or other errors
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Sign Up</h1>
        <h2>Welcome, let's get started</h2>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Name"
            value={user_name}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
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
        {error && <p className="error-message">{error}</p>}
        <div className="button-group">
          <button type="submit" className="login-button">Sign Up</button>
          <button type="button" className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
        </div>
        <Link to="/login" className="signup-link">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Signupform;