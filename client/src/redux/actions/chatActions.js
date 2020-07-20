import axios from "axios";

export const uploadFile = (image) => () => {
  axios
    .post("/api/chat/upload", image)
    .then((res) => console.log(res))
    .catch((err) => console.dir(err));
};
