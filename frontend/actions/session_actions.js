import * as ApiUtil from "../util/session_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors: errors,
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

// Async Actions

export const signup = (user) => (dispatch) => {
  return ApiUtil.signup(user).then(
    (user) => dispatch(receiveUser(user)),
    (err) => dispatch(receiveSessionErrors(err.responseJSON))
  );
};
export const login = (user) => (dispatch) => {
  return ApiUtil.login(user).then(
    (user) => dispatch(receiveUser(user)),
    (err) => dispatch(receiveSessionErrors(err.responseJSON))
  );
};
export const logout = () => (dispatch) => {
  return ApiUtil.logout().then(() => window.location.reload());
};
