import {
  START_LOADING_TRIPS,
  START_LOADING_TRIP,
  RECEIVE_TRIP,
  RECEIVE_TRIPS,
  RECEIVE_TRIP_ERRORS,
} from "../actions/trip_actions";

// import { START_UPLOADING, RECIEVE_UPLOAD } from "../actions/form_actions";

const initialState = {
  indexLoading: false,
  detailLoading: false,
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, { indexLoading: false });
    case RECEIVE_TRIP:
      return Object.assign({}, state, {
        detailLoading: false,
      });
    case RECEIVE_TRIP_ERRORS:
      return Object.assign({}, state, { detailLoading: false });
    case START_LOADING_TRIPS:
      return Object.assign({}, state, { indexLoading: true });
    case START_LOADING_TRIP:
      return Object.assign({}, state, { detailLoading: true });
    default:
      return state;
  }
};

export default loadingReducer;
