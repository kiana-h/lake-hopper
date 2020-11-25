import { getDistanceSum, getElevationSum } from "../util/trip_formatter";

export const selectTrips = (state) => {
  let trips = Object.values(state.entities.trips).reverse();
  for (let trip of trips) {
    if (trip && trip.activities) {
      trip.distance = getDistanceSum(trip.activities);
      trip.elevationGain = getElevationSum(trip.activities);
    }
  }
  return trips;
};

export const selectTrip = (state, tripId) => {
  let trip = state.entities.trips[tripId];
  debugger;
  if (trip && trip.activities.length && trip.activities[0].trackpoints) {
    debugger;
    let parsedTrackpoints;
    console.log(trip.activities[0].trackpoints);
    let activities = trip.activities.map((activity) => {
      parsedTrackpoints = JSON.parse(activity.trackpoints);
      activity.trackpoints = parsedTrackpoints;
      return activity;
    });
    trip.activities = activities;
    trip.distance = getDistanceSum(activities);
    trip.elevationGain = getElevationSum(activities);
  }
  return trip;
};
