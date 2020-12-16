import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UserMenu from "./user_menu";
import style from "./style.scss";
import theme from "../theme/theme";

const Greeting = ({ currentUser, logout }) => {
  const UserElements = () => {
    return currentUser ? <UserGreeting /> : <SessionsLinks />;
  };

  const AppBar = () => (
    <nav>
      <div className={`flex-center ${style["nav-elements"]}`}>
        <Link to="/trips" className={`dark-shade-100 ${style.logo}`}>
          <img className={style.mountain} src={window.logo_purple}></img>
          <h1>Lake Hopper</h1>
        </Link>
        <div className="menu flex-center">
          <Link to="/">Home</Link>
          <Link to="/trips">My Trips</Link>
          <Link to="/about">About</Link>
          <UserElements />
        </div>
      </div>
    </nav>
  );

  const SessionsLinks = () => (
    <div className={style["user-elements"]}>
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
    <div className={"flex-center"}>
      <UserMenu user={currentUser} logout={logout} />
      <Link to="/trips/new">
        <Button variant="contained" style={theme.palette.gradientSecondary}>
          Add Trip
        </Button>
      </Link>
    </div>
  );

  return <AppBar />;
};

export default Greeting;
