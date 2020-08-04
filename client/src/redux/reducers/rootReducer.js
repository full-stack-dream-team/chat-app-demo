import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  errors: errorReducer,
  otherUser: userReducer,
});

export default rootReducer;
