import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import { formatNumberComma } from "../../util/trip_formatter";
import style from "./style.scss";
import theme from "../theme/theme";

import parseFile from "../../util/tcx-parser";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "30px",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceEvenly",
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  number: { marginTop: theme.spacing(3) },
  adornment: {
    color: "grey",
    fontSize: ".8em",
  },
  textField: {
    width: "180px",
  },
}));

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
}) {
  const classes = useStyles();
  const [state, setState] = useState({
    uploadingFile: false,
    submittingTrip: false,
  });
  // const [open, setOpen] = React.useState(false);

  // Upload mode: hide inputs before receiving file
  let showInputs = mode === "draw" || activities[0];
  let showUploadButton = mode === "upload" && !activities[0];
  // let dateDisabled =

  //   const renderErrors = () => {
  //     if (!errors) {
  //       return;
  //     }
  //     return (
  //       <ul>
  //         {errors.map((error, i) => (
  //           <li key={`error-${i}`}>{error}</li>
  //         ))}
  //       </ul>
  //     );
  //   };

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
    const routes = {};
    for (let i = 0; i < files.length; i++) {
      const parsedFile = await parseFile(files[i]);
      routes[i] = parsedFile;
    }
    updateRoutes(routes);

    setState((prevState) => ({
      ...prevState,
      uploadingFile: false,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      submittingTrip: true,
    }));
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
        {/* {renderErrors()} */}
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
          />

          {showUploadButton && (
            <Button
              variant="contained"
              style={theme.palette.gradientPrimary}
              component="label"
              fullWidth
              className={classes.submit}
            >
              {state.uploadingFile ? "Processing Files..." : "Upload File"}
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
                  value={distance}
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
                  value={formatNumberComma(elevation_gain)}
                  onChange={handleChange}
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
              >
                {state.submittingTrip ? "Submitting Trip..." : "Submit"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
