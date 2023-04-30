import { combineReducers } from "redux";
import signUpReducer from "./signup/reducers/signUpReducer";
import loginReducer from "./login/reducers/loginReducer"

const reducers = combineReducers({
  signUp: signUpReducer,
  login:loginReducer
});

export default reducers;
