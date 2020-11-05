import { connect } from "react-redux";
import Landing from "./landing";
import { login } from "../../actions/session_actions";

const mapStateToProps = (state) => {
  return { currentUser: state.entities.users[state.session.id] };
};

const mapDispatchToProps = (dispatch) => {
  return { login: (user) => dispatch(login(user)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
