import { RECEIVE_USER } from "../actions/session_actions";
import { LOGOUT_USER } from "../actions/session_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default usersReducer;
