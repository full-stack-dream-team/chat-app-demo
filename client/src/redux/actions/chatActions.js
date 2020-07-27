import axios from "axios";
import { SET_POSTS_LOADING } from "./types";

export const uploadImage = (image) => () => {
  if (image) {
    axios
      .post("/api/chat/upload", { image })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.response.data));
  }
};

export const setPostsLoading = (loading) => (dispatch) => {
  dispatch({ type: SET_POSTS_LOADING, payload: loading });
};
