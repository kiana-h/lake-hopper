import React from "react";
import { withRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapDrawer from "../../util/map_drawer";
import * as MapApiUtil from "../../util/map_api_util";
import style from "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

class TripMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      drawComplete: false,
    };

    this.color = {
      head: "#BC9CFF",
      tail: "#4051b5",
    };
    this.mapImageUrl = "";
  }

  componentDidMount() {
    // create map
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/kioola/ckg6zmzuv16uh19o2sr07x5gj",
      center: [this.props.lng, this.props.lat],
      zoom: this.props.zoom,
      preserveDrawingBuffer: true,
    });

    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);

    // handle the non-interactive display mode
    if (this.props.staticMap) {
      this.handleStaticShow();
    }
    // only add search function for non-static mode (draw or upload)
    else {
      this.MapDrawer.addGeoCoder();
    }

    // add navigation control
    this.MapDrawer.addNavigationControl();

    // add listeners for draw mode
    if (this.props.mode === "draw") {
      this.map.on("load", () => {
        this.registerDrawListeners();
      });
    }
  }

  handleStaticShow = () => {
    this.map.on("load", () => {
      // if there are routes present in props, draw them
      if (this.props.routes) {
        this.MapDrawer.drawUploadedRoutes(this.props.routes);
      }
      // otherwise, only add a marker for trip start
      else {
        const coords = [this.props.lng, this.props.lat];
        this.MapDrawer.addMarker(coords, this.map, this.color.head);
      }
    });
  };

  componentDidUpdate() {
    if (this.state.drawComplete) {
      return;
    }
    if (this.props.mode === "upload" && this.props.routes[0]) {
      this.MapDrawer.drawUploadedRoutes(Object.values(this.props.routes));
      this.setState({ drawComplete: true });
    }
  }

  registerDrawListeners = () => {
    this.map.on("click", (e) => {
      const coords = e.lngLat;
      this.handleClick(coords);
    });
  };

  handleClick = (coords) => {
    let color = this.state.markers.length ? this.color.tail : this.color.head;
    const newMarker = this.MapDrawer.addMarker(coords, color, true);

    // set drag listener for each marker
    this.registerMarkerListener(newMarker, this.state.markers.length);
    // add marker to state
    const count = this.state.markers.length;
    this.setState({
      markers: [...this.state.markers, newMarker],
    });
    // only run getRoute if there was at least one marker
    // in state before adding current marker
    if (count > 0) {
      this.getRoute();
    }
    this.props.updateFirstPoint(this.state.markers[0]);
  };

  registerMarkerListener = (marker, id) => {
    marker.id = id;
    marker.on("dragend", this.handleMarkerDrag.bind(this));
  };

  handleMarkerDrag = (e) => {
    const marker = e.target;
    const id = marker.id;
    const { markers } = this.state;
    this.setState({ markers: markers });

    // no path to calculate if there is only one marker
    if (markers.length === 1) {
      return;
    }
    // recalculate path between marker and previous marker
    // unless it's the first marker
    if (id > 0) {
      const prevMarker = markers[id - 1];
      MapApiUtil.fetchRoute(
        prevMarker,
        marker,
        mapboxgl.accessToken,
        id
      ).then((data) => this.handleRoute(data, id - 1));
    }

    //recalculate path between marker and next marker
    // unless it's the last marker
    if (id < markers.length - 1) {
      const nextMarker = markers[id + 1];
      MapApiUtil.fetchRoute(
        marker,
        nextMarker,
        mapboxgl.accessToken,
        id
      ).then((data) => this.handleRoute(data, id));
    }
    this.props.updateFirstPoint(this.state.markers[0]);
  };

  getRoute = async () => {
    const { markers } = this.state;
    const start = markers[markers.length - 2];
    const end = markers[markers.length - 1];
    const data = await MapApiUtil.fetchRoute(start, end, mapboxgl.accessToken);
    this.handleRoute(data);
  };

  handleRoute = (data, id) => {
    const coordinates = data.routes[0].geometry.coordinates;
    const distance = data.routes[0].distance;
    typeof id === "number"
      ? this.reDrawPath(coordinates, distance, id)
      : this.drawPath(coordinates, distance);
  };

  drawPath = async (rawCoordinates, distance) => {
    // draw the path
    const i = this.state.markers.length - 2;
    const id = `route-${i}`;
    this.MapDrawer.addPath(rawCoordinates, id);
    // fetch elevation data
    const elevationData = await MapApiUtil.fetchElevation(rawCoordinates);
    const { elevation_gain, trackpoints } = elevationData;
    // push route to trip creator (parent)
    let routes = { ...this.props.routes };
    routes[i] = {
      trackpoints: [trackpoints],
      distance: distance,
      elevation_gain: elevation_gain,
    };
    this.props.updateRoutes(routes);
  };

  reDrawPath = async (rawCoordinates, distance, id) => {
    // re-draw the path
    this.MapDrawer.resetPath(rawCoordinates, id);
    // fetch elevation data
    const elevationData = await MapApiUtil.fetchElevation(rawCoordinates);
    const { elevation_gain, trackpoints } = elevationData;
    // push route to trip creator (parent)
    let routes = { ...this.props.routes };
    routes[id] = {
      trackpoints: [trackpoints],
      distance: distance,
      elevation_gain: elevation_gain,
    };
    this.props.updateRoutes(routes);
  };

  clear = () => {
    this.state.markers.forEach((marker) => marker.remove());
    // this.map.getStyle().sources.forEach((source) => source.remove());
    this.map.getStyle().layers.forEach((layer) => layer.remove());

    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);

    this.setState({
      markers: [],
      drawComplete: false,
    });

    this.props.clear();
  };

  render() {
    const firstPoint = this.state.markers[0];

    if (this.props.submitted === "t") {
      debugger;
      this.MapDrawer.zoomToPath(
        this.props.routes,
        firstPoint,
        this.props.generateMapImageUrl
      );
    }

    let hoverMarker = this.props.hoverId ? "" : "";

    return (
      <div className={style.map}>
        <div className={style.mapTop}></div>
        {!this.props.staticMap && (
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
        )}

        <div
          ref={(el) => (this.mapContainer = el)}
          className={style.mapContainer}
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

export default withRouter(TripMap);
