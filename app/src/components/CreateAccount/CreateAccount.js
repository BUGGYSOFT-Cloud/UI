/* src/components/CreateAccount/CreateAccount.js */
import React, { useState } from "react";
import "./CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate first and last names
    if (!firstName.trim() || !lastName.trim()) {
      alert("Please enter both your first and last names.");
      return;
    }

    if (!gender) {
      alert("Please enter your gender.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    if (!confirmPassword) {
      alert("Please confirm your password.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Further validation here (e.g., password strength, username checks)

    console.log("Account Created", email, password);

    // Redirect to the email verification page
    navigate("/email-verification");
  };

  return (
    <div className="create-account-page">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">Job Search</Link>
        </div>
        <div className="login-icon">
          <Link to="/login">Login</Link>
        </div>
      </nav>
      <div className="create-account-container">
        <h2>Create Account</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="name-section">
            <div className="name-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div className="name-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="gender-section">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select your gender</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
              <option value="OTHER">OTHER</option>
            </select>
          </div>

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Choose an email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />

          <button type="submit">Create Account</button>
        </form>
        <div className="login-section">
          <p>Already have an account?</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
