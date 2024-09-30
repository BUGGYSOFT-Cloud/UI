// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import EmailVerification from "./components/EmailVerification/EmailVerification";
import JobServices from "./components/JobServices/JobServices";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/job-services" element={<JobServices />} />
      </Routes>
    </Router>
  );
};

export default App;
