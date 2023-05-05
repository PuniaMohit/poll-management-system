import axios from "axios";
import {
  ROLELIST_REQUEST,
  ROLELIST_SUCCESS,
  ROLELIST_FAILURE,
} from "../../constants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

 const roleList = () => async (dispatch) => {
  try {
    dispatch({ type: ROLELIST_REQUEST });
    const { data } = await api.get("/role/list");
    dispatch({
      type: ROLELIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROLELIST_FAILURE,
      payload: error.response.data,
    });
  }
};

export default roleList
