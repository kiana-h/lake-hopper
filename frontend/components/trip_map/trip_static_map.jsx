import React from "react";
import { withRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import MapDrawer from "../../util/map_drawer";
import * as MapApiUtil from "../../util/map_api_util";
import style from "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.color = {
      head: "#BC9CFF",
      tail: "#4051b5",
    };
    this.state = {
      drawInitiated: false,
    };
  }

  componentDidMount() {
    // create map
    mapboxgl.accessToken = window.mapbox_token;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/kioola/ckg6zmzuv16uh19o2sr07x5gj",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      preserveDrawingBuffer: true,
      interactive: false,
    });

    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);

    // handle the non-interactive display mode
    this.map.on("load", () => {
      if (!this.props.routes) {
        const coords = [this.props.lng, this.props.lat];
        this.MapDrawer.addMarker(coords, this.color.head);
      }
      // if there are routes present in props, draw them
      else if (this.props.routes && !this.state.drawInitiated) {
        this.setState({ drawInitiated: true });
        this.MapDrawer.drawUploadedRoutes(this.props.routes);
      }
    });
  }

  handleStaticShow = () => {
    this.MapDrawer.drawUploadedRoutes(this.props.routes);
  };

  photo = () => {
    return this.props.photo ? (
      <img className={style.photo} src={this.props.photo} />
    ) : (
      ""
    );
  };

  componentDidUpdate() {
    if (
      this.props.routes &&
      this.props.routes[0] &&
      this.props.routes[0].trackpoints &&
      !this.state.drawInitiated
    ) {
      this.setState({ drawInitiated: true });
      this.handleStaticShow();
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div className={style["map-500"]}>
        <div className={style.mapTop}></div>
        <div
          ref={(el) => (this.mapContainer = el)}
          className={style["mapContainer-500"]}
        />
        {this.photo()}
      </div>
    );
  }
}

export default withRouter(TripMap);
