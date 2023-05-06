import axios from "axios";
import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAILURE,
} from "../../constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const pollList = (userToken) => async (dispatch) => {
  try {
    dispatch({ type: POLL_LIST_REQUEST });
    const config = {
      headers: {
        Token: userToken,
      },
    };
    const { data } = await api.get("/poll/list/1?limit=4", config);
    dispatch({
      type: POLL_LIST_SUCCESS,
      payload: data.rows,
    });
  } catch (error) {
    dispatch({
      type: POLL_LIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export default pollList;
