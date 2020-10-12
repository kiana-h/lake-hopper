import React from "react";
import { Link } from "react-router-dom";

const Greeting = ({ currentUser, logout }) => {
  const SessionsLinks = () => (
    <nav>
      <Link to="/login">Log in</Link>
      <Link to="/signup">Sign Up</Link>
    </nav>
  );
  const UserGreeting = () => (
    <nav>
      <Link to="/">
        <h1>Lake Hopper</h1>
      </Link>
      <div className="session-links">
        <p>Hello {currentUser.username} !</p>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );

  return currentUser ? <UserGreeting /> : <SessionsLinks />;
};

export default Greeting;
