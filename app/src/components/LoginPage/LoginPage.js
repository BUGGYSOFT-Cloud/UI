// src/components/LoginPage/LoginPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [account, setAccount] = useState("");
  const [passcode, setPasscode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted", account, passcode);
  };

  return (
    <div className="login-page">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Job Search</Link>
        </div>
        <div className="login-icon">
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="login-container">
        <h2 className="Head">Login</h2>
        <p className="Subhead">Welcome back! Please login to your account.</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="account" className="Prompt">
            Email
          </label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Enter your email"
            className="inputField"
          />

          <label htmlFor="password" className="Prompt">
            Password
          </label>
          <input
            type="password"
            id="passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter your password"
            className="inputField"
          />

          <button type="submit">Login</button>
        </form>
        <div className="signup-section">
          <p>Don't have an account?</p>
          <Link to="/signup">
            <button>Create one</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
