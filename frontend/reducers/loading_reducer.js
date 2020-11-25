import {
  START_LOADING_TRIPS,
  START_LOADING_TRIP,
  RECEIVE_TRIP,
  RECEIVE_TRIPS,
  RECEIVE_ERRORS,
  START_POSTING_TRIP,
  COMPLETE_POSTING_TRIP,
} from "../actions/trip_actions";

// import { START_UPLOADING, RECIEVE_UPLOAD } from "../actions/form_actions";

const initialState = {
  indexLoading: false,
  detailLoading: false,
  tripPosting: false,
};

const loadingReducer = (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_TRIPS:
      return Object.assign({}, state, { indexLoading: false });
    case RECEIVE_TRIP:
      return Object.assign({}, state, {
        detailLoading: false,
        tripPosting: false,
      });
    case RECEIVE_ERRORS:
      return Object.assign({}, state, {
        tripPosting: false,
        detailLoading: false,
      });
    case START_LOADING_TRIPS:
      return Object.assign({}, state, { indexLoading: true });
    case START_LOADING_TRIP:
      return Object.assign({}, state, { detailLoading: true });
    case START_POSTING_TRIP:
      return Object.assign({}, state, {
        tripPosting: true,
      });
    case COMPLETE_POSTING_TRIP:
      return Object.assign({}, state, {
        tripPosting: false,
      });
    default:
      return state;
  }
};

export default loadingReducer;
