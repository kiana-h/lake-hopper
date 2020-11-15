import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { formatDate, capitalize } from "../../util/trip_formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0",
    padding: "0",
  },
  paper: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "500px",
    justifyContent: "space-between",
    color: "#1f2041",
  },
  avatar: {
    margin: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  infoItem: {
    width: "200px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    width: "400px",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
  description: {
    margin: theme.spacing(2, 0, 0),
    height: "240px",
    overflow: "auto",
  },
  date: {
    marginBottom: theme.spacing(4),
  },
}));

export default function TripDetail({ trip }) {
  const classes = useStyles();
  const dates = () => {
    const start = formatDate(trip.start_date);
    const end = formatDate(trip.end_date);
    const dateString = start === end ? start : start + " - " + end;
    return (
      <Typography className={classes.date} variant="body2">
        {dateString}
      </Typography>
    );
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <div className={classes.info}>
          <Avatar className={classes.avatar}>
            <MapIcon />
          </Avatar>
          <Typography variant="h5">{capitalize(trip.title)}</Typography>
          {dates()}

          <div className={classes.infoRow}>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Distance: </strong> {trip.distance} Miles
              </Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Elevation Gain: </strong> {trip.elevationGain} Feet
              </Typography>
            </div>
          </div>
          <div className={classes.infoRow}>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Heart Rate: </strong> {trip.elevationGain} bpm
              </Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Calories: </strong> {trip.elevationGain} kc
              </Typography>
            </div>
          </div>
          <div className={classes.infoRow}>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Trip Length: </strong> {trip.elevationGain} Days
              </Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Active Time: </strong> {trip.elevationGain} Hours
              </Typography>
            </div>
          </div>
        </div>
        <Typography variant="body1" className={classes.description}>
          {trip.description}
        </Typography>
      </div>
    </Container>
  );
}
