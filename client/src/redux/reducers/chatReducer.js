import {
  SET_POSTS_LOADING,
  SET_SINGLE_POST,
  GET_ALL_POSTS,
  REMOVE_SINGLE_POST,
  EDIT_POST,
  SET_EFFECT,
} from "../actions/types";

const initialState = {
  postsLoading: true,
  posts: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_POSTS_LOADING: {
      return {
        ...state,
        postsLoading: action.payload,
      };
    }

    case SET_SINGLE_POST: {
      const posts = [...state.posts, action.payload];
      const chatLimit = 50;
      if (posts.length > chatLimit) {
        posts.slice(posts.length - chatLimit);
      }

      return {
        ...state,
        posts: posts,
      };
    }
    case GET_ALL_POSTS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case REMOVE_SINGLE_POST: {
      const posts = [...state.posts];
      posts.splice(
        posts.findIndex((msg) => action.payload === msg._id),
        1
      );

      return {
        ...state,
        posts: posts,
      };
    }
    case EDIT_POST: {
      const posts = [...state.posts];
      const postIndex = posts.findIndex(
        (msg) => action.payload._id === msg._id
      );

      posts[postIndex].content = action.payload.content;

      return {
        ...state,
        posts,
      };
    }
    case SET_EFFECT: {
      return {
        ...state,
        effect: action.payload,
      };
    }
    default:
      return state;
  }
};

export default chatReducer;
