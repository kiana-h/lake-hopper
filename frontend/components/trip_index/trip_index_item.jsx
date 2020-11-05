import React from "react";
import { withRouter } from "react-router-dom";
import style from "./style.scss";

class TripIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const tripId = this.props.trip.id;
    this.props.history.push(`/trips/${tripId}`);
  }
  render() {
    const { trip } = this.props;
    return (
      <div onClick={this.handleClick} className={style["trip-item"]}>
        <img
          className={style["trip-item-photo"]}
          src={trip.photos_url ? trip.photos_url[0] : trip.mapImageUrl || ""}
        ></img>
        <h1>{trip.title}</h1>
        <p>{trip.description}</p>
      </div>
    );
  }
}

export default withRouter(TripIndexItem);
