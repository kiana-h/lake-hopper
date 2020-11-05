import React from "react";
import Button from "@material-ui/core/Button";
import { Switch, withRouter } from "react-router-dom";

import TripForm from "./trip_form";
import TripMap from "../trip_map/trip_map";
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

      this.setState({
        routes,
        distance,
        elevation_gain,
        start_date,
        end_date,
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: "t" });
  };

  generateMapImageUrl = (mapImageUrl) => {
    this.setState({ mapImageUrl }, this.compileTrip);
  };

  compileTrip = () => {
    const tripData = new FormData();
    tripData.append("trip[title]", this.state.title);
    tripData.append("trip[description]", this.state.description);
    tripData.append("trip[start_date]", this.state.start_date);
    tripData.append("trip[end_date]", this.state.end_date);
    tripData.append("trip[mapImageUrl]", this.state.mapImageUrl);
    tripData.append(
      "trip[location_lat]",
      this.state.routes[0].trackpoints[0][0].lat
    );
    tripData.append(
      "trip[location_lng]",
      this.state.routes[0].trackpoints[0][0].lng
    );
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
    this.props.history.push("/");
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

  reset = () => {
    this.setState({
      title: "",
      description: "",
      distance: 0,
      elevation_gain: 0,
      routes: {},
      start_date: today(),
      end_date: today(),
    });
  };

  undo = () => {};

  clear = () => {
    this.setState({ distance: 0, elevation_gain: 0, routes: {} });
  };

  render() {
    if (!this.props.mode) {
      return <CreateType reset={this.reset} />;
    }
    return (
      <div className="flex-top">
        <TripForm
          handleSubmit={this.handleSubmit}
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
        <TripMap
          updateRoutes={this.updateRoutes}
          staticMap={false}
          routes={this.state.routes}
          mode={this.props.mode}
          lat={this.initMapProps.lat}
          lng={this.initMapProps.lng}
          zoom={this.initMapProps.zoom}
          undo={this.undo}
          clear={this.clear}
          getFirstPoint={this.getFirstPoint}
          submitted={this.state.submitted}
          generateMapImageUrl={this.generateMapImageUrl}
        />
      </div>
    );
  }
}

export default withRouter(TripCreator);
