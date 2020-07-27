import { combineReducers } from "redux";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  errors: errorReducer,
});

export default rootReducer;
