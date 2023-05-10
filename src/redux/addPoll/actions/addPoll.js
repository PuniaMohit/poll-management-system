import {
  ADD_POLL_REQUEST,
  ADD_POLL_SUCCESS,
  ADD_POLL_FAILURE,
  // STORING_ADD_POLL_IN_POLL_LIST
} from "../../constants";

import api from "../../Tokenapi"

export const addPoll = (userData) => async (dispatch) => {
  try {
    // dispatch({ type: STORING_ADD_POLL_IN_POLL_LIST, payload: userData })...commented for further reference 
    dispatch({ type: ADD_POLL_REQUEST });
    const { data } = await api.post("/poll/add", userData);
    console.log(data)
    dispatch({
      type: ADD_POLL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_POLL_FAILURE,
      payload: error.response.data,
    });
  }
};