import axios from "axios";
import { SET_OTHER_USER } from "./types";

export const getUser = (userId) => (dispatch) => {
  axios
    .get(`/api/users/${userId}`)
    .then((res) => {
      dispatch({ type: SET_OTHER_USER, payload: res.data });
    })
    .catch((err) => console.error(err));
};
