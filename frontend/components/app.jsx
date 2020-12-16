import React from "react";
import { Route, Switch } from "react-router-dom";
import Greeting from "./greeting/greeting_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util.jsx";
import Signup from "./session_form/signup_form_container";
import Login from "./session_form/login_form_container";
import TripIndex from "./trip_index/trip_index_container";
import TripCreator from "./trip_form/trip_creator_container";
import TripShow from "./trip_show/trip_show_container";
import Landing from "./landing/landing_container";
// import About from "./about/about";

const App = () => {
  return (
    <div>
      <header>
        <Greeting />
      </header>
      <div className="app-container">
        <Switch>
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <ProtectedRoute path="/trips/new" component={TripCreator} />
          <Route path="/trips/:tripId" component={TripShow} />
          <Route path="/trips" component={TripIndex} />
          {/* <Route path="/about" component={About} /> */}
          <Route exact path="/" component={Landing} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
