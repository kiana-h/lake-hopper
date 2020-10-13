import { connect } from "react-redux";
import TripIndex from "./trip_index";
import { fetchTrips } from "../../actions/trip_actions";
import { selectTrips } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
  trips: selectTrips(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: () => dispatch(fetchTrips()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripIndex);
