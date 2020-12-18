import { combineReducers } from "redux";
import getAuthReducer from "./getAuthReducer";
import checkOnlineStatus from "./checkOnlineStatus";

export default combineReducers({
  fake: () => "I am a fake",
});
