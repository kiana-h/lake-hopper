import {
  getTripInfo,
  getDistanceSum,
  getElevationSum,
  getDate,
} from "../util/trip_formatter";

export const selectTrips = (state) => {
  let trips = Object.values(state.entities.trips).reverse();
  trips.sort((a, b) => getDate(b.start_date) - getDate(a.start_date));
  // for (let trip of trips) {
  //   if (trip && trip.activitySummaries) {
  //     trip.distance = getDistanceSum(trip.activitySummaries);
  //     trip.elevationGain = getElevationSum(trip.activitySummaries);
  //   }
  // }

  for (let trip of trips) {
    if (trip) {
      trip.distance = trip.distance > 0 ? trip.distance : "N/A";
      trip.elevation_gain =
        trip.elevation_gain > 0 ? trip.elevation_gain : "N/A";
    }
  }

  return trips;
};

export const selectTrip = (state, tripId) => {
  let trip = state.entities.trips[tripId];
  let tripWithInfo;
  if (
    trip &&
    trip.activities &&
    trip.activities[0] &&
    trip.activities[0].trackpoints
  ) {
    let activities = trip.activities.map((activity) => {
      let parsedTrackpoints = JSON.parse(activity.trackpoints);
      activity.trackpoints = parsedTrackpoints;
      return activity;
    });
    trip.activities = activities;
    tripWithInfo = getTripInfo(trip);
  }
  return tripWithInfo || trip;
};
