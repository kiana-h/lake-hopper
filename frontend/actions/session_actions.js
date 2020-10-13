import * as ApiUtil from "../util/session_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors: errors,
});

// Async Actions

export const signup = (user) => (dispatch) => {
  return ApiUtil.signup(user).then(
    (user) => dispatch(receiveUser(user)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );
};
export const login = (user) => (dispatch) => {
  return ApiUtil.login(user).then(
    (user) => dispatch(receiveUser(user)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );
};
export const logout = () => (dispatch) => {
  return ApiUtil.logout().then(() => dispatch(logoutUser()));
};
