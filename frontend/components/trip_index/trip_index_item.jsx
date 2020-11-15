import React from "react";
import { withRouter } from "react-router-dom";
import style from "./style.scss";
import {
  formatDate,
  formatNumberComma,
  capitalize,
} from "../../util/trip_formatter";

class TripIndexItem extends React.Component {
  handleClick = () => {
    const tripId = this.props.trip.id;
    this.props.history.push(`/trips/${tripId}`);
  };

  // formatDesc = () => {
  //   const description = this.props.trip.description;
  //   return description ? description.substr(0, 100) + " ..." : "";
  // };

  onMouseEnterHandler = (e) => {
    e.preventDefault();
    const id = this.props.trip.id;
    this.props.onMouseEnterHandler(
      id,
      this.props.trip.location_lng,
      this.props.trip.location_lat
    );
  };

  render() {
    const { trip } = this.props;
    if (!trip) {
      return <div></div>;
    }
    return (
      <div
        onClick={this.handleClick}
        onMouseEnter={this.onMouseEnterHandler}
        onMouseLeave={this.props.onMouseLeaveHandler}
        className={style["trip-item"]}
      >
        <img
          className={style["trip-item-photo"]}
          src={trip.photos_url ? trip.photos_url[0] : trip.mapImageUrl || ""}
        ></img>
        <div className={style["trip-item-text"]}>
          <div className="dark-shade-100">
            <h1>{capitalize(trip.title)}</h1>
            <p>{formatDate(trip.start_date)}</p>
          </div>
          <div className="dark-shade-50">
            <p>
              <strong>Distance: </strong>
              {trip.distance > 0 ? trip.distance + " Miles" : "N/A"}
            </p>
            <p>
              <strong>Elevation Gain: </strong>
              {trip.elevationGain > 0
                ? formatNumberComma(trip.elevationGain) + " Feet"
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
