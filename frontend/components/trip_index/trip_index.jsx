import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TripIndexMap from "../trip_map/trip_index_map";
import TripIndexItem from "./trip_index_item";
import PuffLoader from "react-spinners/PuffLoader";
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

export default function TripIndex({
  trips,
  loading,
  fetchTrips,
  updateFilter,
}) {
  const classes = useStyles();

  const [hoverId, setHoverId] = useState({ id: null, lng: null, lat: null });

  useEffect(() => {
    fetchTrips();
  }, []);

  const onMouseEnterHandler = (id, lng, lat) => {
    setHoverId({ id, lng, lat });
  };
  const onMouseLeaveHandler = () => {
    setHoverId({ id: null, lng: null, lat: null });
  };

  const trip_items = trips.map((trip) => (
    <Grid item xs={12} key={trip.id} className={style["grid-item"]}>
      {/* <Paper className={classes.paper} key={trip.id}> */}
      <div>
        <TripIndexItem
          key={trip.id}
          id={trip.id}
          trip={trip}
          onMouseEnterHandler={onMouseEnterHandler}
          onMouseLeaveHandler={onMouseLeaveHandler}
        />
        {/* </Paper> */}
      </div>
    </Grid>
  ));

  const NoTrips = () => {
    return !loading && !trips.length ? (
      <div className={style["no-trip"]}>
        <p>You have no trips :(</p>
        <p>Select 'Add Trips' on the menu or login to get started!</p>
      </div>
    ) : (
      ""
    );
  };

  const Index = () => {
    if (loading) {
      return (
        <div className={style["index-load"]}>
          <PuffLoader size={50} color={"#6FCF97"} loading={loading} />
        </div>
      );
    } else if (!trips.length) {
      return <NoTrips />;
    } else {
      return (
        <div className={style.grid_list}>
          <Grid
            container
            spacing={3}
            style={{
              maxHeight: 700,
              overflow: "auto",
              width: "400px",
            }}
          >
            {trip_items}
          </Grid>
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <div className={`flex-top ${style.index_container}`}>
        {Index()}
        {/* <div className={style["index-load"]}>
          <PuffLoader size={50} color={"#6FCF97"} loading={loading} />
        </div>
        <NoTrips />
        <div className={style.grid_list}>
          <Grid
            container
            spacing={3}
            style={{ maxHeight: 700, overflow: "auto", width: "400px" }}
          >
            {trip_items}
          </Grid>
        </div> */}

        <div className={style["map-offset"]}>
          <TripIndexMap
            trips={trips}
            updateFilter={updateFilter}
            hoverId={hoverId}
          />
        </div>
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
