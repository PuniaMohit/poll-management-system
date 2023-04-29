import { combineReducers } from "redux";
import signUpReducer from "./signup/reducers/signUpReducer";

const reducers = combineReducers({
  signUpReducer: signUpReducer,
});

export default reducers;
