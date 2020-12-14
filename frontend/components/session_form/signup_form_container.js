import { connect } from "react-redux";
import SignUp from "./signup_form";
import { signup } from "../../actions/session_actions";
import { login, clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
  clearErrors: () => dispatch(clearSessionErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
