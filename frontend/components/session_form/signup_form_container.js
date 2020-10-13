import React from "react";
import { connect } from "react-redux";
import SignUp from "./signup_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  submit: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
