import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import style from "./style.scss";
import theme from "../theme/theme";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMountain } from "@fortawesome/free-solid-svg-icons";

const Greeting = ({ currentUser, logout }) => {
  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const UserElements = () => {
    return currentUser ? <UserGreeting /> : <SessionsLinks />;
  };
  const AppBar = () => (
    <nav>
      <div className={`flex-center ${style["nav-elements"]}`}>
        <Link to="/" className={`dark-shade-100 ${style.logo}`}>
          <img className={style.mountain} src="/assets/logo-p.svg"></img>
          <h1>Lake Hopper</h1>
        </Link>
        <div className="menu flex-center">
          <Link to="/home">Home</Link>
          <Link to="/">About</Link>
          <Link to="/trips/new">
            <Button variant="contained" style={theme.palette.gradientPrimary}>
              Add Trip
            </Button>
          </Link>

          <UserElements />
        </div>
      </div>
    </nav>
  );
  const SessionsLinks = () => (
    <div>
      <Link to="/login">
        <Button
          variant="outlined"
          style={theme.palette.gradientSecondaryOutline}
        >
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="contained" style={theme.palette.gradientSecondary}>
          Register
        </Button>
      </Link>
    </div>
  );
  const UserGreeting = () => (
    <div className={`flex-center ${style.user_greeting}`}>
      <Link className="flex-center" to="/home">
        <p className="arrow down"></p>
        <p className={`${style.username} secondary`}>
          {capitalize(currentUser.username)}
        </p>
      </Link>
      <Button variant="outlined" color="secondary" onClick={logout}>
        Logout
      </Button>
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );

  // return currentUser ? <UserGreeting /> : <SessionsLinks />;
  return <AppBar />;
};

export default Greeting;
