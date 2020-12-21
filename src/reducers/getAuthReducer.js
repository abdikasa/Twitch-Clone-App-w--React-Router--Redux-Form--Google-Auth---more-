const INITIAL = null;

export default (state = INITIAL, action) => {
  switch (action.type) {
    case "FETCH_AUTH":
      return action.payload;
    default:
      return state;
  }
};
