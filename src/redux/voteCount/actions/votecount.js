import {
  VOTE_COUNT_REQUEST,
  VOTE_COUNT_SUCCESS,
  VOTE_COUNT_FAILURE,
} from "../../constants";
import api from "../../Tokenapi"

 const voteCount = (userData) => async (dispatch) => {
  try {
    dispatch({ type: VOTE_COUNT_REQUEST });
    const { data } = await api.post("/vote/count", userData);
    dispatch({
      type: VOTE_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: VOTE_COUNT_FAILURE,
      payload: error.response.data,
    });
  }
};

export default voteCount;