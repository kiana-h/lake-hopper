import {
  getTripInfo,
  getDistanceSum,
  getElevationSum,
  getDate,
} from "../util/trip_formatter";

export const selectTrips = (state) => {
  let trips = Object.values(state.entities.trips).reverse();
  trips.sort((a, b) => getDate(b.start_date) - getDate(a.start_date));
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
