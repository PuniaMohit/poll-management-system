import { combineReducers } from "redux";
import signUpReducer from "./signup/reducers/signUpReducer";
import loginReducer from "./login/reducers/loginReducer"
import roleList from "./rolelist/redux/roleListReducer"

const reducers = combineReducers({
  signUp: signUpReducer,
  login:loginReducer,
  roleList:roleList,
});

export default reducers;
