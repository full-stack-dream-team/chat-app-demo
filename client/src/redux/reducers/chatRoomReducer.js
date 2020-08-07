import { SET_CHAT_ROOMS, ADD_CHAT_ROOM } from "../actions/types";

const initialState = {
  rooms: [],
  loading: true,
};

const chatRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_ROOMS: {
      return {
        ...state,
        rooms: action.payload,
        loading: false,
      };
    }
    case ADD_CHAT_ROOM: {
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    }
    default:
      return state;
  }
};

export default chatRoomReducer;
