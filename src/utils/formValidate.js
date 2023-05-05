import { register } from "../redux/signup/actions/signUp";
import { login } from "../redux/login/actions/login";

 const nameRegex = /^.{4,}$/;
 const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signUpValidateForm = (event,formData, setFormErrors, dispatch) => {
  console.log(formData)
  event.preventDefault()
  const { firstName, lastName, password, email, roleId } = formData;
  console.log(roleId)
  setFormErrors({
    firstNameError: nameRegex.test(firstName)
      ? ""
      : "First name must be at least 4 characters",
    lastNameError: nameRegex.test(lastName)
      ? ""
      : "Last name must be at least 4 characters",
    passwordError: passwordRegex.test(password)
      ? ""
      : "min. 8 characters, one uppercase letter, lowercase letter, number",
    emailError: emailRegex.test(email) ? "" : "Invalid email",
    roleError: roleId !== "" ? "" : "Role must be selected",
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



export const signUpHandleBlur=(event, formErrors, setFormErrors)=>{
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
    ? "min. 8 characters, one uppercase letter, lowercase letter, number"
    : "";
} else if (name === "email") {
  newFormErrors.emailError = !emailRegex.test(value) ? "Invalid email" : "";
} else {
  newFormErrors.roleError =
    value === "0" ? "Role must be selected" : "";
}
setFormErrors(newFormErrors);
};



export const signInValidateForm=(event, formData, setFormErrors, dispatch)=>{
  event.preventDefault() 
  const { email, password}=formData;
    setFormErrors({
      passwordError: passwordRegex.test(password)
      ? ""
      : "min. 8 characters, one uppercase letter, lowercase letter, number",
      emailError: emailRegex.test(email) ? "" : "Invalid email",
    });
    if (passwordRegex.test(password) && emailRegex.test(email)) {
      dispatch(login(formData));
    }
}

export const signInHandleBlur=(event, formErrors, setFormErrors)=>{
    const { name, value } = event.target;
    let newFormErrors = { ...formErrors };
    if (name === "password") {
      newFormErrors.passwordError = !passwordRegex.test(value)
        ? "min. 8 characters, one uppercase letter, lowercase letter, number"
        : "";
    } else if (name === "email") {
      newFormErrors.emailError = !emailRegex.test(value) ? "Invalid email" : "";
    }
    setFormErrors(newFormErrors);
}