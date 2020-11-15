import React from "react";
import Button from "@material-ui/core/Button";
import { Switch, withRouter } from "react-router-dom";

import TripForm from "./trip_form";
import TripMap from "../trip_map/trip_map";
import TripUploadMap from "../trip_map/trip_upload_map";
import TripDrawMap from "../trip_map/trip_draw_map";
import CreateType from "./create_type";
import { ProtectedRoute } from "../../util/route_util";

const today = () => {
  const d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

class TripCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      distance: 0,
      elevation_gain: 0,
      routes: {},
      start_date: today(),
      end_date: today(),
      photos: [],
      submitted: "f",
      mapImageUrl: "",
      firstPoint: null,
    };

    this.initMapProps = {
      lng: -99.9434,
      lat: 38.5209,
      zoom: 3,
    };
  }

  updateRoutes = (routes) => {
    let distance = parseFloat(
      (
        Object.values(routes).reduce((sum, route) => {
          return sum + route.distance;
        }, 0) * 0.000621371
      ).toFixed(2)
    );
    let elevation_gain = parseInt(
      Object.values(routes).reduce((sum, route) => {
        return sum + route.elevation_gain;
      }, 0) * 3.28084
    );
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
    this.setState({ submitted: "t" });
  };

  generateMapImageUrl = (mapImageUrl) => {
    this.setState({ mapImageUrl }, this.compileTrip);
  };

  compileTrip = async () => {
    const tripData = new FormData();
    tripData.append("trip[title]", this.state.title);
    tripData.append("trip[description]", this.state.description);
    tripData.append("trip[start_date]", this.state.start_date);
    tripData.append("trip[end_date]", this.state.end_date);
    tripData.append("trip[mapImageUrl]", this.state.mapImageUrl);
    tripData.append("trip[location_lat]", this.state.firstPoint[1]);
    tripData.append("trip[location_lng]", this.state.firstPoint[0]);
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
    this.navigateToSearch();
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

  reset = () => {
    this.setState({
      title: "",
      description: "",
      distance: 0,
      elevation_gain: 0,
      routes: {},
      start_date: today(),
      end_date: today(),
      photos: [],
      submitted: "f",
      mapImageUrl: "",
      firstPoint: null,
    });
  };

  undo = () => {};

  // clear = () => {
  //   this.setState({ distance: 0, elevation_gain: 0, routes: {} });
  // };
  tripMap = ({
    updateRoutes,
    routes,
    lat,
    lng,
    zoom,
    clear,
    updateFirstPoint,
    submitted,
    generateMapImageUrl,
  }) => {
    const map =
      this.props.mode === "upload" ? (
        <TripUploadMap
          updateRoutes={updateRoutes}
          routes={routes}
          lat={lat}
          lng={lng}
          zoom={zoom}
          clear={clear}
          submitted={submitted}
          generateMapImageUrl={generateMapImageUrl}
        />
      ) : (
        <TripDrawMap
          updateRoutes={updateRoutes}
          routes={routes}
          lat={lat}
          lng={lng}
          zoom={zoom}
          clear={clear}
          submitted={submitted}
          updateFirstPoint={updateFirstPoint}
          generateMapImageUrl={generateMapImageUrl}
        />
      );
    return map;
  };

  render() {
    if (!this.props.mode) {
      return <CreateType reset={this.reset} />;
    }

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
        />
        {this.tripMap({
          updateRoutes: this.updateRoutes,
          routes: this.state.routes,
          lat: this.initMapProps.lat,
          lng: this.initMapProps.lng,
          zoom: this.initMapProps.zoom,
          clear: this.reset,
          updateFirstPoint: this.updateFirstPoint,
          submitted: this.state.submitted,
          generateMapImageUrl: this.generateMapImageUrl,
        })}
        {/* <TripMap
          updateRoutes={this.updateRoutes}
          staticMap={false}
          routes={this.state.routes}
          mode={this.props.mode}
          lat={this.initMapProps.lat}
          lng={this.initMapProps.lng}
          zoom={this.initMapProps.zoom}
          undo={this.undo}
          clear={this.reset}
          updateFirstPoint={this.updateFirstPoint}
          submitted={this.state.submitted}
          generateMapImageUrl={this.generateMapImageUrl}
        /> */}
      </div>
    );
  }
}

export default withRouter(TripCreator);
