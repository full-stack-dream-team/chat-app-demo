import { SET_POSTS_LOADING } from "../actions/types";

const initialState = {
  postsLoading: true,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS_LOADING:
      return {
        ...state,
        postsLoading: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
