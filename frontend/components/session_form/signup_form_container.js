import React from "react";
import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => ({
  type: "Sign Up",
  errors: errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  submit: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
