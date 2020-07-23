import axios from "axios";

export const uploadImage = (image) => () => {
  if (image) {
    axios
      .post("/api/chat/upload", { image })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err.response.data));
  }
};
