import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login } from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => ({
  type: "Log in",
  errors: errors.session,
});
const mapDispatchToProps = (dispatch) => {
  return { submit: (user) => dispatch(login(user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
