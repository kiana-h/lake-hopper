import React from "react";
import TripDetail from "./trip_detail";
import TripMap from "../trip_map/trip_map";
import style from "./style.scss";

class TripShow extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   trip: this.props.trip,
    // };
  }
  componentDidMount() {
    this.props.fetchTrip(this.props.tripId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.props.trip) {
      this.props.fetchTrip(this.props.tripId);
    }
  }
  getFirstPoint = (lap) => {
    for (let trackpoint of lap) {
      if (trackpoint.lat && trackpoint.lng) {
        return [trackpoint.lng, trackpoint.lat];
      }
    }
  };
  getLastPoint = (lap) => {
    let len = lap.length;
    for (let i = len - 1; i > 0; i--) {
      if (lap[i].lat && lap[i].lng) {
        return [lap[i].lng, lap[i].lat];
      }
    }
  };

  render() {
    if (!this.props.trip) {
      return <div></div>;
    }
    const { trip } = this.props;

    return (
      <div className="flex-center">
        <TripDetail trip={trip} />
        <TripMap
          lat={trip.location_lat}
          lng={trip.location_lng}
          zoom={12}
          staticMap={true}
          routes={trip.activities}
          getFirstPoint={this.getFirstPoint}
        />
      </div>
    );
  }
}

export default TripShow;
