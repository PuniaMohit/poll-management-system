import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { register } from "../../redux/signup/actions/signUp";
import roleList from "../../redux/rolelist/actions/roleList";

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.roleList.roleList);
  const successOrErrorMessage = useSelector((state) => state.signUp);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const nameRegex = /^.{4,}$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateForm = (event) => {
    event.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    if (role === "Admin") {
      role = "1";
    } else if (role === "user") {
      role = "2";
    } else if (role === "Hr") {
      role = "3";
    } else {
      role = "";
    }
    const firstNameValid = nameRegex.test(firstName);
    const lastNameValid = nameRegex.test(lastName);
    const passwordValid = passwordRegex.test(password);
    const emailValid = emailRegex.test(email);
    const roleValid = role !== "";
    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");
    setEmailError("");
    setRoleError("");
    if (
      firstNameValid &&
      lastNameValid &&
      passwordValid &&
      emailValid &&
      roleValid
    ) {
      let userRegister = {};
      userRegister.firstName = firstName;
      userRegister.lastName = lastName;
      userRegister.password = password;
      userRegister.email = email;
      userRegister.roleId = role;
      dispatch(register(userRegister));
    } else {
      if (!firstNameValid) {
        setFirstNameError("First name must be at least 4 characters");
      }
      if (!lastNameValid) {
        setLastNameError("Last name must be at least 4 characters");
      }
      if (!passwordValid) {
        setPasswordError(
          "min. 8 characters, one uppercase letter, lowercase letter, number"
        );
      }
      if (!emailValid) {
        setEmailError("Invalid email");
      }
      if (!roleValid) {
        setRoleError("Role must be selected");
      }
    }
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstNameError(
        !nameRegex.test(value) ? "First name must be at least 4 characters" : ""
      );
    } else if (name === "lastName") {
      setLastNameError(
        !nameRegex.test(value) ? "Last name must be at least 4 characters" : ""
      );
    } else if (name === "password") {
      setPasswordError(!passwordRegex.test(value) ? "Invalid password" : "");
    } else if (name === "email") {
      setEmailError(!emailRegex.test(value) ? "Invalid email" : "");
    } else {
      value === "select Role"
        ? setRoleError("Role must be selected")
        : setRoleError("");
    }
  };

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      navigate("/adminPollList");
    }
    if (successOrErrorMessage.userRegister) {
      navigate("/", { replace: true });
    } else if (successOrErrorMessage.error) {
      setEmailError("Repeated Email");
    }
    dispatch(roleList());
  }, [successOrErrorMessage]);
  return (
    <div className="container-fluid pt-5">
      <form className="signup-form card p-3 shadow bg-white">
        <h2 className="mx-auto">Sign Up</h2>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            className="form-control"
            placeholder="Enter your first name"
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{firstNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            className="form-control"
            placeholder="Enter your last name"
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{lastNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            onBlur={handleBlur}
            required
          />
        </div>
        <div className="error-message">{passwordError}</div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email address"
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{emailError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="form-control"
            onBlur={handleBlur}
            name="role"
            required
          >
            <option value="select Role">Select Role</option>
            {role.map((element) => {
              return (
                <option key={element.name} value={element.name}>
                  {element.name}
                </option>
              );
            })}
          </select>
          <div className="error-message">{roleError}</div>
        </div>
        <button
          type="submit"
          onClick={validateForm}
          disabled={successOrErrorMessage.loading ? true : false}
        >
          {successOrErrorMessage.loading ? "Loading..." : "Submit"}
        </button>
        <div className="mx-auto mt-2">
          Already have an account?{" "}
          <span
            className="navigate-signup"
            onClick={() => navigate("/", { replace: true })}
          >
            Login Here!
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
