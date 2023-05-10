import { combineReducers } from "redux";
import signUpReducer from "./signup/reducers/signUpReducer";
import loginReducer from "./login/reducers/loginReducer"
import roleList from "./rolelist/redux/roleListReducer"
import poleListReducer from "./pollList/redux/pollListReducer"
import addPollReducer from "./addPoll/reducers/addPollReducer";

const reducers = combineReducers({
  signUp: signUpReducer,
  login:loginReducer,
  roleList:roleList,
  pollList:poleListReducer,
  addPoll:addPollReducer
});

export default reducers;
