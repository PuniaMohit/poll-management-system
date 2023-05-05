import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
} from "../../constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await api.post(
      "/user/register",
      userData
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response.data,
    });
  }
};
