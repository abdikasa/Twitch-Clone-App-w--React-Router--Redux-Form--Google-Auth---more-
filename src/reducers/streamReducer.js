import {
  FETCH_STREAM,
  FETCH_STREAMS,
  EDIT_STREAM,
  DELETE_STREAM,
  CREATE_STREAM,
} from "../actions/type";

const INITIAL = {};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      const nested = {};
      [...action.payload].forEach((stream) => {
        nested[stream.id] = stream;
      });
      return nested;
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      delete state[action.payload];
      return { ...state };
    default:
      return state;
  }
};
