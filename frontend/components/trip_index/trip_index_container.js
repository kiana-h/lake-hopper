import { connect } from "react-redux";
import TripIndex from "./trip_index";
import { fetchTrips } from "../../actions/trip_actions";
import { selectTrips } from "../../reducers/selectors";
import { updateFilter } from "../../actions/filter_actions";

const mapStateToProps = (state) => ({
  trips: selectTrips(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTrips: () => dispatch(fetchTrips()),
  updateFilter: (filter, value) => dispatch(updateFilter(filter, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TripIndex);
