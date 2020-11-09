import React from "react";
import { withRouter } from "react-router-dom";
import style from "./style.scss";

class TripIndexItem extends React.Component {
  handleClick = () => {
    const tripId = this.props.trip.id;
    this.props.history.push(`/trips/${tripId}`);
  };

  formatDesc = () => {
    const description = this.props.trip.description;
    return description ? description.substr(0, 100) + " ..." : "";
  };

  onMouseEnterHandler = () => {
    const id = this.props.trip.id;
    this.props.onMouseEnterHandler(id);
  };

  render() {
    const { trip } = this.props;
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
          <h1>{trip.title}</h1>
          <p>{this.formatDesc()}</p>
        </div>
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
