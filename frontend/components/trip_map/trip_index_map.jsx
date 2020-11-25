import React from "react";
import { withRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MarkerManger from "../../util/marker_manager";
import MapDrawer from "../../util/map_drawer";
import style from "./style.scss";

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -99.9434,
      lat: 38.5209,
      zoom: 3,
      hoverMarker: null,
    };
    debugger;
  }

  componentDidMount() {
    mapboxgl.accessToken = window.mapbox_token;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/kioola/ckg6zmzuv16uh19o2sr07x5gj",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
    this.MapDrawer = new MapDrawer(this.map, mapboxgl.accessToken);
    this.MapDrawer.addGeoCoder();
    this.MapDrawer.addNavigationControl();

    this.MarkerManger = new MarkerManger(
      this.map,
      this.updateBounds.bind(this)
    );

    this.registerListeners();

    this.MarkerManger.updateMarkers(this.props.trips);
  }

  registerListeners = () => {
    this.map.on("moveend", (e) => {
      const mapBounds = this.map.getBounds();
      const ne = mapBounds.getNorthEast();
      const sw = mapBounds.getSouthWest();
      const bounds = {
        northEast: { lat: ne.lat, lng: ne.lng },
        southWest: { lat: sw.lat, lng: sw.lng },
      };
      this.props.updateFilter("bounds", bounds);
    });
  };

  componentDidUpdate() {
    this.MarkerManger.updateMarkers(this.props.trips, this.props.hoverId);
    if (this.props.hoverId.id && !this.state.hoverMarker) {
      const hoverMarker = this.MapDrawer.addMarker(
        [this.props.hoverId.lng, this.props.hoverId.lat],
        "#4052b5"
      );
      this.setState({ hoverMarker });
    } else if (!this.props.hoverId.id && this.state.hoverMarker) {
      this.state.hoverMarker.remove();
      this.setState({ hoverMarker: null });
    }
  }
  updateBounds = (bounds) => {
    if (this.props.trips) {
      this.map.fitBounds(bounds, { padding: 100 });
    }
  };

  handleMarkerClick(home) {
    // if (!this.props.singleHome) {
    //   this.props.history.push(`homes/${home.id}`);
    // }
  }

  render() {
    return (
      <div>
        <div
          ref={(el) => (this.mapContainer = el)}
          className={style["mapContainer-700"]}
        />
      </div>
    );
  }
}

export default withRouter(TripMap);

// map.on("click", (e) => {
//   var coords = `lat: ${e.lngLat.lat} <br> lng: ${e.lngLat.lng}`;

//   // create the popup
//   var popup = new mapboxgl.Popup().setText(coords);

//   // create DOM element for the marker
//   var el = document.createElement("div");
//   el.id = "marker";

//   // create the marker
//   new mapboxgl.Marker(el).setLngLat(e.lngLat).setPopup(popup).addTo(map);
// });

//     <div className="sidebarStyle">
//   <div>
//     Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom:{" "}
//     {this.state.zoom}
//   </div>
// </div>
