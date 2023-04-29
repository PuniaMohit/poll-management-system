import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../../constants";

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios.post(
      "https://pollapi.innotechteam.in/user/register",
      userData
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data)
    //this console is just to show that thunk is applied.
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};
