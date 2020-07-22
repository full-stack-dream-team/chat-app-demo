import axios from "axios";

export const uploadImage = (file) => () => {
  axios
    .post("/api/chat/upload", file)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
