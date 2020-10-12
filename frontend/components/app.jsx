import React from "react";
import { Route, Switch } from "react-router-dom";
import Greeting from "./greeting/greeting_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util.jsx";
import Signup from "./session_form/signup_form_container";
import Login from "./session_form/login_form_container";
import Search from "./search/search_container";
import HomeForm from "./home_form/home_form_container";
import HomeShow from "./home_show/home_show_container";

const App = () => {
  return (
    <div>
      <header>
        <Greeting />
      </header>

      <Switch>
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <ProtectedRoute path="/homes/new" component={HomeForm} />
        <Route path="/homes/:homeId" component={HomeShow} />
        <Route exact path="/" component={Search} />
      </Switch>
    </div>
  );
};

export default App;
