import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PuffLoader from "react-spinners/PuffLoader";

import {
  dateRange,
  capitalize,
  formatNumberComma,
} from "../../util/trip_formatter";

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
  indexLoad: {
    position: "relative",
    top: "250px",
    left: "200px",
  },
}));

export default function TripDetail({ trip, loading }) {
  const classes = useStyles();
  const dates = () => {
    const dateString = dateRange(trip);
    return (
      <Typography className={classes.date} variant="body2">
        {dateString}
      </Typography>
    );
  };
  const loadingSpinner = () => {
    if (loading) {
      console.log("loading");
      return (
        <div className={classes.indexLoad}>
          <PuffLoader size={50} color={"#6FCF97"} loading={loading} />
        </div>
      );
    }
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
                <strong>Distance: </strong>{" "}
                {trip.distance > 0 ? `${trip.distance} Miles` : "n/a"}
              </Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Elevation Gain: </strong>
                {trip.elevation_gain > 0
                  ? `${formatNumberComma(trip.elevation_gain)} Feet`
                  : "n/a"}
              </Typography>
            </div>
          </div>
          <div className={classes.infoRow}>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Trip Length: </strong>{" "}
                {trip.days ? `${trip.days} Days` : "n/a"}
              </Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Active Time: </strong>{" "}
                {trip.activeTime ? `${trip.activeTime} Hours` : "n/a"}
              </Typography>
            </div>
          </div>
          <div className={classes.infoRow}>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Heart Rate: </strong>{" "}
                {trip.hr ? `${trip.hr} bpm` : "n/a"}
              </Typography>
            </div>
            <div className={classes.infoItem}>
              <Typography variant="body2">
                <strong>Calories: </strong>{" "}
                {trip.calories
                  ? `${formatNumberComma(trip.calories)} Kcal`
                  : "n/a"}
              </Typography>
            </div>
          </div>
        </div>
        <Typography variant="body1" className={classes.description}>
          {trip.description}
        </Typography>
        {loadingSpinner()}
      </div>
    </Container>
  );
}
