import { UPDATE_FILTER } from "../actions/filter_actions";
const defaultState = {
  bounds: {},
};
const filtersReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_FILTER:
      return Object.assign({}, state, { [action.filter]: action.value });
    default:
      return state;
  }
};

export default filtersReducer;
