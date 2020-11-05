import * as ApiUtil from "../util/trip_api_util";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_TRIPS = "RECEIVE_TRIPS";
export const RECEIVE_TRIP = "RECEIVE_TRIP";

export const receiveTrips = (trips) => ({
  type: RECEIVE_TRIPS,
  trips,
});
export const receiveTrip = (trip) => ({
  type: RECEIVE_TRIP,
  trip,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors,
});

export const fetchTrips = (filters) => (dispatch) => {
  ApiUtil.fetchTrips(filters).then(
    (trips) => {
      return dispatch(receiveTrips(trips));
    },
    (err) => dispatch(receiveErrors(err))
  );
};

export const fetchTrip = (id) => (dispatch) =>
  ApiUtil.fetchTrip(id).then((trip) => {
    return dispatch(receiveTrip(trip));
  });

export const postTrip = (trip) => (dispatch) => {
  ApiUtil.postTrip(trip).then(
    (trip) => dispatch(receiveTrip(trip)),
    (err) => dispatch(receiveErrors(err))
  );
};
