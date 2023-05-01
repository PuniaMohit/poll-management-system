import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { login } from "../../redux/login/actions/login";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successOrErrorMessage = useSelector((state) => state.login);
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
      let userLogin = {};
      userLogin.email = email;
      userLogin.password = password;
      dispatch(login(userLogin));
    }
  };

  useEffect(() => {
    if(JSON.parse(sessionStorage.getItem("user"))) {
      navigate("/adminPollList");
    }else{
      if (successOrErrorMessage.userLogin) {
        sessionStorage.setItem("user",JSON.stringify(successOrErrorMessage.userLogin));
        navigate("/adminPollList");
      } else if (successOrErrorMessage.error) {
        if (successOrErrorMessage.error.message === "password is incorrect") {
          setPasswordError("password is incorrect");
        } else if (
          successOrErrorMessage.error.message === "user data not found"
        )
          setEmailError("user data not found");
      }
    }
    
  }, [successOrErrorMessage]);

  return (
    <div className="container-fluid pt-5">
      <form className="signup-form card p-3 shadow bg-white">
        <h2 mx-auto>Login Form</h2>
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
    </div>
  );
};

export default LoginPage;
