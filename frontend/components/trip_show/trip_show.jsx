import React from "react";
import PuffLoader from "react-spinners/PuffLoader";
import TripDetail from "./trip_detail";
import TripMap from "../trip_map/trip_static_map";
import ImageGridList from "./photo_array";
import style from "./style.scss";

class TripShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      mapLoading: false,
    };
  }
  componentDidMount() {
    this.setState({ mapLoading: true });
    this.props.fetchTrip(this.props.tripId);
  }
  // componentDidUpdate() {
  //   if (!this.props.trip) {
  //     this.props.fetchTrip(this.props.tripId);
  //   }
  // }

  finishLoading = () => {
    this.setState({ mapLoading: false });
  };

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

  replaceMapWithPhoto = (photo) => {
    this.setState({ photo });
  };

  loadingSpinner = () => {
    if (!this.props.trip.days) {
      return (
        <div className={style.mapLoader}>
          <PuffLoader
            size={100}
            color={"#bc9bff"}
            loading={this.state.mapLoading}
          />
        </div>
      );
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
          <TripDetail
            trip={trip}
            className={style["trip-detail"]}
            loading={this.state.loading}
          />
          <div className={style["map-offset"]}>
            {this.loadingSpinner()}
            {!this.props.tripLoading && (
              <TripMap
                lat={trip.location_lat}
                lng={trip.location_lng}
                zoom={12}
                routes={trip.activities}
                getFirstPoint={this.getFirstPoint}
                photo={this.state.photo}
                finishLoading={this.finishLoading}
              />
            )}
          </div>
        </div>

        {trip.photos_url && trip.photos_url.length > 1 && (
          <ImageGridList
            photoUrls={trip.photos_url}
            title={trip.title}
            replaceMapWithPhoto={this.replaceMapWithPhoto}
          />
        )}
      </div>
    );
  }
}

export default TripShow;
