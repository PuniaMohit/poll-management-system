import "./login.css";
import { useState } from "react";

const LoginPage = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    const passwordValid = passwordRegex.test(password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(email);

    setEmailError("");
    setPasswordError("");

    let errors = [];

    if (!emailValid) {
      errors.push("Invalid email");
    }
    if (!passwordValid) {
      errors.push(
        "min. 8 characters, one uppercase letter, lowercase letter, number"
      );
    }

    if (errors.length > 0) {
      if (!emailValid) {
        setEmailError(errors[0]);
      } else if (!passwordValid) {
        setPasswordError(errors[0]);
      }
    } else {
      // this console is for further reference
      console.log("Form submitted");
    }
  };

  return (
    <form className="login-form">
      <h2>Login Form</h2>
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email address"
          required
        />
        <div className="error-message">{emailError}</div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="error-message">{passwordError}</div>
      <button type="submit" onClick={validateForm}>
        Submit
      </button>
    </form>
  );
};

export default LoginPage;
