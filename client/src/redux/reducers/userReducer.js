import { SET_OTHER_USER } from "../actions/types";

const initialState = {
  name: "",
  email: "",
  password: "",
  authorized: "",
  createdAt: "",
  _id: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OTHER_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;
