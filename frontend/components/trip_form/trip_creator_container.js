import { connect } from "react-redux";
import TripCreator from "./trip_creator";
import {
  postTrip,
  receiveTripErrors,
  startPostingTrip,
  clearTripErrors,
} from "../../actions/trip_actions";

const mapDispatchToProps = (dispatch) => ({
  createTrip: (trip) => dispatch(postTrip(trip)),
  receiveTripErrors: (error) => dispatch(receiveTripErrors(error)),
  clearTripErrors: () => dispatch(clearTripErrors()),
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
