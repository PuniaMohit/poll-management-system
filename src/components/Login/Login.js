import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { signInValidateForm } from "../../utils/formValidate";
import { signInHandleBlur } from "../../utils/formValidate";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successOrErrorMessage = useSelector((state) => state.login);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const submit = () => {
    signInValidateForm(formData, setFormErrors, dispatch);
  };
  const handleBlur = (event) => {
    signInHandleBlur(event, formErrors, setFormErrors);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      navigate("/adminPollList");
    } else {
      if (successOrErrorMessage.userLogin) {
        localStorage.setItem(
          "user",
          JSON.stringify(successOrErrorMessage.userLogin)
        );
        navigate("/adminPollList");
      } else if (successOrErrorMessage.error) {
        if (successOrErrorMessage.error.message === "password is incorrect") {
          setFormErrors((prevState) => ({
            ...prevState,
            passwordError: "password is incorrect",
          }));
        } else if (
          successOrErrorMessage.error.message === "user data not found"
        )
          setFormErrors((prevState) => ({
            ...prevState,
            emailError: "user data not found",
          }));
      }
    }
  }, [successOrErrorMessage]);

  return (
    <Container className="container-fluid">
      <Form className="signin-form">
        <h2 className="login">Login</h2>
        <Form.Group className="form-group">
          <Form.Label className="label">Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email address"
          />
          <div className="error-message">{formErrors.emailError}</div>
          <Form.Label className="label">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your password"
          />
          <div className="error-message">{formErrors.passwordError}</div>
        </Form.Group>
        <Button
          className="submit"
          onClick={submit}
          disabled={successOrErrorMessage.loading ? true : false}
        >
          {successOrErrorMessage.loading ? "Loading..." : "Submit"}
        </Button>
        <div className="signup-message">
          No Account?
          <span className="navigate-signup" onClick={() => navigate("/signup")}>
            Signup
          </span>
        </div>
      </Form>
    </Container>
  );
};

export default LoginPage;
