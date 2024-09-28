import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./EmailVerification.css";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = (event) => {
    event.preventDefault();

    if (verificationCode.trim() === "123456") {
      alert("Email verified successfully!");
      navigate("/"); // Redirect to the landing page, but it the future will redirect to dashboard page
    } else {
      alert("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="email-verification-page">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Job Search</Link>
        </div>
        <div className="login-icon">
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="verification-container">
        <h2>Email Verification</h2>
        <p>Please enter the verification code sent to your email address:</p>
        <form className="verification-form" onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit">Verify</button>
        </form>
        <p className="resend-text">
          Didn't receive the code?{" "}
          <span className="resend-link">Resend Code</span>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
