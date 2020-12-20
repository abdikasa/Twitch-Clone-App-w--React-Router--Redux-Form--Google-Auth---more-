import { SIGN_IN, SIGN_OUT } from "../actions/type";

export default (state = null, action) => {
  console.log("what is the value of state and action", state, action);
  switch (action.type) {
    case SIGN_IN:
      console.log("we are about to sign in, id is ", action.payload);
      return action.payload;
    case SIGN_OUT:
      console.log(
        "we are about to log out, return null, last state was",
        state
      );
      return null;
    default:
      console.log("default option was selected", state);
      return state;
  }
};
