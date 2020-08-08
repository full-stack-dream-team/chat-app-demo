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

export const uploadProfileImage = (user, image) => (dispatch) => {
  axios
    .post("/api/users/profile", { user, image })
    .then((res) => {
      dispatch({ type: SET_OTHER_USER, payload: res.data });
      // dispatch({ type: SET_PROFILE_IMAGE, payload: { user, image } });
    })
    .catch((err) => console.error(err));
};
