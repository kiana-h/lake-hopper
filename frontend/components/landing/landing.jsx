import React from "react";
import Button from "@material-ui/core/Button";
import style from "./style.scss";
import theme from "../theme/theme";
import { withRouter } from "react-router-dom";

const demoEmail = process.env.DEMO_EMAIL;
const demoPassword = process.env.DEMO_PASSWORD;

const Landing = ({ currentUser, login, history, background }) => {
  const demoLogin = () => {
    const user = {
      email: demoEmail,
      password: demoPassword,
    };
    login(user);
    history.push("/trips");
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
      <img src={window.landing} className="splash" />
    </div>
  );
};

export default withRouter(Landing);
