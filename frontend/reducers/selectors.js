import {
  getTripInfo,
  getDistanceSum,
  getElevationSum,
} from "../util/trip_formatter";

export const selectTrips = (state) => {
  let trips = Object.values(state.entities.trips).reverse();
  for (let trip of trips) {
    if (trip && trip.activitySummaries) {
      trip.distance = getDistanceSum(trip.activitySummaries);
      trip.elevationGain = getElevationSum(trip.activitySummaries);
    }
  }
  return trips;
};

export const selectTrip = (state, tripId) => {
  let trip = state.entities.trips[tripId];
  let tripWithInfo;
  if (trip && trip.activities && trip.activities[0].trackpoints) {
    let parsedTrackpoints;
    let activities = trip.activities.map((activity) => {
      parsedTrackpoints = JSON.parse(activity.trackpoints);
      activity.trackpoints = parsedTrackpoints;
      return activity;
    });
    trip.activities = activities;
    tripWithInfo = getTripInfo(trip);
  }
  return tripWithInfo || trip;
};
