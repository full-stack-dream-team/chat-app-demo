import { SET_OTHER_USER, SET_PROFILE_IMAGE } from "../actions/types";

const initialState = {
  name: "",
  email: "",
  password: "",
  authorized: "",
  createdAt: "",
  _id: "",
  image: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OTHER_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SET_PROFILE_IMAGE: {
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
