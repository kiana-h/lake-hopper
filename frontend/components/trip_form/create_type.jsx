import React from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import GestureIcon from "@material-ui/icons/Gesture";
import PublishIcon from "@material-ui/icons/Publish";
import theme from "../theme/theme";
import style from "./style.scss";

class CreateType extends React.Component {
  setUploadMode = () => {
    this.props.history.push({
      search: `mode=${"upload"}`,
    });
    this.props.reset();
  };
  setDrawMode = () => {
    this.props.history.push({
      search: `mode=${"draw"}`,
    });
    this.props.reset();
  };

  render() {
    return (
      <div>
        <div className={style["create-mode"]}>
          <div className={style["mode-chooser"]}>
            <PublishIcon fontSize="large" />
            <p>
              Upload a \'.tcx\' file from your smartwatch to load the map with
              your route and automatically add hear rate, elevation gain,
              distance, dates, etc.
            </p>
            <Button
              variant="contained"
              component="label"
              style={theme.palette.gradientPrimary}
              fullWidth
              onClick={this.setUploadMode}
            >
              Upload File
            </Button>
          </div>
          <div className={style["mode-chooser"]}>
            <GestureIcon fontSize="large" />
            <p>
              Create a custom trip by drawing on an interactive map which
              calculates distance and elevation gain. Or add information
              manually.
            </p>
            <Button
              variant="contained"
              component="label"
              style={theme.palette.gradientPrimary}
              fullWidth
              onClick={this.setDrawMode}
            >
              Draw Route
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateType);
