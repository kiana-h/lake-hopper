import * as ApiUtil from "../util/trip_api_util";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_TRIP = "RECEIVE_TRIP";
export const START_LOADING_TRIPS = "START_LOADING_TRIPS";
export const START_LOADING_TRIP = "START_LOADING_TRIP";
export const START_POSTING_TRIP = "START_POSTING_TRIP";
export const COMPLETE_POSTING_TRIP = "COMPLETE_POSTING_TRIP";

export const receiveTrips = (trips) => ({
  type: RECEIVE_TRIPS,
  trips,
});
export const receiveTrip = (trip) => {
  return {
    type: RECEIVE_TRIP,
    trip,
  };
};

export const startLoadingTrips = () => ({
  type: START_LOADING_TRIPS,
});

export const startLoadingTrip = () => ({
  type: START_LOADING_TRIP,
});

export const startPostingTrip = () => ({
  type: START_POSTING_TRIP,
});

export const completePostingTrip = () => ({
  type: COMPLETE_POSTING_TRIP,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors,
});

export const fetchTrips = (filters) => (dispatch) => {
  dispatch(startLoadingTrips());
  ApiUtil.fetchTrips(filters).then(
    (trips) => {
      return dispatch(receiveTrips(trips));
    },
    (err) => dispatch(receiveErrors(err))
  );
};

export const fetchTrip = (id) => (dispatch) => {
  ApiUtil.fetchTrip(id).then((trip) => {
    return dispatch(receiveTrip(trip));
  });
};

export const postTrip = (trip) => (dispatch) => {
  dispatch(startPostingTrip());
  ApiUtil.postTrip(trip).then(
    (trip) => {
      dispatch(completePostingTrip());
      return dispatch(receiveTrip(trip));
    },
    (err) => {
      dispatch(receiveErrors(err));
      return err;
    }
  );
};
