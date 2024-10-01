import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./EmailVerification.css";

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const navigate = useNavigate();

  // console.log("Rendering EmailVerification component");
  useEffect(() => {
    // Check if the user is allowed to access this page
    // const allowAccess = localStorage.getItem("allowEmailVerificationAccess");
    // console.error("allowAccess:", allowAccess);
    // if (allowAccess !== "true") {
    //   // If access is not allowed, redirect to the register page
    //   toast.error("You are not authorized to access this page.");
    //   setTimeout(() => {
    //     navigate("/signup");
    //   }, 2000);
    //   return;
    // }

    // Retrieve the email address from localStorage
    const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));
    if (pendingUser && pendingUser.email) {
      setEmail(pendingUser.email);
      // Send the verification code if it hasn't been sent already
      if (!codeSent) {
        sendVerificationCode(pendingUser.email);
        setCodeSent(true); // Update the flag to indicate that the code has been sent
      }
    } else {
      toast.error("No email address found. Please register again.");
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
    }

    // Clean up function: Only run this on component unmount
    return () => {
      console.log("Cleaning up EmailVerification component");
      localStorage.removeItem("allowEmailVerificationAccess");
    };
  }, [navigate, codeSent]);

  // Function to send the verification code to the email
  const sendVerificationCode = async (email) => {
    try {
      const response = await fetch(
        `/verifyapi/sendCode?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Verification code sent to your email!");
      } else {
        const errorText = await response.text();
        toast.error(`Failed to send verification code: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while sending the verification code.");
    }
  };

  const handleVerify = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("No email address found. Please register again.");
      return;
    }

    try {
      // Send the verification code to the backend to verify
      const response = await fetch(
        `/verifyapi/verify?email=${encodeURIComponent(
          email
        )}&code=${encodeURIComponent(verificationCode)}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        toast.success("Email verified successfully!");

        // Retrieve the pendingUser data from localStorage
        const pendingUser = JSON.parse(localStorage.getItem("pendingUser"));

        // Send the verified user's data to save it in the backend
        const saveUserResponse = await fetch(`/userapi`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pendingUser), // Send the pending user data
        });

        if (saveUserResponse.ok) {
          toast.success("Account successfully created and verified!");

          // Redirect to the homepage or another page, e.g., dashboard
          setTimeout(() => {
            navigate("/job-services");
          }, 1500);
        } else {
          const saveUserError = await saveUserResponse.text();
          toast.error(`Failed to save user data: ${saveUserError}`);
        }
      } else {
        const errorText = await response.text();
        toast.error(`Verification failed: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while verifying the code. Please try again."
      );
    }
  };

  const handleResendCode = () => {
    if (email) {
      sendVerificationCode(email);
    } else {
      toast.error("No email address found. Please register again.");
      setTimeout(() => {
        navigate("/signup");
      }, 2000);
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
          <span className="resend-link" onClick={handleResendCode}>
            Resend Code
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerification;
