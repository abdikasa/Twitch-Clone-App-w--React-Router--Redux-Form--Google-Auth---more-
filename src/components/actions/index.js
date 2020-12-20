import { SIGN_IN, SIGN_OUT } from "./type";
export const signIn = (uid) => {
  console.log("inside action creator", uid);
  return {
    type: SIGN_IN,
    payload: uid,
  };
};

export const signOut = () => {
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
  console.log("attempting to get the initial state");
  cb(auth.isSignedIn.get());
  dispatch({ type: "FETCH_STATUS", payload: auth.isSignedIn.get() });

  //add a listener that will update the state; if the isSignedIn property changes.
  auth.isSignedIn.listen(() => {
    cb(auth.isSignedIn.get());
    dispatch({ type: "FETCH_STATUS", payload: auth.isSignedIn.get() });
  });
};

export const fetchAuth = () => async (dispatch) => {
  try {
    await new Promise((resolve, reject) => {
      window.gapi.load("client:auth2", resolve);
    });
    await window.gapi.client.init({
      clientId: "somekey",
      scope: "email",
    });
  } catch (err) {
    throw new Error("Error initializing gapi client: ", err);
  }

  const auth = window.gapi.auth2.getAuthInstance();
  dispatch({ type: "FETCH_AUTH", payload: auth });
};
