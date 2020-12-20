import { combineReducers } from "redux";
import getAuthReducer from "./getAuthReducer";
import checkOnlineStatus from "./checkOnlineStatus";
import getId from "./getId";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  current: getAuthReducer,
  currentStatus: checkOnlineStatus,
  uid: getId,
  form: formReducer,
});
