import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login, clearSessionErrors } from "../../actions/session_actions";

const mapStateToProps = ({ errors }) => ({
  errors: errors.session,
});
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearSessionErrors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
