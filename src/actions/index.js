import streamAPI from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_AUTH,
  FETCH_STATUS,
  CREATE_STREAM,
} from "./type";

export const signIn = (uid) => {
  console.log("We're signing in.");
  return {
    type: SIGN_IN,
    payload: uid,
  };
};

export const signOut = () => {
  console.log("We're signing out.");
  return {
    type: SIGN_OUT,
  };
};

export const fetchStatus = (cb) => async (dispatch, getState) => {
  //wait and get auth object.
  //it'll get sent to the store for our app to use.
  await dispatch(fetchAuth());
  const auth = getState().current;

  //Get the initial status of the auth object.
  cb(auth.isSignedIn.get());
  dispatch({ type: FETCH_STATUS, payload: auth.isSignedIn.get() });

  //add a listener that will update the state; if the isSignedIn property changes.
  auth.isSignedIn.listen(() => {
    cb(auth.isSignedIn.get());
    dispatch({ type: FETCH_STATUS, payload: auth.isSignedIn.get() });
  });
};

export const fetchAuth = () => async (dispatch) => {
  try {
    await new Promise((resolve, reject) => {
      window.gapi.load("client:auth2", resolve);
    });
    await window.gapi.client.init({
      clientId: "",
      scope: "email",
    });
  } catch (err) {
    throw new Error("Error initializing gapi client: ", err);
  }

  const auth = window.gapi.auth2.getAuthInstance();
  dispatch({ type: FETCH_AUTH, payload: auth });
};

export const createStream = (formValues) => async (dispatch) => {
  //sent the new stream to our local server
  const stream = await streamAPI.post("/streams", formValues);
  //sent the new stream to our application level state inside our redux store.
  dispatch({ type: CREATE_STREAM, payload: stream.data });
};
