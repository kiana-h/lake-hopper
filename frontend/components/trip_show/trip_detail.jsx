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
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  description: {
    margin: theme.spacing(2, 0, 0),
  },
}));

export default function TripDetail({ trip }) {
  const classes = useStyles();
  let distance, elevationGain;
  if (trip.activities) {
    distance = trip.activities
      .reduce((sum, activity) => {
        return activity.distance + sum;
      }, 0)
      .toFixed(2);
    elevationGain = trip.activities.reduce((sum, activity) => {
      return activity.elevation_gain + sum;
    }, 0);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MapIcon />
        </Avatar>
        <Typography variant="h5">{trip.title}</Typography>
        <Typography variant="body1" className={classes.description}>
          {trip.description}
        </Typography>
        <div>
          <Typography variant="h6" className={classes.description}>
            Distance:
          </Typography>
          <Typography variant="body1">{distance}</Typography>
        </div>
        <div>
          <Typography variant="h6" className={classes.description}>
            Elevation Gain:
          </Typography>
          <Typography variant="body1">{elevationGain}</Typography>
        </div>
      </div>
    </Container>
  );
}
