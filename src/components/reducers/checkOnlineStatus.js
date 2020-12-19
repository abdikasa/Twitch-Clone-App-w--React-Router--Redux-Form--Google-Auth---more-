const INITIAL = {
  isSignedIn: null,
};

export default (state = INITIAL, action) => {
  switch (action.type) {
    case "FETCH_STATUS":
      return { ...state, isSignedIn: action.payload };
    default:
      return state;
  }
};
