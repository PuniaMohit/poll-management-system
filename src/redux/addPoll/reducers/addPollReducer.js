import {
    ADD_POLL_REQUEST,
    ADD_POLL_SUCCESS,
    ADD_POLL_FAILURE,
  } from "../../constants";
  
  const initialState = {
    pollAdded: "",
    loading: false,
    error: null,
  };
  
  const addPollReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_POLL_REQUEST:
        return { ...state, loading: true };
      case ADD_POLL_SUCCESS:
        return { ...state, loading: false, pollAdded: action.payload.poll.title };
      case ADD_POLL_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default addPollReducer;