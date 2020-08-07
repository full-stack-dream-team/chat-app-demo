import axios from "axios";
import { SET_CHAT_ROOMS, ADD_CHAT_ROOM } from "./types";

import M from "materialize-css";

export const getChatRooms = () => (dispatch) => {
  axios
    .get("/api/chatRooms/")
    .then((res) => {
      dispatch({ type: SET_CHAT_ROOMS, payload: res.data });
    })
    .catch((err) => console.error(err));
};

export const addChatRoom = (chatRoomInfo) => (dispatch) => {
  axios
    .post("/api/chatRooms/add", chatRoomInfo)
    .then((res) => {
      dispatch({ type: ADD_CHAT_ROOM, payload: res.data });
    })
    .catch((err) => console.error(err));
};

export const deleteChatRoom = (roomId) => (dispatch) => {
  if (
    window.confirm("Are you sure you want to delete this chat room?") &&
    window.confirm("Are you REALLY SURE?!?")
  ) {
    axios.post("/api/chatRooms/delete", { roomId }).then((res) => {
      M.toast({ html: res.data, classes: "green" });

      getChatRooms()(dispatch);
    });
  } else {
    M.toast({ html: "Oh man, that was VERY close. 😰", classes: "blue" });
  }
};
