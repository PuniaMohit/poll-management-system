import {
  ADD_POLL_REQUEST,
  ADD_POLL_SUCCESS,
  ADD_POLL_FAILURE,
} from "../../constants";

import api from "../../Tokenapi"
import pollList from "../../pollList/actions/pollList";

export const addPoll = (userData) => async (dispatch) => {
  try {
    dispatch({ type: ADD_POLL_REQUEST });
    const  data  = await api.post("/poll/add", userData);
    data.status===200&&dispatch(pollList())
      dispatch({
      type: ADD_POLL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_POLL_FAILURE,
      payload: error.response.data,
    });
  }
};