import React from "react";
import { withRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapDrawer from "../../util/map_drawer";
import * as MapApiUtil from "../../util/map_api_util";
import style from "./style.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class TripDrawMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
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

      // add navigation control
      this.MapDrawer.addNavigationControl();

      // set up google elevation service
      if (!window.google) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = `https://maps.google.com/maps/api/js?key=${google_api_key}`;
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
        //We cannot access google.maps until it's finished loading
      }

      // add listeners for drawing
      this.registerListeners();
    });
  }

  componentWillUnmount() {
    this.map.remove();
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
        this.props.generateMapImage
      );
    }
  }

  registerListeners = () => {
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
      this.props.toggleCalc(true);
      this.getRoute();
    }
    this.props.updateFirstPoint(this.state.markers[0]);
  };

  registerMarkerListener = (marker, id) => {
    marker.id = id;
    marker.on("dragend", this.handleMarkerDrag.bind(this));
  };

  handleMarkerDrag = (e) => {
    this.props.toggleCalc(true);
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
    //generate id for mapbox layer based on path index
    const i = this.state.markers.length - 2;
    const id = `route-${i}`;
    // draw the path
    this.MapDrawer.addPath(rawCoordinates, id);
    // fetch elevation data
    const elevationData = await MapApiUtil.fetchElevation(rawCoordinates);
    const { elevation_gain, trackpoints } = elevationData;
    // create new route and push to trip creator (parent component)
    let routes = { ...this.props.routes };
    routes[i] = {
      trackpoints: [trackpoints],
      distance: distance,
      elevation_gain: elevation_gain,
    };
    this.props.updateRoutes(routes);
    // toggle loading state
    this.props.toggleCalc(false);
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
    this.props.toggleCalc(false);
  };

  clear = () => {
    this.state.markers.forEach((marker) => marker.remove());
    let i = 0;
    while (this.map.getStyle().sources[`route-${i}`]) {
      this.map.removeLayer(`route-${i}`);
      this.map.removeSource(`route-${i}`);
      i += 1;
    }
    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);

    this.setState({
      markers: [],
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

export default withRouter(TripDrawMap);
