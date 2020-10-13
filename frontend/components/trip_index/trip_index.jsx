import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TripMap from "../trip_map/trip_map";
import TripIndexItem from "./trip_index_item";
import style from "./style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
}));

export default function TripIndex({ trips, fetchTrips }) {
  const classes = useStyles();

  useEffect(() => {
    fetchTrips();
  }, []);

  const trip_items = trips.map((trip, id) => (
    <Grid item xs={12} key={id}>
      <Paper className={classes.paper} key={id}>
        <TripIndexItem key={id} trip={trip} />
      </Paper>
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <div className={`flex ${style.index_container}`}>
        <div className={style.grid_list}>
          <Grid container spacing={3}>
            {trip_items}
          </Grid>
        </div>
        <TripMap />
      </div>
    </div>
  );
}

// class TripIndex extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     this.props.fetchTrips();
//   }
//   render() {
//     return (

//     );
//   }
// }

// export default TripIndex;
