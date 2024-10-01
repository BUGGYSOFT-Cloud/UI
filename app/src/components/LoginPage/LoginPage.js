// src/components/LoginPage/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const USER_SERVICE_API_URL = process.env.REACT_APP_USER_SERVICE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!email || !password) {
      toast.error("Please enter your account information.");
      return;
    }

    // Prepare the data to be sent
    const loginData = {
      email: email.trim(),
      password: password,
    };

    try {
      // Send POST request to the backend login API
      const response = await fetch("/userapi/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Check if the request was successful
      if (response.ok) {
        const user = await response.json();
        console.log("Login Successful:", user);

        // Show success notification
        toast.success("Login successful!");

        // Redirect to the dashboard page or another protected page
        setTimeout(() => {
          navigate("/job-services"); // Adjust this path as needed
        }, 2000); // Delay to let the success toast show
      } else {
        const errorText = await response.text(); // Retrieve error text from response
        if (errorText === "User or Password Incorrect") {
          toast.error("User or Password Incorrect");
        } else {
          toast.error(`Error: ${errorText || "Failed to login"}`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="inputField"
          />

          <label htmlFor="password" className="Prompt">
            Password
          </label>
          <input
            type="password"
            id="passcode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
