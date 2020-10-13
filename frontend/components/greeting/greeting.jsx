import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import style from "./style.scss";

const Greeting = ({ currentUser, logout }) => {
  const capitalize = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const UserElements = () => {
    return currentUser ? <UserGreeting /> : <SessionsLinks />;
  };
  const AppBar = () => (
    <nav className="flex">
      <Link to="/" className={style.logo}>
        <h1>Lake Hopper</h1>
      </Link>
      <div className="menu flex">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Explore</Link>
        <Link to="/">History</Link>
        <UserElements />
      </div>
    </nav>
  );
  const SessionsLinks = () => (
    <div>
      <Link to="/login">
        <Button variant="outlined" color="primary">
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="contained" color="secondary">
          Register
        </Button>
      </Link>
    </div>
  );
  const UserGreeting = () => (
    <div className="user-greeting flex">
      <Link className="flex" to="/">
        <p className="arrow down"></p>
        <p className="username">{capitalize(currentUser.username)}</p>
      </Link>
      <Button variant="outlined" color="primary" onClick={logout}>
        Logout
      </Button>
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );

  // return currentUser ? <UserGreeting /> : <SessionsLinks />;
  return <AppBar />;
};

export default Greeting;
