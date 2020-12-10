import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";
import { List, ListItem } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import { formatNumberComma } from "../../util/trip_formatter";
import style from "./style.scss";
import theme from "../theme/theme";
import useStyles from "./form-style";

import parseFile from "../../util/tcx-parser";

export default function TripForm({
  errors,
  submit,
  mode,
  distance,
  title,
  description,
  elevation_gain,
  updateProp,
  updateRoutes,
  activities,
  start_date,
  end_date,
  addPhotos,
  photos,
  routesDrawn,
  calculating,
  submitted,
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    uploadingFile: false,
  });

  // Set up visible/disabled inputs based on state and props

  let showInputs = mode === "draw" || activities[0];
  let showUploadButton = mode === "upload" && !activities[0];

  let disableForm = state.uploadingFile || submitted;
  let disableDistanceElevation =
    mode === "upload" || routesDrawn || calculating;
  let disableDate = mode === "upload" || submitted;

  const renderErrors = () => {
    if (!errors.length) {
      return;
    }
    return (
      <List style={theme.palette.errorList}>
        {errors.map((error, i) => (
          <ListItem style={theme.palette.errorItem} key={`error-${i}`}>
            {error}
          </ListItem>
        ))}
      </List>
    );
  };
  // Draw mode methods

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    updateProp(id, value);
  };

  const handleFiles = (e) => {
    setState((prevState) => ({
      ...prevState,
      uploadingFile: true,
    }));
    const files = e.currentTarget.files;
    processFiles(files);
  };

  const processFiles = async (files) => {
    const rawRoutes = [];
    for (let i = 0; i < files.length; i++) {
      const parsedFile = await parseFile(files[i]);
      rawRoutes[i] = parsedFile;
    }

    rawRoutes.sort(
      (a, b) => new Date(a["activityId"]) - new Date(b["activityId"])
    );
    debugger;
    const routes = {};
    for (let i = 0; i < rawRoutes.length; i++) {
      routes[i] = rawRoutes[i];
    }
    updateRoutes(routes);

    setState((prevState) => ({
      ...prevState,
      uploadingFile: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit();
  };

  const handlePhotos = (e) => {
    const photos = e.currentTarget.files;
    addPhotos(photos);
  };

  const photoNameIndex = () => {
    if (photos) {
      let photoNames = [];
      for (let i = 0; i < photos.length; i++) {
        photoNames.push(photos[i].name);
      }
      return photoNames.map((name, id) => <li key={id}>{name}</li>);
    }
  };

  return (
    <div>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={style.mapTop}>
          <Avatar className={classes.avatar}>
            <ExploreIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Trip
          </Typography>
        </div>
        {renderErrors()}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            value={title}
            onChange={handleChange}
            disabled={disableForm}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline={true}
            rows="3"
            autoFocus
            value={description}
            onChange={handleChange}
            disabled={disableForm}
          />

          {showUploadButton && (
            <Button
              variant="contained"
              style={theme.palette.gradientPrimary}
              component="label"
              fullWidth
              className={classes.submit}
            >
              {state.uploadingFile ? "Processing Files..." : "Upload File(s)"}
              <input
                id="activities"
                type="file"
                style={{ display: "none" }}
                multiple
                accept=".tcx"
                onChange={handleFiles}
              />
            </Button>
          )}

          {showInputs && (
            <div>
              <div className="flex-center input-pair">
                <TextField
                  id="start_date"
                  label="Start Date"
                  type="date"
                  className={classes.textField}
                  value={start_date}
                  disabled={disableDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="end_date"
                  label="End Date"
                  type="date"
                  className={classes.textField}
                  value={end_date}
                  disabled={disableDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="flex-center input-pair">
                <TextField
                  id="distance"
                  label="Distance"
                  type="float"
                  className={`${classes.textField} ${classes.number}`}
                  value={calculating ? "calculating..." : distance}
                  disabled={disableDistanceElevation}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <p className={classes.adornment}>Miles</p>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="elevation_gain"
                  label="Elevation Gain"
                  type="float"
                  className={`${classes.textField} ${classes.number}`}
                  value={
                    calculating
                      ? "calculating..."
                      : formatNumberComma(elevation_gain)
                  }
                  onChange={handleChange}
                  disabled={disableDistanceElevation}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <p className={classes.adornment}>Feet</p>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <br />
              <div className={style["photos-container"]}>
                {photos.length > 0 && <p>Photos:</p>}
                <br />
                <ul className={style["photo-names"]}>{photoNameIndex()}</ul>
              </div>

              <Button
                variant="outlined"
                component="label"
                color="primary"
                fullWidth
                className={classes.submit}
              >
                Upload Photos
                <input
                  id="photos"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  accept="image/*"
                  onChange={handlePhotos}
                />
              </Button>
              <br />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={theme.palette.gradientPrimary}
                className={classes.submit}
                disabled={disableForm}
              >
                {submitted ? "Submitting Trip..." : "Submit"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
