import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../../constants";

const initialState = {
  userLogin: "",
  loading: false,
  error: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userLogin: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default signUpReducer;
