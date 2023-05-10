import {
  POLL_LIST_REQUEST,
  POLL_LIST_SUCCESS,
  POLL_LIST_FAILURE,
} from "../../constants";

const initialState = {
  pollList: [{ title: "", optionList: [{ optionTitle: "" }] }],
  loading: false,
  error: null,
};

const pollListReducer = (state = initialState, action) => {
  switch (action.type) {
    case POLL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        pollList: [],
        error: null,
      };
    case POLL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        pollList: action.payload,
        error: null,
      };
    case POLL_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        pollLis: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pollListReducer;
