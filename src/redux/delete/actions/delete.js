import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from "../../constants";

import api from "../../Tokenapi"

 const deletePoll = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REQUEST });
    const { data } = await api.delete(`/poll/${id}`);
    dispatch({
      type: DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FAILURE,
      payload: error.response.data,
    });
  }
};

export default deletePoll;