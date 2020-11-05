import React from "react";
import { withRouter } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MarkerManger from "../../util/marker_manager";
import style from "./style.scss";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

class TripMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -99.9434,
      lat: 38.5209,
      zoom: 3,
    };
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/kioola/ckg6zmzuv16uh19o2sr07x5gj",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      mapboxgl: mapboxgl,
    });
    this.map.addControl(geocoder);

    this.map.addControl(new mapboxgl.NavigationControl());

    this.MarkerManger = new MarkerManger(
      this.map,
      this.updateBounds.bind(this)
      // this.handleMarkerClick.bind(this)
    );

    this.registerListeners();

    this.MarkerManger.updateMarkers(this.props.trips);

    // if (this.props.singleHome) {
    //   this.props.fetchHome(this.props.homeId);
    // } else {
    //   this.registerListeners();
    //   this.MarkerManger.updateMarkers(this.props.homes);
    // }

    // map.on("move", () => {
    //   this.setState({
    //     lng: map.getCenter().lng.toFixed(4),
    //     lat: map.getCenter().lat.toFixed(4),
    //     zoom: map.getZoom().toFixed(2),
    //   });
    // });
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

    // google.maps.event.addListener(this.map, "idle", () => {
    //   const { north, south, east, west } = this.map.getBounds().toJSON();
    //   const bounds = {
    //     northEast: { lat: north, lng: east },
    //     southWest: { lat: south, lng: west },
    //   };
    //   this.props.updateFilter("bounds", bounds);
    // });
  };

  componentDidUpdate() {
    this.MarkerManger.updateMarkers(this.props.trips);
  }
  updateBounds(bounds) {
    if (this.props.trips) {
      this.map.fitBounds(bounds, { padding: 100 });
    }
  }
  // handleClick(coords) {
  //   this.props.history.push({
  //     pathname: "trips/new/",
  //     search: `lat=${coords.lat}&lng=${coords.lng}`,
  //   });
  // }

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
          className={style.mapContainer}
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
