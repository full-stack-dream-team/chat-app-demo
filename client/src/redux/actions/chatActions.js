import axios from "axios";
import { SET_POSTS_LOADING } from "./types";

export const uploadImage = (imageUrl) => () => {
  if (imageUrl) {
    axios
      .post("/api/chat/upload", { imageUrl })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.response.data));
  }
};

export const setPostsLoading = (loading) => (dispatch) => {
  dispatch({ type: SET_POSTS_LOADING, payload: loading });
};
