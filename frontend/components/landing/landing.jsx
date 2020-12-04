import React from "react";
import Button from "@material-ui/core/Button";
import style from "./style.scss";
import theme from "../theme/theme";
import { withRouter } from "react-router-dom";

const Landing = ({ currentUser, login, history, background }) => {
  const demoLogin = async () => {
    const user = {
      email: window.demo_email,
      password: window.demo_password,
    };
    try {
      await login(user);
      history.push("/trips");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`dark-shade-100`}>
      <div className={style["landing-blurb"]}>
        <h1 className={` ${style["landing-title"]}`}>A Backpacker's Journal</h1>
        <p>All of your trips, maps, photos, and notes in one place</p>
        <p></p>
        <br />
        <br />
        {!currentUser && (
          <Button
            variant="contained"
            style={theme.palette.gradientPrimary}
            className={style["demo-button"]}
            onClick={demoLogin}
          >
            Demo User Login
          </Button>
        )}
      </div>
      <div
        className="splash"
        style={{
          backgroundImage: `url(${window.landing})`,
        }}
      ></div>
    </div>
  );
};

export default withRouter(Landing);
