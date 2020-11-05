import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TripIndexMap from "../trip_map/trip_index_map";
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

export default function TripIndex({ trips, fetchTrips, updateFilter }) {
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

  const NoTrips = () => {
    return (
      <div className={style["no-trip"]}>
        <p>You have no trips :(</p>
        <p>Select 'Add Trips' on the menu to get started!</p>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <div className={`flex-center ${style.index_container}`}>
        {trips.length ? (
          <div className={style.grid_list}>
            <Grid
              container
              spacing={3}
              style={{ maxHeight: 700, overflow: "auto" }}
            >
              {trip_items}
            </Grid>
          </div>
        ) : (
          <NoTrips />
        )}

        <TripIndexMap trips={trips} updateFilter={updateFilter} />
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
