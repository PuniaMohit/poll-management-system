import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../../constants";

const initialState = {
  userLogin: "",
  token:"",
  loading: false,
  error: null,
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, userLogin:'', error:null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userLogin: action.payload.user,token:action.payload.token, error:null };
    case LOGIN_FAILURE:
      return { ...state, loading: false, userLogin:'', error: action.payload };
    default:
      return state;
  }
};

export default signUpReducer;
