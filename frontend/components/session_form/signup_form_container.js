import { connect } from "react-redux";
import SignUp from "./signup_form";
import { signup } from "../../actions/session_actions";
import { login } from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  login: (user) => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
