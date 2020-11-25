import { connect } from "react-redux";
import TripCreator from "./trip_creator";
import {
  postTrip,
  receiveErrors,
  startPostingTrip,
} from "../../actions/trip_actions";
// import { postActivities } from "../../actions/activity_actions";

const mapDispatchToProps = (dispatch) => ({
  createTrip: (trip) => dispatch(postTrip(trip)),
  // createActivities: (activities) => dispatch(postActivities(activities)),
  receiveErrors: (error) => dispatch(receiveErrors(error)),
  startPosting: () => dispatch(startPostingTrip()),
});

const mapStateToProps = (state, { location }) => {
  return {
    mode: new URLSearchParams(location.search).get("mode"),
    posting: state.ui.loading.tripPosting,
    errors: state.errors.trip,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripCreator);