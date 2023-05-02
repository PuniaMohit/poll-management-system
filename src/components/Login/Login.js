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
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateForm = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordValid = passwordRegex.test(password);
    const emailValid = emailRegex.test(email);
    setEmailError("");
    setPasswordError("");
    if (emailValid && passwordValid) {
      let userLogin = {};
      userLogin.email = email;
      userLogin.password = password;
      dispatch(login(userLogin));
    } else {
      if (!emailValid) {
        setEmailError("Invalid email");
      }
      if (!passwordValid) {
        setPasswordError(
          "min. 8 characters, one uppercase letter, lowercase letter, number"
        );
      }
    }
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmailError(!emailRegex.test(value) ? "Invalid email" : "");
    } else if (name === "password") {
      setPasswordError(!passwordRegex.test(value) ? "Invalid password" : "");
    }
  };

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      navigate("/adminPollList");
    } else {
      if (successOrErrorMessage.userLogin) {
        sessionStorage.setItem(
          "user",
          JSON.stringify(successOrErrorMessage.userLogin)
        );
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
        <h2 className="mx-auto">Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            onBlur={handleBlur}
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
            name="password"
            onBlur={handleBlur}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="error-message">{passwordError}</div>
        <button
          type="submit"
          onClick={validateForm}
          disabled={successOrErrorMessage.loading ? true : false}
        >
          {successOrErrorMessage.loading ? "Loading..." : "Submit"}
        </button>
        <div className="mx-auto mt-2">
          No Account?{" "}
          <span
            className="navigate-signup"
            onClick={() => navigate("./signup")}
          >
            Signup
          </span>{" "}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
