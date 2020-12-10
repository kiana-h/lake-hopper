import { connect } from "react-redux";
import TripCreator from "./trip_creator";
import {
  postTrip,
  receiveTripErrors,
  startPostingTrip,
} from "../../actions/trip_actions";

const mapDispatchToProps = (dispatch) => ({
  createTrip: (trip) => dispatch(postTrip(trip)),
  // createActivities: (activities) => dispatch(postActivities(activities)),
  receiveTripErrors: (error) => dispatch(receiveTripErrors(error)),
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
