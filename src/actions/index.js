import streamAPI from "../apis/streams";
import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_AUTH,
  FETCH_STATUS,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
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
      clientId: "someurl",
      scope: "email",
    });
  } catch (err) {
    throw new Error("Error initializing gapi client: ", err);
  }

  const auth = window.gapi.auth2.getAuthInstance();
  dispatch({ type: FETCH_AUTH, payload: auth });
};

export const createStream = (formValues) => async (dispatch, getState) => {
  //sent the new stream to our local server
  const uid = getState().uid;
  const stream = await streamAPI.post("/streams", { ...formValues, uid });
  //sent the new stream to our application level state inside our redux store.
  dispatch({ type: CREATE_STREAM, payload: stream.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const stream = await streamAPI.get(`/streams/${id}`);
  dispatch({ type: FETCH_STREAM, payload: stream.data });
};
export const fetchStreams = () => async (dispatch) => {
  const streams = await streamAPI.get("/streams");
  dispatch({ type: FETCH_STREAMS, payload: streams.data });
};
export const editStream = (formValues, id) => async (dispatch) => {
  const stream = await streamAPI.put(`/streams/${id}`, formValues);
  dispatch({ type: EDIT_STREAM, payload: stream.data });
};

export const deleteStream = (id) => async (dispatch) => {
  await streamAPI.delete(`/streams/${id}`);
  dispatch({ type: DELETE_STREAM, payload: id });
};
