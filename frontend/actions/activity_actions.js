import * as ApiUtil from "../util/activity_api_util";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const RECEIVE_ACTIVITIES = "RECEIVE_ACTIVITIES";

export const receiveActivities = (activities) => ({
  type: RECEIVE_ACTIVITIES,
  activities,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors,
});

export const fetchActivities = (filters) => (dispatch) => {
  ApiUtil.fetchActivities(filters).then(
    (activities) => {
      return dispatch(receiveActivities(activities));
    },
    (err) => dispatch(receiveErrors(err))
  );
};

export const postActivities = (activities) => (dispatch) => {
  ApiUtil.postActivities(activities).then(
    (activities) => dispatch(receiveActivities(activities)),
    (err) => dispatch(receiveErrors(err))
  );
};
