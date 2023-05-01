import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { register } from "../../redux/signup/actions/signUp";


const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const successOrErrorMessage = useSelector((state) => state.signUp);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");

  const validateForm = (event) => {
    event.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    let role = document.getElementById("role").value;
    if (role === "Admin") {
      role = "1";
    } else {
      role = "2";
    }
    const nameRegex = /^.{4,}$/;
    const passwordRegex =
      /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
    const firstNameValid = nameRegex.test(firstName);
    const lastNameValid = nameRegex.test(lastName);
    const passwordValid = passwordRegex.test(password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailRegex.test(email);

    const roleValid = role !== "";

    setFirstNameError("");
    setLastNameError("");
    setPasswordError("");
    setEmailError("");
    setRoleError("");

    let errors = [];

    if (!firstNameValid) {
      errors.push("First name must be at least 4 characters");
    }
    if (!lastNameValid) {
      errors.push("Last name must be at least 4 characters");
    }
    if (!passwordValid) {
      errors.push(
        "min. 8 characters, one uppercase letter, lowercase letter, number."
      );
    }
    if (!emailValid) {
      errors.push("Invalid email");
    }
    if (!roleValid) {
      errors.push("Role must be selected");
    }

    if (errors.length > 0) {
      if (!firstNameValid) {
        setFirstNameError(errors[0]);
      } else if (!lastNameValid) {
        setLastNameError(errors[0]);
      } else if (!passwordValid) {
        setPasswordError(errors[0]);
      } else if (!emailValid) {
        setEmailError(errors[0]);
      } else if (!roleValid) {
        setRoleError(errors[0]);
      }
    } else {
      let userRegister = {};
      userRegister.firstName = firstName;
      userRegister.lastName = lastName;
      userRegister.password = password;
      userRegister.email = email;
      userRegister.roleId = role;
      dispatch(register(userRegister));
    }
  };
useEffect(()=>{
    if(JSON.parse(sessionStorage.getItem("user"))) {
      navigate("/adminPollList");
    }
if(successOrErrorMessage.userRegister){
  navigate('/login')
}else if(successOrErrorMessage.error){
  setEmailError('Repeated Email') 
}
},[successOrErrorMessage])
  return (
    <div className="container-fluid pt-5">
      <form className="signup-form card p-3 shadow bg-white">
        <h2 className="mx-auto">Signup Form</h2>
        <div className="form-group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            className="form-control"
            placeholder="Enter your first name"
            required
          />
          <div className="error-message">{firstNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            className="form-control"
            placeholder="Enter your last name"
            required
          />
          <div className="error-message">{lastNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="error-message">{passwordError}</div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email address"
            required
          />
          <div className="error-message">{emailError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="role" className="form-control" required>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <div className="error-message">{roleError}</div>
        </div>
        <button type="submit" onClick={validateForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
