import { combineReducers } from "redux";
import signUpReducer from "./signup/reducers/signUpReducer";
import loginReducer from "./login/reducers/loginReducer"
import roleList from "./rolelist/redux/roleListReducer"
import poleListReducer from "./pollList/redux/pollListReducer"

const reducers = combineReducers({
  signUp: signUpReducer,
  login:loginReducer,
  roleList:roleList,
  pollList:poleListReducer,
});

export default reducers;
