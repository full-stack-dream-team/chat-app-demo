import axios from "axios";

export const uploadImage = (image) => () => {
  axios
    .post("/api/chat/upload", { image })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
};
