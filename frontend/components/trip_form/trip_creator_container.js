import { connect } from "react-redux";
import TripCreator from "./trip_creator";
import { postTrip } from "../../actions/trip_actions";
import { postActivities } from "../../actions/activity_actions";

const mapDispatchToProps = (dispatch) => ({
  createTrip: (trip) => dispatch(postTrip(trip)),
  createActivities: (activities) => dispatch(postActivities(activities)),
});

const mapStateToProps = (state, { location }) => {
  return {
    mode: new URLSearchParams(location.search).get("mode"),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripCreator);
