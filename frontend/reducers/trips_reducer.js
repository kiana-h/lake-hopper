import { RECEIVE_TRIPS, RECEIVE_TRIP } from "../actions/trip_actions";

const tripsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TRIPS:
      return action.trips;
    case RECEIVE_TRIP:
      return Object.assign({}, state, { [action.trip.id]: action.trip });
    default:
      return state;
  }
};

export default tripsReducer;
