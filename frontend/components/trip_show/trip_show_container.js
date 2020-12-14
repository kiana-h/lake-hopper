import { connect } from "react-redux";
import TripShow from "./trip_show";
import { selectTrip } from "../../reducers/selectors";
import { fetchTrip } from "../../actions/trip_actions";

const mapStateToProps = (state, { match }) => {
  const tripId = parseInt(match.params.tripId);
  const trip = selectTrip(state, tripId);
  const tripLoading = state.ui.loading.detailLoading;
  return {
    tripId,
    trip,
    tripLoading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchTrip: (id) => dispatch(fetchTrip(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TripShow);
