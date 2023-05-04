import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import "./signUp.css";
import roleList from "../../redux/rolelist/actions/roleList";
import { signUpValidateForm } from "../../utils/formValidate";
import { signUpHandleBlur } from "../../utils/formValidate";

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
  const submit = () => {
    signUpValidateForm(formData, setFormErrors, dispatch);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBlur = (event) => {
    signUpHandleBlur(event, formErrors, setFormErrors);
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/adminPollList");
    }
    if (successOrErrorMessage.userRegister) {
      navigate("/", { replace: true });
    } else if (successOrErrorMessage.error) {
      setFormErrors((prevState) => ({
        ...prevState,
        emailError: "Repeated Email",
      }));
    }
    dispatch(roleList());
  }, [successOrErrorMessage]);
  return (
    <Container className="container-fluid">
      <Form className="signup-form">
        <h2 className="signup">Sign Up</h2>
        <Form.Group className="form-group">
          <Form.Label className="label">First Name</Form.Label>
          <Form.Control
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
          <Form.Label className="label">Last Name</Form.Label>
          <Form.Control
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
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter your password"
            onBlur={handleBlur}
            required
          />
          <div className="error-message">{formErrors.passwordError}</div>
          <Form.Label className="label">Email Address</Form.Label>
          <Form.Control
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
          <Form.Label className="label">Role</Form.Label>
          <Form.Select
            id="role"
            className="form-control"
            onBlur={handleBlur}
            onChange={handleChange}
            name="roleId"
          >
            <option value="0">Select Role</option>
            {role.map((element, index) => {
              return (
                <option key={element.name} value={element.id.toString()}>
                  {element.name}
                </option>
              );
            })}
          </Form.Select>
          <div className="error-message">{formErrors.roleError}</div>
        </Form.Group>
        <Button
          className="submit"
          onClick={submit}
          disabled={successOrErrorMessage.loading ? true : false}
        >
          {successOrErrorMessage.loading ? "Loading..." : "Submit"}
        </Button>
        <div className="signin-message">
          Already have an account?{" "}
          <span
            className="navigate-signin"
            onClick={() => navigate("/", { replace: true })}
          >
            Login Here!
          </span>
        </div>
      </Form>
    </Container>
  );
};

export default SignUpPage;
