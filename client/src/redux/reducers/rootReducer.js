import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import chatRoomReducer from "./chatRoomReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  chatRoom: chatRoomReducer,
  errors: errorReducer,
  otherUser: userReducer,
});

export default rootReducer;
