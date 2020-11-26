import { RECEIVE_USER, LOGOUT_USER } from "../actions/session_actions";

const initSate = {
  id: null,
};

const sessionReducer = (state = initSate, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { id: action.user.id });
    case LOGOUT_USER:
      return Object.assign({}, state, { id: null });
    default:
      return state;
  }
};

export default sessionReducer;
