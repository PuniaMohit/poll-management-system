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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    roleId: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    emailError: "",
    roleError: "",
  });
  const nameRegex = /^.{4,}$/;
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validateForm = (event) => {
    event.preventDefault();
    const { firstName, lastName, password, email, roleId } = formData;
    const errors = {
      firstName: nameRegex.test(firstName)
        ? ""
        : "First name must be at least 4 characters",
      lastName: nameRegex.test(lastName)
        ? ""
        : "Last name must be at least 4 characters",
      password: passwordRegex.test(password)
        ? ""
        : "min. 8 characters, one uppercase letter, lowercase letter, number",
      email: emailRegex.test(email) ? "" : "Invalid email",
      role: roleId !== "" ? "" : "Role must be selected",
    };
    setFormErrors({
      firstNameError: errors.firstName,
      lastNameError: errors.lastName,
      passwordError: errors.password,
      emailError: errors.email,
      roleError: errors.role,
    });
    if (
      nameRegex.test(firstName) &&
      nameRegex.test(lastName) &&
      passwordRegex.test(password) &&
      emailRegex.test(email) &&
      roleId
    ) {
      dispatch(register(formData));
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    let newFormErrors = { ...formErrors };
    if (name === "firstName") {
      newFormErrors.firstNameError = !nameRegex.test(value)
        ? "First name must be at least 4 characters"
        : "";
    } else if (name === "lastName") {
      newFormErrors.lastNameError = !nameRegex.test(value)
        ? "Last name must be at least 4 characters"
        : "";
    } else if (name === "password") {
      newFormErrors.passwordError = !passwordRegex.test(value)
        ? "Invalid password"
        : "";
    } else if (name === "email") {
      newFormErrors.emailError = !emailRegex.test(value) ? "Invalid email" : "";
    } else {
      newFormErrors.roleError =
        value === "select Role" ? "Role must be selected" : "";
    }
    setFormErrors(newFormErrors);
  };

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("user"))) {
      navigate("/adminPollList");
    }
    if (successOrErrorMessage.userRegister) {
      navigate("/", { replace: true });
    } else if (successOrErrorMessage.error) {
      formErrors.emailError("Repeated Email");
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
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{formErrors.firstNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter your last name"
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{formErrors.lastNameError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter your password"
            onBlur={handleBlur}
            required
          />
        </div>
        <div className="error-message">{formErrors.passwordError}</div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter your email address"
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{formErrors.emailError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            className="form-control"
            onBlur={handleBlur}
            onChange={handleChange}
            name="roleId"
            required
          >
            <option value="0">Select Role</option>
            {role.map((element, index) => {
              return (
                <option key={element.name} value={element.id.toString()}>
                  {element.name}
                </option>
              );
            })}
          </select>
          <div className="error-message">{formErrors.roleError}</div>
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
