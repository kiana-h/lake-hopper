import React from "react";
import TripUploadMap from "../trip_map/trip_upload_map";
import TripDrawMap from "../trip_map/trip_draw_map";

const TripMap = (props) => {
  return props.mode === "draw" ? (
    <TripDrawMap {...props} />
  ) : (
    <TripUploadMap {...props} />
  );
};

export default TripMap;
