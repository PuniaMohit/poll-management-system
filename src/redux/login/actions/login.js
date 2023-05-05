import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../../constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.post(
      "/user/login",
      userData
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};
