// src/components/LandingPage.js
import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Job Search</Link>
        </div>
        <div className="login-icon">
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="hero-section">
        <h2>Need help to find a job?</h2>
        <p>Building solutions that make life easier.</p>
      </div>
    </div>
  );
};

export default LandingPage;
