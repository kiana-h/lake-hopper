import React from "react";
import { withRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import MapDrawer from "../../util/map_drawer";
import style from "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class TripUploadMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      drawComplete: false,
      mapGenerateComplete: false,
    };

    this.color = {
      head: "#BC9CFF",
      tail: "#4051b5",
    };
    this.mapImageUrl = "";
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
    });

    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);

    // handle the non-interactive display mode
    this.map.on("load", () => {
      this.MapDrawer.addGeoCoder();
      this.MapDrawer.addNavigationControl();
      if (this.props.routes[0]) {
        const markerObjects = this.MapDrawer.drawUploadedRoutes(
          Object.values(this.props.routes)
        );
        this.setState({ drawComplete: true, markers: markerObjects });
      }
    });
  }

  componentDidUpdate() {
    if (
      this.props.submitted &&
      !this.state.mapGenerateComplete &&
      !this.props.posting
    ) {
      const firstPoint = this.state.markers[0];
      this.setState({ mapGenerateComplete: true });
      this.MapDrawer.zoomToPath(
        this.props.routes,
        firstPoint,
        this.props.generateMapImageUrl
      );
    }

    if (this.state.drawComplete) {
      return;
    }
    if (this.props.routes[0]) {
      const markerObjects = this.MapDrawer.drawUploadedRoutes(
        Object.values(this.props.routes)
      );
      this.setState({ drawComplete: true, markers: markerObjects });
    }
  }

  componentWillUnmount() {
    this.map.remove();
  }

  clear = () => {
    this.state.markers.forEach((marker) => marker.remove());
    Object.keys(this.map.getStyle().sources).forEach((route) => {
      if (route != "composite") {
        this.map.removeLayer(route);
        this.map.removeSource(route);
      }
    });

    // while (this.map.getStyle().sources[`route-${i}`]) {
    //   this.map.removeLayer(`route-${i}`);
    //   this.map.removeSource(`route-${i}`);
    //   i += 1;
    // }
    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);

    this.setState({
      markers: [],
      drawComplete: false,
      mapGenerateComplete: false,
    });

    this.props.clear();
  };

  render() {
    const firstPoint = this.state.markers[0];

    return (
      <div className={style["map-700"]}>
        <div className={style.mapTop}></div>
        <div key={this.props.submitted}></div>
        <div id="coordinates" className={style.edit_buttons}>
          {/* <div className={style.edit_button} onClick={this.undo}>
              <FontAwesomeIcon icon={faUndo} />
            </div> */}
          <div
            className={`secondary ${style.edit_button}`}
            onClick={this.clear}
            title="Reset Map"
          >
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>

        <div
          ref={(el) => (this.mapContainer = el)}
          className={style["mapContainer-700"]}
        />

        {firstPoint && (
          <p id="coordinates" className={style.coordinates}>
            Longitude: {firstPoint.getLngLat().lng.toFixed(6)}
            <br />
            Latitude: {firstPoint.getLngLat().lat.toFixed(6)}
          </p>
        )}
      </div>
    );
  }
}

export default withRouter(TripUploadMap);
