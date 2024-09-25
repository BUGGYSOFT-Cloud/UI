// src/components/LandingPage.js
import React from "react";
import "./LandingPage.css"; // Import the CSS file

const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="navbar">
        <h1 className="logo">Job Search</h1>
        <div className="login-icon">
          <a href="/login">Login</a>
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
