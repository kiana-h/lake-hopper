import React from "react";
import { withRouter } from "react-router-dom";

import TripForm from "./trip_form";
import TripMap from "../trip_map/trip_map";
import CreateType from "./create_type";
import {
  today,
  getDistanceSum,
  getElevationSum,
} from "../../util/trip_formatter";

const initialState = {
  title: "",
  description: "",
  distance: 0,
  elevation_gain: 0,
  routes: {},
  start_date: today(),
  end_date: today(),
  photos: [],
  submitted: false,
  mapImageUrl: "",
  firstPoint: null,
  calculating: false,
};

class TripCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };

    this.initMapProps = {
      lng: -99.9434,
      lat: 38.5209,
      zoom: 3,
    };
  }

  updateRoutes = (routes) => {
    const activities = Object.values(routes);
    let distance = parseFloat(getDistanceSum(activities));
    let elevation_gain = parseFloat(getElevationSum(activities));

    // if the route was uploaded
    if (routes[0] && routes[0]["activityId"]) {
      // extract start & end dates
      let start_date = routes[0]["activityId"].split("T")[0];
      let lastIndex = Object.keys(routes).reverse()[0];
      let end_date = routes[lastIndex]["activityId"].split("T")[0];
      let firstPoint = this.getFirstPoint(routes[0].trackpoints[0]);
      this.setState({
        routes,
        distance,
        elevation_gain,
        start_date,
        end_date,
        firstPoint,
      });
    }
    // if the route was drawn
    else {
      this.setState({
        routes,
        distance,
        elevation_gain,
      });
    }
  };

  addPhotos = (photos) => {
    let allPhotos = [...this.state.photos];
    for (let i = 0; i < photos.length; i++) {
      allPhotos.push(photos[i]);
    }
    this.setState({ photos: allPhotos });
  };

  updateProp = (id, value) => {
    this.setState({ [id]: value });
  };

  submit = () => {
    if (!this.state.firstPoint && !this.state.routes[0]) {
      this.noTripLocation();
    } else if (!this.state.title) {
      this.noTitle();
    } else {
      this.setState({ submitted: true });
    }
  };

  noTripLocation = () => {
    this.props.receiveTripErrors(
      this.props.mode === "draw"
        ? [
            "Missing Trip Location Info:",
            "  - Draw your route on the map, or",
            "  - Specify the starting point by clicking on the map",
          ]
        : [
            "Missing Trip Location Info:",
            "  - Upload a .tcx file to get trip info",
          ]
    );
  };
  noTitle = () => {
    this.props.receiveTripErrors(["Title can't be blank"]);
  };

  generateMapImage = (mapImageUrl) => {
    this.setState({ mapImageUrl }, this.compileTrip);
  };

  componentDidUpdate(prevProps) {
    if (this.state.submitted === true) {
      if (prevProps.posting) {
        if (!this.props.posting) {
          this.navigateToSearch();
        }
      }
    }
  }

  compileTrip = () => {
    const tripData = new FormData();
    tripData.append("trip[title]", this.state.title);
    tripData.append("trip[description]", this.state.description);
    tripData.append("trip[start_date]", this.state.start_date);
    tripData.append("trip[end_date]", this.state.end_date);
    // tripData.append("trip[mapImageUrl]", this.state.mapImageUrl);
    tripData.append("trip[location_lat]", this.state.firstPoint[1]);
    tripData.append("trip[location_lng]", this.state.firstPoint[0]);

    tripData.append("trip[photos][]", this.state.mapImageUrl);
    if (this.state.photos.length) {
      for (let photo of this.state.photos) {
        tripData.append("trip[photos][]", photo);
      }
    }

    let route;
    let activities = [];
    for (let routeNum in this.state.routes) {
      const activity = {};
      route = this.state.routes[routeNum];
      activity.trackpoints = JSON.stringify(route.trackpoints);
      activity.elevation_gain = route.elevation_gain;
      activity.distance = route.distance;
      if (route["activityId"]) {
        activity.duration = route.duration;
        activity.calories = route.calories;
        activity.avg_hr = route.avg_hr;
      }
      activities.push(activity);
    }
    tripData.append("trip[activities]", JSON.stringify(activities));
    this.props.createTrip(tripData);
  };

  navigateToSearch = () => {
    this.props.history.push("/trips");
  };

  setMode = (mode) => {
    this.setState({ mode: mode });
  };

  getFirstPoint = (lap) => {
    for (let trackpoint of lap) {
      if (trackpoint.lat && trackpoint.lng) {
        return [trackpoint.lng, trackpoint.lat];
      }
    }
  };

  updateFirstPoint = (marker) => {
    const lng = marker.getLngLat().lng.toFixed(6);
    const lat = marker.getLngLat().lat.toFixed(6);
    this.setState({ firstPoint: [lng, lat] });
  };

  toggleCalc = (bool) => {
    this.setState({ calculating: bool });
  };

  resetMap = () => {
    this.setState({
      distance: 0,
      elevation_gain: 0,
      routes: {},
      photos: [],
      submitted: false,
      mapImageUrl: "",
      firstPoint: null,
      calculating: false,
    });
  };

  resetAll = () => {
    this.resetMap();
    this.setState({
      title: "",
      description: "",
    });
  };

  render() {
    if (!this.props.mode) {
      return <CreateType reset={this.resetAll} />;
    }

    const mapProps = {
      updateRoutes: this.updateRoutes,
      routes: this.state.routes,
      lat: this.initMapProps.lat,
      lng: this.initMapProps.lng,
      zoom: this.initMapProps.zoom,
      clear: this.resetMap,
      updateFirstPoint: this.updateFirstPoint,
      submitted: this.state.submitted,
      posting: this.props.posting,
      generateMapImage: this.generateMapImage,
      toggleCalc: this.toggleCalc,
      noTripLocation: this.noTripLocation,
    };
    return (
      <div className="flex-top">
        <TripForm
          submit={this.submit}
          mode={this.props.mode}
          distance={this.state.distance}
          elevation_gain={this.state.elevation_gain}
          updateProp={this.updateProp}
          updateRoutes={this.updateRoutes}
          activities={this.state.routes}
          start_date={this.state.start_date}
          end_date={this.state.end_date}
          title={this.state.title}
          description={this.state.description}
          photos={this.state.photos}
          addPhotos={this.addPhotos}
          routesDrawn={Object.keys(this.state.routes).length > 0}
          calculating={this.state.calculating}
          errors={this.props.errors}
          posting={this.props.posting}
          submitted={this.state.submitted}
        />
        <TripMap {...mapProps} mode={this.props.mode} />
      </div>
    );
  }
}

export default withRouter(TripCreator);
