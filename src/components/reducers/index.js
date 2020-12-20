import { combineReducers } from "redux";
import getAuthReducer from "./getAuthReducer";
import checkOnlineStatus from "./checkOnlineStatus";
import getId from "./getId";

export default combineReducers({
  current: getAuthReducer,
  currentStatus: checkOnlineStatus,
  uid: getId,
});
