import React from "react";
import TripDetail from "./trip_detail";
import TripMap from "../trip_map/trip_static_map";
import ImageGridList from "./photo_array";
import style from "./style.scss";

class TripShow extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   hoverId: null,
    // };
  }
  componentDidMount() {
    this.props.fetchTrip(this.props.tripId);
  }
  componentDidUpdate() {
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
      <div>
        <div className="flex-top">
          <TripDetail trip={trip} className={style["trip-detail"]} />
          <div className={style["map-offset"]}>
            <TripMap
              lat={trip.location_lat}
              lng={trip.location_lng}
              zoom={12}
              routes={trip.activities}
              getFirstPoint={this.getFirstPoint}
            />
          </div>
        </div>
        <ImageGridList photoUrls={trip.photos_url} title={trip.title} />
      </div>
    );
  }
}

export default TripShow;
